import type { Metadata } from 'next';
import { Globe2, MapPin, MessagesSquare } from 'lucide-react';
import { PageHero, PremiumCard, Section } from '@/components/ui';
export const metadata: Metadata = { title: 'Global Presence' };
const principles = [
  {
    title: 'Rooted in India',
    icon: MapPin,
    text: 'Our base in Asansol, West Bengal, places us within India’s diverse commercial and manufacturing landscape.',
  },
  {
    title: 'Open to global enquiries',
    icon: Globe2,
    text: 'We welcome product-led conversations with importers, distributors, retailers, and businesses in international markets.',
  },
  {
    title: 'Communication without distance',
    icon: MessagesSquare,
    text: 'Clear digital communication and documented requirements help every party stay aligned across borders.',
  },
];
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Global presence"
        title="An Indian export partner with a worldwide outlook."
        intro="Global presence is more than a list of pins on a map. For Biswas Exports, it means being prepared to understand international buyer needs and coordinate responsibly from India."
      />
      <Section
        eyebrow="Our perspective"
        title="Local grounding. Global readiness."
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
