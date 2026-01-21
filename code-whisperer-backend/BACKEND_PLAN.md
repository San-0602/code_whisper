# Backend Roadmap: Next Level Features

To support a professional, Notion-like IDE, the backend needs to evolve from simple "one-file" logic to a robust file system and execution engine.

## 1. 📂 Persistent File System
**Goal:** Allow projects to have multiple files, folders, and assets.

- **Schema Update:**
  - Create a `files` table linked to `projects`.
  - Columns: `id`, `project_id`, `path` (e.g., "src/components/Button.tsx"), `content`, `language`.
- **API Endpoints:**
  - `GET /api/v1/projects/{id}/files` - List file tree.
  - `POST /api/v1/projects/{id}/files` - Create file/folder.
  - `PUT /api/v1/projects/{id}/files/{path}` - Update content.
  - `DELETE /api/v1/projects/{id}/files/{path}` - Delete file.

## 2. ⚡ Code Execution Engine (Sandboxed)
**Goal:** Actually *run* the user's code safely, not just analyze it.

- **Docker Integration:**
  - Leverage the `docker-compose` setup referenced in config.
  - Create fleeting containers for Python/Node.js execution.
- **WebSocket Streaming:**
  - Stream stdout/stderr in real-time to the frontend terminal.
  - Handle input (stdin) via WebSocket.

## 3. 🧠 Enhanced AI with Context Awareness
**Goal:** The AI should know about *all* files in the project, not just the currently open one.

- **Context Window Management:**
  - When chatting, retrieve relevant file snippets based on the user's query (RAG - Retrieval Augmented Generation).
  - Use `pgvector` or simple keyword matching to find relevant code parts.
- **Structured Output:**
  - Force Ollama to return JSON for specific tasks (like "Fix this bug") to automatically apply diffs to the code.

## 4. 🔄 Real-time Collaboration (WebSocket)
**Goal:** Allow the frontend to reflect changes instantly, enabling "multiplayer" feel (even if single player, it's snappier).

- **Operational Transform (OT) / CRDT:**
  - Use Y.js binding in Python or just simple "last write wins" for MVP.
  - Broadcast file updates via WebSocket `ws://.../project/{id}`.

## 5. 🛠️ Language Server Protocol (LSP) Proxy
**Goal:** Get red squiggles, autocomplete, and "Go to Definition" working really well.

- **LSP Wrapper:**
  - Run `pyright` (Python) or `tsserver` (JS/TS) on the backend.
  - Proxy JSON-RPC messages from Monaco Editor (frontend) to the LSP process (backend) via WebSocket.
