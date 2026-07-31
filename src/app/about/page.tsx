import type { Metadata } from 'next';
import { PageHero, PremiumCard, Section } from '@/components/ui';
import { values } from '@/lib/data';

export const metadata: Metadata = { title: 'About' };

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="About Biswas Exports"
        title="Trade enquiries handled with clarity, care and commercial purpose."
        intro="Biswas Exports is an India-based export sourcing brand operating from Asansol, West Bengal. We review professional buyer requirements and coordinate potential Indian product and supply options."
      />
      <Section
        eyebrow="Our approach"
        title="A considered point of contact for India-focused sourcing."
        intro="Our scope brings together requirement review, potential supply identification, specification alignment, documentation coordination and responsive communication."
      >
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <PremiumCard key={value.title}>
              <value.icon className="text-[color:var(--gold)]" />
              <h3 className="mt-5 text-2xl font-semibold">{value.title}</h3>
              <p className="mt-3 leading-7 text-[color:var(--muted)]">
                {value.text}
              </p>
            </PremiumCard>
          ))}
        </div>
      </Section>
      <div className="section-tint">
        <Section
          eyebrow="What matters"
          title="Verification before representation."
        >
          <div className="mt-10 max-w-4xl text-lg leading-8 text-[color:var(--muted)]">
            <p>
              Every enquiry begins with the buyer brief. Product, quantity,
              specification, intended use, destination, timeline and buyer
              status must be understood before a suitable next step can be
              proposed.
            </p>
            <p className="mt-5">
              Catalogue entries are indicative sourcing categories. They do not
              by themselves confirm stock, supplier appointment, certification,
              pricing, export eligibility or the completion of any transaction.
            </p>
            <p className="mt-5">
              Claims relating to origin, quality, composition, sustainability,
              regulatory status or performance are repeated only after relevant
              evidence is obtained from the selected supply parties.
            </p>
          </div>
        </Section>
      </div>
    </>
  );
}
