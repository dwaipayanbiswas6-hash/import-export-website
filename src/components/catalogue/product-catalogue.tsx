'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ProductCard } from './product-card';
import {
  filterProducts,
  getCategoryCounts,
  productCategories,
  products,
  type ProductCategory,
} from '@/lib/products';

export function ProductCatalogue({
  initialQuery = '',
  initialCategory = '',
}: {
  initialQuery?: string;
  initialCategory?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const validCategory = productCategories.includes(
    initialCategory as ProductCategory,
  )
    ? initialCategory
    : '';
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(validCategory);
  const counts = getCategoryCounts();
  const filtered = useMemo(
    () => filterProducts(query, category),
    [query, category],
  );
  function update(nextQuery: string, nextCategory: string) {
    const params = new URLSearchParams();
    if (nextQuery.trim()) params.set('q', nextQuery.trim());
    if (nextCategory) params.set('category', nextCategory);
    router.replace(params.size ? `${pathname}?${params}` : pathname, {
      scroll: false,
    });
  }
  function changeQuery(value: string) {
    setQuery(value);
    update(value, category);
  }
  function changeCategory(value: string) {
    setCategory(value);
    update(query, value);
  }
  function reset() {
    setQuery('');
    setCategory('');
    router.replace(pathname, { scroll: false });
  }
  return (
    <div>
      <div className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--cream)] p-5 md:p-7">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <label
            className="grid gap-2 text-sm font-semibold"
            htmlFor="catalogue-search"
          >
            <span className="flex items-center gap-2">
              <Search size={17} aria-hidden="true" />
              Search the catalogue
            </span>
            <input
              id="catalogue-search"
              type="search"
              value={query}
              onChange={(event) => changeQuery(event.target.value)}
              placeholder="Search products, categories or applications"
              className="min-h-12 rounded-full border border-[color:var(--line)] bg-[color:var(--card)] px-5 outline-none transition focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold-soft)]"
            />
          </label>
          <button
            type="button"
            className="button-secondary min-h-12"
            onClick={reset}
          >
            Reset filters
          </button>
        </div>
        <fieldset className="mt-6">
          <legend className="flex items-center gap-2 text-sm font-semibold">
            <SlidersHorizontal size={17} aria-hidden="true" />
            Filter by category
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <FilterButton active={!category} onClick={() => changeCategory('')}>
              All Products <span>({products.length})</span>
            </FilterButton>
            {productCategories.map((item) => (
              <FilterButton
                active={category === item}
                key={item}
                onClick={() => changeCategory(item)}
              >
                {item} <span>({counts[item]})</span>
              </FilterButton>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="my-8 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="font-semibold">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'}{' '}
          found
        </p>
        {(query || category) && (
          <p className="text-sm text-[color:var(--muted)]">
            Filtered catalogue view
          </p>
        )}
      </div>
      {filtered.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-[color:var(--gold-soft)] bg-[color:var(--cream)] px-6 py-16 text-center">
          <h2 className="text-3xl font-semibold">
            No products match these filters.
          </h2>
          <p className="mt-3 text-[color:var(--muted)]">
            Try a broader search or view the complete catalogue.
          </p>
          <button className="button-primary mt-6" type="button" onClick={reset}>
            View all products
          </button>
        </div>
      )}
    </div>
  );
}
function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-pressed={active}
      type="button"
      onClick={onClick}
      className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--gold)] ${active ? 'border-[color:var(--gold)] bg-[color:var(--gold)] text-white' : 'border-[color:var(--line)] bg-[color:var(--card)] hover:border-[color:var(--gold-soft)]'}`}
    >
      {children}
    </button>
  );
}
