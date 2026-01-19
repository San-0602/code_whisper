"""Tests for Ollama integration."""
import pytest
from app.services.ai.ollama_client import ollama_client


@pytest.mark.asyncio
async def test_ollama_health():
    """Test Ollama is running."""
    is_healthy = await ollama_client.health_check()
    assert is_healthy, "Ollama should be running at localhost:11434"


@pytest.mark.asyncio
async def test_ollama_generate():
    """Test basic generation."""
    if not await ollama_client.health_check():
        pytest.skip("Ollama not available")
    
    response = await ollama_client.generate("Say 'Hello' in one word", stream=False)
    assert response, "Should get a response"
    assert len(response) > 0


@pytest.mark.asyncio
async def test_ollama_stream():
    """Test streaming generation."""
    if not await ollama_client.health_check():
        pytest.skip("Ollama not available")
    
    chunks = []
    async for chunk in await ollama_client.generate("Count to 3", stream=True):
        chunks.append(chunk)
    
    assert len(chunks) > 0, "Should receive stream chunks"
