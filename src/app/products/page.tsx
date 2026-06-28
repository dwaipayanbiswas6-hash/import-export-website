import type { Metadata } from 'next';
import { Section } from '@/components/ui';
export const metadata: Metadata = { title: 'Products' };
export default function Page(){return <Section eyebrow="AurexTrade Global" title="Products"><div className="mt-10 max-w-4xl rounded-[2rem] border border-black/10 bg-[color:var(--card)] p-8 text-lg leading-8 text-[color:var(--muted)] shadow-xl"><p>Representative categories include machinery, electronics, textiles, commodities, components, and regulated medical supplies.</p></div></Section>}
