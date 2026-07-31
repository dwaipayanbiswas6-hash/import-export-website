'use client';

import { ArrowLeft, MailCheck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useState } from 'react';

function PortalLoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/portal';
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );
  const [message, setMessage] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/api/portal/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, next }),
      });
      const result = (await response.json()) as {
        error?: string;
        message?: string;
      };
      if (!response.ok) throw new Error(result.error || 'Sign-in failed.');
      setStatus('sent');
      setMessage(
        result.message ||
          'Check your business email for a secure sign-in link.',
      );
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'We could not send the sign-in link.',
      );
    }
  }

  return (
    <main className="mx-auto min-h-[70vh] max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <section className="rounded-[2rem] border border-[color:var(--gold-soft)] bg-[color:var(--cream)] p-7 sm:p-10">
          <ShieldCheck className="text-[color:var(--gold)]" size={34} />
          <p className="eyebrow mt-8">Buyer portal</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            View enquiries and responses securely.
          </h1>
          <p className="mt-6 leading-7 text-[color:var(--muted)]">
            Sign in with the same business email used in your enquiry. We send a
            one-time link, so no password is required.
          </p>
          <ul className="mt-8 grid gap-3 text-sm leading-6 text-[color:var(--muted)]">
            <li>• View enquiry status and the complete conversation.</li>
            <li>• Read responses and download authorised documents.</li>
            <li>• Reply inside the portal using your verified business email.</li>
          </ul>
        </section>

        <section className="premium-card self-start">
          <MailCheck className="text-[color:var(--gold)]" size={32} />
          <h2 className="mt-6 text-3xl font-semibold">Business-email sign in</h2>
          <p className="mt-4 leading-7 text-[color:var(--muted)]">
            For privacy, the same confirmation is shown whether or not an
            enquiry exists for the email entered.
          </p>

          {status === 'sent' ? (
            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
              <b>Check your business email.</b>
              <p className="mt-2 text-sm leading-6">{message}</p>
              <p className="mt-2 text-sm leading-6">
                The link is single-use and may take a few minutes to arrive.
              </p>
            </div>
          ) : (
            <form className="mt-8 grid gap-5" onSubmit={submit}>
              <label className="grid gap-2 text-sm font-semibold" htmlFor="email">
                Business email
                <input
                  autoComplete="email"
                  className="w-full rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3.5 outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold-soft)]"
                  id="email"
                  maxLength={254}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@company.com"
                  required
                  type="email"
                  value={email}
                />
              </label>
              {status === 'error' && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  {message}
                </div>
              )}
              <button
                className="button-primary w-full"
                disabled={status === 'sending'}
                type="submit"
              >
                {status === 'sending'
                  ? 'Sending secure link...'
                  : 'Email me a secure sign-in link'}
              </button>
            </form>
          )}

          <Link className="gold-link mt-8" href="/contact">
            <ArrowLeft size={16} /> Submit a new enquiry
          </Link>
        </section>
      </div>
    </main>
  );
}

export default function PortalLoginPage() {
  return (
    <Suspense fallback={<main className="min-h-[70vh]" />}>
      <PortalLoginForm />
    </Suspense>
  );
}
