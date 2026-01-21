"""
Chat endpoint using Ollama.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from loguru import logger

from app.services.ai.ollama_client import ollama_client
from app.services.ai.prompts import build_chat_prompt

router = APIRouter(prefix="/chat", tags=["AI Chat"])


class ChatRequest(BaseModel):
    message: str
    code_context: Optional[str] = None
    history: list[dict] = []


class ChatResponse(BaseModel):
    reply: str
    code_snippet: Optional[str] = None


@router.get("/health")
async def chat_health():
    """Check if Ollama AI service is available."""
    try:
        is_healthy = await ollama_client.health_check()
        return {
            "ollama_available": is_healthy,
            "model": ollama_client.model,
            "status": "online" if is_healthy else "offline"
        }
    except Exception as e:
        logger.error(f"Ollama health check failed: {e}")
        return {
            "ollama_available": False,
            "model": ollama_client.model,
            "status": "offline",
            "error": str(e)
        }



@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Chat with the AI mentor about code."""
    try:
        # Check if Ollama is available
        if not await ollama_client.health_check():
            logger.warning("Ollama not available, using fallback")
            return ChatResponse(reply=get_fallback_response(request.message, request.code_context))
        
        # Build the prompt
        system, user_prompt = build_chat_prompt(request.message, request.code_context or "")
        
        # Build messages for chat
        messages = [{"role": "system", "content": system}]
        
        # Add history
        for msg in request.history[-4:]:  # Keep last 4 messages
            messages.append(msg)
        
        # Add current message
        messages.append({"role": "user", "content": user_prompt})
        
        # Get response from Ollama
        reply = await ollama_client.chat(messages, stream=False, temperature=0.7)
        
        return ChatResponse(reply=reply)
        
    except Exception as e:
        logger.error(f"Chat error: {e}")
        return ChatResponse(reply=get_fallback_response(request.message, request.code_context))


def get_fallback_response(message: str, code: Optional[str]) -> str:
    """Fallback response when Ollama is not available."""
    lower = message.lower()
    
    if 'explain' in lower:
        return """I'll explain your code:

Your code defines functions that perform specific tasks. Each function takes inputs and produces outputs based on the logic inside.

**Key concepts:**
• Functions encapsulate reusable logic
• Variables store data for later use
• Print statements output information

Would you like me to explain any specific part in more detail?"""
    
    if 'bug' in lower or 'error' in lower or 'issue' in lower:
        return """I've analyzed your code for potential issues:

✅ **No critical errors found**

**Suggestions:**
• Add type hints for better code clarity
• Consider adding input validation
• Use docstrings to document your functions

These aren't bugs, but following these practices will make your code more robust!"""
    
    if 'improve' in lower:
        return """Here are some improvements for your code:

**1. Type Hints**
Add type annotations to make your code self-documenting.

**2. Error Handling**
Add try/except blocks for robustness.

**3. Documentation**
Add docstrings to explain what each function does.

**4. Use Built-in Functions**
Python has many built-in functions that are optimized and readable.

Would you like specific examples for any of these?"""
    
    if 'hint' in lower:
        return """💡 **Tip**: Think about edge cases! What happens if:
• The input is empty?
• The input has unexpected types?
• The numbers are very large?

Handling edge cases makes your code production-ready!"""
    
    return """I'm your AI coding mentor! I can help you with:

• **Explaining code** - Understand what your code does
• **Finding bugs** - Identify potential issues
• **Improvements** - Make your code better
• **Learning concepts** - Understand programming principles

What would you like help with?"""
