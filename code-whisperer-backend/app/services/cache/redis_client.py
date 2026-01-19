"""
Redis Client for caching and rate limiting.
"""
import redis.asyncio as redis
from typing import Optional
from loguru import logger

from app.core.config import settings


class RedisClient:
    """Async Redis client wrapper."""
    
    def __init__(self):
        self.client: Optional[redis.Redis] = None
    
    async def connect(self):
        """Establish Redis connection."""
        try:
            self.client = redis.from_url(settings.REDIS_URL, decode_responses=True)
            await self.client.ping()
            logger.info("Redis connected successfully")
        except Exception as e:
            logger.warning(f"Redis connection failed: {e}")
            self.client = None
    
    async def disconnect(self):
        """Close Redis connection."""
        if self.client:
            await self.client.close()
    
    @property
    def available(self) -> bool:
        return self.client is not None
    
    async def check_rate_limit(self, key: str, limit: int = None, window: int = None) -> bool:
        """Check if request is within rate limit. Returns True if allowed."""
        if not self.available:
            return True
        
        limit = limit or settings.RATE_LIMIT_REQUESTS
        window = window or settings.RATE_LIMIT_WINDOW
        
        current = await self.client.incr(key)
        if current == 1:
            await self.client.expire(key, window)
        
        return current <= limit
    
    async def cache_get(self, key: str) -> Optional[str]:
        """Get cached value."""
        if not self.available:
            return None
        return await self.client.get(key)
    
    async def cache_set(self, key: str, value: str, ttl: int = 300):
        """Set cached value with TTL."""
        if self.available:
            await self.client.setex(key, ttl, value)


redis_client = RedisClient()
