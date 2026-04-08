import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AlphaSignal Oracle Engine',
  description: 'Sealed MTG intelligence for collectors who want sharper decisions before they open, hold, or buy.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
