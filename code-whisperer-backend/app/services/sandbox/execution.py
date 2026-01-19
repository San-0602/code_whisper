"""
Code Execution Service - Safe code execution handling.
"""
import asyncio
import time
import tempfile
import os
from typing import Optional
from loguru import logger

from app.core.config import settings
from app.services.sandbox.docker_manager import docker_manager


class ExecutionResult:
    def __init__(self, stdout="", stderr="", exit_code=0, execution_time_ms=0, timed_out=False):
        self.stdout = stdout
        self.stderr = stderr
        self.exit_code = exit_code
        self.execution_time_ms = execution_time_ms
        self.timed_out = timed_out
    
    @property
    def success(self) -> bool:
        return self.exit_code == 0 and not self.timed_out
    
    def to_dict(self) -> dict:
        return {
            "stdout": self.stdout, "stderr": self.stderr,
            "exit_code": self.exit_code, "execution_time_ms": self.execution_time_ms,
            "timed_out": self.timed_out, "success": self.success
        }


async def execute_code(code: str, language: str = "python", stdin: Optional[str] = None, timeout: Optional[int] = None) -> ExecutionResult:
    """Execute code safely using Docker or subprocess fallback."""
    timeout = timeout or settings.CODE_EXECUTION_TIMEOUT
    start = time.time()
    
    if docker_manager.available:
        loop = asyncio.get_event_loop()
        stdout, stderr, exit_code = await loop.run_in_executor(None, docker_manager.run_code, code, language, stdin, timeout)
        return ExecutionResult(stdout, stderr, exit_code, int((time.time() - start) * 1000))
    
    # Subprocess fallback for dev
    if settings.DEBUG:
        return await _execute_subprocess(code, language, stdin, timeout, start)
    
    return ExecutionResult(stderr="Docker required for execution", exit_code=1)


async def _execute_subprocess(code: str, language: str, stdin: Optional[str], timeout: int, start: float) -> ExecutionResult:
    suffix = ".py" if language == "python" else ".js"
    with tempfile.NamedTemporaryFile(mode="w", suffix=suffix, delete=False) as f:
        f.write(code)
        path = f.name
    
    try:
        cmd = ["python", path] if language in ["python", "py"] else ["node", path]
        proc = await asyncio.create_subprocess_exec(*cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
        stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=timeout)
        return ExecutionResult(stdout.decode(), stderr.decode(), proc.returncode or 0, int((time.time() - start) * 1000))
    except asyncio.TimeoutError:
        return ExecutionResult(stderr="Execution timed out", exit_code=124, timed_out=True)
    finally:
        os.unlink(path)
