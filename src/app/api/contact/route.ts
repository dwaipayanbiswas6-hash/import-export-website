import { NextResponse } from 'next/server';
import { contactSchema, type ContactFormData } from '@/lib/contact';

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const requests = new Map<string, number[]>();

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
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
  const recent = (requests.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  requests.set(ip, recent);
  return false;
}

function row(label: string, value?: string) {
  const safeValue = value?.trim() ? escapeHtml(value) : 'Not provided';
  return `<tr><th align="left" style="padding:8px 16px 8px 0;vertical-align:top">${label}</th><td style="padding:8px 0;white-space:pre-wrap">${safeValue}</td></tr>`;
}

function enquiryHtml(data: ContactFormData) {
  return `<h1>New export enquiry</h1><table>${row('Full name', data.fullName)}${row('Business email', data.businessEmail)}${row('Country', data.country)}${row('Phone / WhatsApp', data.phone)}${row('Company', data.companyName)}${row('Product category', data.productCategory)}${row('Product requirement', data.productRequirement)}${row('Product specifications', data.productSpecifications)}${row('Required quantity', data.quantity)}${row('Destination', data.destination)}${row('Target timeline', data.timeline)}${row('Preferred Incoterm', data.incoterm)}${row('Additional notes', data.additionalNotes)}${row('Privacy consent', data.privacyConsent ? 'Agreed' : 'Not agreed')}</table>`;
}

function enquiryText(data: ContactFormData) {
  return [
    ['Full name', data.fullName],
    ['Business email', data.businessEmail],
    ['Country', data.country],
    ['Phone / WhatsApp', data.phone],
    ['Company', data.companyName],
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

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: 'Too many enquiries. Please wait before trying again.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Please check the submitted fields.',
        issues: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error('Contact email configuration is incomplete.');
    return NextResponse.json(
      { error: 'Enquiry delivery is temporarily unavailable.' },
      { status: 503 },
    );
  }

  const acknowledgement =
    'Thank you for contacting Biswas Exports. We have received your requirement and will review the details. Our team will respond with the next steps as soon as possible.';

  try {
    const response = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          from,
          to: [to],
          reply_to: result.data.businessEmail,
          subject: `Export enquiry: ${result.data.productCategory} — ${result.data.fullName}`,
          html: enquiryHtml(result.data),
          text: enquiryText(result.data),
        },
        {
          from,
          to: [result.data.businessEmail],
          subject: 'We received your enquiry — Biswas Exports',
          html: `<p>${acknowledgement}</p>`,
          text: acknowledgement,
        },
      ]),
    });

    if (!response.ok) {
      console.error('Resend rejected contact email delivery.', response.status);
      return NextResponse.json(
        { error: 'We could not deliver the enquiry.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact email delivery failed.', error);
    return NextResponse.json(
      { error: 'We could not deliver the enquiry.' },
      { status: 502 },
    );
  }
}
