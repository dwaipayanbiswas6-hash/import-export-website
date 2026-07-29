import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Footer, Navbar, SiteTools } from '@/components/ui';
import { siteConfig } from '@/lib/data';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Biswas Exports | Merchant Export Company in India',
    template: '%s | Biswas Exports',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'merchant exporter India',
    'Indian export company',
    'product sourcing India',
    'export company West Bengal',
    'Biswas Exports',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: siteConfig.name,
    title: 'Biswas Exports | Bridging Indian Excellence to Global Markets',
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biswas Exports | Merchant Export Company in India',
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#07182e',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  foundingDate: siteConfig.established,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Asansol',
    addressRegion: 'West Bengal',
    addressCountry: 'IN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <a
          className="sr-only z-[100] bg-white p-4 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          href="#main-content"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <SiteTools />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
