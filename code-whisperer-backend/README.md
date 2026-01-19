# Code Whisperer Backend

AI-powered coding mentor backend with real-time analysis using Ollama.

## Features

- 🔐 JWT Authentication
- 📁 Project CRUD operations
- 🎯 Challenge system with progress tracking
- ⚡ Real-time WebSocket code analysis
- 🤖 Ollama AI integration for code mentoring
- 🐳 Docker sandbox for safe code execution
- 🔄 Redis caching and rate limiting

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Start with Docker Compose
docker-compose up -d

# Or run locally
uvicorn app.main:app --reload
```

## API Endpoints

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get token
- `GET /api/v1/projects` - List user projects
- `POST /api/v1/projects` - Create project
- `GET /api/v1/challenges` - List challenges
- `POST /api/v1/challenges/{slug}/submit` - Submit solution

## WebSocket

Connect to `/ws/editor/{session_id}` for real-time features.

Events:
- `CODE_UPDATE` - Send code for analysis
- `RUN_CODE` - Execute code
- `AI_STREAM_CHUNK` - Receive AI response chunks
