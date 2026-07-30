import type { Metadata } from 'next';
import {
  ContactStrip,
  PageHero,
  Reveal,
  SectionHeading,
} from '@/components/ui';
import {
  aboutCopy,
  advantages,
  coreValues,
  mission,
  siteConfig,
  vision,
} from '@/lib/data';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${siteConfig.name}, a merchant export company in Asansol, West Bengal, connecting overseas buyers with Indian product sourcing opportunities.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        description="A young, responsible merchant export company committed to building trusted connections between Indian suppliers and international buyers."
        eyebrow="Our Company"
        title="Indian enterprise. Global outlook. Relationship-led trade."
      />
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.7fr_1.3fr]">
          <Reveal>
            <p className="eyebrow">Merchant Export Company</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-navy">
              About Biswas Exports
            </h2>
            <div className="mt-8 border-l-2 border-gold pl-6">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Head Office
              </p>
              <p className="mt-2 text-lg text-navy">{siteConfig.location}</p>
              <p className="mt-6 text-sm font-bold uppercase tracking-widest text-slate-500">
                Business Type
              </p>
              <p className="mt-2 text-lg text-navy">
                {siteConfig.businessType}
              </p>
            </div>
          </Reveal>
          <Reveal className="space-y-6 text-lg leading-8 text-slate-600">
            {aboutCopy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="bg-cream px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          {[
            ['Mission', mission],
            ['Vision', vision],
          ].map(([title, text]) => (
            <Reveal className="soft-card p-9 md:p-12" key={title}>
              <p className="eyebrow">Our {title}</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-navy">
                {title === 'Mission'
                  ? 'Trusted trade through transparent coordination.'
                  : 'Indian quality represented with global respect.'}
              </h2>
              <p className="mt-6 leading-8 text-slate-600">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            align="center"
            eyebrow="Our Principles"
            title="Values that shape every relationship."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value) => (
              <Reveal
                className="rounded-3xl border border-slate-200 p-7 text-center"
                key={value.title}
              >
                <value.icon className="mx-auto text-gold" />
                <h3 className="mt-5 font-display text-xl font-semibold text-navy">
                  {value.title}
                </h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-navy px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            align="center"
            description="A transparent, requirement-led approach to sourcing and export coordination from India."
            eyebrow="Why Choose Us"
            inverted
            title="Professional support built around buyer confidence."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((advantage) => (
              <Reveal
                className="bg-navy p-7 transition-colors hover:bg-navy-light"
                key={advantage.title}
              >
                <advantage.icon aria-hidden="true" className="text-gold" />
                <h3 className="mt-6 font-display text-xl font-semibold">
                  {advantage.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  {advantage.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
