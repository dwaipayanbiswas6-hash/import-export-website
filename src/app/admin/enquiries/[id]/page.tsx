import type { Metadata } from 'next';
import { ArrowLeft, Download, Send, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { sendAdminReply, updateEnquiryStatus } from '../actions';
import { createPortalFileUrl } from '@/lib/portal-files';
import {
  enquiryStatuses,
  isPortalAdmin,
  statusLabel,
  type PortalEnquiry,
  type PortalMessage,
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
    sent?: string;
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
  if (!isPortalAdmin(user.email)) redirect('/portal');

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

  const { data: messageData, error: messageError } = await admin
    .from('enquiry_messages')
    .select(
      'id, enquiry_id, sender_role, sender_email, body, attachment_path, attachment_name, created_at',
    )
    .eq('enquiry_id', id)
    .order('created_at', { ascending: true });
  if (messageError) console.error('Admin messages query failed.', messageError.message);
  const messages = (messageData ?? []) as PortalMessage[];

  const initialAttachmentUrl = await createPortalFileUrl(enquiry.attachment_path);
  const messageLinks = new Map<string, string>();
  await Promise.all(
    messages.map(async (message) => {
      const url = await createPortalFileUrl(message.attachment_path);
      if (url) messageLinks.set(message.id, url);
    }),
  );

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
              <Download size={17} /> Buyer RFQ
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

          {(notice.sent === '1' || notice.updated === '1') && (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              {notice.sent === '1'
                ? 'The response is saved in the buyer portal.'
                : 'The enquiry status has been updated.'}
            </div>
          )}
          {notice.error && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              The requested action could not be completed. Check the message,
              attachment and portal configuration, then try again.
            </div>
          )}

          <div className="mt-8 grid gap-4">
            {messages.map((message) => {
              const fromAdmin = message.sender_role === 'admin';
              const fromSystem = message.sender_role === 'system';
              return (
                <article
                  className={`max-w-3xl rounded-[1.5rem] border p-5 sm:p-6 ${
                    fromAdmin
                      ? 'ml-auto border-[color:var(--gold-soft)] bg-[color:var(--cream)]'
                      : fromSystem
                        ? 'border-[color:var(--line)] bg-slate-50'
                        : 'border-[color:var(--line)] bg-white'
                  }`}
                  key={message.id}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[.12em] text-[color:var(--muted)]">
                    <b>
                      {fromAdmin
                        ? 'Biswas Exports'
                        : fromSystem
                          ? 'Portal update'
                          : enquiry.company_name}
                    </b>
                    <time dateTime={message.created_at}>
                      {new Intl.DateTimeFormat('en', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      }).format(new Date(message.created_at))}
                    </time>
                  </div>
                  <p className="mt-4 whitespace-pre-wrap leading-7">
                    {message.body}
                  </p>
                  {messageLinks.get(message.id) && (
                    <a
                      className="gold-link mt-5"
                      href={messageLinks.get(message.id)}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Download size={16} />
                      {message.attachment_name || 'Download attachment'}
                    </a>
                  )}
                </article>
              );
            })}
          </div>

          <form
            action={sendAdminReply}
            className="mt-8 rounded-[2rem] border border-[color:var(--line)] bg-white p-6 shadow-sm sm:p-8"
          >
            <input name="enquiryId" type="hidden" value={enquiry.id} />
            <label className="grid gap-3 font-semibold" htmlFor="body">
              Post a portal response
              <textarea
                className="min-h-40 w-full resize-y rounded-2xl border border-[color:var(--line)] px-4 py-3.5 font-normal outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold-soft)]"
                id="body"
                maxLength={10000}
                name="body"
                required
              />
            </label>
            <label className="mt-5 grid gap-2 text-sm font-semibold" htmlFor="attachment">
              Optional quotation or document
              <input
                accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg"
                className="rounded-2xl border border-dashed border-[color:var(--gold-soft)] bg-[color:var(--cream)] p-4 font-normal"
                id="attachment"
                name="attachment"
                type="file"
              />
              <span className="font-normal text-[color:var(--muted)]">
                PDF, DOCX, XLSX, PNG or JPG · Maximum 10 MB
              </span>
            </label>
            <button className="button-primary mt-6" type="submit">
              Save response <Send size={17} />
            </button>
          </form>
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
