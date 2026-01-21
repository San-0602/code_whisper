"""Tests for WebSocket connections."""
import pytest
from fastapi.testclient import TestClient
from app.main import app


def test_websocket_connection():
    """Test WebSocket can connect."""
    client = TestClient(app)
    with client.websocket_connect("/ws/editor/test-session") as ws:
        data = ws.receive_json()
        assert data["event"] == "CONNECTION_ACK"
        assert "session_id" in data["data"]


def test_websocket_code_update():
    """Test sending code update."""
    client = TestClient(app)
    with client.websocket_connect("/ws/editor/test-session") as ws:
        # Receive ack
        ws.receive_json()
        
        # Send code update
        ws.send_json({
            "event": "CODE_UPDATE",
            "data": {"code": "print('hello')", "language": "python"}
        })
        
        # Should not error


def test_websocket_run_code():
    """Test code execution via WebSocket."""
    client = TestClient(app)
    with client.websocket_connect("/ws/editor/test-session") as ws:
        ws.receive_json()  # ack
        
        ws.send_json({
            "event": "RUN_CODE",
            "data": {"code": "print('test')", "language": "python"}
        })
        
        result = ws.receive_json()
        assert result["event"] == "CODE_RESULT"
