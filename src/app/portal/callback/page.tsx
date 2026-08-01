'use client';

import { LoaderCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';

function safeNext(value: string | null) {
  if (value?.startsWith('/admin/')) return value;
  return '/admin/enquiries';
}

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    async function finishSignIn() {
      const supabase = createBrowserSupabaseClient();
      if (!supabase) {
        setError('Administrator access is not configured yet.');
        return;
      }

      const code = searchParams.get('code');
      let authError: Error | null = null;

      if (code) {
        const result = await supabase.auth.exchangeCodeForSession(code);
        authError = result.error;
      } else {
        const hash = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = hash.get('access_token');
        const refreshToken = hash.get('refresh_token');
        const hashError = hash.get('error_description');

        if (hashError) {
          authError = new Error(hashError);
        } else if (accessToken && refreshToken) {
          const result = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          authError = result.error;
        } else {
          authError = new Error('The sign-in link did not contain a valid session.');
        }
      }

      if (authError) {
        setError(authError.message);
        return;
      }

      router.replace(safeNext(searchParams.get('next')));
      router.refresh();
    }

    void finishSignIn();
  }, [router, searchParams]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-5 py-20 sm:px-6">
      <div className="premium-card w-full text-center">
        {error ? (
          <>
            <p className="eyebrow">Sign-in problem</p>
            <h1 className="text-3xl font-semibold">We could not open the admin inbox.</h1>
            <p className="mt-5 leading-7 text-[color:var(--muted)]">{error}</p>
            <a className="button-primary mt-8" href="/portal/login?next=/admin/enquiries">
              Request a new administrator link
            </a>
          </>
        ) : (
          <>
            <LoaderCircle
              aria-hidden="true"
              className="mx-auto animate-spin text-[color:var(--gold)]"
              size={36}
            />
            <h1 className="mt-6 text-3xl font-semibold">Opening the admin inbox</h1>
            <p className="mt-4 text-[color:var(--muted)]">
              Verifying the secure administrator link…
            </p>
          </>
        )}
      </div>
    </main>
  );
}

export default function PortalCallbackPage() {
  return (
    <Suspense fallback={<main className="min-h-[70vh]" />}>
      <CallbackContent />
    </Suspense>
  );
}
