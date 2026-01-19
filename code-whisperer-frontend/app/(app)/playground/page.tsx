'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Code2, Brain, Rocket, ChevronRight, Check } from 'lucide-react';

const languages = [
  { id: 'python', name: 'Python', icon: '🐍', color: '#3776AB', desc: 'Data & AI' },
  { id: 'javascript', name: 'JavaScript', icon: '⚡', color: '#F7DF1E', desc: 'Web' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷', color: '#3178C6', desc: 'Safe Web' },
  { id: 'react', name: 'React', icon: '⚛️', color: '#61DAFB', desc: 'UI Lib' },
  { id: 'html', name: 'HTML/CSS', icon: '🎨', color: '#E34F26', desc: 'Layout' },
  { id: 'sql', name: 'SQL', icon: '🗄️', color: '#336791', desc: 'Data' },
];

const templates = [
  { id: 'blank', name: 'Blank Project', icon: '📄', desc: 'Empty canvas' },
  { id: 'hello-world', name: 'Hello World', icon: '👋', desc: 'Simple printer' },
  { id: 'algorithm', name: 'Algorithm', icon: '🧮', desc: 'Practice logic' },
];

export default function PlaygroundPage() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState('python');
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const [projectName, setProjectName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleStartSession = async () => {
    if (!projectName.trim()) {
      setProjectName(`My ${languages.find(l => l.id === selectedLang)?.name} Project`);
    }
    setIsCreating(true);
    
    // Simulating backend call
    setTimeout(() => {
      // In a real app, we'd POST to backend here
      router.push(`/project/new-id?lang=${selectedLang}`);
    }, 1500);
  };

  const currentLang = languages.find(l => l.id === selectedLang);

  return (
    <div className="container" style={{ padding: '48px 64px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 className="text-h1" style={{ fontSize: '36px', marginBottom: '12px' }}>Start a New Session</h1>
        <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
          Choose your stack and get coding with the AI mentor.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 340px', 
        gap: '40px',
        alignItems: 'start'
      }}>
        
        {/* Main Selection Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Project Name */}
          <section>
            <label className="text-small" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
              PROJECT NAME
            </label>
            <input 
              type="text" 
              className="input" 
              placeholder="e.g. Weather Data Analyzer" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              style={{ padding: '12px', fontSize: '16px' }}
            />
          </section>

          {/* Language Selection */}
          <section>
            <label className="text-small" style={{ display: 'block', marginBottom: '12px', fontWeight: 600 }}>
              LANGUAGE
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
              {languages.map((lang) => (
                <div 
                  key={lang.id}
                  onClick={() => setSelectedLang(lang.id)}
                  style={{ 
                    padding: '12px', 
                    borderRadius: 'var(--radius-md)', 
                    border: selectedLang === lang.id ? '2px solid var(--accent-blue)' : '1px solid var(--border-default)',
                    background: selectedLang === lang.id ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>{lang.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 500 }}>{lang.name}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Template Selection */}
          <section>
            <label className="text-small" style={{ display: 'block', marginBottom: '12px', fontWeight: 600 }}>
              TEMPLATE
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {templates.map((tpl) => (
                <div 
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  style={{ 
                    padding: '12px 16px', 
                    borderRadius: 'var(--radius-md)', 
                    border: selectedTemplate === tpl.id ? '1px solid var(--accent-blue)' : '1px solid var(--border-default)',
                    background: selectedTemplate === tpl.id ? 'rgba(35, 131, 226, 0.05)' : 'var(--bg-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px' }}>{tpl.icon}</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 500 }}>{tpl.name}</div>
                      <div className="text-small">{tpl.desc}</div>
                    </div>
                  </div>
                  {selectedTemplate === tpl.id && <Check size={16} color="var(--accent-blue)" />}
                </div>
              ))}
            </div>
          </section>

          <button 
            className="btn btn-primary"
            onClick={handleStartSession}
            disabled={isCreating}
            style={{ 
              marginTop: '16px', 
              padding: '12px', 
              fontSize: '16px', 
              justifyContent: 'center',
              backgroundColor: isCreating ? 'var(--text-tertiary)' : 'var(--accent-blue)'
            }}
          >
            {isCreating ? 'Creating Environment...' : 'Initialize Project'}
            {!isCreating && <ChevronRight size={16} />}
          </button>

        </div>

        {/* Info Panel / Right Sidebar */}
        <div style={{ 
          background: 'var(--bg-secondary)', 
          padding: '24px', 
          borderRadius: 'var(--radius-md)', 
          border: '1px solid var(--border-default)',
          position: 'sticky',
          top: '20px'
        }}>
          <h3 className="text-h3" style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Brain size={16} /> AI Assistant
          </h3>
          <p className="text-small" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
            Your session will be powered by <strong style={{ color: 'var(--text-primary)' }}>Gemma 3 (1b)</strong> via Ollama. 
            Use the chat to ask for explanations, refactoring tips, or bug fixes.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <FeatureRow icon={<Code2 size={14} />} text="Real-time static analysis" />
            <FeatureRow icon={<Sparkles size={14} />} text="Code generation" />
            <FeatureRow icon={<Rocket size={14} />} text="Instant project setup" />
          </div>

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-default)' }}>
             <div className="text-small" style={{ fontWeight: 600, marginBottom: '8px' }}>SELECTED CONFIG</div>
             <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge">{currentLang?.name}</span>
                <span className="badge">{templates.find(t => t.id === selectedTemplate)?.name}</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function FeatureRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
      {icon}
      <span>{text}</span>
    </div>
  );
}
