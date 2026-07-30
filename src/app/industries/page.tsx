import type { Metadata } from 'next';
import { PageHero, PremiumCard, Section } from '@/components/ui';
import { industries } from '@/lib/data';
export const metadata: Metadata = { title: 'Industries' };
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Commercial understanding across diverse categories."
        intro="We adapt sourcing and export coordination to the practical needs of each product category, buyer model, and destination."
      />
      <Section eyebrow="Sectors" title="Focused on products with purpose.">
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {industries.map((industry) => (
            <PremiumCard key={industry.title}>
              <industry.icon className="text-[color:var(--gold)]" />
              <h3 className="mt-5 text-3xl font-semibold">{industry.title}</h3>
              <p className="mt-3 max-w-xl leading-7 text-[color:var(--muted)]">
                {industry.description}
              </p>
            </PremiumCard>
          ))}
        </div>
      </Section>
    </>
  );
}
