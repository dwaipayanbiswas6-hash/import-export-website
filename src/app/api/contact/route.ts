import { NextResponse } from 'next/server';
import { contactSchema, type ContactFormData } from '@/lib/contact';

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const requests = new Map<string, number[]>();
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/png',
  'image/jpeg',
]);

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
  return `<h1>New export enquiry</h1><table>${row('Company / Business Name', data.companyName)}${row('Contact Person', data.contactPerson)}${row('Job Title', data.jobTitle)}${row('Company Website', data.companyWebsite)}${row('Business email', data.businessEmail)}${row('Country', data.country)}${row('Phone / WhatsApp', data.phone)}${row('Product category', data.productCategory)}${row('Product requirement', data.productRequirement)}${row('Product specifications', data.productSpecifications)}${row('Required quantity', data.quantity)}${row('Destination', data.destination)}${row('Target timeline', data.timeline)}${row('Preferred Incoterm', data.incoterm)}${row('Additional notes', data.additionalNotes)}${row('Privacy consent', data.privacyConsent ? 'Agreed' : 'Not agreed')}</table>`;
}

function enquiryText(data: ContactFormData) {
  return [
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

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: 'Too many enquiries. Please wait before trying again.' },
      { status: 429 },
    );
  }

  let body: FormData;
  try {
    body = await request.formData();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 },
    );
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
    return NextResponse.json(
      {
        error: 'Please check the submitted fields.',
        issues: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const uploaded = body.get('rfqFile');
  const rfqFile =
    uploaded instanceof File && uploaded.size > 0 ? uploaded : null;
  if (
    rfqFile &&
    (rfqFile.size > MAX_FILE_SIZE || !ALLOWED_FILE_TYPES.has(rfqFile.type))
  ) {
    return NextResponse.json(
      {
        error:
          'The RFQ file must be PDF, DOCX, XLSX, PNG, or JPG and no larger than 10 MB.',
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
          subject: `Export enquiry: ${result.data.productCategory} — ${result.data.companyName}`,
          html: enquiryHtml(result.data),
          text: enquiryText(result.data),
          attachments: rfqFile
            ? [
                {
                  filename: rfqFile.name,
                  content: Buffer.from(await rfqFile.arrayBuffer()).toString(
                    'base64',
                  ),
                },
              ]
            : undefined,
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
