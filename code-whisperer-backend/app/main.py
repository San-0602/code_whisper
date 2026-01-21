"""
Code Whisperer Backend - Main Application Entry Point
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
import sys

from app.core.config import settings
from app.core.database import init_db, close_db
from app.api.v1.api import api_router
from app.api.websockets.editor_ws import editor_websocket_endpoint
from app.services.cache.redis_client import redis_client

# Configure logging
logger.remove()
logger.add(sys.stdout, level="DEBUG" if settings.DEBUG else "INFO", format="{time:HH:mm:ss} | {level:<7} | {message}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifecycle manager."""
    # Startup
    logger.info(f"Starting {settings.APP_NAME} v{settings.APP_VERSION}")
    await init_db()
    await redis_client.connect()
    logger.info("Application ready")
    
    yield
    
    # Shutdown
    logger.info("Shutting down...")
    await close_db()
    await redis_client.disconnect()


# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered coding mentor backend with real-time analysis",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include REST API routes
app.include_router(api_router)

# WebSocket endpoint
app.add_api_websocket_route("/ws/editor/{session_id}", editor_websocket_endpoint)


@app.get("/")
async def root():
    return {"message": "Code Whisperer API", "version": settings.APP_VERSION}


@app.get("/health")
async def health():
    return {"status": "healthy", "redis": redis_client.available}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
