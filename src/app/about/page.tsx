import type { Metadata } from 'next';
import { Section } from '@/components/ui';
export const metadata: Metadata = { title: 'About AurexTrade' };
export default function Page(){return <Section eyebrow="AurexTrade Global" title="About AurexTrade"><div className="mt-10 max-w-4xl rounded-[2rem] border border-black/10 bg-[color:var(--card)] p-8 text-lg leading-8 text-[color:var(--muted)] shadow-xl"><p>We combine trade compliance, logistics design, and premium account leadership for companies expanding internationally.</p></div></Section>}
