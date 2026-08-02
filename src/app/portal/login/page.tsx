'use client';

import { ArrowLeft, MailCheck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useState } from 'react';

function AdminLoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/admin/enquiries';
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
          'Check the authorised administrator email for a secure sign-in link.',
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
          <p className="eyebrow mt-8">Private administration</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Open the Biswas Exports enquiry inbox.
          </h1>
          <p className="mt-6 leading-7 text-[color:var(--muted)]">
            This area is restricted to approved Biswas Exports administrators.
            Buyers do not need an account or portal login.
          </p>
          <ul className="mt-8 grid gap-3 text-sm leading-6 text-[color:var(--muted)]">
            <li>• Review saved business enquiries and RFQ documents.</li>
            <li>• Update enquiry status and record internal progress.</li>
            <li>• Reply directly to the buyer’s business email.</li>
          </ul>
        </section>

        <section className="premium-card self-start">
          <MailCheck className="text-[color:var(--gold)]" size={32} />
          <h2 className="mt-6 text-3xl font-semibold">Administrator sign in</h2>
          <p className="mt-4 leading-7 text-[color:var(--muted)]">
            Enter an email listed in the private administrator configuration. A
            one-time sign-in link will be sent to that address.
          </p>

          {status === 'sent' ? (
            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
              <b>Check the administrator email.</b>
              <p className="mt-2 text-sm leading-6">{message}</p>
              <p className="mt-2 text-sm leading-6">
                The link is single-use and may take a few minutes to arrive.
              </p>
            </div>
          ) : (
            <form className="mt-8 grid gap-5" onSubmit={submit}>
              <label className="grid gap-2 text-sm font-semibold" htmlFor="email">
                Administrator email
                <input
                  autoComplete="email"
                  className="w-full rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3.5 outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold-soft)]"
                  id="email"
                  maxLength={254}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@company.com"
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
                  : 'Email administrator sign-in link'}
              </button>
            </form>
          )}

          <Link className="gold-link mt-8" href="/">
            <ArrowLeft size={16} /> Return to website
          </Link>
        </section>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="min-h-[70vh]" />}>
      <AdminLoginForm />
    </Suspense>
  );
}
