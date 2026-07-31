import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/products';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--card)] shadow-[0_18px_55px_rgba(53,39,17,.07)] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--gold-soft)] hover:shadow-[0_24px_65px_rgba(53,39,17,.12)] sm:rounded-[2rem]">
      <Link
        className="relative block aspect-[4/3] overflow-hidden bg-[color:var(--cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--gold)]"
        href={`/products/${product.slug}`}
        aria-label={`View details for ${product.name}`}
      >
        <Image
          className="object-cover transition duration-500 group-hover:scale-[1.025]"
          src={product.image}
          alt={product.imageAlt}
          fill
          quality={84}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="break-words text-xs font-bold uppercase tracking-[.15em] text-[color:var(--gold-dark)] sm:tracking-[.18em]">
          {product.category}
        </p>
        <h2 className="mt-3 break-words text-xl font-semibold leading-tight sm:text-2xl">
          <Link
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--gold)]"
            href={`/products/${product.slug}`}
          >
            {product.name}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[color:var(--muted)]">
          {product.shortDescription}
        </p>
        <dl className="mt-5 grid gap-3 border-t border-[color:var(--line)] pt-5 text-sm">
          <div>
            <dt className="font-semibold">Packaging</dt>
            <dd className="mt-1 line-clamp-2 break-words text-[color:var(--muted)]">
              {product.packagingOptions[0]}
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Minimum order</dt>
            <dd className="mt-1 break-words text-[color:var(--muted)]">
              {product.moq.replace('MOQ: ', '')}
            </dd>
          </div>
        </dl>
        <div className="mt-auto grid gap-3 pt-6 sm:grid-cols-2">
          <Link
            className="button-secondary min-h-11 w-full px-4 py-2 text-center"
            href={`/products/${product.slug}`}
          >
            View details
          </Link>
          <Link
            className="button-primary min-h-11 w-full px-4 py-2 text-center"
            href={`/contact?product=${encodeURIComponent(product.slug)}`}
          >
            Request quote
          </Link>
        </div>
      </div>
    </article>
  );
}
