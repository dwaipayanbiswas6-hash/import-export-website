import type { Metadata } from 'next';
import { ArrowRight, Inbox, LogOut, MessageSquareText } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { signOut } from './actions';
import {
  statusLabel,
  type PortalEnquiry,
} from '@/lib/portal';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Buyer Portal',
  robots: { index: false, follow: false },
};
export const dynamic = 'force-dynamic';

export default async function BuyerPortalPage() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return (
      <main className="mx-auto min-h-[70vh] max-w-4xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="premium-card">
          <p className="eyebrow">Buyer portal</p>
          <h1 className="text-4xl font-semibold">Portal setup is pending.</h1>
          <p className="mt-5 leading-7 text-[color:var(--muted)]">
            The secure database and authentication variables have not yet been
            added to this deployment.
          </p>
        </div>
      </main>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) redirect('/portal/login');

  await supabase.rpc('claim_buyer_enquiries');
  const { data, error } = await supabase
    .from('enquiries')
    .select(
      'id, reference, buyer_email, company_name, contact_person, job_title, company_website, country, phone, product_category, product_requirement, product_specifications, quantity, destination, timeline, incoterm, additional_notes, attachment_path, attachment_name, status, created_at, updated_at, last_activity_at',
    )
    .order('last_activity_at', { ascending: false });

  if (error) console.error('Buyer portal query failed.', error.message);
  const enquiries = (data ?? []) as PortalEnquiry[];

  return (
    <main className="mx-auto min-h-[70vh] max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col justify-between gap-6 border-b border-[color:var(--line)] pb-8 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Buyer portal</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Your enquiries</h1>
          <p className="mt-4 max-w-2xl leading-7 text-[color:var(--muted)]">
            Signed in as <strong>{user.email}</strong>. Only enquiries linked to
            this verified business email are visible here.
          </p>
        </div>
        <form action={signOut}>
          <button className="button-secondary" type="submit">
            <LogOut size={17} /> Sign out
          </button>
        </form>
      </div>

      {enquiries.length ? (
        <section className="mt-10 grid gap-5">
          {enquiries.map((enquiry) => (
            <article
              className="rounded-[1.5rem] border border-[color:var(--line)] bg-white p-6 shadow-sm transition hover:border-[color:var(--gold-soft)] sm:rounded-[2rem] sm:p-8"
              key={enquiry.id}
            >
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[color:var(--cream)] px-3 py-1 text-xs font-bold uppercase tracking-[.14em] text-[color:var(--gold-dark)]">
                      {statusLabel(enquiry.status)}
                    </span>
                    <span className="text-sm text-[color:var(--muted)]">
                      {enquiry.reference}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                    {enquiry.product_category}
                  </h2>
                  <p className="mt-3 line-clamp-2 max-w-3xl leading-7 text-[color:var(--muted)]">
                    {enquiry.product_requirement}
                  </p>
                  <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                    <div>
                      <dt className="font-semibold">Quantity</dt>
                      <dd className="text-[color:var(--muted)]">
                        {enquiry.quantity}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Destination</dt>
                      <dd className="text-[color:var(--muted)]">
                        {enquiry.destination}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Submitted</dt>
                      <dd className="text-[color:var(--muted)]">
                        {new Intl.DateTimeFormat('en', {
                          dateStyle: 'medium',
                        }).format(new Date(enquiry.created_at))}
                      </dd>
                    </div>
                  </dl>
                </div>
                <Link
                  className="button-primary shrink-0"
                  href={`/portal/enquiries/${enquiry.id}`}
                >
                  View conversation <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="mt-10 rounded-[2rem] border border-dashed border-[color:var(--gold-soft)] bg-[color:var(--cream)] p-8 text-center sm:p-12">
          <Inbox className="mx-auto text-[color:var(--gold)]" size={38} />
          <h2 className="mt-5 text-3xl font-semibold">No enquiries found</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-[color:var(--muted)]">
            Submit an enquiry using this exact business email, then return here
            to see its status and responses.
          </p>
          <Link className="button-primary mt-7" href="/contact">
            Submit an enquiry
          </Link>
        </section>
      )}

      <section className="mt-12 flex items-start gap-4 rounded-2xl border border-[color:var(--line)] bg-[color:var(--cream)] p-5 text-sm leading-6 text-[color:var(--muted)]">
        <MessageSquareText
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-[color:var(--gold)]"
          size={21}
        />
        <p>
          Portal records are the primary conversation history. Email messages
          are notifications and secure sign-in links; important responses remain
          available here after login.
        </p>
      </section>
    </main>
  );
}
