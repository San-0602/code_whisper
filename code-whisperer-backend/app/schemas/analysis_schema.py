"""
Pydantic schemas for AI analysis responses.
"""
from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


class Severity(str, Enum):
    """Error severity levels."""
    ERROR = "error"
    WARNING = "warning"
    INFO = "info"
    HINT = "hint"


class CodeError(BaseModel):
    """Represents a code error or issue."""
    line: int = Field(..., description="Line number (1-indexed)")
    column: int = Field(0, description="Column number (0-indexed)")
    message: str = Field(..., description="Error description")
    severity: Severity = Field(Severity.ERROR, description="Severity level")
    code: Optional[str] = Field(None, description="Error code identifier")


class CodeSuggestion(BaseModel):
    """Represents an AI-suggested fix."""
    line: int = Field(..., description="Target line number")
    original: str = Field(..., description="Original code snippet")
    replacement: str = Field(..., description="Suggested replacement")
    explanation: str = Field(..., description="Why this change is suggested")


class AnalysisRequest(BaseModel):
    """Request body for code analysis."""
    code: str = Field(..., description="Source code to analyze")
    language: str = Field("python", description="Programming language")
    context: Optional[str] = Field(None, description="Additional context for analysis")


class AnalysisResponse(BaseModel):
    """Full analysis response from AI."""
    success: bool = Field(True, description="Whether analysis completed")
    errors: list[CodeError] = Field(default_factory=list, description="Detected errors")
    warnings: list[CodeError] = Field(default_factory=list, description="Detected warnings")
    hints: list[str] = Field(default_factory=list, description="Learning hints")
    suggestions: list[CodeSuggestion] = Field(default_factory=list, description="Suggested fixes")
    explanation: Optional[str] = Field(None, description="Overall code explanation")
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "errors": [
                    {"line": 5, "column": 0, "message": "Missing colon after if statement", "severity": "error"}
                ],
                "hints": ["Consider using a list comprehension for cleaner code"],
                "suggestions": [
                    {"line": 5, "original": "if x == 5", "replacement": "if x == 5:", "explanation": "Python requires a colon after if statements"}
                ]
            }
        }


class ChatMessage(BaseModel):
    """A single chat message."""
    role: str = Field(..., description="'user' or 'assistant'")
    content: str = Field(..., description="Message content")


class ChatRequest(BaseModel):
    """Request body for AI chat."""
    message: str = Field(..., description="User's question")
    code_context: Optional[str] = Field(None, description="Current code in editor")
    history: list[ChatMessage] = Field(default_factory=list, description="Previous messages")


class ChatResponse(BaseModel):
    """Response from AI chat."""
    reply: str = Field(..., description="AI response")
    code_snippet: Optional[str] = Field(None, description="Code example if relevant")
