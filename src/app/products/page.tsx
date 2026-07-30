import type { Metadata } from 'next';
import { PageHero, PremiumCard, Section } from '@/components/ui';
import { products } from '@/lib/data';
export const metadata: Metadata = { title: 'Products' };
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Product portfolio"
        title="Indian products selected for global opportunity."
        intro="Our portfolio is guided by buyer requirements. Categories shown are representative and availability, specifications, quantities, and terms are confirmed for each enquiry."
      />
      <Section eyebrow="Categories" title="Explore our sourcing focus.">
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <PremiumCard key={product.title}>
              <product.icon className="text-[color:var(--gold)]" />
              <h3 className="mt-6 text-2xl font-semibold">{product.title}</h3>
              <p className="mt-3 leading-7 text-[color:var(--muted)]">
                {product.description}
              </p>
            </PremiumCard>
          ))}
        </div>
      </Section>
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="trade-banner">
          <div>
            <p className="eyebrow">A tailored requirement?</p>
            <h2 className="text-4xl font-semibold">
              Tell us precisely what you need.
            </h2>
            <p className="mt-4 max-w-2xl text-[color:var(--muted)]">
              Share a product brief, target specification, quantity, packaging
              preference, and destination for a focused discussion.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
