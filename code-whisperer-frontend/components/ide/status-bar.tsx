'use client';

interface StatusBarProps {
  line: number;
  column: number;
  isAnalyzing: boolean;
  language?: string;
}

export default function StatusBar({ line, column, isAnalyzing, language = 'Python' }: StatusBarProps) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: 'var(--spacing-xs) var(--spacing-lg)', 
      backgroundColor: 'var(--bg-tertiary)',
      borderTop: '1px solid var(--border-default)',
      fontSize: '12px',
      color: 'var(--text-secondary)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
          🐍 {language}
        </span>
        {isAnalyzing && (
          <span style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--spacing-xs)',
            color: 'var(--accent-blue)',
          }}>
            <span style={{ 
              width: '6px', height: '6px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--accent-blue)',
              animation: 'pulse 1s infinite',
            }} />
            Analyzing...
          </span>
        )}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
        <span>Ln {line}, Col {column}</span>
        <span>UTF-8</span>
        <span>Spaces: 4</span>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
