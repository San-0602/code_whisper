"""
WebSocket event schemas and types.
Defines the protocol for real-time communication.
"""
from pydantic import BaseModel, Field
from typing import Optional, Any
from enum import Enum


class EventType(str, Enum):
    """WebSocket event types."""
    
    # Client -> Server
    CODE_UPDATE = "CODE_UPDATE"           # User typed code
    RUN_CODE = "RUN_CODE"                 # User wants to execute code
    REQUEST_HINT = "REQUEST_HINT"         # User asked for a hint
    CHAT_MESSAGE = "CHAT_MESSAGE"         # User sent a chat message
    SAVE_PROJECT = "SAVE_PROJECT"         # User wants to save
    
    # Server -> Client
    AI_STREAM_START = "AI_STREAM_START"   # AI analysis starting
    AI_STREAM_CHUNK = "AI_STREAM_CHUNK"   # Streaming AI response
    AI_STREAM_END = "AI_STREAM_END"       # AI analysis complete
    AI_HINT = "AI_HINT"                   # Quick tip/hint
    AI_ERROR = "AI_ERROR"                 # Error in AI processing
    
    CODE_RESULT = "CODE_RESULT"           # Code execution output
    CODE_ERROR = "CODE_ERROR"             # Code execution error
    
    PROJECT_SAVED = "PROJECT_SAVED"       # Confirmation of save
    CONNECTION_ACK = "CONNECTION_ACK"     # Connection acknowledged
    ERROR = "ERROR"                       # General error


class BaseSocketEvent(BaseModel):
    """Base WebSocket event structure."""
    event: EventType = Field(..., description="Event type")
    data: Any = Field(None, description="Event payload")
    timestamp: Optional[float] = Field(None, description="Unix timestamp")


class CodeUpdateEvent(BaseModel):
    """Payload for CODE_UPDATE event."""
    code: str = Field(..., description="Current code content")
    language: str = Field("python", description="Programming language")
    cursor_line: Optional[int] = Field(None, description="Current cursor line")
    project_id: Optional[str] = Field(None, description="Project ID if saved")


class RunCodeEvent(BaseModel):
    """Payload for RUN_CODE event."""
    code: str = Field(..., description="Code to execute")
    language: str = Field("python", description="Programming language")
    stdin: Optional[str] = Field(None, description="Standard input")


class AIStreamChunk(BaseModel):
    """Payload for AI_STREAM_CHUNK event."""
    content: str = Field(..., description="Chunk of AI response")
    is_code: bool = Field(False, description="Whether this is code content")
    done: bool = Field(False, description="Whether stream is complete")


class CodeResultEvent(BaseModel):
    """Payload for CODE_RESULT event."""
    stdout: str = Field("", description="Standard output")
    stderr: str = Field("", description="Standard error")
    exit_code: int = Field(0, description="Process exit code")
    execution_time_ms: int = Field(0, description="Execution time in milliseconds")


class ConnectionAckEvent(BaseModel):
    """Payload for CONNECTION_ACK event."""
    session_id: str = Field(..., description="WebSocket session ID")
    user_id: Optional[str] = Field(None, description="Authenticated user ID")
    message: str = Field("Connected to Code Whisperer", description="Welcome message")


# Helper to create socket messages
def create_socket_message(event: EventType, data: Any) -> dict:
    """Create a properly formatted WebSocket message."""
    import time
    return {
        "event": event.value,
        "data": data.model_dump() if isinstance(data, BaseModel) else data,
        "timestamp": time.time()
    }
