"""
Project database model.
Represents a student's coding project/workspace.
"""
from datetime import datetime
from typing import Optional
from sqlalchemy import String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid

from app.core.database import Base


class Project(Base):
    """User project/workspace model."""
    
    __tablename__ = "projects"
    
    id: Mapped[str] = mapped_column(
        String(36), 
        primary_key=True, 
        default=lambda: str(uuid.uuid4())
    )
    
    # Basic Info
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    language: Mapped[str] = mapped_column(String(50), default="python")
    
    # Code Storage
    code: Mapped[str] = mapped_column(Text, default="")
    files: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)  # Multi-file projects
    
    # Metadata
    is_public: Mapped[bool] = mapped_column(default=False)
    fork_of: Mapped[Optional[str]] = mapped_column(String(36), nullable=True)
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Owner relationship
    owner_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"))
    owner = relationship("User", back_populates="projects")
    
    def __repr__(self) -> str:
        return f"<Project {self.name}>"
