import type { Metadata } from 'next';
import { Globe2, MapPin, MessagesSquare } from 'lucide-react';
import { PageHero, PremiumCard, Section } from '@/components/ui';

export const metadata: Metadata = { title: 'Global Presence' };

const principles = [
  {
    title: 'Based in India',
    icon: MapPin,
    text: 'Biswas Exports operates from Asansol, West Bengal, India.',
  },
  {
    title: 'International enquiries welcome',
    icon: Globe2,
    text: 'Professional enquiries may be submitted by importers, distributors, retailers, manufacturers and other business buyers in international markets.',
  },
  {
    title: 'Documented remote coordination',
    icon: MessagesSquare,
    text: 'Digital communication, written specifications and documented responsibilities support cross-border enquiry handling.',
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="International enquiries"
        title="India-based coordination for buyers in international markets."
        intro="Biswas Exports receives and reviews professional B2B sourcing enquiries from outside India. Market suitability, supplier availability and transaction feasibility are assessed individually."
      />
      <Section
        eyebrow="Our operating position"
        title="Local base. International enquiry scope."
        intro="This page does not claim physical offices, employees, agents, warehouses or distribution networks outside India. Any external representative or service provider must be confirmed in writing for the relevant engagement."
      >
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {principles.map((item) => (
            <PremiumCard key={item.title}>
              <item.icon className="text-[color:var(--gold)]" />
              <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-3 leading-7 text-[color:var(--muted)]">
                {item.text}
              </p>
            </PremiumCard>
          ))}
        </div>
      </Section>
    </>
  );
}
