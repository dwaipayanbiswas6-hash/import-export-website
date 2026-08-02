import type { Metadata } from 'next';
import {
  ArrowRight,
  BarChart3,
  Inbox,
  LogOut,
  PackageSearch,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { signOutAdmin } from './enquiries/actions';
import { AdminNavigation } from '@/components/admin-navigation';
import {
  enquiryStatuses,
  isPortalAdmin,
  statusLabel,
  type EnquiryStatus,
} from '@/lib/portal';
import { productCategories, products } from '@/lib/products';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};
export const dynamic = 'force-dynamic';

type DashboardEnquiry = {
  id: string;
  reference: string;
  buyer_email: string;
  company_name: string;
  product_category: string;
  product_requirement: string;
  destination: string;
  status: EnquiryStatus;
  created_at: string;
  last_activity_at: string;
};

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return <AdminSetupPending />;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) redirect('/portal/login?next=/admin');
  if (!isPortalAdmin(user.email)) redirect('/');

  const admin = createAdminSupabaseClient();
  if (!admin) throw new Error('Supabase service configuration is missing.');

  const { data, error } = await admin
    .from('enquiries')
    .select(
      'id, reference, buyer_email, company_name, product_category, product_requirement, destination, status, created_at, last_activity_at',
    )
    .order('last_activity_at', { ascending: false });
  if (error) console.error('Admin dashboard query failed.', error.message);

  const enquiries = (data ?? []) as DashboardEnquiry[];
  const newCount = enquiries.filter((item) => item.status === 'new').length;
  const activeCount = enquiries.filter(
    (item) => !['won', 'closed'].includes(item.status),
  ).length;
  const recentEnquiries = enquiries.slice(0, 5);
  const statusCounts = Object.fromEntries(
    enquiryStatuses.map((status) => [
      status,
      enquiries.filter((item) => item.status === status).length,
    ]),
  ) as Record<EnquiryStatus, number>;

  return (
    <main className="mx-auto min-h-[70vh] max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col justify-between gap-6 border-b border-[color:var(--line)] pb-8 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-[color:var(--gold)]" size={25} />
            <p className="eyebrow mb-0">Private administration</p>
          </div>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Business dashboard
          </h1>
          <p className="mt-4 text-[color:var(--muted)]">
            Signed in as {user.email}
          </p>
        </div>
        <form action={signOutAdmin}>
          <button className="button-secondary" type="submit">
            <LogOut size={17} /> Sign out
          </button>
        </form>
      </div>

      <AdminNavigation current="dashboard" />

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Total enquiries" value={enquiries.length} />
        <Metric label="New enquiries" value={newCount} />
        <Metric label="Active enquiries" value={activeCount} />
        <Metric label="Catalogue products" value={products.length} />
      </section>

      <section className="mt-10 grid gap-8 xl:grid-cols-[1.35fr_.65fr]">
        <div className="overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--line)] bg-[color:var(--cream)] px-6 py-5">
            <div>
              <p className="eyebrow mb-1">Latest activity</p>
              <h2 className="text-2xl font-semibold">Recent enquiries</h2>
            </div>
            <Link className="gold-link" href="/admin/enquiries">
              View inbox <ArrowRight size={16} />
            </Link>
          </div>

          {recentEnquiries.length ? (
            <div className="divide-y divide-[color:var(--line)]">
              {recentEnquiries.map((enquiry) => (
                <Link
                  className="grid gap-3 px-6 py-5 transition hover:bg-[color:var(--cream)] sm:grid-cols-[1fr_.7fr_auto] sm:items-center"
                  href={`/admin/enquiries/${enquiry.id}`}
                  key={enquiry.id}
                >
                  <div>
                    <b className="block">{enquiry.company_name}</b>
                    <span className="mt-1 block text-xs text-[color:var(--muted)]">
                      {enquiry.reference} · {enquiry.product_category}
                    </span>
                  </div>
                  <span className="text-sm text-[color:var(--muted)]">
                    {enquiry.destination}
                  </span>
                  <span className="justify-self-start rounded-full bg-[color:var(--cream)] px-3 py-1 text-xs font-bold uppercase tracking-[.1em] text-[color:var(--gold-dark)] sm:justify-self-end">
                    {statusLabel(enquiry.status)}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <Inbox className="mx-auto text-[color:var(--gold)]" size={36} />
              <h3 className="mt-4 text-2xl font-semibold">No enquiries yet</h3>
              <p className="mt-2 text-[color:var(--muted)]">
                New buyer submissions will appear here automatically.
              </p>
            </div>
          )}
        </div>

        <div className="grid gap-8">
          <section className="rounded-[2rem] border border-[color:var(--line)] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-[color:var(--gold)]" size={22} />
              <h2 className="text-2xl font-semibold">Enquiry pipeline</h2>
            </div>
            <div className="mt-6 grid gap-3">
              {enquiryStatuses.map((status) => (
                <div
                  className="flex items-center justify-between rounded-xl bg-[color:var(--cream)] px-4 py-3"
                  key={status}
                >
                  <span className="text-sm font-semibold">
                    {statusLabel(status)}
                  </span>
                  <b>{statusCounts[status]}</b>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--cream)] p-6">
            <div className="flex items-center gap-3">
              <PackageSearch className="text-[color:var(--gold)]" size={22} />
              <h2 className="text-2xl font-semibold">Catalogue</h2>
            </div>
            <p className="mt-4 leading-7 text-[color:var(--muted)]">
              {products.length} products across {productCategories.length}{' '}
              categories are currently published. Product editing will be added
              in the next Phase 3 module.
            </p>
            <Link className="button-secondary mt-6" href="/admin/products">
              Review catalogue <ArrowRight size={16} />
            </Link>
          </section>
        </div>
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

function AdminSetupPending() {
  return (
    <main className="mx-auto min-h-[70vh] max-w-4xl px-5 py-20 sm:px-6 lg:px-8">
      <div className="premium-card">
        <p className="eyebrow">Admin dashboard</p>
        <h1 className="text-4xl font-semibold">Admin setup is pending.</h1>
        <p className="mt-5 leading-7 text-[color:var(--muted)]">
          Add the Supabase and administrator environment variables before
          opening the private dashboard.
        </p>
      </div>
    </main>
  );
}
