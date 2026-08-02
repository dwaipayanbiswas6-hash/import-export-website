import type { Metadata } from 'next';
import {
  ArrowRight,
  Inbox,
  LogOut,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { signOutAdmin } from './actions';
import { AdminNavigation } from '@/components/admin-navigation';
import {
  enquiryStatuses,
  isPortalAdmin,
  statusLabel,
  type EnquiryStatus,
  type PortalEnquiry,
} from '@/lib/portal';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Admin Enquiry Inbox',
  robots: { index: false, follow: false },
};
export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{
    q?: string;
    status?: string;
  }>;
};

export default async function AdminEnquiriesPage({ searchParams }: Props) {
  const filters = await searchParams;
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return (
      <main className="mx-auto min-h-[70vh] max-w-4xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="premium-card">
          <p className="eyebrow">Admin inbox</p>
          <h1 className="text-4xl font-semibold">Admin setup is pending.</h1>
          <p className="mt-5 leading-7 text-[color:var(--muted)]">
            Add the Supabase and administrator environment variables before
            opening the private inbox.
          </p>
        </div>
      </main>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) redirect('/portal/login?next=/admin/enquiries');
  if (!isPortalAdmin(user.email)) redirect('/');

  const admin = createAdminSupabaseClient();
  if (!admin) throw new Error('Supabase service configuration is missing.');
  const { data, error } = await admin
    .from('enquiries')
    .select(
      'id, reference, buyer_email, company_name, contact_person, job_title, company_website, country, phone, product_category, product_requirement, product_specifications, quantity, destination, timeline, incoterm, additional_notes, attachment_path, attachment_name, status, created_at, updated_at, last_activity_at',
    )
    .order('last_activity_at', { ascending: false });
  if (error) console.error('Admin inbox query failed.', error.message);
  const enquiries = (data ?? []) as PortalEnquiry[];

  const query = (filters.q ?? '').trim().toLowerCase();
  const requestedStatus = (filters.status ?? '').trim() as EnquiryStatus;
  const selectedStatus = enquiryStatuses.includes(requestedStatus)
    ? requestedStatus
    : '';
  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesStatus = !selectedStatus || enquiry.status === selectedStatus;
    const matchesQuery =
      !query ||
      [
        enquiry.reference,
        enquiry.company_name,
        enquiry.buyer_email,
        enquiry.contact_person,
        enquiry.product_category,
        enquiry.product_requirement,
        enquiry.destination,
        enquiry.country,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query);
    return matchesStatus && matchesQuery;
  });

  const activeCount = enquiries.filter(
    (enquiry) => !['won', 'closed'].includes(enquiry.status),
  ).length;
  const newCount = enquiries.filter((enquiry) => enquiry.status === 'new').length;
  const filtersActive = Boolean(query || selectedStatus);

  return (
    <main className="mx-auto min-h-[70vh] max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col justify-between gap-6 border-b border-[color:var(--line)] pb-8 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-[color:var(--gold)]" size={25} />
            <p className="eyebrow mb-0">Private administration</p>
          </div>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Enquiry inbox
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

      <AdminNavigation current="enquiries" />

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Metric label="Total enquiries" value={enquiries.length} />
        <Metric label="New enquiries" value={newCount} />
        <Metric label="Active enquiries" value={activeCount} />
      </section>

      <form
        className="mt-8 grid gap-4 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--cream)] p-5 shadow-sm md:grid-cols-[1fr_220px_auto] md:items-end"
        method="get"
      >
        <label className="grid gap-2 text-sm font-semibold" htmlFor="q">
          Search enquiries
          <div className="relative">
            <Search
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--muted)]"
              size={18}
            />
            <input
              className="w-full rounded-2xl border border-[color:var(--line)] bg-white py-3 pl-11 pr-4 outline-none focus:border-[color:var(--gold)]"
              defaultValue={filters.q ?? ''}
              id="q"
              name="q"
              placeholder="Reference, company, buyer or product"
            />
          </div>
        </label>
        <label className="grid gap-2 text-sm font-semibold" htmlFor="status">
          Status
          <select
            className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 outline-none focus:border-[color:var(--gold)]"
            defaultValue={selectedStatus}
            id="status"
            name="status"
          >
            <option value="">All statuses</option>
            {enquiryStatuses.map((status) => (
              <option key={status} value={status}>
                {statusLabel(status)}
              </option>
            ))}
          </select>
        </label>
        <button className="button-primary min-h-12" type="submit">
          <Search size={17} /> Apply filters
        </button>
      </form>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-[color:var(--muted)]">
        <p>
          Showing {filteredEnquiries.length} of {enquiries.length} enquiries
        </p>
        {filtersActive && (
          <Link className="gold-link" href="/admin/enquiries">
            <X size={16} /> Clear filters
          </Link>
        )}
      </div>

      {filteredEnquiries.length ? (
        <section className="mt-6 overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-white shadow-sm">
          <div className="hidden grid-cols-[1.1fr_1fr_.7fr_.55fr_auto] gap-4 border-b border-[color:var(--line)] bg-[color:var(--cream)] px-6 py-4 text-xs font-bold uppercase tracking-[.12em] text-[color:var(--muted)] lg:grid">
            <span>Buyer</span>
            <span>Requirement</span>
            <span>Destination</span>
            <span>Status</span>
            <span>Open</span>
          </div>
          <div className="divide-y divide-[color:var(--line)]">
            {filteredEnquiries.map((enquiry) => (
              <article
                className="grid gap-4 px-6 py-6 lg:grid-cols-[1.1fr_1fr_.7fr_.55fr_auto] lg:items-center"
                key={enquiry.id}
              >
                <div>
                  <b className="block text-lg">{enquiry.company_name}</b>
                  <span className="mt-1 block break-all text-sm text-[color:var(--muted)]">
                    {enquiry.buyer_email}
                  </span>
                  <span className="mt-1 block text-xs text-[color:var(--muted)]">
                    {enquiry.reference}
                  </span>
                </div>
                <div>
                  <b>{enquiry.product_category}</b>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-[color:var(--muted)]">
                    {enquiry.product_requirement}
                  </p>
                </div>
                <div className="text-sm text-[color:var(--muted)]">
                  {enquiry.destination}
                </div>
                <div>
                  <span className="rounded-full bg-[color:var(--cream)] px-3 py-1 text-xs font-bold uppercase tracking-[.1em] text-[color:var(--gold-dark)]">
                    {statusLabel(enquiry.status)}
                  </span>
                </div>
                <Link
                  aria-label={`Open ${enquiry.reference}`}
                  className="button-secondary min-h-11 px-4 py-2"
                  href={`/admin/enquiries/${enquiry.id}`}
                >
                  <ArrowRight size={17} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="mt-6 rounded-[2rem] border border-dashed border-[color:var(--gold-soft)] bg-[color:var(--cream)] p-10 text-center">
          <Inbox className="mx-auto text-[color:var(--gold)]" size={38} />
          <h2 className="mt-5 text-3xl font-semibold">
            {filtersActive ? 'No matching enquiries' : 'No enquiries yet'}
          </h2>
          <p className="mt-3 text-[color:var(--muted)]">
            {filtersActive
              ? 'Try a broader search or clear the selected status.'
              : 'New form submissions will appear here after they are saved.'}
          </p>
        </section>
      )}
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
