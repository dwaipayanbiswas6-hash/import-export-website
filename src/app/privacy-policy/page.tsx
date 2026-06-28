import type { Metadata } from 'next';
import { Section } from '@/components/ui';
export const metadata: Metadata = { title: 'Privacy Policy' };
export default function Page(){return <Section eyebrow="AurexTrade Global" title="Privacy Policy"><div className="mt-10 max-w-4xl rounded-[2rem] border border-black/10 bg-[color:var(--card)] p-8 text-lg leading-8 text-[color:var(--muted)] shadow-xl"><p>We collect only necessary business information to respond to enquiries, provide services, secure our platform, and meet legal obligations.</p></div></Section>}
