'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, MessageCircle, Target, Code2, Brain } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #000;
          --bg2: #0a0a0a;
          --bg3: #111;
          --surface: rgba(255,255,255,0.05);
          --surface2: rgba(255,255,255,0.08);
          --border: rgba(255,255,255,0.1);
          --border2: rgba(255,255,255,0.15);
          --text: #f5f5f7;
          --text2: #a1a1a6;
          --text3: #6e6e73;
          --blue: #2997ff;
          --blue-glow: rgba(41,151,255,0.25);
          --purple: #bf5af2;
          --green: #30d158;
          --orange: #ff9f0a;
          --radius-pill: 100px;
          --radius-lg: 18px;
          --radius-xl: 24px;
          --radius-2xl: 32px;
        }

        body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif; -webkit-font-smoothing: antialiased; }

        /* ---- NAV ---- */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          padding: 0 max(24px, calc((100vw - 1200px) / 2));
          height: 52px;
          display: flex; align-items: center; justify-content: space-between;
          transition: background 0.4s, backdrop-filter 0.4s, border-color 0.4s;
        }
        .nav.scrolled {
          background: rgba(0,0,0,0.72);
          backdrop-filter: saturate(180%) blur(24px);
          -webkit-backdrop-filter: saturate(180%) blur(24px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; color: var(--text);
        }
        .nav-logo-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(99,102,241,0.4);
        }
        .nav-logo-text {
          font-size: 17px; font-weight: 600; letter-spacing: -0.3px;
        }
        .nav-links {
          display: flex; align-items: center; gap: 8px;
        }
        .nav-link {
          text-decoration: none; color: var(--text2); font-size: 14px;
          font-weight: 500; padding: 6px 14px; border-radius: var(--radius-pill);
          transition: color 0.2s, background 0.2s;
        }
        .nav-link:hover { color: var(--text); background: var(--surface); }
        .nav-cta {
          text-decoration: none; color: #fff; font-size: 14px; font-weight: 500;
          padding: 7px 18px; border-radius: var(--radius-pill);
          background: var(--blue); transition: opacity 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .nav-cta:hover { opacity: 0.88; transform: scale(0.98); }

        @media (max-width: 600px) {
          .nav-link { display: none; }
        }

        /* ---- HERO ---- */
        .hero {
          min-height: 100svh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
          padding: 120px 24px 80px;
          position: relative; overflow: hidden;
        }
        .hero-mesh {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(139,92,246,0.10) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 20% 90%, rgba(41,151,255,0.08) 0%, transparent 50%);
        }
        .hero-noise {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }

        .badge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 6px 16px 6px 10px; border-radius: var(--radius-pill);
          background: rgba(41,151,255,0.1); border: 1px solid rgba(41,151,255,0.25);
          color: var(--blue); font-size: 13px; font-weight: 500;
          margin-bottom: 28px; animation: fadeUp 0.6s ease both;
        }
        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--blue); animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }

        .hero-h1 {
          font-size: clamp(40px, 8vw, 88px);
          font-weight: 700; letter-spacing: -2.5px; line-height: 1.04;
          margin-bottom: 24px;
          animation: fadeUp 0.7s 0.1s ease both;
        }
        .hero-h1 span {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #2997ff 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: clamp(16px, 2.5vw, 21px);
          color: var(--text2); line-height: 1.6; max-width: 560px;
          margin: 0 auto 40px; font-weight: 400;
          animation: fadeUp 0.7s 0.2s ease both;
        }
        .hero-btns {
          display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
          animation: fadeUp 0.7s 0.3s ease both;
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: var(--radius-pill);
          background: var(--blue); color: #fff;
          font-size: 16px; font-weight: 600; text-decoration: none;
          transition: all 0.2s; box-shadow: 0 8px 32px var(--blue-glow);
        }
        .btn-primary:hover { background: #1a8fff; transform: translateY(-1px); box-shadow: 0 12px 40px var(--blue-glow); }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: var(--radius-pill);
          background: var(--surface2); color: var(--text);
          border: 1px solid var(--border2); font-size: 16px; font-weight: 600;
          text-decoration: none; transition: all 0.2s;
          backdrop-filter: blur(12px);
        }
        .btn-secondary:hover { background: rgba(255,255,255,0.12); transform: translateY(-1px); }

        /* stats */
        .stats {
          display: flex; justify-content: center; gap: clamp(24px, 6vw, 80px);
          margin-top: 72px; flex-wrap: wrap;
          animation: fadeUp 0.7s 0.4s ease both;
        }
        .stat { text-align: center; }
        .stat-val { font-size: 28px; font-weight: 700; letter-spacing: -1px; color: var(--text); }
        .stat-lbl { font-size: 13px; color: var(--text3); margin-top: 2px; }

        /* ---- FEATURES ---- */
        .section {
          padding: clamp(60px, 10vw, 120px) 24px;
          max-width: 1200px; margin: 0 auto;
        }
        .section-label {
          font-size: 13px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--blue); margin-bottom: 16px; text-align: center;
        }
        .section-h2 {
          font-size: clamp(28px, 5vw, 52px); font-weight: 700;
          letter-spacing: -1.5px; line-height: 1.1; text-align: center;
          margin-bottom: 16px;
        }
        .section-sub {
          font-size: clamp(15px, 2vw, 18px); color: var(--text2);
          text-align: center; max-width: 500px; margin: 0 auto 56px;
          line-height: 1.6;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
          gap: 16px;
        }

        .card {
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: var(--radius-xl); padding: 32px;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          position: relative; overflow: hidden;
        }
        .card::before {
          content: ''; position: absolute; inset: 0; opacity: 0;
          transition: opacity 0.3s;
          background: radial-gradient(ellipse 80% 80% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%);
        }
        .card:hover { border-color: var(--border2); transform: translateY(-4px); box-shadow: 0 24px 48px rgba(0,0,0,0.4); }
        .card:hover::before { opacity: 1; }

        .card-icon {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px; font-size: 22px;
        }
        .card-h3 { font-size: 19px; font-weight: 600; margin-bottom: 10px; letter-spacing: -0.3px; }
        .card-p { font-size: 15px; color: var(--text2); line-height: 1.65; }

        /* ---- DIVIDER ---- */
        .divider {
          height: 1px; background: var(--border); margin: 0 24px;
        }

        /* ---- CTA ---- */
        .cta-wrap {
          padding: clamp(60px, 10vw, 120px) 24px;
        }
        .cta-box {
          max-width: 800px; margin: 0 auto;
          background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08));
          border: 1px solid rgba(99,102,241,0.25); border-radius: var(--radius-2xl);
          padding: clamp(48px, 8vw, 80px) clamp(32px, 6vw, 80px);
          text-align: center; position: relative; overflow: hidden;
        }
        .cta-box::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-h2 { font-size: clamp(28px, 5vw, 48px); font-weight: 700; letter-spacing: -1.5px; margin-bottom: 16px; }
        .cta-sub { font-size: 17px; color: var(--text2); margin-bottom: 36px; line-height: 1.6; }

        /* ---- FOOTER ---- */
        .footer {
          border-top: 1px solid var(--border); padding: 32px 24px;
          text-align: center; color: var(--text3); font-size: 13px;
        }
        .footer a { color: var(--text3); text-decoration: none; }
        .footer a:hover { color: var(--text2); }

        /* ---- ANIMATIONS ---- */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ---- MOBILE ---- */
        @media (max-width: 480px) {
          .hero-h1 { letter-spacing: -1.5px; }
          .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
          .hero-btns { flex-direction: column; }
          .stats { gap: 32px; }
        }
      `}</style>

      <main>
        {/* NAV */}
        <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
          <Link href="/" className="nav-logo">
            <div className="nav-logo-icon">🔮</div>
            <span className="nav-logo-text">Code Whisperer</span>
          </Link>
          <div className="nav-links">
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
            <Link href="/challenges" className="nav-link">Challenges</Link>
            <Link href="/playground" className="nav-cta">Get Started</Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-mesh" />
          <div className="hero-noise" />

          <div className="badge">
            <div className="badge-dot" />
            AI-Powered Learning Platform
          </div>

          <h1 className="hero-h1">
            Code with an<br />
            <span>AI Mentor</span>
          </h1>

          <p className="hero-sub">
            Don't just write code — understand it. Get real-time analysis, instant explanations,
            and personalized guidance as you learn and grow.
          </p>

          <div className="hero-btns">
            <Link href="/playground" className="btn-primary">
              Start Coding <ArrowRight size={18} />
            </Link>
            <Link href="/challenges" className="btn-secondary">
              Practice Challenges
            </Link>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-val">6+</div>
              <div className="stat-lbl">Languages</div>
            </div>
            <div className="stat">
              <div className="stat-val">AI</div>
              <div className="stat-lbl">Powered</div>
            </div>
            <div className="stat">
              <div className="stat-val">⚡ Live</div>
              <div className="stat-lbl">Analysis</div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* FEATURES */}
        <div className="section">
          <p className="section-label">Features</p>
          <h2 className="section-h2">Everything you need to<br />learn faster</h2>
          <p className="section-sub">Powerful tools designed to accelerate your coding journey and make learning feel natural.</p>

          <div className="grid-3">
            <FeatureCard
              emoji="⚡"
              bg="rgba(255,159,10,0.15)"
              title="Real-Time Analysis"
              description="Get instant feedback as you type. Catch errors before you run your code and learn best practices on the fly."
            />
            <FeatureCard
              emoji="💬"
              bg="rgba(41,151,255,0.15)"
              title="AI Chat Assistant"
              description="Ask questions, get explanations, and learn concepts through natural conversation with your AI mentor."
            />
            <FeatureCard
              emoji="🎯"
              bg="rgba(191,90,242,0.15)"
              title="Practice Challenges"
              description="Sharpen your skills with curated coding problems at every level, from beginner to advanced."
            />
          </div>
        </div>

        <div className="divider" />

        {/* CTA */}
        <div className="cta-wrap">
          <div className="cta-box">
            <h2 className="cta-h2">Ready to level up<br />your coding?</h2>
            <p className="cta-sub">Join thousands of learners mastering programming with AI guidance.</p>
            <Link href="/playground" className="btn-primary" style={{ display: 'inline-flex' }}>
              Start Your Journey <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="footer">
          <p>Built with ❤️ for learners everywhere · Powered by Ollama &amp; Gemma</p>
        </footer>
      </main>
    </>
  );
}

function FeatureCard({ emoji, bg, title, description }: {
  emoji: string;
  bg: string;
  title: string;
  description: string;
}) {
  return (
    <div className="card">
      <div className="card-icon" style={{ background: bg }}>{emoji}</div>
      <h3 className="card-h3">{title}</h3>
      <p className="card-p">{description}</p>
    </div>
  );
}