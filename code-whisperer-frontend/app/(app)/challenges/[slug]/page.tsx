'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

const challengeData: Record<string, { title: string; description: string; difficulty: string; starterCode: string }> = {
  'intro-python': {
    title: 'Intro to Python: Variables',
    difficulty: 'Beginner',
    description: 'Learn how to declare and use variables in Python. Understand the difference between strings, integers, and floats.',
    starterCode: '# Define a variable called "name" and set it to your name\n\n\n# Define a variable called "age" and set it to your age\n\n\nprint(f"Hello, my name is {name} and I am {age} years old.")',
  },
  'fizzbuzz': {
    title: 'FizzBuzz Optimization',
    difficulty: 'Easy',
    description: 'Write a program that prints numbers from 1 to 100. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", and for multiples of both print "FizzBuzz".',
    starterCode: 'for i in range(1, 101):\n    # Your code here\n    pass',
  },
  'two-sum': {
    title: 'Two Sum Problem',
    difficulty: 'Medium',
    description: 'Given an array of integers and a target, return indices of the two numbers such that they add up to the target. You may assume that each input would have exactly one solution.',
    starterCode: 'def two_sum(nums: list[int], target: int) -> list[int]:\n    # Your solution here\n    pass\n\n# Test case\nprint(two_sum([2, 7, 11, 15], 9))  # Expected: [0, 1]',
  },
};

export default function ChallengePage() {
  const params = useParams();
  const slug = params.slug as string;
  const challenge = challengeData[slug] || {
    title: 'Challenge Not Found',
    difficulty: 'N/A',
    description: 'This challenge does not exist.',
    starterCode: '',
  };

  return (
    <div className="container" style={{ padding: '3rem 2rem', maxWidth: '900px' }}>
      <Link href="/challenges" style={{ 
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
        color: 'hsl(var(--foreground)/0.6)', marginBottom: '2rem', textDecoration: 'none',
        fontSize: '0.9rem'
      }}>
        ← Back to Challenges
      </Link>

      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <h1 style={{ fontSize: '2rem' }}>{challenge.title}</h1>
          <span style={{ 
            padding: '0.35rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 600,
            background: challenge.difficulty === 'Beginner' || challenge.difficulty === 'Easy' ? 'hsl(142 70% 50% / 0.15)' : challenge.difficulty === 'Medium' ? 'hsl(40 90% 60% / 0.15)' : 'hsl(0 85% 60% / 0.15)',
            color: challenge.difficulty === 'Beginner' || challenge.difficulty === 'Easy' ? 'hsl(142 70% 50%)' : challenge.difficulty === 'Medium' ? 'hsl(40 90% 60%)' : 'hsl(0 85% 60%)'
          }}>
            {challenge.difficulty}
          </span>
        </div>
        <p style={{ color: 'hsl(var(--foreground)/0.7)', lineHeight: 1.7 }}>{challenge.description}</p>
      </header>

      <section className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'hsl(var(--foreground)/0.5)' }}>Starter Code</h2>
        <pre style={{ 
          background: 'hsl(var(--background))', padding: '1.5rem', borderRadius: '0.75rem', 
          overflowX: 'auto', fontFamily: 'Consolas, Monaco, monospace', fontSize: '0.9rem', lineHeight: 1.6 
        }}>
          <code>{challenge.starterCode}</code>
        </pre>
      </section>

      <Link href={`/project/challenge-${slug}`} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
        Launch in IDE →
      </Link>
    </div>
  );
}
