"""
WebSocket handler for real-time code editing and AI analysis.
"""
import json
import asyncio
from fastapi import WebSocket, WebSocketDisconnect
from loguru import logger

from app.schemas.socket_events import EventType, create_socket_message, ConnectionAckEvent, AIStreamChunk, CodeResultEvent
from app.services.ai.ollama_client import ollama_client
from app.services.ai.prompts import build_analysis_prompt, build_hint_prompt
from app.services.ai.stream_parser import StreamParser, extract_json_from_response
from app.services.sandbox.execution import execute_code
from app.services.cache.redis_client import redis_client


class EditorConnectionManager:
    """Manages WebSocket connections for editors."""
    
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}
        self.analysis_tasks: dict[str, asyncio.Task] = {}
    
    async def connect(self, websocket: WebSocket, session_id: str):
        await websocket.accept()
        self.active_connections[session_id] = websocket
        
        # Send connection acknowledgment
        await self.send_event(websocket, EventType.CONNECTION_ACK, 
            ConnectionAckEvent(session_id=session_id, message="Connected to Code Whisperer"))
    
    def disconnect(self, session_id: str):
        if session_id in self.active_connections:
            del self.active_connections[session_id]
        if session_id in self.analysis_tasks:
            self.analysis_tasks[session_id].cancel()
            del self.analysis_tasks[session_id]
    
    async def send_event(self, websocket: WebSocket, event_type: EventType, data):
        message = create_socket_message(event_type, data)
        await websocket.send_json(message)
    
    async def handle_code_update(self, websocket: WebSocket, session_id: str, data: dict):
        """Handle real-time code updates with debounced AI analysis."""
        code = data.get("code", "")
        language = data.get("language", "python")
        
        # Cancel previous analysis if running
        if session_id in self.analysis_tasks:
            self.analysis_tasks[session_id].cancel()
        
        # Rate limit check
        if redis_client.available:
            allowed = await redis_client.check_rate_limit(f"analysis:{session_id}", limit=10, window=60)
            if not allowed:
                return
        
        # Start new analysis with debounce
        async def analyze():
            await asyncio.sleep(1.5)  # Debounce
            await self.run_ai_analysis(websocket, code, language)
        
        self.analysis_tasks[session_id] = asyncio.create_task(analyze())
    
    async def run_ai_analysis(self, websocket: WebSocket, code: str, language: str):
        """Run AI analysis and stream results."""
        try:
            await self.send_event(websocket, EventType.AI_STREAM_START, {})
            
            system, prompt = build_analysis_prompt(code, language)
            parser = StreamParser()
            
            if await ollama_client.health_check():
                async for chunk in await ollama_client.generate(prompt, system=system, stream=True):
                    clean = parser.process_chunk(chunk)
                    if clean:
                        await self.send_event(websocket, EventType.AI_STREAM_CHUNK,
                            AIStreamChunk(content=clean, done=False))
            
            await self.send_event(websocket, EventType.AI_STREAM_END, {})
            
        except Exception as e:
            logger.error(f"AI analysis error: {e}")
            await self.send_event(websocket, EventType.AI_ERROR, {"message": str(e)})
    
    async def handle_run_code(self, websocket: WebSocket, data: dict):
        """Execute code and return results."""
        code = data.get("code", "")
        language = data.get("language", "python")
        
        result = await execute_code(code, language)
        
        await self.send_event(websocket, EventType.CODE_RESULT,
            CodeResultEvent(
                stdout=result.stdout,
                stderr=result.stderr,
                exit_code=result.exit_code,
                execution_time_ms=result.execution_time_ms
            ))


manager = EditorConnectionManager()


async def editor_websocket_endpoint(websocket: WebSocket, session_id: str):
    """Main WebSocket endpoint for editor connections."""
    await manager.connect(websocket, session_id)
    
    try:
        while True:
            raw = await websocket.receive_text()
            message = json.loads(raw)
            
            event = message.get("event")
            data = message.get("data", {})
            
            if event == EventType.CODE_UPDATE.value:
                await manager.handle_code_update(websocket, session_id, data)
            elif event == EventType.RUN_CODE.value:
                await manager.handle_run_code(websocket, data)
            elif event == EventType.REQUEST_HINT.value:
                # Quick hint generation
                code = data.get("code", "")
                line = data.get("cursor_line", 1)
                system, prompt = build_hint_prompt(code, line)
                hint = await ollama_client.generate(prompt, system=system, stream=False)
                await manager.send_event(websocket, EventType.AI_HINT, {"hint": hint})
                
    except WebSocketDisconnect:
        manager.disconnect(session_id)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        manager.disconnect(session_id)
