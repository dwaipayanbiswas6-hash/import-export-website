import type { Metadata } from 'next';
import { ExternalLink, LogOut, PackageSearch, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { signOutAdmin } from '../enquiries/actions';
import { AdminNavigation } from '@/components/admin-navigation';
import { isPortalAdmin } from '@/lib/portal';
import {
  getCategoryCounts,
  getFeaturedProducts,
  productCategories,
  products,
} from '@/lib/products';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Admin Product Catalogue',
  robots: { index: false, follow: false },
};
export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return (
      <main className="mx-auto min-h-[70vh] max-w-4xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="premium-card">
          <p className="eyebrow">Product administration</p>
          <h1 className="text-4xl font-semibold">Admin setup is pending.</h1>
        </div>
      </main>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) redirect('/portal/login?next=/admin/products');
  if (!isPortalAdmin(user.email)) redirect('/');

  const counts = getCategoryCounts();
  const featuredCount = getFeaturedProducts().length;

  return (
    <main className="mx-auto min-h-[70vh] max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col justify-between gap-6 border-b border-[color:var(--line)] pb-8 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-[color:var(--gold)]" size={25} />
            <p className="eyebrow mb-0">Private administration</p>
          </div>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Product catalogue
          </h1>
          <p className="mt-4 text-[color:var(--muted)]">
            Read-only catalogue overview · signed in as {user.email}
          </p>
        </div>
        <form action={signOutAdmin}>
          <button className="button-secondary" type="submit">
            <LogOut size={17} /> Sign out
          </button>
        </form>
      </div>

      <AdminNavigation current="products" />

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Metric label="Published products" value={products.length} />
        <Metric label="Categories" value={productCategories.length} />
        <Metric label="Featured products" value={featuredCount} />
      </section>

      <section className="mt-10 overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--line)] bg-[color:var(--cream)] px-6 py-5">
          <div>
            <p className="eyebrow mb-1">Catalogue structure</p>
            <h2 className="text-2xl font-semibold">Products by category</h2>
          </div>
          <Link className="button-secondary" href="/products" target="_blank">
            Open public catalogue <ExternalLink size={16} />
          </Link>
        </div>
        <div className="grid gap-px bg-[color:var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((category) => (
            <article className="bg-white p-6" key={category}>
              <PackageSearch className="text-[color:var(--gold)]" size={22} />
              <h3 className="mt-4 text-lg font-semibold">{category}</h3>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                {counts[category]} products
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-dashed border-[color:var(--gold-soft)] bg-[color:var(--cream)] p-8">
        <p className="eyebrow">Phase 3B</p>
        <h2 className="text-3xl font-semibold">Product editing comes next.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[color:var(--muted)]">
          The next module will add controlled product creation, editing,
          visibility settings and image management. This page is intentionally
          read-only until those controls and audit safeguards are ready.
        </p>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[color:var(--line)] bg-white p-5 shadow-sm">
      <p className="text-sm text-[color:var(--muted)]">{label}</p>
      <p className="mt-2 font-display text-4xl font-semibold">{value}</p>
    </div>
  );
}
