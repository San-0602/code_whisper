import Link from 'next/link';

export default function ChallengesPage() {
  const challenges = [
    { slug: 'intro-python', title: 'Intro to Python: Variables', difficulty: 'Beginner', xp: 20, tags: ['Python', 'Basics'], completed: true },
    { slug: 'fizzbuzz', title: 'FizzBuzz Optimization', difficulty: 'Easy', xp: 50, tags: ['Algorithms'], completed: true },
    { slug: 'two-sum', title: 'Two Sum Problem', difficulty: 'Medium', xp: 100, tags: ['Arrays', 'Hash Map'], completed: false },
    { slug: 'api-fetch', title: 'Fetch Data from API', difficulty: 'Medium', xp: 120, tags: ['React', 'Async'], completed: false },
    { slug: 'binary-tree', title: 'Invert Binary Tree', difficulty: 'Hard', xp: 300, tags: ['Trees', 'Recursion'], completed: false },
  ];

  const getDifficultyColor = (d: string) => {
    switch (d) {
      case 'Beginner': return 'var(--accent-green)';
      case 'Easy': return 'var(--accent-green)';
      case 'Medium': return 'var(--accent-orange)';
      case 'Hard': return 'var(--accent-red)';
      default: return 'var(--text-secondary)';
    }
  };
    
  return (
    <div className="container">
      <header style={{ marginBottom: 'var(--spacing-3xl)' }}>
        <h1 className="text-page-title" style={{ marginBottom: 'var(--spacing-sm)' }}>Practice Arena</h1>
        <p className="text-body-lg">Sharpen your skills with AI-assisted challenges.</p>
      </header>

      {/* Progress Summary */}
      <div className="card" style={{ 
        marginBottom: 'var(--spacing-2xl)', 
        padding: 'var(--spacing-xl)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div className="text-small" style={{ marginBottom: 'var(--spacing-xs)' }}>Your Progress</div>
          <div className="text-h2">2 / 5 completed</div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="text-h3" style={{ color: 'var(--accent-green)' }}>70</div>
            <div className="text-caption">XP Earned</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="text-h3" style={{ color: 'var(--accent-blue)' }}>500</div>
            <div className="text-caption">Available</div>
          </div>
        </div>
      </div>
      
      {/* Challenge List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        {challenges.map(c => (
          <Link 
            href={`/challenges/${c.slug}`} 
            key={c.slug} 
            className="card card-interactive" 
            style={{
              padding: 'var(--spacing-lg) var(--spacing-xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: c.completed ? 0.7 : 1,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
              <div style={{ 
                width: '44px', height: '44px', 
                borderRadius: 'var(--radius-lg)', 
                backgroundColor: c.completed ? 'var(--accent-green)' : 'var(--bg-tertiary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px',
                color: c.completed ? 'white' : 'inherit',
              }}>
                {c.completed ? '✓' : '🎯'}
              </div>
              
              <div>
                <h3 className="text-h3" style={{ marginBottom: 'var(--spacing-xs)' }}>{c.title}</h3>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                  <span style={{ 
                    color: getDifficultyColor(c.difficulty),
                    fontSize: '13px',
                    fontWeight: 600,
                  }}>
                    {c.difficulty}
                  </span>
                  <span style={{ color: 'var(--text-tertiary)' }}>•</span>
                  {c.tags.map(tag => (
                    <span key={tag} className="text-small">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="btn btn-secondary btn-sm">
              {c.completed ? 'Review' : `Start +${c.xp} XP`}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
