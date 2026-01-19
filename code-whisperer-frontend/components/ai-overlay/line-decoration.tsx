'use client';

interface LineDecorationProps {
  lineNumber: number;
  severity: 'error' | 'warning' | 'info';
  message: string;
}

export default function LineDecoration({ lineNumber, severity, message }: LineDecorationProps) {
  const colors = {
    error: { bg: 'hsl(0 85% 60% / 0.1)', border: 'hsl(0 85% 60%)', icon: '❌' },
    warning: { bg: 'hsl(40 90% 60% / 0.1)', border: 'hsl(40 90% 60%)', icon: '⚠️' },
    info: { bg: 'hsl(var(--primary) / 0.1)', border: 'hsl(var(--primary))', icon: '💡' },
  };

  const style = colors[severity];

  return (
    <div style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: `${(lineNumber - 1) * 20}px`, // Approximate line height
      background: style.bg,
      borderLeft: `3px solid ${style.border}`,
      padding: '0.25rem 0.5rem',
      fontSize: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      pointerEvents: 'none',
    }}>
      <span>{style.icon}</span>
      <span style={{ color: style.border }}>{message}</span>
    </div>
  );
}
