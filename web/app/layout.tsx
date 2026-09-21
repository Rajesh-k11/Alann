import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ALANN AI ORB LAB — Intelligence in Motion',
  description: 'Production-ready ALANN AI Thinking Orb animation system for Web (Next.js) and Mobile (React Native).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen selection:bg-purple-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}

