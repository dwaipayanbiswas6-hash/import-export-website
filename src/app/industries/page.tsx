import type { Metadata } from 'next';
import { ContactStrip, PageHero, Reveal } from '@/components/ui';
import { industries } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description:
    'Explore the Indian product sectors Biswas Exports is structured to source for global B2B requirements.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        description="We evaluate buyer-led opportunities across selected product ecosystems while keeping every statement, quotation and capability transparent."
        eyebrow="Industry Focus"
        title="Diverse Indian capability, carefully coordinated."
      />
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {industries.map((industry) => (
            <Reveal className="soft-card p-9 md:p-12" key={industry.title}>
              <industry.icon className="text-gold" size={38} />
              <h2 className="mt-7 font-display text-3xl font-semibold text-navy">
                {industry.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {industry.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
