import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';
import { siteConfig } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for the Biswas Exports website.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        description="How we handle information shared through this website."
        eyebrow="Legal"
        title="Privacy Policy"
      />
      <article className="prose mx-auto max-w-4xl px-6 py-20 text-slate-600">
        <p className="leading-8">
          Biswas Exports uses business contact information only to respond to
          enquiries, understand sourcing requirements and communicate about
          potential business relationships.
        </p>
        <h2 className="mt-10 font-display text-2xl font-semibold text-navy">
          Information you provide
        </h2>
        <p className="mt-4 leading-8">
          The enquiry form prepares an email in your own email application. The
          website does not currently store form submissions in a database. Your
          email provider may process the information according to its own
          policy.
        </p>
        <h2 className="mt-10 font-display text-2xl font-semibold text-navy">
          Contact
        </h2>
        <p className="mt-4 leading-8">
          For privacy questions, email{' '}
          <a className="text-navy underline" href={siteConfig.emailHref}>
            {siteConfig.email}
          </a>
          .
        </p>
      </article>
    </>
  );
}
