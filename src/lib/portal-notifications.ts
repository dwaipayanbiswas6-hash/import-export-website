import { createClient } from '@supabase/supabase-js';
import { siteUrl } from '@/lib/site';
import { getSupabasePublicConfig } from '@/lib/supabase/config';

function configured(value: string | undefined) {
  return value?.trim() || null;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function recipients() {
  return (process.env.CONTACT_TO_EMAIL ?? '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);
}

export async function sendPortalAccessLink(email: string, next = '/portal') {
  const config = getSupabasePublicConfig();
  if (!config) return false;

  const supabase = createClient(config.url, config.publishableKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  const callback = `${siteUrl}/portal/callback?next=${encodeURIComponent(next)}`;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: callback,
      shouldCreateUser: true,
    },
  });

  if (error) {
    console.error('Could not send portal access link.', error.message);
    return false;
  }

  return true;
}

async function sendResendEmail(payload: Record<string, unknown>) {
  const apiKey = configured(process.env.RESEND_API_KEY);
  if (!apiKey) return false;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Resend notification failed.', response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Resend notification failed.', error);
    return false;
  }
}

export async function notifyAdminOfEnquiry(input: {
  reference: string;
  companyName: string;
  category: string;
  buyerEmail: string;
}) {
  const to = recipients();
  const from = configured(process.env.CONTACT_FROM_EMAIL);
  if (!to.length || !from) return false;

  const adminUrl = `${siteUrl}/admin/enquiries`;
  return sendResendEmail({
    from,
    to,
    reply_to: input.buyerEmail,
    subject: `New portal enquiry ${input.reference} — ${input.companyName}`,
    text: `A new ${input.category} enquiry has been saved in the Biswas Exports portal.\n\nReference: ${input.reference}\nBuyer: ${input.companyName}\nBusiness email: ${input.buyerEmail}\n\nOpen the admin inbox: ${adminUrl}`,
    html: `<p>A new <strong>${escapeHtml(input.category)}</strong> enquiry has been saved in the Biswas Exports portal.</p><p><strong>Reference:</strong> ${escapeHtml(input.reference)}<br><strong>Buyer:</strong> ${escapeHtml(input.companyName)}<br><strong>Business email:</strong> ${escapeHtml(input.buyerEmail)}</p><p><a href="${adminUrl}">Open the admin inbox</a></p>`,
  });
}

export async function notifyBuyerOfResponse(input: {
  buyerEmail: string;
  reference: string;
}) {
  const from = configured(process.env.CONTACT_FROM_EMAIL);
  const replyTo =
    configured(process.env.CONTACT_REPLY_TO_EMAIL) ?? recipients()[0] ?? null;
  if (!from || !replyTo) return false;

  const portalUrl = `${siteUrl}/portal`;
  return sendResendEmail({
    from,
    to: [input.buyerEmail],
    reply_to: replyTo,
    subject: `New response available — ${input.reference}`,
    text: `Biswas Exports has posted a response to enquiry ${input.reference}. Sign in with the same business email to view it: ${portalUrl}`,
    html: `<p>Biswas Exports has posted a response to enquiry <strong>${escapeHtml(input.reference)}</strong>.</p><p><a href="${portalUrl}">Sign in to view the response</a></p>`,
  });
}
