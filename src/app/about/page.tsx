import type { Metadata } from 'next';
import { PageHero, PremiumCard, Section } from '@/components/ui';
import { values } from '@/lib/data';
export const metadata: Metadata = { title: 'About' };
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="About Biswas Exports"
        title="Trade built on clarity, care, and commercial purpose."
        intro="Biswas Exports is an India-based export company helping international buyers discover and coordinate suitable Indian products from Asansol, West Bengal."
      />
      <Section
        eyebrow="Our approach"
        title="A considered partner for Indian sourcing."
        intro="We bring together product discovery, requirement alignment, export preparation, and responsive communication in one focused relationship."
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
          title="Thoughtful execution over empty claims."
        >
          <div className="mt-10 max-w-4xl text-lg leading-8 text-[color:var(--muted)]">
            <p>
              Every enquiry begins with listening. We seek to understand the
              buyer’s specifications, commercial needs, destination, and
              timeline before proposing an appropriate path forward.
            </p>
            <p className="mt-5">
              Our role is to make cross-border coordination more composed and
              transparent—without overstating what has not been agreed or
              verified.
            </p>
          </div>
        </Section>
      </div>
    </>
  );
}
