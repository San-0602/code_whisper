'use client';

import Link from 'next/link';
import { Plus, Folder, Code2, Target, Star, Flame, Clock, MoreHorizontal } from 'lucide-react';

export default function DashboardPage() {
  const projects = [
    { id: '1', name: 'Python Calculator', lang: 'Python', lastEdited: '2 hours ago', progress: 75, icon: '🐍' },
    { id: '2', name: 'React To-Do List', lang: 'TypeScript', lastEdited: '1 day ago', progress: 40, icon: '⚛️' },
    { id: '3', name: 'Data Analysis Script', lang: 'Python', lastEdited: '3 days ago', progress: 90, icon: '📊' },
  ];

  return (
    <div className="container" style={{ padding: '48px 64px', maxWidth: '1200px' }}>
      
      {/* Cover/Header Area */}
      <div style={{ marginBottom: '48px' }}>
         <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Workspace</span>
            <span style={{ color: 'var(--text-tertiary)' }}>/</span>
            <span>Dashboard</span>
         </div>
         <h1 className="text-h1" style={{ fontSize: '40px', marginBottom: '8px' }}>Good evening, Jenith.</h1>
         <p className="text-body" style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
           Ready to continue building? Here's what's happening.
         </p>
      </div>

      {/* Stats - Minimal Cards */}
      <section style={{ marginBottom: '48px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px' 
        }}>
          <StatCard label="Total Projects" value="3" icon={<Folder size={18} />} />
          <StatCard label="Active Challenges" value="12" icon={<Target size={18} />} />
          <StatCard label="XP Gained" value="450" icon={<Star size={18} />} />
          <StatCard label="Day Streak" value="5" icon={<Flame size={18} />} />
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '16px',
          borderBottom: '1px solid var(--border-default)',
          paddingBottom: '8px'
        }}>
          <h2 className="text-h3" style={{ margin: 0 }}>Recent Projects</h2>
          <Link 
            href="/playground" 
            className="btn btn-ghost"
            style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
          >
            <Plus size={14} /> New Project
          </Link>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {/* New Project Card */}
          <Link 
            href="/playground" 
            className="card" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              height: '160px',
              borderStyle: 'dashed',
              backgroundColor: 'transparent',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
             <div style={{ 
               width: '32px', height: '32px', 
               borderRadius: '50%', 
               background: 'var(--bg-secondary)',
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               marginBottom: '12px',
               color: 'var(--text-secondary)'
             }}>
               <Plus size={16} />
             </div>
             <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>Create New Project</span>
          </Link>

          {projects.map((project) => (
            <Link 
              href={`/project/${project.id}`} 
              key={project.id} 
              className="card"
              style={{ 
                padding: '20px', 
                textDecoration: 'none', 
                display: 'flex', 
                flexDirection: 'column',
                height: '160px',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px' }}>{project.icon}</span>
                <button className="btn-ghost" style={{ padding: '4px' }}>
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {project.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <Clock size={12} />
                  <span>Edited {project.lastEdited}</span>
                </div>
              </div>

              <div style={{ marginTop: 'auto' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', color: 'var(--text-tertiary)' }}>
                    <span>{project.lang}</span>
                    <span>{project.progress}%</span>
                 </div>
                 <div style={{ height: '4px', background: 'var(--bg-secondary)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${project.progress}%`, height: '100%', background: 'var(--text-secondary)' }}></div>
                 </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px' }}>
          {icon}
          <span>{label}</span>
       </div>
       <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)' }}>
         {value}
       </div>
    </div>
  );
}
