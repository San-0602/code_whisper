'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Code2, Brain, Rocket, ChevronRight, Check } from 'lucide-react';

const languages = [
  { id: 'python', name: 'Python', icon: '🐍', desc: 'Data & AI' },
  { id: 'javascript', name: 'JavaScript', icon: '⚡', desc: 'Web' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷', desc: 'Safe Web' },
  { id: 'react', name: 'React', icon: '⚛️', desc: 'UI Lib' },
  { id: 'html', name: 'HTML/CSS', icon: '🎨', desc: 'Layout' },
  { id: 'sql', name: 'SQL', icon: '🗄️', desc: 'Data' },
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
    setTimeout(() => {
      router.push(`/project/new-id?lang=${selectedLang}`);
    }, 1500);
  };

  const currentLang = languages.find(l => l.id === selectedLang);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #000;
          --bg2: #0a0a0a;
          --bg3: #111;
          --bg4: #161616;
          --surface: rgba(255,255,255,0.05);
          --surface2: rgba(255,255,255,0.08);
          --border: rgba(255,255,255,0.1);
          --border2: rgba(255,255,255,0.18);
          --text: #f5f5f7;
          --text2: #a1a1a6;
          --text3: #6e6e73;
          --blue: #2997ff;
          --blue-dim: rgba(41,151,255,0.12);
          --blue-glow: rgba(41,151,255,0.25);
          --radius-pill: 100px;
          --radius-lg: 14px;
          --radius-xl: 20px;
          --radius-2xl: 28px;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }

        /* PAGE WRAPPER */
        .pg-wrap {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        .pg-mesh {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse 70% 50% at 20% 20%, rgba(99,102,241,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(41,151,255,0.06) 0%, transparent 60%);
        }

        /* HEADER */
        .pg-header {
          position: relative; z-index: 1;
          text-align: center;
          padding: 56px 24px 48px;
        }
        .pg-badge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 14px 5px 10px; border-radius: var(--radius-pill);
          background: rgba(41,151,255,0.1); border: 1px solid rgba(41,151,255,0.22);
          color: var(--blue); font-size: 12px; font-weight: 600;
          letter-spacing: 0.3px; margin-bottom: 20px;
          animation: fadeUp 0.5s ease both;
        }
        .pg-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--blue); animation: pulse 2s infinite;
        }
        .pg-h1 {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 700; letter-spacing: -1.5px; line-height: 1.08;
          margin-bottom: 12px;
          animation: fadeUp 0.5s 0.08s ease both;
        }
        .pg-sub {
          font-size: 16px; color: var(--text2); line-height: 1.6;
          animation: fadeUp 0.5s 0.15s ease both;
        }

        /* MAIN GRID */
        .pg-grid {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 20px;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 24px 80px;
          animation: fadeUp 0.5s 0.2s ease both;
        }
        @media (max-width: 768px) {
          .pg-grid { grid-template-columns: 1fr; }
          .pg-sidebar { order: -1; position: static !important; }
        }

        /* SECTION LABEL */
        .sec-label {
          font-size: 11px; font-weight: 600; letter-spacing: 1.2px;
          text-transform: uppercase; color: var(--text3);
          margin-bottom: 12px;
        }

        /* INPUT */
        .pg-input {
          width: 100%; padding: 13px 16px;
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: var(--radius-lg); color: var(--text);
          font-size: 15px; outline: none;
          font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .pg-input::placeholder { color: var(--text3); }
        .pg-input:focus {
          border-color: var(--blue);
          box-shadow: 0 0 0 3px rgba(41,151,255,0.15);
        }

        /* LANG GRID */
        .lang-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
          gap: 10px;
        }
        .lang-card {
          padding: 16px 8px 14px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          background: var(--bg3);
          cursor: pointer; text-align: center;
          transition: all 0.18s ease;
          user-select: none;
        }
        .lang-card:hover {
          border-color: var(--border2);
          background: var(--bg4);
          transform: translateY(-2px);
        }
        .lang-card.active {
          border-color: var(--blue);
          background: var(--blue-dim);
          box-shadow: 0 0 0 1px var(--blue), 0 8px 24px var(--blue-glow);
        }
        .lang-icon { font-size: 26px; margin-bottom: 7px; }
        .lang-name { font-size: 12px; font-weight: 600; color: var(--text); }
        .lang-desc { font-size: 11px; color: var(--text3); margin-top: 2px; }

        /* TEMPLATE LIST */
        .tpl-list { display: flex; flex-direction: column; gap: 8px; }
        .tpl-card {
          padding: 14px 16px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          background: var(--bg3);
          cursor: pointer;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.18s ease;
          user-select: none;
        }
        .tpl-card:hover { border-color: var(--border2); background: var(--bg4); }
        .tpl-card.active {
          border-color: var(--blue);
          background: var(--blue-dim);
        }
        .tpl-left { display: flex; align-items: center; gap: 12px; }
        .tpl-icon { font-size: 20px; }
        .tpl-name { font-size: 14px; font-weight: 600; color: var(--text); }
        .tpl-desc { font-size: 12px; color: var(--text3); margin-top: 1px; }
        .tpl-check {
          width: 20px; height: 20px; border-radius: 50%;
          background: var(--blue); display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* SECTION SPACING */
        .pg-section { margin-bottom: 28px; }

        /* SUBMIT BTN */
        .pg-btn {
          width: 100%; padding: 14px;
          border-radius: var(--radius-pill);
          background: var(--blue); color: #fff;
          font-size: 15px; font-weight: 600; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.2s;
          box-shadow: 0 8px 24px var(--blue-glow);
          margin-top: 8px;
          font-family: inherit;
        }
        .pg-btn:hover:not(:disabled) { background: #1a8fff; transform: translateY(-1px); box-shadow: 0 12px 32px var(--blue-glow); }
        .pg-btn:disabled { background: #333; color: var(--text3); box-shadow: none; cursor: not-allowed; }
        .pg-btn-spinner {
          width: 16px; height: 16px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
          animation: spin 0.7s linear infinite;
        }

        /* SIDEBAR */
        .pg-sidebar {
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: var(--radius-xl); padding: 24px;
          position: sticky; top: 24px; height: fit-content;
        }
        .sidebar-title {
          font-size: 15px; font-weight: 600; margin-bottom: 6px;
          display: flex; align-items: center; gap: 8px; color: var(--text);
        }
        .sidebar-icon-wrap {
          width: 28px; height: 28px; border-radius: 8px;
          background: rgba(41,151,255,0.15); display: flex;
          align-items: center; justify-content: center;
        }
        .sidebar-desc { font-size: 13px; color: var(--text2); line-height: 1.65; margin-bottom: 20px; }
        .sidebar-desc strong { color: var(--text); font-weight: 600; }
        .feature-row {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: var(--text2); margin-bottom: 10px;
        }
        .feature-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--blue); flex-shrink: 0;
        }
        .sidebar-divider { height: 1px; background: var(--border); margin: 20px 0; }
        .config-label { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--text3); margin-bottom: 10px; }
        .config-chips { display: flex; gap: 8px; flex-wrap: wrap; }
        .chip {
          padding: 5px 12px; border-radius: var(--radius-pill);
          background: var(--surface2); border: 1px solid var(--border2);
          font-size: 12px; font-weight: 600; color: var(--text);
        }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="pg-wrap">
        <div className="pg-mesh" />

        {/* Header */}
        <div className="pg-header">
          <div className="pg-badge">
            <div className="pg-badge-dot" />
            New Session
          </div>
          <h1 className="pg-h1">Start a New Session</h1>
          <p className="pg-sub">Choose your stack and get coding with the AI mentor.</p>
        </div>

        {/* Grid */}
        <div className="pg-grid">

          {/* Left — Main Form */}
          <div>

            {/* Project Name */}
            <div className="pg-section">
              <p className="sec-label">Project Name</p>
              <input
                type="text"
                className="pg-input"
                placeholder="e.g. Weather Data Analyzer"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            {/* Language */}
            <div className="pg-section">
              <p className="sec-label">Language</p>
              <div className="lang-grid">
                {languages.map((lang) => (
                  <div
                    key={lang.id}
                    className={`lang-card${selectedLang === lang.id ? ' active' : ''}`}
                    onClick={() => setSelectedLang(lang.id)}
                  >
                    <div className="lang-icon">{lang.icon}</div>
                    <div className="lang-name">{lang.name}</div>
                    <div className="lang-desc">{lang.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Template */}
            <div className="pg-section">
              <p className="sec-label">Template</p>
              <div className="tpl-list">
                {templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    className={`tpl-card${selectedTemplate === tpl.id ? ' active' : ''}`}
                    onClick={() => setSelectedTemplate(tpl.id)}
                  >
                    <div className="tpl-left">
                      <span className="tpl-icon">{tpl.icon}</span>
                      <div>
                        <div className="tpl-name">{tpl.name}</div>
                        <div className="tpl-desc">{tpl.desc}</div>
                      </div>
                    </div>
                    {selectedTemplate === tpl.id && (
                      <div className="tpl-check">
                        <Check size={12} color="#fff" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              className="pg-btn"
              onClick={handleStartSession}
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <div className="pg-btn-spinner" />
                  Creating Environment...
                </>
              ) : (
                <>
                  Initialize Project <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* Right — Sidebar */}
          <div className="pg-sidebar">
            <div className="sidebar-title">
              <div className="sidebar-icon-wrap">
                <Brain size={14} color="var(--blue)" />
              </div>
              AI Assistant
            </div>
            <p className="sidebar-desc">
              Your session will be powered by{' '}
              <strong>Gemma 3 (1b)</strong> via Ollama. Use the chat to ask for
              explanations, refactoring tips, or bug fixes.
            </p>

            <div className="feature-row"><div className="feature-dot" /><span>Real-time static analysis</span></div>
            <div className="feature-row"><div className="feature-dot" /><span>Code generation</span></div>
            <div className="feature-row"><div className="feature-dot" /><span>Instant project setup</span></div>

            <div className="sidebar-divider" />

            <p className="config-label">Selected Config</p>
            <div className="config-chips">
              <span className="chip">{currentLang?.icon} {currentLang?.name}</span>
              <span className="chip">{templates.find(t => t.id === selectedTemplate)?.name}</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}