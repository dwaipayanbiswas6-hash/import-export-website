import type { Metadata } from 'next';
import { Section } from '@/components/ui';
export const metadata: Metadata = { title: 'Global Presence' };
export default function Page(){return <Section eyebrow="AurexTrade Global" title="Global Presence"><div className="mt-10 max-w-4xl rounded-[2rem] border border-black/10 bg-[color:var(--card)] p-8 text-lg leading-8 text-[color:var(--muted)] shadow-xl"><p>Regional partners and trade specialists across North America, Latin America, Europe, the Middle East, Africa, and Asia-Pacific.</p></div></Section>}
