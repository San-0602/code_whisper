# Code Whisperer - AI-Powered Coding Mentor

An intelligent coding platform powered by AI that provides real-time code analysis, instant explanations, and personalized guidance as you learn and code.

## ✨ Features

- 🤖 **AI Mentor** - Powered by Ollama's Gemma 3 model for intelligent code assistance
- ⚡ **Real-Time Analysis** - Instant feedback as you type
- 💬 **Interactive Chat** - Ask questions and get explanations
- 🎯 **Practice Challenges** - Curated coding problems at every level
- 📊 **Progress Tracking** - Monitor your learning journey
- 🎨 **Modern UI** - Beautiful, responsive interface with glassmorphism and smooth animations

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type-safe JavaScript
- **Monaco Editor** - VS Code-like code editor
- **Lucide Icons** - Beautiful icon set

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite/PostgreSQL** - Database
- **Redis** - Caching layer
- **Ollama** - Local AI inference
- **Gemma 3:1b** - Lightweight AI model

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)
- **Ollama** ([Download here](https://ollama.ai/))
- **Redis** (Optional, for caching)

## 🚀 Setup Instructions

### 1. Install Ollama and Pull the Model

```bash
# Install Ollama from https://ollama.ai/

# Pull the Gemma 3:1b model
ollama pull gemma3:1b

# Verify it's running
ollama list
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd code-whisperer-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env and configure:
# - Database URL
# - Ollama URL (default: http://localhost:11434)
# - Ollama Model (gemma3:1b)

# Run migrations (if needed)
# alembic upgrade head

# Start the backend server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

The backend should now be running at `http://localhost:8000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd code-whisperer

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend should now be running at `http://localhost:3000`

## 🎯 Usage

1. **Start Ollama** - Ensure Ollama is running with the gemma3:1b model
2. **Start Backend** - Run the FastAPI server
3. **Start Frontend** - Launch the Next.js development server
4. **Visit** `http://localhost:3000` in your browser

### Creating Your First Project

1. Click **"Get Started"** or **"New Project"** from the dashboard
2. Choose your programming language (Python, JavaScript, TypeScript, etc.)
3. Select a template or start blank
4. Start coding with AI assistance!

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# App Settings
APP_NAME=Code Whisperer API
DEBUG=true

# Database
DATABASE_URL=sqlite+aiosqlite:///./code_whisperer.db

# Redis (optional)
REDIS_URL=redis://localhost:6379/0

# JWT
SECRET_KEY=your-super-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Ollama
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=gemma3:1b

# CORS
CORS_ORIGINS=["http://localhost:3000"]
```

## 📡 API Endpoints

### Health Checks
- `GET /health` - Overall health status
- `GET /api/v1/chat/health` - Check Ollama availability

### Projects
- `POST /api/v1/projects` - Create new project
- `GET /api/v1/projects` - List projects
- `GET /api/v1/projects/{id}` - Get project details

### AI Chat
- `POST /api/v1/chat` - Send message to AI mentor

### Challenges
- `GET /api/v1/challenges` - List coding challenges
- `POST /api/v1/challenges/{id}/submit` - Submit solution

## 🎨 UI Features

- **Glassmorphism Effects** - Modern frosted glass design
- **Gradient Accents** - Beautiful color gradients
- **Smooth Animations** - Engaging micro-interactions
- **Dark Mode Support** - Eye-friendly dark theme
- **Responsive Design** - Works on all screen sizes

## 🐛 Troubleshooting

### Ollama Not Connecting
```bash
# Check if Ollama is running
ollama list

# Verify the model is available
ollama pull gemma3:1b

# Test API directly
curl http://localhost:11434/api/tags
```

### Backend Issues
```bash
# Check logs for errors
tail -f logs/app.log

# Verify database connection
python -c "from app.core.database import init_db; import asyncio; asyncio.run(init_db())"

# Test Ollama connection
curl http://localhost:8000/api/v1/chat/health
```

### Frontend Issues
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

## 📝 Development

### Running Tests
```bash
# Backend tests
cd code-whisperer-backend
pytest

# Frontend tests
cd code-whisperer
npm test
```

### Building for Production
```bash
# Frontend
npm run build
npm start

# Backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Ollama** - For making local AI inference accessible
- **Google** - For the Gemma model
- **FastAPI** - For the excellent Python framework
- **Next.js** - For the powerful React framework

## 🔗 Links

- [Ollama](https://ollama.ai/)
- [Gemma Model](https://ai.google.dev/gemma)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Built with ❤️ for learners everywhere**
