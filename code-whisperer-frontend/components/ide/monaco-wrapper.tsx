'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface CodeError {
  line: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

interface MonacoWrapperProps {
  value: string;
  onChange: (value: string | undefined) => void;
  onCursorChange: (pos: { line: number; column: number }) => void;
  errors?: CodeError[];
}

export default function MonacoWrapper({ value, onChange, onCursorChange, errors = [] }: MonacoWrapperProps) {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current && monacoRef.current && errors) {
      const model = editorRef.current.getModel();
      if (model) {
        const markers = errors.map(error => ({
          startLineNumber: error.line,
          startColumn: 1,
          endLineNumber: error.line,
          endColumn: 1000,
          message: error.message,
          severity: error.severity === 'error' 
            ? monacoRef.current.MarkerSeverity.Error 
            : error.severity === 'warning'
            ? monacoRef.current.MarkerSeverity.Warning
            : monacoRef.current.MarkerSeverity.Info,
        }));
        monacoRef.current.editor.setModelMarkers(model, 'code-whisperer', markers);
      }
    }
  }, [errors]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Editor
        height="100%"
        defaultLanguage="python"
        theme="vs-dark"
        value={value}
        onChange={onChange}
        onMount={(editor, monaco) => {
          editorRef.current = editor;
          monacoRef.current = monaco;
          
          editor.onDidChangeCursorPosition((e) => {
            onCursorChange({ line: e.position.lineNumber, column: e.position.column });
          });

          // Custom theme matching design system
          monaco.editor.defineTheme('code-whisperer', {
            base: 'vs-dark',
            inherit: true,
            rules: [
              { token: 'comment', foreground: '7A7A7A', fontStyle: 'italic' },
              { token: 'keyword', foreground: '2383E2' },
              { token: 'string', foreground: '0F7B6C' },
              { token: 'number', foreground: 'D9730D' },
              { token: 'function', foreground: '6940A5' },
            ],
            colors: {
              'editor.background': '#191919',
              'editor.foreground': '#FFFFFF',
              'editor.lineHighlightBackground': '#202020',
              'editor.selectionBackground': '#373737',
              'editorCursor.foreground': '#2383E2',
              'editorLineNumber.foreground': '#5A5A5A',
              'editorLineNumber.activeForeground': '#B4B4B4',
            },
          });
          
          monaco.editor.setTheme('code-whisperer');
        }}
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontLigatures: true,
          minimap: { enabled: false },
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          wordWrap: 'on',
          lineNumbers: 'on',
          renderLineHighlight: 'line',
          automaticLayout: true,
          bracketPairColorization: { enabled: true },
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </div>
  );
}
