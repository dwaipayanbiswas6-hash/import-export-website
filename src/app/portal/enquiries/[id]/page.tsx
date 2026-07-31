import type { Metadata } from 'next';
import { ArrowLeft, Download, MessageSquareText, Send } from 'lucide-react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { replyToEnquiry } from '../../actions';
import { createPortalFileUrl } from '@/lib/portal-files';
import {
  statusLabel,
  type PortalEnquiry,
  type PortalMessage,
} from '@/lib/portal';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Enquiry Conversation',
  robots: { index: false, follow: false },
};
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sent?: string; error?: string }>;
};

export default async function BuyerEnquiryPage({ params, searchParams }: Props) {
  const [{ id }, notice] = await Promise.all([params, searchParams]);
  const supabase = await createServerSupabaseClient();
  if (!supabase) redirect('/portal/login');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) redirect(`/portal/login?next=/portal/enquiries/${id}`);

  await supabase.rpc('claim_buyer_enquiries');
  const { data: enquiryData, error: enquiryError } = await supabase
    .from('enquiries')
    .select(
      'id, reference, buyer_email, company_name, contact_person, job_title, company_website, country, phone, product_category, product_requirement, product_specifications, quantity, destination, timeline, incoterm, additional_notes, attachment_path, attachment_name, status, created_at, updated_at, last_activity_at',
    )
    .eq('id', id)
    .maybeSingle();

  if (enquiryError) console.error('Portal enquiry query failed.', enquiryError.message);
  if (!enquiryData) notFound();
  const enquiry = enquiryData as PortalEnquiry;

  const { data: messageData, error: messageError } = await supabase
    .from('enquiry_messages')
    .select(
      'id, enquiry_id, sender_role, sender_email, body, attachment_path, attachment_name, created_at',
    )
    .eq('enquiry_id', id)
    .order('created_at', { ascending: true });
  if (messageError) console.error('Portal messages query failed.', messageError.message);

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
    <main className="mx-auto min-h-[70vh] max-w-6xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
      <Link className="gold-link" href="/portal">
        <ArrowLeft size={16} /> Back to all enquiries
      </Link>

      <section className="mt-8 rounded-[2rem] border border-[color:var(--line)] bg-white p-6 shadow-sm sm:p-9">
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
            <h1 className="mt-4 text-3xl font-semibold sm:text-5xl">
              {enquiry.product_category}
            </h1>
            <p className="mt-5 max-w-3xl whitespace-pre-wrap leading-7 text-[color:var(--muted)]">
              {enquiry.product_requirement}
            </p>
          </div>
          <div className="rounded-2xl bg-[color:var(--cream)] p-4 text-sm">
            <b>Submitted</b>
            <p className="mt-1 text-[color:var(--muted)]">
              {new Intl.DateTimeFormat('en', {
                dateStyle: 'medium',
                timeStyle: 'short',
              }).format(new Date(enquiry.created_at))}
            </p>
          </div>
        </div>

        <dl className="mt-8 grid gap-5 border-t border-[color:var(--line)] pt-7 sm:grid-cols-2 lg:grid-cols-4">
          <Detail label="Company" value={enquiry.company_name} />
          <Detail label="Quantity" value={enquiry.quantity} />
          <Detail label="Destination" value={enquiry.destination} />
          <Detail label="Timeline" value={enquiry.timeline} />
          <Detail label="Incoterm" value={enquiry.incoterm || 'Not decided'} />
          <Detail label="Country" value={enquiry.country} />
          <Detail label="Contact" value={enquiry.contact_person} />
          <Detail label="Phone / WhatsApp" value={enquiry.phone} />
        </dl>

        {enquiry.product_specifications && (
          <div className="mt-7 border-t border-[color:var(--line)] pt-7">
            <h2 className="font-semibold">Product specifications</h2>
            <p className="mt-3 whitespace-pre-wrap leading-7 text-[color:var(--muted)]">
              {enquiry.product_specifications}
            </p>
          </div>
        )}

        {initialAttachmentUrl && (
          <a
            className="button-secondary mt-7"
            href={initialAttachmentUrl}
            rel="noreferrer"
            target="_blank"
          >
            <Download size={17} /> Download submitted RFQ
          </a>
        )}
      </section>

      <section className="mt-10">
        <div className="flex items-center gap-3">
          <MessageSquareText className="text-[color:var(--gold)]" />
          <h2 className="text-3xl font-semibold">Conversation</h2>
        </div>

        {notice.sent === '1' && (
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            Your reply has been saved in the portal.
          </div>
        )}
        {notice.error && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            We could not save that reply. Review the message and try again.
          </div>
        )}

        <div className="mt-6 grid gap-4">
          {messages.map((message) => {
            const adminMessage = message.sender_role === 'admin';
            const systemMessage = message.sender_role === 'system';
            return (
              <article
                className={`max-w-3xl rounded-[1.5rem] border p-5 sm:p-6 ${
                  adminMessage
                    ? 'border-[color:var(--gold-soft)] bg-[color:var(--cream)]'
                    : systemMessage
                      ? 'border-[color:var(--line)] bg-slate-50'
                      : 'ml-auto border-[color:var(--line)] bg-white'
                }`}
                key={message.id}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[.12em] text-[color:var(--muted)]">
                  <b>
                    {adminMessage
                      ? 'Biswas Exports'
                      : systemMessage
                        ? 'Portal update'
                        : 'You'}
                  </b>
                  <time dateTime={message.created_at}>
                    {new Intl.DateTimeFormat('en', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    }).format(new Date(message.created_at))}
                  </time>
                </div>
                <p className="mt-4 whitespace-pre-wrap leading-7">{message.body}</p>
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

        {enquiry.status !== 'closed' ? (
          <form
            action={replyToEnquiry}
            className="mt-8 rounded-[2rem] border border-[color:var(--line)] bg-white p-6 shadow-sm sm:p-8"
          >
            <input name="enquiryId" type="hidden" value={enquiry.id} />
            <label className="grid gap-3 font-semibold" htmlFor="body">
              Reply to Biswas Exports
              <textarea
                className="min-h-36 w-full resize-y rounded-2xl border border-[color:var(--line)] px-4 py-3.5 font-normal outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold-soft)]"
                id="body"
                maxLength={10000}
                name="body"
                required
              />
            </label>
            <button className="button-primary mt-5" type="submit">
              Save reply <Send size={17} />
            </button>
          </form>
        ) : (
          <div className="mt-8 rounded-2xl border border-[color:var(--line)] bg-[color:var(--cream)] p-5 text-[color:var(--muted)]">
            This enquiry is closed. Submit a new enquiry to start another
            sourcing discussion.
          </div>
        )}
      </section>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-semibold">{label}</dt>
      <dd className="mt-1 break-words text-sm text-[color:var(--muted)]">
        {value}
      </dd>
    </div>
  );
}
