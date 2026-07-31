import type { Metadata } from 'next';
import './globals.css';
import { Chrome, Footer, Navbar } from '@/components/ui';

export const metadata: Metadata = {
  title: {
    default: 'Biswas Exports | Indian Products for Global Markets',
    template: '%s | Biswas Exports',
  },
  description:
    'Biswas Exports is an India-based export company supporting product sourcing, export preparation, and international buyer coordination from Asansol, West Bengal.',
  metadataBase: new URL('https://biswasexports.com'),
  openGraph: {
    title: 'Biswas Exports',
    description: 'Indian products. Global possibilities.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Chrome />
      </body>
    </html>
  );
}
