'use client';

import { useEffect, useState } from 'react';
import { Activity, Database, Zap, AlertCircle, CheckCircle, Circle } from 'lucide-react';

interface SystemStatus {
  backend: 'online' | 'offline' | 'checking';
  ollama: 'online' | 'offline' | 'checking';
  redis: 'online' | 'offline' | 'checking';
  model: string;
}

export function SystemHealthWidget() {
  const [status, setStatus] = useState<SystemStatus>({
    backend: 'checking',
    ollama: 'checking',
    redis: 'checking',
    model: 'gemma3:1b',
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        // Check backend health
        const healthRes = await fetch('http://localhost:8000/health');
        if (healthRes.ok) {
          const healthData = await healthRes.json();
          setStatus(prev => ({
            ...prev,
            backend: 'online',
            redis: healthData.redis ? 'online' : 'offline',
          }));

          // Check Ollama specifically
          try {
            const ollamaRes = await fetch('http://localhost:8000/api/v1/chat/health');
            if (ollamaRes.ok) {
              const ollamaData = await ollamaRes.json();
              setStatus(prev => ({
                ...prev,
                ollama: ollamaData.ollama_available ? 'online' : 'offline',
                model: ollamaData.model || 'gemma3:1b',
              }));
            } else {
              setStatus(prev => ({ ...prev, ollama: 'offline' }));
            }
          } catch {
            setStatus(prev => ({ ...prev, ollama: 'offline' }));
          }
        } else {
          setStatus({
            backend: 'offline',
            ollama: 'offline',
            redis: 'offline',
            model: 'gemma3:1b',
          });
        }
      } catch (error) {
        setStatus({
          backend: 'offline',
          ollama: 'offline',
          redis: 'offline',
          model: 'gemma3:1b',
        });
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const allOnline = status.backend === 'online' && status.ollama === 'online';
  const anyOffline = status.backend === 'offline' || status.ollama === 'offline';

  return (
    <div style={{
      position: 'fixed',
      top: 'var(--spacing-lg)',
      right: 'var(--spacing-lg)',
      zIndex: 1000,
    }}>
      {/* Compact View */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          padding: '6px 12px',
          background: 'var(--bg-primary)',
          border: anyOffline ? '1px solid var(--accent-red)' : '1px solid var(--border-default)',
          borderRadius: 'var(--radius-full)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-sm)',
          transition: 'all 0.2s ease',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <StatusDot status={allOnline ? 'online' : anyOffline ? 'offline' : 'checking'} />
        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
          {allOnline ? 'System Operational' : anyOffline ? 'System Issue' : 'Checking...'}
        </span>
        <Activity size={14} style={{ color: 'var(--text-secondary)' }} />
      </button>

      {/* Expanded View */}
      {isExpanded && (
        <div
          style={{
            marginTop: '8px',
            padding: '16px',
            background: 'var(--bg-primary)',
            minWidth: '260px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-default)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <h3 style={{ 
            fontSize: '13px', 
            fontWeight: 600, 
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <Activity size={14} /> // SYSTEM STATUS
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <StatusRow
              icon={<Database size={14} />}
              label="Backend API"
              status={status.backend}
            />
            <StatusRow
              icon={<Zap size={14} />}
              label={`AI Model (${status.model})`}
              status={status.ollama}
            />
            <StatusRow
              icon={<Circle size={14} />}
              label="Redis Cache"
              status={status.redis}
            />
          </div>

          {anyOffline && (
            <div style={{
              marginTop: '12px',
              padding: '8px',
              background: 'rgba(239, 68, 68, 0.05)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(239, 68, 68, 0.1)',
              display: 'flex',
              gap: '6px',
              fontSize: '12px',
              color: 'var(--accent-red)',
            }}>
              <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '1px' }} />
              <span>Some services are offline. Check the guide.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatusRow({ icon, label, status }: { 
  icon: React.ReactNode; 
  label: string; 
  status: 'online' | 'offline' | 'checking';
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6px 0',
      borderBottom: '1px solid var(--bg-secondary)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ color: 'var(--text-secondary)' }}>{icon}</div>
        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{label}</span>
      </div>
      <StatusBadge status={status} />
    </div>
  );
}

function StatusBadge({ status }: { status: 'online' | 'offline' | 'checking' }) {
  const colors = {
    online: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981', icon: CheckCircle },
    offline: { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444', icon: AlertCircle },
    checking: { bg: 'rgba(245, 158, 11, 0.1)', text: '#F59E0B', icon: Circle },
  };

  const config = colors[status];
  const Icon = config.icon;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-xs)',
      padding: '4px 8px',
      background: config.bg,
      borderRadius: 'var(--radius-sm)',
    }}>
      <Icon size={12} style={{ color: config.text }} />
      <span style={{ 
        fontSize: '11px', 
        fontWeight: 600, 
        color: config.text,
        textTransform: 'capitalize',
      }}>
        {status}
      </span>
    </div>
  );
}

function StatusDot({ status }: { status: 'online' | 'offline' | 'checking' }) {
  const colors = {
    online: '#10B981',
    offline: '#EF4444',
    checking: '#F59E0B',
  };

  return (
    <div style={{
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: colors[status],
      boxShadow: `0 0 8px ${colors[status]}`,
      animation: status === 'checking' ? 'pulse 2s infinite' : 'none',
    }} />
  );
}
