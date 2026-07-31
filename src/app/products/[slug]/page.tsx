import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, PackageCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/catalogue/product-card';
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/products';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: `${product.name} Export Enquiries`,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | Biswas Exports`,
      description: product.shortDescription,
      images: [{ url: product.image, alt: product.imageAlt }],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);
  const quoteHref = `/contact?product=${encodeURIComponent(product.slug)}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.image,
    brand: { '@type': 'Brand', name: 'Biswas Exports' },
    countryOfOrigin: { '@type': 'Country', name: 'India' },
    category: product.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll('<', '\\u003c'),
        }}
      />
      <div className="border-b border-[color:var(--line)] bg-[color:var(--cream)]">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6 sm:py-5 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-[color:var(--muted)]"
          >
            <Link className="hover:text-[color:var(--gold-dark)]" href="/">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              className="hover:text-[color:var(--gold-dark)]"
              href="/products"
            >
              Products
            </Link>
            <span aria-hidden="true">/</span>
            <span className="min-w-0 break-words" aria-current="page">
              {product.name}
            </span>
          </nav>
        </div>
      </div>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--cream)] shadow-xl sm:rounded-[2.5rem]">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="self-center">
          <p className="eyebrow">{product.category}</p>
          <h1 className="break-words text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
            {product.name}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[color:var(--muted)] sm:mt-6 sm:text-xl">
            {product.shortDescription}
          </p>
          <dl className="mt-7 grid gap-4 border-y border-[color:var(--line)] py-6 sm:mt-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-[color:var(--muted)]">
                Origin
              </dt>
              <dd className="mt-1 text-lg font-semibold">{product.origin}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[color:var(--muted)]">
                Minimum order
              </dt>
              <dd className="mt-1 text-lg font-semibold">
                {product.moq.replace('MOQ: ', '')}
              </dd>
            </div>
          </dl>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Link className="button-primary w-full sm:w-auto" href={quoteHref}>
              Request quote <ArrowRight size={18} />
            </Link>
            <Link
              className="button-secondary w-full sm:w-auto"
              href="/products"
            >
              <ArrowLeft size={18} /> Back to catalogue
            </Link>
          </div>
        </div>
      </section>
      <section className="section-tint">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_.85fr] lg:gap-12 lg:px-8">
          <div>
            <p className="eyebrow">Product overview</p>
            <h2 className="break-words text-3xl font-semibold sm:text-4xl">
              Commercial sourcing information
            </h2>
            <p className="mt-5 text-base leading-7 text-[color:var(--muted)] sm:mt-6 sm:text-lg sm:leading-8">
              {product.description}
            </p>
            <h3 className="mt-9 text-2xl font-semibold sm:mt-10">
              Typical applications
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {product.applications.map((item) => (
                <li className="flex gap-3" key={item}>
                  <Check
                    className="mt-1 shrink-0 text-[color:var(--gold)]"
                    size={18}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--card)] p-6 shadow-lg sm:rounded-[2rem] sm:p-7">
            <PackageCheck className="text-[color:var(--gold)]" />
            <h2 className="mt-5 text-3xl font-semibold">Packaging options</h2>
            <ul className="mt-5 grid gap-3 text-[color:var(--muted)]">
              {product.packagingOptions.map((item) => (
                <li
                  className="border-b border-[color:var(--line)] pb-3"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-6 text-[color:var(--muted)]">
              Packaging can be discussed based on product specification, order
              volume, transit conditions and destination rules.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="eyebrow">Specification framework</p>
          <h2 className="break-words text-3xl font-semibold sm:text-4xl">
            Details confirmed before quotation
          </h2>
          <dl className="mt-7 overflow-hidden rounded-[1.5rem] border border-[color:var(--line)] sm:mt-8 sm:rounded-[2rem]">
            {product.specifications.map((spec) => (
              <div
                className="grid gap-1 border-b border-[color:var(--line)] p-5 last:border-0 sm:grid-cols-[.8fr_1.2fr]"
                key={spec.label}
              >
                <dt className="font-semibold">{spec.label}</dt>
                <dd className="break-words text-[color:var(--muted)]">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <p className="eyebrow">Buyer notes</p>
          <h2 className="break-words text-3xl font-semibold sm:text-4xl">
            Documentation and review
          </h2>
          <div className="mt-7 rounded-[1.5rem] border-l-4 border-[color:var(--gold)] bg-[color:var(--cream)] p-6 sm:mt-8 sm:rounded-[2rem] sm:p-7">
            <ul className="grid gap-4 leading-7 text-[color:var(--muted)]">
              {product.buyerNotes?.map((note) => (
                <li key={note}>{note}</li>
              ))}
              <li>
                Final specifications, packaging, documentation, lead time and
                commercial terms are confirmed in writing before an order.
              </li>
            </ul>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="border-t border-[color:var(--line)]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
            <p className="eyebrow">Related products</p>
            <h2 className="break-words text-3xl font-semibold sm:text-4xl">
              More from {product.category}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:mt-10 xl:grid-cols-3">
              {related.map((item) => (
                <ProductCard product={item} key={item.id} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
