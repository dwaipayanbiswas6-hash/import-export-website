import type { Metadata } from 'next';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { ProductCatalogue } from '@/components/catalogue/product-catalogue';
import { PageHero } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Export Product Catalogue',
  description:
    'Explore 87 indicative India-focused product categories for professional B2B sourcing enquiries. Availability, suppliers, specifications and documentation require verification.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Biswas Exports Product Catalogue',
    description:
      'An indicative B2B catalogue of 87 India-focused product categories for international sourcing enquiries.',
    type: 'website',
  },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="B2B Sourcing Catalogue"
        title="India-focused product categories for international enquiries."
        intro="Explore 87 indicative sourcing categories. Each enquiry remains subject to buyer verification, suitable supplier availability, written specifications, documentation, destination requirements and agreed commercial terms."
      />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <section className="mb-10 rounded-[1.5rem] border border-[color:var(--gold-soft)] bg-[color:var(--cream)] p-6 sm:rounded-[2rem] sm:p-7">
          <div className="flex items-start gap-4">
            <ShieldAlert
              aria-hidden="true"
              className="mt-1 shrink-0 text-[color:var(--gold-dark)]"
              size={24}
            />
            <div>
              <h2 className="text-xl font-semibold">Catalogue status</h2>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-[color:var(--muted)]">
                These listings do not confirm current stock, price, supplier
                appointment, certification, product registration, export
                eligibility or completion of any transaction. Product images
                are illustrative and do not represent confirmed inventory,
                packaging, factories or shipments.
              </p>
            </div>
          </div>
        </section>

        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Complete portfolio</p>
            <h2 className="break-words text-3xl font-semibold sm:text-4xl">
              Search and refine the catalogue.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[color:var(--muted)]">
            The sourcing focus is India. Actual manufacturer, product origin,
            availability and commercial terms are confirmed for the selected
            supply before quotation.
          </p>
        </div>
        <ProductCatalogue
          initialQuery={params.q ?? ''}
          initialCategory={params.category ?? ''}
        />
        <section className="contact-cta mt-16 sm:mt-20">
          <p className="eyebrow">Custom sourcing enquiry</p>
          <h2 className="max-w-3xl text-3xl font-semibold sm:text-4xl md:text-5xl">
            Need a product or specification not shown?
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-white/70">
            Share a precise buyer brief, intended use, destination, required
            quantity and timeline for an initial review.
          </p>
          <Link className="button-gold mt-8" href="/contact">
            Start an enquiry
          </Link>
        </section>
      </div>
    </>
  );
}
