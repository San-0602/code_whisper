import Link from 'next/link';

interface ProjectCardProps {
  id: string;
  name: string;
  language: string;
  lastEdited: string;
}

export default function ProjectCard({ id, name, language, lastEdited }: ProjectCardProps) {
  return (
    <Link href={`/project/${id}`} className="glass-panel" style={{ 
      padding: '1.5rem', borderRadius: '1rem', textDecoration: 'none', 
      transition: 'transform 0.2s, border-color 0.2s', display: 'block',
      cursor: 'pointer'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
        <div style={{ 
          width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          background: 'hsl(var(--surface))', borderRadius: '0.5rem', border: '1px solid hsl(var(--surface-border))' 
        }}>
          📁
        </div>
        <span style={{ 
          padding: '0.25rem 0.5rem', borderRadius: '1rem', 
          background: 'hsl(var(--surface))', fontSize: '0.75rem', 
          color: 'hsl(var(--foreground)/0.6)', height: 'fit-content' 
        }}>
          {language}
        </span>
      </div>
      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{name}</h3>
        <div style={{ fontSize: '0.85rem', color: 'hsl(var(--foreground) / 0.5)' }}>
          Edited {lastEdited}
        </div>
      </div>
    </Link>
  );
}
