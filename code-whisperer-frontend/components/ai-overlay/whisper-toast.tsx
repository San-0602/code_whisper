'use client';

import FixButton from './fix-button';

interface WhisperToastProps {
  message: string;
  onFix?: () => void;
}

export default function WhisperToast({ message, onFix }: WhisperToastProps) {
  return (
    <div style={{ 
      position: 'absolute', bottom: '1.5rem', right: '1.5rem', zIndex: 100,
      maxWidth: '350px',
      padding: '1rem 1.25rem',
      background: 'hsl(var(--surface))',
      border: '1px solid hsl(var(--primary)/0.3)',
      borderRadius: 'var(--radius)',
      boxShadow: '0 4px 30px hsl(var(--primary)/0.15)',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.25rem' }}>💡</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem', fontSize: '0.9rem' }}>AI Tip</div>
          <p style={{ fontSize: '0.85rem', color: 'hsl(var(--foreground)/0.7)', lineHeight: 1.5 }}>{message}</p>
          {onFix && <FixButton onClick={onFix} />}
        </div>
      </div>
    </div>
  );
}
