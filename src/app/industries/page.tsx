import type { Metadata } from 'next';
import { PageHero, PremiumCard, Section } from '@/components/ui';
import { industries } from '@/lib/data';

export const metadata: Metadata = { title: 'Industries' };

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Buyer sectors"
        title="Commercial contexts represented across the catalogue."
        intro="The catalogue spans product categories commonly considered by buyers in agriculture, food, textiles, lifestyle, manufacturing, retail and distribution."
      />
      <Section
        eyebrow="Enquiry contexts"
        title="Specification-led review across diverse sectors."
        intro="Industry references describe the types of enquiries considered. They do not claim completed projects, sector accreditation or guaranteed supply capability."
      >
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
