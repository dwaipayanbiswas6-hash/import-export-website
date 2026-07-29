import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Website terms of use for Biswas Exports.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        description="Terms governing use of the Biswas Exports website."
        eyebrow="Legal"
        title="Terms of Use"
      />
      <article className="mx-auto max-w-4xl space-y-8 px-6 py-20 leading-8 text-slate-600">
        <p>
          Website content is provided for general business information and does
          not constitute a binding offer, product guarantee or confirmation of
          availability.
        </p>
        <div>
          <h2 className="font-display text-2xl font-semibold text-navy">
            Commercial enquiries
          </h2>
          <p className="mt-4">
            Product specifications, quantities, prices, timelines, documentation
            and delivery terms are subject to written review and confirmation
            for each transaction.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-navy">
            Responsible use
          </h2>
          <p className="mt-4">
            Users must not misuse this website, submit unlawful requests or
            attempt to interfere with website security or availability.
          </p>
        </div>
      </article>
    </>
  );
}
