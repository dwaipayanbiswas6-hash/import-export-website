import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';
export const metadata: Metadata = { title: 'Terms & Conditions' };
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        intro="Terms governing access to and use of the Biswas Exports website."
      />
      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <div className="premium-card prose-card leading-8 text-[color:var(--muted)]">
          <h2>Website information</h2>
          <p>
            Content on this website is provided for general business
            information. Product availability, specifications, pricing,
            delivery, and commercial terms are confirmed only through direct
            written agreement.
          </p>
          <h2>Permitted use</h2>
          <p>
            You may use this website for lawful business enquiries. You must not
            disrupt the website, attempt unauthorised access, or misuse its
            content.
          </p>
          <h2>Third-party services</h2>
          <p>
            Any references to logistics or other third-party services do not
            create a guarantee of third-party performance. Applicable
            responsibilities are set out in the relevant commercial agreement.
          </p>
          <h2>Commercial engagements</h2>
          <p>
            All services and transactions are subject to mutually agreed written
            terms. Nothing on this website constitutes a binding offer or
            professional legal advice.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms may be sent to
            contact@biswasexports.com.
          </p>
        </div>
      </section>
    </>
  );
}
