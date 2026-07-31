import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact';
import {
  createEnquiryReference,
  isAllowedPortalFile,
  normaliseEmail,
  safeFilename,
} from '@/lib/portal';
import {
  notifyAdminOfEnquiry,
  sendPortalAccessLink,
} from '@/lib/portal-notifications';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const MAX_REQUEST_SIZE = 12 * 1024 * 1024;
const requests = new Map<string, number[]>();

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
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
  if (rfqFile && !isAllowedPortalFile(rfqFile)) {
    return json(
      {
        error:
          'The RFQ file must be PDF, DOCX, XLSX, PNG, or JPG and no larger than 10 MB.',
      },
      400,
    );
  }

  const admin = createAdminSupabaseClient();
  if (!admin) {
    console.error('Supabase portal configuration is incomplete.');
    return json(
      {
        error:
          'The secure enquiry portal is temporarily unavailable. Please try again later.',
      },
      503,
    );
  }

  const enquiryId = randomUUID();
  const reference = createEnquiryReference();
  const buyerEmail = normaliseEmail(result.data.businessEmail);
  let attachmentPath: string | null = null;
  let attachmentName: string | null = null;

  if (rfqFile) {
    attachmentName = safeFilename(rfqFile.name) || 'rfq-attachment';
    attachmentPath = `enquiries/${enquiryId}/buyer/${randomUUID()}-${attachmentName}`;
    const { error: uploadError } = await admin.storage
      .from('enquiry-files')
      .upload(attachmentPath, Buffer.from(await rfqFile.arrayBuffer()), {
        contentType: rfqFile.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('RFQ storage failed.', uploadError.message);
      return json(
        { error: 'We could not store the RFQ attachment.' },
        502,
      );
    }
  }

  const { error: insertError } = await admin.from('enquiries').insert({
    id: enquiryId,
    reference,
    buyer_email: buyerEmail,
    company_name: result.data.companyName,
    contact_person: result.data.contactPerson,
    job_title: result.data.jobTitle,
    company_website: result.data.companyWebsite || null,
    country: result.data.country,
    phone: result.data.phone,
    product_category: result.data.productCategory,
    product_requirement: result.data.productRequirement,
    product_specifications: result.data.productSpecifications || null,
    quantity: result.data.quantity,
    destination: result.data.destination,
    timeline: result.data.timeline,
    incoterm: result.data.incoterm || null,
    additional_notes: result.data.additionalNotes || null,
    attachment_path: attachmentPath,
    attachment_name: attachmentName,
    status: 'new',
  });

  if (insertError) {
    console.error('Enquiry database insert failed.', insertError.message);
    if (attachmentPath) {
      await admin.storage.from('enquiry-files').remove([attachmentPath]);
    }
    return json(
      { error: 'We could not save the enquiry.' },
      502,
    );
  }

  const { error: messageError } = await admin.from('enquiry_messages').insert({
    enquiry_id: enquiryId,
    sender_role: 'system',
    sender_email: null,
    body: `Enquiry ${reference} was received and added to the Biswas Exports buyer portal.`,
  });
  if (messageError) {
    console.error('Initial portal message failed.', messageError.message);
  }

  const [portalEmailSent] = await Promise.all([
    sendPortalAccessLink(buyerEmail),
    notifyAdminOfEnquiry({
      reference,
      companyName: result.data.companyName,
      category: result.data.productCategory,
      buyerEmail,
    }),
  ]);

  return json({
    success: true,
    reference,
    portalEmailSent,
    portalUrl: '/portal/login',
  });
}
