'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Play, 
  Target, 
  Folder 
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className="sidebar"
      style={{
        width: isCollapsed ? '60px' : '240px',
        transition: 'width 0.2s ease',
        padding: isCollapsed ? '12px 8px' : '16px 12px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--border-default)',
        background: 'var(--bg-secondary)',
        height: '100vh',
      }}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '-12px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: '1px solid var(--border-default)',
          background: 'var(--bg-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          zIndex: 10,
          boxShadow: 'var(--shadow-sm)',
        }}
        className="hover-scale"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo Area */}
      <div style={{ 
        marginBottom: '24px', 
        paddingLeft: isCollapsed ? '4px' : '8px',
        display: 'flex',
        alignItems: 'center',
        height: '32px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}>
        <div style={{ 
          minWidth: '32px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '20px' 
        }}>
          🔮
        </div>
        {!isCollapsed && (
          <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)', marginLeft: '8px' }}>
            Code Whisperer
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <NavItem 
          href="/dashboard" 
          icon={<LayoutDashboard size={18} />} 
          label="Dashboard" 
          collapsed={isCollapsed}
          active={pathname === '/dashboard'} 
        />
        <NavItem 
          href="/playground" 
          icon={<Play size={18} />} 
          label="Playground" 
          collapsed={isCollapsed}
          active={pathname === '/playground'} 
        />
        <NavItem 
          href="/challenges" 
          icon={<Target size={18} />} 
          label="Challenges" 
          collapsed={isCollapsed}
          active={pathname?.startsWith('/challenges')} 
        />
      </nav>

      {/* Recent Projects (Only show if not collapsed) */}
      {!isCollapsed && (
        <div style={{ marginTop: '32px', paddingLeft: '8px' }}>
          <div className="text-small" style={{ marginBottom: '8px', fontWeight: 500 }}>
            RECENT FILES
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <RecentItem name="Python Calculator" />
            <RecentItem name="React To-Do List" />
          </div>
        </div>
      )}

      {/* User Logic (Bottom) */}
      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-default)', paddingTop: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px', cursor: 'pointer' }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            borderRadius: '4px', 
            background: 'var(--accent-blue)', 
            color: 'white', 
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            flexShrink: 0
          }}>
            G
          </div>
          {!isCollapsed && (
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>Guest User</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

function NavItem({ href, icon, label, active, collapsed }: { href: string; icon: React.ReactNode; label: string; active?: boolean; collapsed: boolean }) {
  return (
    <Link 
      href={href} 
      className={`sidebar-item ${active ? 'active' : ''}`}
      style={{
        justifyContent: collapsed ? 'center' : 'flex-start',
        padding: collapsed ? '8px 0' : '6px 10px',
      }}
      title={collapsed ? label : undefined}
    >
      <div style={{ color: active ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
        {icon}
      </div>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

function RecentItem({ name }: { name: string }) {
  return (
    <div className="sidebar-item" style={{ fontSize: '13px', padding: '4px 8px' }}>
      <Folder size={14} style={{ flexShrink: 0 }} />
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
    </div>
  );
}
