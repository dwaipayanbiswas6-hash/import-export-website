import { NextResponse } from 'next/server';
import { z } from 'zod';
import { isPortalAdmin, normaliseEmail } from '@/lib/portal';
import { sendPortalAccessLink } from '@/lib/portal-notifications';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  next: z.string().trim().max(200).optional(),
});

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const attempts = new Map<string, number[]>();

function clientIp(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function limited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT) return true;
  attempts.set(ip, [...recent, now]);
  return false;
}

function safeNext(value: string | undefined, admin: boolean) {
  if (admin && value?.startsWith('/admin/')) return value;
  return '/portal';
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get('origin');
  if (origin && origin !== requestUrl.origin) {
    return NextResponse.json({ error: 'Request origin was not accepted.' }, { status: 403 });
  }

  if (limited(clientIp(request))) {
    return NextResponse.json(
      { error: 'Too many login requests. Please wait before trying again.' },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Enter a valid business email.' },
      { status: 400 },
    );
  }

  const admin = createAdminSupabaseClient();
  if (!admin) {
    return NextResponse.json(
      { error: 'The buyer portal is not configured yet.' },
      { status: 503 },
    );
  }

  const email = normaliseEmail(parsed.data.email);
  const adminUser = isPortalAdmin(email);
  const { data, error } = await admin
    .from('enquiries')
    .select('id')
    .eq('buyer_email', email)
    .limit(1);

  if (error) {
    console.error('Portal login lookup failed.', error.message);
    return NextResponse.json(
      { error: 'The buyer portal is temporarily unavailable.' },
      { status: 503 },
    );
  }

  if (adminUser || (data?.length ?? 0) > 0) {
    await sendPortalAccessLink(email, safeNext(parsed.data.next, adminUser));
  }

  return NextResponse.json({
    success: true,
    message:
      'If this business email is linked to an enquiry, a secure sign-in link has been sent.',
  });
}
