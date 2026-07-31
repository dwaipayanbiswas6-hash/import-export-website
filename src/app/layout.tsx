import type { Metadata } from 'next';
import './globals.css';
import { Chrome, Footer, Navbar } from '@/components/ui';
import { allowIndexing, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    default: 'Biswas Exports | India-Focused B2B Sourcing Enquiries',
    template: '%s | Biswas Exports',
  },
  description:
    'Biswas Exports is an India-based export sourcing brand reviewing professional B2B product enquiries and potential Indian supply options from Asansol, West Bengal.',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
  openGraph: {
    title: 'Biswas Exports',
    description:
      'India-focused product sourcing enquiries for international business buyers.',
    type: 'website',
    url: siteUrl,
    siteName: 'Biswas Exports',
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
