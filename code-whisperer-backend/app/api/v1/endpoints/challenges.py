"""
Challenges endpoints.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import Optional

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models import Attempt

router = APIRouter(prefix="/challenges", tags=["Challenges"])

# Static challenge data (would be in DB in production)
CHALLENGES = {
    "intro-python": {"title": "Intro to Python: Variables", "difficulty": "Beginner", "xp": 20},
    "fizzbuzz": {"title": "FizzBuzz Optimization", "difficulty": "Easy", "xp": 50},
    "two-sum": {"title": "Two Sum Problem", "difficulty": "Medium", "xp": 100},
    "binary-tree": {"title": "Invert Binary Tree", "difficulty": "Hard", "xp": 300},
}


class SubmitRequest(BaseModel):
    code: str
    language: str = "python"


class ChallengeResponse(BaseModel):
    slug: str
    title: str
    difficulty: str
    xp: int


class SubmitResponse(BaseModel):
    passed: bool
    xp_earned: int
    feedback: str


@router.get("/", response_model=list[ChallengeResponse])
async def list_challenges():
    """List all available challenges."""
    return [ChallengeResponse(slug=k, **v) for k, v in CHALLENGES.items()]


@router.get("/{slug}", response_model=ChallengeResponse)
async def get_challenge(slug: str):
    """Get a specific challenge."""
    if slug not in CHALLENGES:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return ChallengeResponse(slug=slug, **CHALLENGES[slug])


@router.post("/{slug}/submit", response_model=SubmitResponse)
async def submit_solution(slug: str, data: SubmitRequest, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Submit a solution for a challenge."""
    if slug not in CHALLENGES:
        raise HTTPException(status_code=404, detail="Challenge not found")
    
    # Mock validation - in production, run tests
    passed = len(data.code) > 10
    xp = CHALLENGES[slug]["xp"] if passed else 0
    
    attempt = Attempt(
        challenge_slug=slug,
        code=data.code,
        language=data.language,
        is_passed=passed,
        xp_earned=xp,
        user_id=user_id
    )
    db.add(attempt)
    await db.commit()
    
    return SubmitResponse(
        passed=passed,
        xp_earned=xp,
        feedback="Great job!" if passed else "Keep trying!"
    )


@router.get("/{slug}/attempts")
async def get_attempts(slug: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    """Get user's attempts for a challenge."""
    result = await db.execute(
        select(Attempt).where(Attempt.challenge_slug == slug, Attempt.user_id == user_id)
    )
    return result.scalars().all()
