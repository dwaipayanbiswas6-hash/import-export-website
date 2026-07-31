import type { EmailOtpType } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

function safeNext(value: string | null) {
  if (value?.startsWith('/admin/')) return value;
  if (value?.startsWith('/portal')) return value;
  return '/portal';
}

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get('token_hash');
  const type = request.nextUrl.searchParams.get('type') as EmailOtpType | null;
  const next = safeNext(request.nextUrl.searchParams.get('next'));
  const redirectUrl = new URL(next, request.url);

  if (tokenHash && type) {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type,
      });
      if (!error) return NextResponse.redirect(redirectUrl);
    }
  }

  const errorUrl = new URL('/portal/login', request.url);
  errorUrl.searchParams.set(
    'error',
    'The sign-in link is invalid or expired. Request a new secure link.',
  );
  return NextResponse.redirect(errorUrl);
}
