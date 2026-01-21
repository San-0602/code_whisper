'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import MonacoWrapper from './monaco-wrapper';
import TerminalView from './terminal-view';
import StatusBar from './status-bar';
import FileExplorer from './file-explorer';
import AIChatPanel from './ai-chat-panel';
import ErrorPanel from './error-panel';
import { useCodeWatcher } from '@/hooks/use-code-watcher';

interface WorkspaceProps {
  projectId: string;
}

const defaultCode = `# Welcome to Code Whisperer!
# Start typing and the AI will guide you.

def greet(name):
    """Say hello to someone."""
    print(f"Hello, {name}!")

def calculate_sum(numbers):
    """Calculate sum of a list."""
    total = 0
    for num in numbers:
        total += num
    return total

# Try calling the functions
greet("World")
result = calculate_sum([1, 2, 3, 4, 5])
print(f"Sum: {result}")
`;

export default function Workspace({ projectId }: WorkspaceProps) {
  const [code, setCode] = useState(defaultCode);
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['$ Ready to run your code...']);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [activePanel, setActivePanel] = useState<'chat' | 'errors' | null>('chat');
  const [isSaved, setIsSaved] = useState(true);

  const { analysis, isAnalyzing } = useCodeWatcher(code);

  const handleCodeChange = useCallback((value: string | undefined) => {
    setCode(value || '');
    setIsSaved(false);
  }, []);

  const handleRunCode = useCallback(() => {
    setTerminalOutput(prev => [
      ...prev, 
      `$ python main.py`,
      `Hello, World!`,
      `Sum: 15`,
      `$ Process finished with exit code 0`
    ]);
  }, []);

  const handleSave = useCallback(() => {
    setIsSaved(true);
    // In production, save to backend
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Top Toolbar */}
      <div style={{ 
        padding: 'var(--spacing-sm) var(--spacing-lg)', 
        borderBottom: '1px solid var(--border-default)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-secondary)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>📁 {projectId}</span>
          <span style={{ color: 'var(--text-tertiary)' }}>/</span>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>main.py</span>
          {!isSaved && <span style={{ color: 'var(--accent-orange)', fontSize: '12px' }}>• Unsaved</span>}
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
          <button onClick={handleSave} className="btn btn-ghost btn-sm">
            💾 Save
          </button>
          <button onClick={handleRunCode} className="btn btn-primary btn-sm">
            ▶ Run
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* File Explorer */}
        <FileExplorer />

        {/* Editor Section */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Editor */}
          <div style={{ flex: 2, position: 'relative', minHeight: '300px' }}>
            <MonacoWrapper 
              value={code} 
              onChange={handleCodeChange} 
              onCursorChange={setCursorPosition}
              errors={analysis.errors}
            />
          </div>
          
          {/* Terminal */}
          <div style={{ height: '180px', borderTop: '1px solid var(--border-default)' }}>
            <TerminalView output={terminalOutput} />
          </div>
        </div>

        {/* Right Panel - AI Chat / Errors */}
        <div style={{ 
          width: '340px', 
          borderLeft: '1px solid var(--border-default)', 
          display: 'flex', 
          flexDirection: 'column',
          backgroundColor: 'var(--bg-secondary)',
        }}>
          {/* Panel Tabs */}
          <div style={{ 
            display: 'flex', 
            borderBottom: '1px solid var(--border-default)',
          }}>
            <PanelTab 
              label="💬 AI Chat" 
              active={activePanel === 'chat'} 
              onClick={() => setActivePanel('chat')} 
            />
            <PanelTab 
              label={`⚠️ Errors (${analysis.errors.length})`} 
              active={activePanel === 'errors'} 
              onClick={() => setActivePanel('errors')} 
              hasIssues={analysis.errors.length > 0}
            />
          </div>

          {/* Panel Content */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {activePanel === 'chat' && <AIChatPanel code={code} />}
            {activePanel === 'errors' && <ErrorPanel errors={analysis.errors} hints={analysis.hints} />}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar 
        line={cursorPosition.line} 
        column={cursorPosition.column} 
        isAnalyzing={isAnalyzing}
        language="Python"
      />
    </div>
  );
}

function PanelTab({ label, active, onClick, hasIssues }: { label: string; active: boolean; onClick: () => void; hasIssues?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: 'var(--spacing-md)',
        fontSize: '13px',
        fontWeight: 500,
        border: 'none',
        backgroundColor: active ? 'var(--bg-primary)' : 'transparent',
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
        cursor: 'pointer',
        borderBottom: active ? '2px solid var(--accent-blue)' : '2px solid transparent',
        transition: 'all var(--duration-fast)',
      }}
    >
      {label}
    </button>
  );
}
