import type { Metadata } from 'next';
import { Inter, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Code Whisperer - AI Coding Mentor',
  description: 'Learn to code with an intelligent AI mentor. Real-time analysis, instant explanations, and personalized guidance.',
  keywords: ['coding', 'AI', 'mentor', 'programming', 'learning', 'education'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
