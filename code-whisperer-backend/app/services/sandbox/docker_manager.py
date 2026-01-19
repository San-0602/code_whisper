"""
Docker Manager
Manages isolated containers for safe code execution.
"""
import docker
from docker.errors import DockerException, ImageNotFound, APIError
from typing import Optional
from loguru import logger

from app.core.config import settings


class DockerManager:
    """Manages Docker containers for code execution."""
    
    def __init__(self):
        try:
            self.client = docker.from_env()
            logger.info("Docker client initialized successfully")
        except DockerException as e:
            logger.warning(f"Docker not available: {e}")
            self.client = None
    
    @property
    def available(self) -> bool:
        """Check if Docker is available."""
        if self.client is None:
            return False
        try:
            self.client.ping()
            return True
        except Exception:
            return False
    
    def get_image_for_language(self, language: str) -> str:
        """Get the appropriate Docker image for a language."""
        images = {
            "python": settings.DOCKER_PYTHON_IMAGE,
            "javascript": settings.DOCKER_NODE_IMAGE,
            "js": settings.DOCKER_NODE_IMAGE,
            "node": settings.DOCKER_NODE_IMAGE,
            "typescript": settings.DOCKER_NODE_IMAGE,
        }
        return images.get(language.lower(), settings.DOCKER_PYTHON_IMAGE)
    
    async def ensure_image_exists(self, image_name: str) -> bool:
        """
        Ensure a Docker image exists, pull or build if necessary.
        
        Args:
            image_name: Name of the Docker image
            
        Returns:
            True if image is available
        """
        if not self.available:
            return False
            
        try:
            self.client.images.get(image_name)
            return True
        except ImageNotFound:
            logger.warning(f"Image {image_name} not found")
            return False
    
    def run_code(
        self,
        code: str,
        language: str,
        stdin: Optional[str] = None,
        timeout: int = None
    ) -> tuple[str, str, int]:
        """
        Run code in an isolated container.
        
        Args:
            code: Source code to execute
            language: Programming language
            stdin: Optional standard input
            timeout: Execution timeout in seconds
            
        Returns:
            Tuple of (stdout, stderr, exit_code)
        """
        if not self.available:
            return "", "Docker is not available", 1
        
        timeout = timeout or settings.CODE_EXECUTION_TIMEOUT
        image = self.get_image_for_language(language)
        
        # Build the command based on language
        if language.lower() in ["python", "py"]:
            cmd = ["python", "-c", code]
        elif language.lower() in ["javascript", "js", "node"]:
            cmd = ["node", "-e", code]
        else:
            return "", f"Unsupported language: {language}", 1
        
        try:
            container = self.client.containers.run(
                image=image,
                command=cmd,
                stdin_open=bool(stdin),
                detach=True,
                mem_limit="128m",           # Memory limit
                cpu_period=100000,          # CPU limits
                cpu_quota=50000,            # 50% of one CPU
                network_disabled=True,      # No network access
                read_only=True,             # Read-only filesystem
                remove=False,               # Don't auto-remove, we need logs
            )
            
            # Wait for completion with timeout
            result = container.wait(timeout=timeout)
            exit_code = result.get("StatusCode", 1)
            
            # Get logs
            stdout = container.logs(stdout=True, stderr=False).decode("utf-8")
            stderr = container.logs(stdout=False, stderr=True).decode("utf-8")
            
            # Cleanup
            container.remove(force=True)
            
            return stdout, stderr, exit_code
            
        except docker.errors.ContainerError as e:
            logger.error(f"Container error: {e}")
            return "", str(e), 1
        except APIError as e:
            logger.error(f"Docker API error: {e}")
            return "", f"Execution failed: {e}", 1
        except Exception as e:
            logger.error(f"Unexpected error in code execution: {e}")
            return "", f"Execution error: {e}", 1
    
    def cleanup_old_containers(self, max_age_hours: int = 1):
        """Remove old stopped containers."""
        if not self.available:
            return
            
        try:
            containers = self.client.containers.list(
                all=True,
                filters={"status": "exited"}
            )
            
            for container in containers:
                if "code-whisperer" in container.name:
                    container.remove(force=True)
                    logger.debug(f"Removed old container: {container.name}")
                    
        except Exception as e:
            logger.warning(f"Error cleaning containers: {e}")


# Singleton instance
docker_manager = DockerManager()
