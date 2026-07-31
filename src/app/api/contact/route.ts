import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { contactSchema, type ContactFormData } from '@/lib/contact';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const requests = new Map<string, number[]>();
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_REQUEST_SIZE = 12 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/png',
  'image/jpeg',
]);
const ALLOWED_FILE_EXTENSIONS = new Set([
  '.pdf',
  '.docx',
  '.xlsx',
  '.png',
  '.jpg',
  '.jpeg',
]);

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, 120);
}

function clientIp(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();

  for (const [key, timestamps] of requests) {
    const active = timestamps.filter(
      (timestamp) => now - timestamp < RATE_WINDOW_MS,
    );
    if (active.length) requests.set(key, active);
    else requests.delete(key);
  }

  const recent = requests.get(ip) ?? [];
  if (recent.length >= RATE_LIMIT) return true;
  requests.set(ip, [...recent, now]);
  return false;
}

function row(label: string, value?: string) {
  const safeValue = value?.trim() ? escapeHtml(value) : 'Not provided';
  return `<tr><th align="left" style="padding:8px 16px 8px 0;vertical-align:top">${label}</th><td style="padding:8px 0;white-space:pre-wrap">${safeValue}</td></tr>`;
}

function enquiryHtml(
  data: ContactFormData,
  enquiryId: string,
  receivedAt: string,
) {
  return `<h1>New export sourcing enquiry</h1><p><strong>Enquiry ID:</strong> ${escapeHtml(enquiryId)}</p><p><strong>Received:</strong> ${escapeHtml(receivedAt)}</p><table>${row('Company / Business Name', data.companyName)}${row('Contact Person', data.contactPerson)}${row('Job Title', data.jobTitle)}${row('Company Website', data.companyWebsite)}${row('Business email', data.businessEmail)}${row('Country', data.country)}${row('Phone / WhatsApp', data.phone)}${row('Product category', data.productCategory)}${row('Product requirement', data.productRequirement)}${row('Product specifications', data.productSpecifications)}${row('Required quantity', data.quantity)}${row('Destination', data.destination)}${row('Target timeline', data.timeline)}${row('Preferred Incoterm', data.incoterm)}${row('Additional notes', data.additionalNotes)}${row('Privacy consent', data.privacyConsent ? 'Agreed' : 'Not agreed')}</table>`;
}

function enquiryText(
  data: ContactFormData,
  enquiryId: string,
  receivedAt: string,
) {
  return [
    ['Enquiry ID', enquiryId],
    ['Received', receivedAt],
    ['Company / Business Name', data.companyName],
    ['Contact Person', data.contactPerson],
    ['Job Title', data.jobTitle],
    ['Company Website', data.companyWebsite],
    ['Business email', data.businessEmail],
    ['Country', data.country],
    ['Phone / WhatsApp', data.phone],
    ['Product category', data.productCategory],
    ['Product requirement', data.productRequirement],
    ['Product specifications', data.productSpecifications],
    ['Required quantity', data.quantity],
    ['Destination', data.destination],
    ['Target timeline', data.timeline],
    ['Preferred Incoterm', data.incoterm],
    ['Additional notes', data.additionalNotes],
    ['Privacy consent', 'Agreed'],
  ]
    .map(([label, value]) => `${label}: ${value || 'Not provided'}`)
    .join('\n');
}

function safeFilename(name: string) {
  return name
    .replace(/[^a-zA-Z0-9._ -]/g, '_')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
}

function fileExtension(name: string) {
  const index = name.lastIndexOf('.');
  return index >= 0 ? name.slice(index).toLowerCase() : '';
}

function configuredRecipients() {
  return (process.env.CONTACT_TO_EMAIL ?? '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get('origin');
  if (origin && origin !== requestUrl.origin) {
    return json({ error: 'Request origin was not accepted.' }, 403);
  }

  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_SIZE) {
    return json({ error: 'The submitted request is too large.' }, 413);
  }

  if (isRateLimited(clientIp(request))) {
    return json(
      { error: 'Too many enquiries. Please wait before trying again.' },
      429,
    );
  }

  let body: FormData;
  try {
    body = await request.formData();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const value = (name: string) => String(body.get(name) ?? '');
  const result = contactSchema.safeParse({
    companyName: value('companyName'),
    contactPerson: value('contactPerson'),
    jobTitle: value('jobTitle'),
    companyWebsite: value('companyWebsite'),
    businessEmail: value('businessEmail'),
    country: value('country'),
    phone: value('phone'),
    productCategory: value('productCategory'),
    productRequirement: value('productRequirement'),
    productSpecifications: value('productSpecifications'),
    quantity: value('quantity'),
    destination: value('destination'),
    timeline: value('timeline'),
    incoterm: value('incoterm'),
    additionalNotes: value('additionalNotes'),
    privacyConsent: value('privacyConsent') === 'true',
    website: value('website'),
  });

  if (!result.success) {
    return json(
      {
        error: 'Please check the submitted fields.',
        issues: result.error.flatten().fieldErrors,
      },
      400,
    );
  }

  const uploaded = body.get('rfqFile');
  const rfqFile =
    uploaded instanceof File && uploaded.size > 0 ? uploaded : null;
  if (
    rfqFile &&
    (rfqFile.size > MAX_FILE_SIZE ||
      !ALLOWED_FILE_TYPES.has(rfqFile.type) ||
      !ALLOWED_FILE_EXTENSIONS.has(fileExtension(rfqFile.name)))
  ) {
    return json(
      {
        error:
          'The RFQ file must be PDF, DOCX, XLSX, PNG, or JPG and no larger than 10 MB.',
      },
      400,
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipients = configuredRecipients();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const replyTo =
    process.env.CONTACT_REPLY_TO_EMAIL?.trim() || recipients[0] || null;

  if (!apiKey || !recipients.length || !from || !replyTo) {
    console.error('Contact email configuration is incomplete.');
    return json(
      { error: 'Enquiry delivery is temporarily unavailable.' },
      503,
    );
  }

  const enquiryId = randomUUID();
  const receivedAt = new Date().toISOString();
  const acknowledgement = `Thank you for contacting Biswas Exports. Your enquiry reference is ${enquiryId}. We have received the information you submitted and will review it. A response depends on the completeness of the buyer brief and any verification required.`;

  try {
    const attachment = rfqFile
      ? [
          {
            filename: safeFilename(rfqFile.name) || 'rfq-attachment',
            content: Buffer.from(await rfqFile.arrayBuffer()).toString('base64'),
          },
        ]
      : undefined;

    const response = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          from,
          to: recipients,
          reply_to: result.data.businessEmail,
          subject: `Export enquiry: ${oneLine(result.data.productCategory)} — ${oneLine(result.data.companyName)}`,
          html: enquiryHtml(result.data, enquiryId, receivedAt),
          text: enquiryText(result.data, enquiryId, receivedAt),
          attachments: attachment,
        },
        {
          from,
          to: [result.data.businessEmail],
          reply_to: replyTo,
          subject: `Enquiry received — ${enquiryId}`,
          html: `<p>${escapeHtml(acknowledgement)}</p><p>Please retain this reference if you contact us about the enquiry.</p>`,
          text: `${acknowledgement}\n\nPlease retain this reference if you contact us about the enquiry.`,
        },
      ]),
    });

    if (!response.ok) {
      console.error(
        `Resend rejected enquiry ${enquiryId} with status ${response.status}.`,
      );
      return json({ error: 'We could not deliver the enquiry.' }, 502);
    }

    return json({ success: true, enquiryId });
  } catch (error) {
    console.error(`Contact email delivery failed for ${enquiryId}.`, error);
    return json({ error: 'We could not deliver the enquiry.' }, 502);
  }
}
