"""
Authentication endpoints.
"""
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel, EmailStr

from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token
from app.models import User

router = APIRouter(prefix="/auth", tags=["Authentication"])


class RegisterRequest(BaseModel):
    email: EmailStr
    username: str
    password: str
    full_name: str = ""


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: str
    email: str
    username: str
    full_name: str | None


@router.post("/register", response_model=UserResponse)
async def register(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    """Register a new user."""
    # Check existing
    result = await db.execute(select(User).where((User.email == data.email) | (User.username == data.username)))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email or username already registered")
    
    user = User(
        email=data.email,
        username=data.username,
        hashed_password=get_password_hash(data.password),
        full_name=data.full_name
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    
    return UserResponse(id=user.id, email=user.email, username=user.username, full_name=user.full_name)


@router.post("/login", response_model=TokenResponse)
async def login(form: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    """Login and get access token."""
    result = await db.execute(select(User).where(User.email == form.username))
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    user.last_login = datetime.utcnow()
    await db.commit()
    
    token = create_access_token(data={"sub": user.id})
    return TokenResponse(access_token=token)
