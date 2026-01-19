"""
Stream Parser
Cleans and processes raw AI stream output.
Handles <think> tags, markdown, and JSON extraction.
"""
import re
import json
from typing import Optional
from loguru import logger


class StreamParser:
    """Parses and cleans AI stream output."""
    
    def __init__(self):
        self.buffer = ""
        self.in_think_block = False
        self.think_content = ""
        
    def reset(self):
        """Reset parser state for new stream."""
        self.buffer = ""
        self.in_think_block = False
        self.think_content = ""
    
    def process_chunk(self, chunk: str) -> str:
        """
        Process a single chunk of streamed content.
        Removes <think> blocks and cleans output.
        
        Args:
            chunk: Raw chunk from AI stream
            
        Returns:
            Cleaned chunk (may be empty if inside think block)
        """
        self.buffer += chunk
        
        # Handle <think> blocks (used by DeepSeek R1)
        if "<think>" in self.buffer and not self.in_think_block:
            self.in_think_block = True
            # Return content before <think> tag
            before_think = self.buffer.split("<think>")[0]
            self.buffer = self.buffer.split("<think>", 1)[1] if "<think>" in self.buffer else ""
            return before_think
        
        if self.in_think_block:
            if "</think>" in self.buffer:
                # Think block ended
                self.in_think_block = False
                parts = self.buffer.split("</think>", 1)
                self.think_content += parts[0]  # Store for debugging
                self.buffer = parts[1] if len(parts) > 1 else ""
                return self.buffer
            else:
                # Still in think block, don't output
                return ""
        
        # Normal content - return and clear buffer
        output = self.buffer
        self.buffer = ""
        return output
    
    def get_think_content(self) -> str:
        """Return accumulated thinking content (for debugging)."""
        return self.think_content
    
    def finalize(self) -> str:
        """Get any remaining buffered content."""
        remaining = self.buffer
        self.reset()
        return remaining


def extract_json_from_response(text: str) -> Optional[dict]:
    """
    Extract JSON object from AI response.
    Handles markdown code blocks and various formatting.
    
    Args:
        text: Raw AI response text
        
    Returns:
        Parsed JSON dict or None if not found
    """
    # Try to find JSON in markdown code block
    json_block_pattern = r"```(?:json)?\s*\n?([\s\S]*?)\n?```"
    match = re.search(json_block_pattern, text)
    
    if match:
        json_str = match.group(1).strip()
    else:
        # Try to find raw JSON object
        json_obj_pattern = r"\{[\s\S]*\}"
        match = re.search(json_obj_pattern, text)
        if match:
            json_str = match.group(0)
        else:
            return None
    
    try:
        return json.loads(json_str)
    except json.JSONDecodeError as e:
        logger.warning(f"Failed to parse JSON: {e}")
        return None


def extract_code_blocks(text: str) -> list[dict]:
    """
    Extract code blocks from markdown text.
    
    Args:
        text: Text containing markdown code blocks
        
    Returns:
        List of {"language": str, "code": str}
    """
    pattern = r"```(\w+)?\s*\n([\s\S]*?)\n```"
    matches = re.findall(pattern, text)
    
    return [
        {"language": lang or "text", "code": code.strip()}
        for lang, code in matches
    ]


def clean_response(text: str) -> str:
    """
    Clean AI response for display.
    Removes common artifacts and normalizes whitespace.
    
    Args:
        text: Raw AI response
        
    Returns:
        Cleaned text
    """
    # Remove <think> blocks entirely
    text = re.sub(r"<think>[\s\S]*?</think>", "", text)
    
    # Remove excessive newlines
    text = re.sub(r"\n{3,}", "\n\n", text)
    
    # Strip leading/trailing whitespace
    text = text.strip()
    
    return text


def is_code_content(chunk: str) -> bool:
    """
    Heuristic to detect if a chunk is likely code content.
    
    Args:
        chunk: Text chunk to analyze
        
    Returns:
        True if chunk appears to be code
    """
    code_indicators = [
        "def ", "class ", "import ", "from ",  # Python
        "function ", "const ", "let ", "var ",  # JavaScript
        "```", "    ", "\t",                    # Formatting
        "=>", "->", "==", "!=", "<=", ">=",     # Operators
    ]
    
    return any(indicator in chunk for indicator in code_indicators)
