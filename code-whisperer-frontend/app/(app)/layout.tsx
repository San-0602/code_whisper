'use client';

import { Sidebar } from '@/components/sidebar';
import { SystemHealthWidget } from '@/components/system-health';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar />

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        overflowY: 'auto', 
        backgroundColor: 'var(--bg-primary)', 
        position: 'relative',
        height: '100vh', 
        display: 'flex',
        flexDirection: 'column'
      }}>
        <SystemHealthWidget />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
