import type { Metadata } from 'next';
import { ArrowLeft, Download, Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { updateEnquiryStatus } from '../actions';
import { createPortalFileUrl } from '@/lib/portal-files';
import {
  enquiryStatuses,
  isPortalAdmin,
  statusLabel,
  type PortalEnquiry,
} from '@/lib/portal';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Admin Enquiry Workspace',
  robots: { index: false, follow: false },
};
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    updated?: string;
    error?: string;
  }>;
};

export default async function AdminEnquiryPage({ params, searchParams }: Props) {
  const [{ id }, notice] = await Promise.all([params, searchParams]);
  const supabase = await createServerSupabaseClient();
  if (!supabase) redirect('/portal/login?next=/admin/enquiries');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    redirect(`/portal/login?next=/admin/enquiries/${id}`);
  }
  if (!isPortalAdmin(user.email)) redirect('/');

  const admin = createAdminSupabaseClient();
  if (!admin) throw new Error('Supabase service configuration is missing.');

  const { data: enquiryData, error: enquiryError } = await admin
    .from('enquiries')
    .select(
      'id, reference, buyer_email, company_name, contact_person, job_title, company_website, country, phone, product_category, product_requirement, product_specifications, quantity, destination, timeline, incoterm, additional_notes, attachment_path, attachment_name, status, created_at, updated_at, last_activity_at',
    )
    .eq('id', id)
    .maybeSingle();
  if (enquiryError) console.error('Admin enquiry query failed.', enquiryError.message);
  if (!enquiryData) notFound();
  const enquiry = enquiryData as PortalEnquiry;

  const initialAttachmentUrl = await createPortalFileUrl(enquiry.attachment_path);
  const emailSubject = encodeURIComponent(
    `Re: Biswas Exports enquiry ${enquiry.reference}`,
  );
  const emailBody = encodeURIComponent(
    `Hello ${enquiry.contact_person},\n\nThank you for your enquiry ${enquiry.reference}.\n\n`,
  );
  const emailHref = `mailto:${enquiry.buyer_email}?subject=${emailSubject}&body=${emailBody}`;

  return (
    <main className="mx-auto min-h-[70vh] max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
      <Link className="gold-link" href="/admin/enquiries">
        <ArrowLeft size={16} /> Back to admin inbox
      </Link>

      <div className="mt-8 grid gap-8 xl:grid-cols-[.75fr_1.25fr]">
        <aside className="self-start rounded-[2rem] border border-[color:var(--line)] bg-white p-6 shadow-sm sm:p-8 xl:sticky xl:top-28">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-[color:var(--gold)]" size={24} />
            <p className="eyebrow mb-0">Admin workspace</p>
          </div>
          <h1 className="mt-4 break-words text-3xl font-semibold">
            {enquiry.reference}
          </h1>
          <p className="mt-2 text-lg font-semibold">{enquiry.company_name}</p>
          <a
            className="contact-link mt-1 block break-all text-sm"
            href={`mailto:${enquiry.buyer_email}`}
          >
            {enquiry.buyer_email}
          </a>

          <a className="button-primary mt-6 w-full" href={emailHref}>
            <Mail size={17} /> Reply by email
          </a>
          <p className="mt-3 text-xs leading-5 text-[color:var(--muted)]">
            This opens the email application on your device. Send the response
            from the official Biswas Exports mailbox, such as
            contact@biswasexports.com, once that mailbox is configured.
          </p>

          <form
            action={updateEnquiryStatus}
            className="mt-7 border-t border-[color:var(--line)] pt-6"
          >
            <input name="enquiryId" type="hidden" value={enquiry.id} />
            <label className="grid gap-2 text-sm font-semibold" htmlFor="status">
              Enquiry status
              <select
                className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 outline-none focus:border-[color:var(--gold)]"
                defaultValue={enquiry.status}
                id="status"
                name="status"
              >
                {enquiryStatuses.map((status) => (
                  <option key={status} value={status}>
                    {statusLabel(status)}
                  </option>
                ))}
              </select>
            </label>
            <button className="button-secondary mt-4 w-full" type="submit">
              Update status
            </button>
          </form>

          <dl className="mt-7 grid gap-4 border-t border-[color:var(--line)] pt-6 text-sm">
            <Detail label="Contact person" value={enquiry.contact_person} />
            <Detail label="Job title" value={enquiry.job_title} />
            <Detail label="Phone / WhatsApp" value={enquiry.phone} />
            <Detail label="Country" value={enquiry.country} />
            <Detail label="Destination" value={enquiry.destination} />
            <Detail label="Quantity" value={enquiry.quantity} />
            <Detail label="Timeline" value={enquiry.timeline} />
            <Detail label="Incoterm" value={enquiry.incoterm || 'Not decided'} />
          </dl>

          {initialAttachmentUrl && (
            <a
              className="button-secondary mt-6 w-full"
              href={initialAttachmentUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Download size={17} /> Download buyer RFQ
            </a>
          )}
        </aside>

        <section>
          <div className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--cream)] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="eyebrow">{enquiry.product_category}</p>
                <h2 className="text-3xl font-semibold">Buyer requirement</h2>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[.12em] text-[color:var(--gold-dark)]">
                {statusLabel(enquiry.status)}
              </span>
            </div>
            <p className="mt-5 whitespace-pre-wrap leading-7 text-[color:var(--muted)]">
              {enquiry.product_requirement}
            </p>
            {enquiry.product_specifications && (
              <div className="mt-6 border-t border-[color:var(--line)] pt-6">
                <b>Specifications</b>
                <p className="mt-3 whitespace-pre-wrap leading-7 text-[color:var(--muted)]">
                  {enquiry.product_specifications}
                </p>
              </div>
            )}
            {enquiry.additional_notes && (
              <div className="mt-6 border-t border-[color:var(--line)] pt-6">
                <b>Additional notes</b>
                <p className="mt-3 whitespace-pre-wrap leading-7 text-[color:var(--muted)]">
                  {enquiry.additional_notes}
                </p>
              </div>
            )}
          </div>

          {notice.updated === '1' && (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              The enquiry status has been updated.
            </div>
          )}
          {notice.error && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              The requested action could not be completed. Please try again.
            </div>
          )}

          <div className="mt-8 rounded-[2rem] border border-[color:var(--line)] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold">Direct email workflow</h2>
            <p className="mt-4 leading-7 text-[color:var(--muted)]">
              Buyer portal messaging is disabled. Reply to the buyer’s verified
              business email, keep the enquiry reference in the subject line and
              update the status here after sending.
            </p>
            <a className="button-primary mt-6" href={emailHref}>
              <Mail size={17} /> Compose email to buyer
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold">{label}</dt>
      <dd className="mt-1 break-words text-[color:var(--muted)]">{value}</dd>
    </div>
  );
}
