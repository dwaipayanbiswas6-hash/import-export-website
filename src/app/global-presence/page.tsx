import type { Metadata } from 'next';
import { ContactStrip, PageHero, Reveal, WorldMap } from '@/components/ui';
import { targetMarkets } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Global Markets',
  description:
    'Biswas Exports aims to connect quality Indian products with B2B buyers across international markets.',
  alternates: { canonical: '/global-presence' },
};

export default function GlobalMarketsPage() {
  return (
    <>
      <PageHero
        description="Our ambition is to develop responsible, long-term trade relationships with international buyers while representing Indian products professionally."
        eyebrow="Global Markets"
        title="From India, with a global outlook."
      />
      <section className="bg-navy px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <WorldMap />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {targetMarkets.map((market) => (
              <Reveal
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                key={market}
              >
                <p className="font-display text-2xl">{market}</p>
                <p className="mt-2 text-sm text-white/55">
                  Prospective market for future buyer relationships
                </p>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-6 text-white/55">
            The regions shown represent business development goals and markets
            we aim to serve. They do not indicate completed exports, existing
            clients or overseas offices.
          </p>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
