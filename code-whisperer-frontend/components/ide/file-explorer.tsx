'use client';

export default function FileExplorer() {
  const files = [
    { name: 'main.py', icon: '🐍', active: true },
    { name: 'utils.py', icon: '🐍', active: false },
    { name: 'README.md', icon: '📄', active: false },
    { name: 'requirements.txt', icon: '📋', active: false },
  ];

  return (
    <div style={{ 
      width: '180px', 
      backgroundColor: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-default)',
      padding: 'var(--spacing-sm)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ 
        padding: 'var(--spacing-xs) var(--spacing-sm)',
        marginBottom: 'var(--spacing-sm)',
      }}>
        <span className="text-caption">Files</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {files.map((file) => (
          <div 
            key={file.name} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--spacing-sm)', 
              padding: '6px 8px',
              cursor: 'pointer',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: file.active ? 'var(--bg-tertiary)' : 'transparent',
              color: file.active ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontSize: '13px',
              transition: 'background var(--duration-fast)',
            }}
          >
            <span style={{ fontSize: '14px' }}>{file.icon}</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {file.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
