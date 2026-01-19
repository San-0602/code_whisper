"""
Ollama API Client
Handles communication with local Ollama instance for AI inference.
"""
import httpx
import json
from typing import AsyncGenerator, Optional
from loguru import logger

from app.core.config import settings


class OllamaClient:
    """Async client for Ollama API."""
    
    def __init__(
        self,
        base_url: str = None,
        model: str = None,
        timeout: int = None
    ):
        self.base_url = base_url or settings.OLLAMA_URL
        self.model = model or settings.OLLAMA_MODEL
        self.timeout = timeout or settings.OLLAMA_TIMEOUT
        
    async def generate(
        self,
        prompt: str,
        system: str = "",
        stream: bool = False,
        temperature: float = 0.7,
        max_tokens: int = 2048,
    ) -> str | AsyncGenerator[str, None]:
        """
        Generate a response from Ollama.
        
        Args:
            prompt: User prompt
            system: System prompt
            stream: Whether to stream the response
            temperature: Sampling temperature (0-1)
            max_tokens: Maximum tokens to generate
            
        Returns:
            Complete response string, or async generator of chunks if streaming
        """
        url = f"{self.base_url}/api/generate"
        
        payload = {
            "model": self.model,
            "prompt": prompt,
            "system": system,
            "stream": stream,
            "options": {
                "temperature": temperature,
                "num_predict": max_tokens,
            }
        }
        
        if stream:
            return self._stream_generate(url, payload)
        else:
            return await self._sync_generate(url, payload)
    
    async def _sync_generate(self, url: str, payload: dict) -> str:
        """Non-streaming generation."""
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                response = await client.post(url, json=payload)
                response.raise_for_status()
                
                result = response.json()
                return result.get("response", "")
                
            except httpx.TimeoutException:
                logger.error(f"Ollama request timed out after {self.timeout}s")
                raise
            except httpx.HTTPError as e:
                logger.error(f"Ollama HTTP error: {e}")
                raise
    
    async def _stream_generate(self, url: str, payload: dict) -> AsyncGenerator[str, None]:
        """Streaming generation."""
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                async with client.stream("POST", url, json=payload) as response:
                    response.raise_for_status()
                    
                    async for line in response.aiter_lines():
                        if line:
                            try:
                                data = json.loads(line)
                                chunk = data.get("response", "")
                                if chunk:
                                    yield chunk
                                    
                                if data.get("done", False):
                                    break
                                    
                            except json.JSONDecodeError:
                                continue
                                
            except httpx.TimeoutException:
                logger.error(f"Ollama stream timed out after {self.timeout}s")
                raise
            except httpx.HTTPError as e:
                logger.error(f"Ollama stream HTTP error: {e}")
                raise
    
    async def chat(
        self,
        messages: list[dict],
        stream: bool = False,
        temperature: float = 0.7,
    ) -> str | AsyncGenerator[str, None]:
        """
        Chat completion endpoint.
        
        Args:
            messages: List of {"role": "user|assistant|system", "content": str}
            stream: Whether to stream
            temperature: Sampling temperature
            
        Returns:
            Response content
        """
        url = f"{self.base_url}/api/chat"
        
        payload = {
            "model": self.model,
            "messages": messages,
            "stream": stream,
            "options": {
                "temperature": temperature,
            }
        }
        
        if stream:
            return self._stream_chat(url, payload)
        else:
            return await self._sync_chat(url, payload)
    
    async def _sync_chat(self, url: str, payload: dict) -> str:
        """Non-streaming chat."""
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            response = await client.post(url, json=payload)
            response.raise_for_status()
            
            result = response.json()
            return result.get("message", {}).get("content", "")
    
    async def _stream_chat(self, url: str, payload: dict) -> AsyncGenerator[str, None]:
        """Streaming chat."""
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            async with client.stream("POST", url, json=payload) as response:
                response.raise_for_status()
                
                async for line in response.aiter_lines():
                    if line:
                        try:
                            data = json.loads(line)
                            chunk = data.get("message", {}).get("content", "")
                            if chunk:
                                yield chunk
                                
                            if data.get("done", False):
                                break
                        except json.JSONDecodeError:
                            continue
    
    async def health_check(self) -> bool:
        """Check if Ollama is running and accessible."""
        try:
            async with httpx.AsyncClient(timeout=5) as client:
                response = await client.get(f"{self.base_url}/api/tags")
                return response.status_code == 200
        except Exception as e:
            logger.warning(f"Ollama health check failed: {e}")
            return False
    
    async def list_models(self) -> list[str]:
        """List available models in Ollama."""
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(f"{self.base_url}/api/tags")
            response.raise_for_status()
            
            data = response.json()
            return [model["name"] for model in data.get("models", [])]


# Singleton instance
ollama_client = OllamaClient()
