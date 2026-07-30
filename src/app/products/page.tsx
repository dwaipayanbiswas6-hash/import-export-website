import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductCatalogue } from '@/components/catalogue/product-catalogue';
import { PageHero } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Export Product Catalogue',
  description:
    'Explore 87 India-origin food, textile, industrial, packaging, electrical, healthcare, home and lifestyle products for professional B2B export enquiries.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Biswas Exports Product Catalogue',
    description:
      'A professional B2B catalogue of 87 India-origin products for international sourcing enquiries.',
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
        eyebrow="B2B Export Catalogue"
        title="India-origin products for international buyers."
        intro="Explore 87 sourcing categories and products prepared for importer, distributor, manufacturing, hospitality and private-label requirements. Final specifications, packing and documentation are confirmed before quotation."
      />
      <main className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Complete portfolio</p>
            <h2 className="text-4xl font-semibold">
              Search and refine the catalogue.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[color:var(--muted)]">
            All products originate from India. Availability and commercial terms
            depend on the final specification and destination.
          </p>
        </div>
        <ProductCatalogue
          initialQuery={params.q ?? ''}
          initialCategory={params.category ?? ''}
        />
        <section className="contact-cta mt-20">
          <p className="eyebrow">Custom sourcing</p>
          <h2 className="max-w-3xl text-4xl font-semibold md:text-5xl">
            Need a product or specification not shown?
          </h2>
          <p className="mt-5 max-w-2xl text-white/70">
            Share a precise buyer brief and destination requirement for a
            focused sourcing discussion.
          </p>
          <Link className="button-gold mt-8" href="/contact">
            Start an enquiry
          </Link>
        </section>
      </main>
    </>
  );
}
