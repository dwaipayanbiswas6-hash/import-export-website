import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-32 text-center">
      <p className="text-sm font-bold uppercase tracking-[.3em] text-[color:var(--gold)]">
        404
      </p>
      <h1 className="mt-4 font-display text-6xl font-semibold">
        This route has left the port.
      </h1>
      <p className="mt-6 text-[color:var(--muted)]">
        Return home or contact our team for assistance.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-[color:var(--navy)] px-7 py-4 font-semibold text-white"
      >
        Back home
      </Link>
    </section>
  );
}
