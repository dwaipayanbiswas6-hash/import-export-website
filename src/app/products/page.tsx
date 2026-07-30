import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  ContactStrip,
  PageHero,
  Reveal,
  SectionHeading,
} from '@/components/ui';
import { products } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Product Sourcing',
  description:
    'Explore flexible Indian product sourcing categories from Biswas Exports for international B2B buyer requirements.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        description="Our product portfolio is deliberately flexible and ready to expand. Share your specifications and we will assess suitable sourcing options across India."
        eyebrow="Product Portfolio"
        title="Requirement-led sourcing for global buyers."
      />
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            description="These categories are representative placeholders rather than a claim of permanent inventory. Availability, specifications and commercial terms are confirmed for each enquiry."
            eyebrow="Sourcing Categories"
            title="A future-ready product structure."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Reveal
                className="soft-card flex min-h-80 flex-col p-8"
                key={product.title}
              >
                <span className="font-display text-5xl text-gold/40">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-8 text-xs font-bold uppercase tracking-widest text-gold">
                  {product.category}
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-navy">
                  {product.title}
                </h2>
                <p className="mt-4 flex-1 leading-7 text-slate-600">
                  {product.description}
                </p>
                <Link
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-gold"
                  href="/contact"
                >
                  Enquire about this category <ArrowRight size={16} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
