import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, MessageCircle, Target, Code2, Brain } from 'lucide-react';

export default function LandingPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.08) 0%, transparent 50%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Navigation */}
      <nav style={{
        padding: 'var(--spacing-xl) var(--spacing-2xl)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-default)',
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--backdrop-blur)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
          <div style={{
            fontSize: '24px',
            background: 'var(--gradient-primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
          }}>
            🔮
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px' }}>
            Code Whisperer
          </span>
        </div>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
          <Link href="/dashboard" className="btn btn-ghost">Dashboard</Link>
          <Link href="/playground" className="btn btn-primary hover-lift" style={{
            background: 'var(--gradient-primary)',
            border: 'none',
            color: 'white',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
          }}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="fade-in" style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-4xl) var(--spacing-xl)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ maxWidth: '780px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            padding: 'var(--spacing-xs) var(--spacing-lg)',
            background: 'var(--glass-bg)',
            backdropFilter: 'var(--backdrop-blur)',
            borderRadius: 'var(--radius-full)',
            marginBottom: 'var(--spacing-xl)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--shadow-md)',
          }}>
            <Sparkles size={16} style={{ color: 'var(--accent-purple)' }} />
            <span style={{ fontSize: '14px', fontWeight: 600 }}>
              AI-Powered Learning Platform
            </span>
          </div>
          
          <h1 className="text-hero" style={{ marginBottom: 'var(--spacing-xl)' }}>
            Code with an
            <br />
            <span style={{ 
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              AI Mentor
            </span>
          </h1>
          
          <p className="text-body-lg" style={{ 
            marginBottom: 'var(--spacing-3xl)', 
            maxWidth: '600px', 
            marginInline: 'auto',
            lineHeight: 1.8,
            color: 'var(--text-secondary)'
          }}>
            Don't just write code. Understand it. Get real-time analysis, instant explanations, 
            and personalized guidance powered by AI as you learn and grow.
          </p>
          
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              href="/playground" 
              className="btn btn-primary btn-lg hover-lift hover-glow"
              style={{
                background: 'var(--gradient-primary)',
                border: 'none',
                color: 'white',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
              }}
            >
              Start Coding <ArrowRight size={18} />
            </Link>
            <Link 
              href="/challenges" 
              className="btn btn-secondary btn-lg hover-lift"
              style={{
                background: 'var(--bg-secondary)',
                borderColor: 'var(--border-default)',
              }}
            >
              Practice Challenges
            </Link>
          </div>

          {/* Quick Stats */}
          <div style={{
            marginTop: 'var(--spacing-4xl)',
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--spacing-3xl)',
            flexWrap: 'wrap',
          }}>
            <Stat icon={<Code2 size={20} />} value="6+" label="Languages" />
            <Stat icon={<Brain size={20} />} value="AI" label="Powered" />
            <Stat icon={<Zap size={20} />} value="Real-time" label="Analysis" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{
        padding: 'var(--spacing-4xl) var(--spacing-xl)',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-default)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-4xl)' }}>
            <h2 className="text-h1" style={{ marginBottom: 'var(--spacing-md)' }}>
              Everything you need to{' '}
              <span className="gradient-text">learn faster</span>
            </h2>
            <p className="text-body-lg" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Powerful features designed to accelerate your coding journey and make learning enjoyable
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: 'var(--spacing-xl)' 
          }}>
            <FeatureCard 
              icon={<Zap size={24} style={{ color: 'var(--accent-orange)' }} />}
              gradient="var(--gradient-orange)"
              title="Real-Time Analysis" 
              description="Get instant feedback as you type. Catch errors before you run your code and learn best practices on the fly."
            />
            <FeatureCard 
              icon={<MessageCircle size={24} style={{ color: 'var(--accent-blue)' }} />}
              gradient="var(--gradient-blue)"
              title="AI Chat Assistant" 
              description="Ask questions, get explanations, and learn concepts through natural conversation with your AI mentor."
            />
            <FeatureCard 
              icon={<Target size={24} style={{ color: 'var(--accent-purple)' }} />}
              gradient="var(--gradient-purple)"
              title="Practice Challenges" 
              description="Sharpen your skills with curated coding problems at every level, from beginner to advanced."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: 'var(--spacing-4xl) var(--spacing-xl)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div className="glass" style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: 'var(--spacing-4xl)',
          borderRadius: 'var(--radius-2xl)',
          textAlign: 'center',
        }}>
          <h2 className="text-h1" style={{ marginBottom: 'var(--spacing-md)' }}>
            Ready to level up your coding?
          </h2>
          <p className="text-body-lg" style={{ marginBottom: 'var(--spacing-2xl)' }}>
            Join thousands of learners who are mastering programming with AI guidance
          </p>
          <Link 
            href="/playground" 
            className="btn btn-primary btn-lg hover-lift"
            style={{
              background: 'var(--gradient-primary)',
              border: 'none',
              color: 'white',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
            }}
          >
            Start Your Journey Now →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: 'var(--spacing-2xl) var(--spacing-xl)',
        borderTop: '1px solid var(--border-default)',
        textAlign: 'center',
        background: 'var(--bg-secondary)',
        position: 'relative',
        zIndex: 1,
      }}>
        <p className="text-small" style={{ opacity: 0.7 }}>
          Built with ❤️ for learners everywhere • Powered by Ollama & Gemma
        </p>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description, gradient }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  gradient: string;
}) {
  return (
    <div className="card-premium hover-lift" style={{ padding: 'var(--spacing-2xl)' }}>
      <div style={{ 
        width: '56px', 
        height: '56px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: gradient,
        borderRadius: 'var(--radius-xl)',
        marginBottom: 'var(--spacing-lg)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      }}>
        <div style={{ filter: 'brightness(0) invert(1)' }}>
          {icon}
        </div>
      </div>
      <h3 className="text-h3" style={{ marginBottom: 'var(--spacing-sm)' }}>{title}</h3>
      <p className="text-small" style={{ lineHeight: 1.7, color: 'var(--text-secondary)' }}>
        {description}
      </p>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 'var(--spacing-xs)',
        color: 'var(--accent-purple)',
      }}>
        {icon}
      </div>
      <div style={{ fontSize: '24px', fontWeight: 700, marginBottom: '2px' }}>
        {value}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
        {label}
      </div>
    </div>
  );
}
