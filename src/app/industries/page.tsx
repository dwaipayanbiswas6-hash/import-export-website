import type { Metadata } from 'next';
import { Section } from '@/components/ui';
export const metadata: Metadata = { title: 'Industries' };
export default function Page(){return <Section eyebrow="AurexTrade Global" title="Industries"><div className="mt-10 max-w-4xl rounded-[2rem] border border-black/10 bg-[color:var(--card)] p-8 text-lg leading-8 text-[color:var(--muted)] shadow-xl"><p>Purpose-built operating models for manufacturing, retail, automotive, agriculture, pharmaceuticals, energy, technology, and construction.</p></div></Section>}
