import type { Metadata } from 'next';
import { Section } from '@/components/ui';
export const metadata: Metadata = { title: 'Services' };
export default function Page(){return <Section eyebrow="AurexTrade Global" title="Services"><div className="mt-10 max-w-4xl rounded-[2rem] border border-black/10 bg-[color:var(--card)] p-8 text-lg leading-8 text-[color:var(--muted)] shadow-xl"><p>Import, export, freight forwarding, customs, warehousing, supply chain, global sourcing, and door-to-door delivery under one accountable partner.</p></div></Section>}
