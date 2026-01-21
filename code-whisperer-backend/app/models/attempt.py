"""
Attempt database model.
Tracks student progress on challenges.
"""
from datetime import datetime
from typing import Optional
from sqlalchemy import String, Text, DateTime, ForeignKey, Integer, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid

from app.core.database import Base


class Attempt(Base):
    """Challenge attempt/submission model."""
    
    __tablename__ = "attempts"
    
    id: Mapped[str] = mapped_column(
        String(36), 
        primary_key=True, 
        default=lambda: str(uuid.uuid4())
    )
    
    # Challenge reference
    challenge_slug: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    
    # Submission
    code: Mapped[str] = mapped_column(Text, nullable=False)
    language: Mapped[str] = mapped_column(String(50), default="python")
    
    # Results
    is_passed: Mapped[bool] = mapped_column(Boolean, default=False)
    test_results: Mapped[Optional[str]] = mapped_column(Text, nullable=True)  # JSON string
    execution_time_ms: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    memory_usage_kb: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    
    # AI Feedback
    ai_feedback: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    hints_used: Mapped[int] = mapped_column(Integer, default=0)
    
    # XP Earned
    xp_earned: Mapped[int] = mapped_column(Integer, default=0)
    
    # Timestamps
    submitted_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    
    # User relationship
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"))
    user = relationship("User", back_populates="attempts")
    
    def __repr__(self) -> str:
        return f"<Attempt {self.challenge_slug} by {self.user_id}>"
