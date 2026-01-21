#!/usr/bin/env python3
"""
Simple system check for Code Whisperer - No dependencies required.
"""
import sys
import json
import urllib.request
import urllib.error
import time

def check_url(name: str, url: str, timeout: int = 5):
    """Check a URL using standard urllib."""
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=timeout) as response:
            status = response.getcode()
            if status == 200:
                body = response.read().decode('utf-8')
                return True, "✓ Online", body, status
            return False, f"✗ Status {status}", "", status
    except urllib.error.URLError as e:
        return False, f"✗ {str(e.reason)}", "", 0
    except Exception as e:
        return False, f"✗ {str(e)}", "", 0

def print_result(name, success, msg):
    print(f"{name:<20} {msg}")

def main():
    print("\n🔮 Code Whisperer - Quick System Check\n")
    print("=" * 50)
    
    # 1. Backend Check
    print("\n📡 Backend Services...")
    success, msg, _, _ = check_url("API Root", "http://localhost:8000")
    print(f"   {msg}")
    
    if success:
        # Health Check
        success, msg, body, _ = check_url("Health Endpoint", "http://localhost:8000/health")
        if success:
            try:
                data = json.loads(body)
                redis = "✓" if data.get("redis") else "✗"
                print(f"   ✓ Health Check (Redis: {redis})")
            except:
                print("   ? Invalid JSON response")
        
        # Ollama Check
        print("\n🤖 AI Services...")
        success, msg, body, _ = check_url("Ollama Integration", "http://localhost:8000/api/v1/chat/health")
        if success:
            try:
                data = json.loads(body)
                if data.get("ollama_available"):
                    model = data.get("model", "unknown")
                    print(f"   ✓ Backend connected to Ollama")
                    print(f"   ✓ Model: {model}")
                else:
                    print(f"   ✗ Backend can't reach Ollama")
            except:
                print("   ? Invalid JSON response")
        else:
            print(f"   {msg}")

    else:
        print("\n⚠️  Backend not running at http://localhost:8000")
    
    # 2. Frontend Check
    print("\n🌐 Frontend...")
    success, msg, _, _ = check_url("Web Interface", "http://localhost:3000")
    print(f"   {msg}")
    
    print("\n" + "=" * 50)
    print("\n✨ Check complete!\n")

if __name__ == "__main__":
    main()
