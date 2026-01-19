'use client';

interface FixButtonProps {
  onClick: () => void;
}

export default function FixButton({ onClick }: FixButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: '0.75rem',
        padding: '0.5rem 1rem',
        fontSize: '0.8rem',
        fontWeight: 600,
        background: 'hsl(var(--primary)/0.15)',
        color: 'hsl(var(--primary))',
        border: '1px solid hsl(var(--primary)/0.3)',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'all 0.15s',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      ✨ Auto-fix this
    </button>
  );
}
