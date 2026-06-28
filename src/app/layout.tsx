import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Chrome, Footer, Navbar } from '@/components/ui';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
export const metadata: Metadata = { title: { default: 'AurexTrade Global | Import & Export Excellence', template: '%s | AurexTrade Global' }, description: 'Premium import, export, freight forwarding, customs, warehousing, supply chain, global sourcing, and door-to-door delivery services.', metadataBase: new URL('https://aurextrade.example'), openGraph: { title: 'AurexTrade Global', description: 'Enterprise-grade international trade and logistics solutions.', type: 'website' } };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body className={`${inter.variable} ${playfair.variable}`}><Navbar/><main>{children}</main><Footer/><Chrome/></body></html>}
