import type { Metadata } from 'next';
import { Section } from '@/components/ui';
export const metadata: Metadata = { title: 'Terms' };
export default function Page(){return <Section eyebrow="AurexTrade Global" title="Terms"><div className="mt-10 max-w-4xl rounded-[2rem] border border-black/10 bg-[color:var(--card)] p-8 text-lg leading-8 text-[color:var(--muted)] shadow-xl"><p>Use of this website is subject to professional, lawful access. Service engagements are governed by written commercial agreements.</p></div></Section>}
