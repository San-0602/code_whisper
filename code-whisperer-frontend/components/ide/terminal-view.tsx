'use client';

interface TerminalViewProps {
  output: string[];
}

export default function TerminalView({ output }: TerminalViewProps) {
  return (
    <div style={{ 
      height: '100%',
      backgroundColor: 'var(--bg-tertiary)',
      padding: 'var(--spacing-md)',
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      lineHeight: 1.6,
      overflowY: 'auto',
    }}>
      <div style={{ 
        marginBottom: 'var(--spacing-sm)', 
        display: 'flex', 
        alignItems: 'center', 
        gap: 'var(--spacing-sm)',
      }}>
        <span style={{ 
          width: '8px', height: '8px', 
          borderRadius: '50%', 
          backgroundColor: 'var(--accent-green)' 
        }} />
        <span className="text-caption">Terminal</span>
      </div>
      
      {output.map((line, i) => (
        <div 
          key={i} 
          style={{ 
            color: line.startsWith('$') ? 'var(--accent-blue)' : 
                   line.includes('error') ? 'var(--accent-red)' : 
                   'var(--text-secondary)',
            marginBottom: '2px',
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}
