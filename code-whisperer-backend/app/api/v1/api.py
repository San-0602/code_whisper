"""
API Router aggregator.
"""
from fastapi import APIRouter

from app.api.v1.endpoints import auth, projects, challenges, chat

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth.router)
api_router.include_router(projects.router)
api_router.include_router(challenges.router)
api_router.include_router(chat.router)
