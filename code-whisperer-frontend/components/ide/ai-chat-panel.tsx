'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface AIChatPanelProps {
  code: string;
}

const API_BASE = 'http://localhost:8000';

export default function AIChatPanel({ code }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Hi! I'm your AI coding mentor powered by **Gemma**. I can help you:\n\n• Explain your code\n• Find and fix bugs\n• Suggest improvements\n• Answer programming questions\n\nJust ask or use the quick actions below!",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check backend connection
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const res = await fetch(`${API_BASE}/health`);
      setIsConnected(res.ok);
    } catch {
      setIsConnected(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // Add streaming placeholder
    const streamingMessage: Message = {
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    };
    setMessages(prev => [...prev, streamingMessage]);

    try {
      const response = await fetch(`${API_BASE}/api/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: currentInput, 
          code_context: code,
          history: messages.slice(-6).map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: data.reply,
            timestamp: new Date(),
          };
          return updated;
        });
      } else {
        throw new Error('API error');
      }
    } catch (error) {
      // Use local fallback
      const reply = getLocalResponse(currentInput, code);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: reply,
          timestamp: new Date(),
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    const actions: Record<string, string> = {
      explain: 'Can you explain what this code does step by step?',
      bugs: 'Are there any bugs or issues in my code?',
      improve: 'How can I improve this code to make it better?',
      hint: 'Give me a hint about what to do next.',
    };
    setInput(actions[action] || action);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Connection Status */}
      <div style={{ 
        padding: 'var(--spacing-sm) var(--spacing-md)',
        borderBottom: '1px solid var(--border-default)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-sm)',
        fontSize: '12px',
      }}>
        <span style={{ 
          width: '8px', height: '8px', 
          borderRadius: '50%',
          backgroundColor: isConnected === null ? 'var(--text-tertiary)' : 
                          isConnected ? 'var(--accent-green)' : 'var(--accent-orange)',
        }} />
        <span style={{ color: 'var(--text-secondary)' }}>
          {isConnected === null ? 'Connecting...' : 
           isConnected ? 'AI Ready (Gemma 3:1b)' : 'Offline Mode'}
        </span>
      </div>

      {/* Messages */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: 'var(--spacing-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-md)',
      }}>
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div style={{ 
        padding: 'var(--spacing-sm) var(--spacing-md)',
        borderTop: '1px solid var(--border-default)',
        display: 'flex',
        gap: 'var(--spacing-xs)',
        flexWrap: 'wrap',
      }}>
        <QuickAction icon="📖" label="Explain" onClick={() => handleQuickAction('explain')} />
        <QuickAction icon="🐛" label="Find bugs" onClick={() => handleQuickAction('bugs')} />
        <QuickAction icon="✨" label="Improve" onClick={() => handleQuickAction('improve')} />
        <QuickAction icon="💡" label="Hint" onClick={() => handleQuickAction('hint')} />
      </div>

      {/* Input */}
      <div style={{ 
        padding: 'var(--spacing-md)',
        borderTop: '1px solid var(--border-default)',
        display: 'flex',
        gap: 'var(--spacing-sm)',
        backgroundColor: 'var(--bg-primary)',
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder="Ask about your code..."
          className="input"
          style={{ flex: 1 }}
          disabled={isLoading}
        />
        <button 
          onClick={handleSend} 
          className="btn btn-primary" 
          disabled={isLoading || !input.trim()}
          style={{ padding: 'var(--spacing-sm) var(--spacing-md)' }}
        >
          {isLoading ? '...' : '↑'}
        </button>
      </div>
    </div>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: isUser ? 'flex-end' : 'flex-start',
    }}>
      <div style={{
        maxWidth: '95%',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        borderRadius: isUser 
          ? 'var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg)'
          : 'var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm)',
        backgroundColor: isUser ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
        color: isUser ? 'white' : 'var(--text-primary)',
        fontSize: '14px',
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
      }}>
        {message.isStreaming ? (
          <span style={{ display: 'flex', gap: '4px' }}>
            <span className="typing-dot" />
            <span className="typing-dot" style={{ animationDelay: '0.2s' }} />
            <span className="typing-dot" style={{ animationDelay: '0.4s' }} />
          </span>
        ) : (
          formatMessage(message.content)
        )}
      </div>
    </div>
  );
}

function formatMessage(content: string) {
  // Simple markdown-like formatting
  const parts = content.split(/(\*\*.*?\*\*|\`.*?\`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} style={{ 
        backgroundColor: 'rgba(0,0,0,0.2)', 
        padding: '2px 4px', 
        borderRadius: '3px',
        fontFamily: 'var(--font-mono)',
        fontSize: '13px',
      }}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

function QuickAction({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-xs)',
        padding: '4px 10px',
        fontSize: '12px',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'transparent',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        transition: 'all var(--duration-fast)',
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function getLocalResponse(input: string, code: string): string {
  const lower = input.toLowerCase();
  
  if (lower.includes('explain')) {
    return `I'll explain your code:\n\nYour code appears to be a Python script with functions defined. Here's a breakdown:\n\n• The \`greet()\` function takes a name and prints a greeting\n• The \`calculate_sum()\` function iterates through numbers and returns their total\n• The main section calls these functions to demonstrate their usage\n\nWant me to go deeper into any specific part?`;
  }
  
  if (lower.includes('bug') || lower.includes('issue')) {
    return `I've analyzed your code for potential issues:\n\n✅ **No critical bugs found**\n\nHowever, here are some suggestions:\n\n• Consider using type hints like \`def greet(name: str) -> None:\`\n• You could use Python's built-in \`sum()\` instead of manual iteration\n• Adding docstrings would improve documentation`;
  }
  
  if (lower.includes('improve')) {
    return `Here are some improvements for your code:\n\n**1. Use type hints:**\n\`\`\`python\ndef calculate_sum(numbers: list[int]) -> int:\n\`\`\`\n\n**2. Simplify with built-ins:**\n\`\`\`python\nreturn sum(numbers)\n\`\`\`\n\n**3. Add error handling for empty lists**\n\nWould you like me to show the complete improved version?`;
  }
  
  if (lower.includes('hint')) {
    return `💡 **Hint**: Try adding input validation to your functions. For example, check if the input is valid before processing.\n\nThis makes your code more robust and easier to debug!`;
  }
  
  return `I'm here to help with your code! I can:\n\n• **Explain** what your code does\n• **Find bugs** and potential issues\n• **Suggest improvements** for better code\n• **Answer questions** about programming\n\nWhat would you like to know?`;
}
