'use client';

interface CodeError {
  line: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

interface ErrorPanelProps {
  errors: CodeError[];
  hints: string[];
}

export default function ErrorPanel({ errors, hints }: ErrorPanelProps) {
  const errorCount = errors.filter(e => e.severity === 'error').length;
  const warningCount = errors.filter(e => e.severity === 'warning').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Summary */}
      <div style={{ 
        padding: 'var(--spacing-md)',
        borderBottom: '1px solid var(--border-default)',
        display: 'flex',
        gap: 'var(--spacing-md)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
          <span style={{ 
            width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: errorCount > 0 ? 'var(--accent-red)' : 'var(--accent-green)',
          }} />
          <span className="text-small">{errorCount} errors</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
          <span style={{ 
            width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: warningCount > 0 ? 'var(--accent-orange)' : 'var(--accent-green)',
          }} />
          <span className="text-small">{warningCount} warnings</span>
        </div>
      </div>

      {/* Error List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--spacing-md)' }}>
        {errors.length === 0 && hints.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: 'var(--spacing-2xl)',
            color: 'var(--text-tertiary)',
          }}>
            <div style={{ fontSize: '32px', marginBottom: 'var(--spacing-md)' }}>✅</div>
            <p className="text-small">No issues found!</p>
            <p className="text-caption" style={{ marginTop: 'var(--spacing-xs)' }}>
              Your code is looking good.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            {errors.map((error, i) => (
              <ErrorItem key={i} error={error} />
            ))}
            
            {hints.length > 0 && (
              <>
                <div className="text-caption" style={{ marginTop: 'var(--spacing-md)' }}>
                  💡 Suggestions
                </div>
                {hints.map((hint, i) => (
                  <HintItem key={i} hint={hint} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ErrorItem({ error }: { error: CodeError }) {
  const getIcon = () => {
    switch (error.severity) {
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  const getColor = () => {
    switch (error.severity) {
      case 'error': return 'var(--accent-red)';
      case 'warning': return 'var(--accent-orange)';
      default: return 'var(--accent-blue)';
    }
  };

  return (
    <div 
      className="card"
      style={{ 
        padding: 'var(--spacing-sm) var(--spacing-md)',
        borderLeft: `3px solid ${getColor()}`,
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-sm)' }}>
        <span>{getIcon()}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', lineHeight: 1.5 }}>{error.message}</div>
          <div className="text-caption" style={{ marginTop: 'var(--spacing-xs)' }}>
            Line {error.line}
          </div>
        </div>
      </div>
    </div>
  );
}

function HintItem({ hint }: { hint: string }) {
  return (
    <div 
      style={{ 
        padding: 'var(--spacing-sm) var(--spacing-md)',
        backgroundColor: 'rgba(35, 131, 226, 0.1)',
        borderRadius: 'var(--radius-md)',
        fontSize: '13px',
        color: 'var(--text-secondary)',
        lineHeight: 1.5,
      }}
    >
      {hint}
    </div>
  );
}
