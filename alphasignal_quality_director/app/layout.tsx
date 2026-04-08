import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

const title = 'AlphaSignal';
const description = 'Know before you open. Sealed MTG analytics for collectors who want cleaner decisions than guesswork.';

export const metadata: Metadata = {
  title,
  description,
  applicationName: title,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title,
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: '#091120',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
