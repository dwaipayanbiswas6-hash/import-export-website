import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-cream px-6 py-32 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mx-auto mt-5 max-w-3xl font-display text-6xl font-semibold text-navy">
        The page you requested could not be found.
      </h1>
      <p className="mt-6 text-slate-600">
        Return to the homepage or contact Biswas Exports for assistance.
      </p>
      <Link className="button-primary mt-8" href="/">
        Return home
      </Link>
    </section>
  );
}
