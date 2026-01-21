"""
Application Configuration
Loads environment variables and provides app-wide settings.
"""
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # App Info
    APP_NAME: str = "Code Whisperer API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:password@localhost:5432/code_whisperer"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # JWT Settings
    SECRET_KEY: str = "your-super-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # Ollama AI
    OLLAMA_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "deepseek-r1:7b"  # Or codellama, mistral, etc.
    OLLAMA_TIMEOUT: int = 120  # seconds
    
    # Code Execution
    DOCKER_PYTHON_IMAGE: str = "code-whisperer-python-runner:latest"
    DOCKER_NODE_IMAGE: str = "code-whisperer-node-runner:latest"
    CODE_EXECUTION_TIMEOUT: int = 30  # seconds
    
    # Rate Limiting
    RATE_LIMIT_REQUESTS: int = 30
    RATE_LIMIT_WINDOW: int = 60  # seconds
    
    # CORS
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """Cached settings instance."""
    return Settings()


settings = get_settings()
