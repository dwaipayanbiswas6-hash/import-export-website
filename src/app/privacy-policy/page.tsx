import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';
export const metadata: Metadata = { title: 'Privacy Policy' };
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        intro="How Biswas Exports handles information shared through this website."
      />
      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <div className="premium-card prose-card leading-8 text-[color:var(--muted)]">
          <h2>Information we receive</h2>
          <p>
            We may receive business contact details and enquiry information that
            you choose to provide through our contact form or direct
            communication.
          </p>
          <h2>How information is used</h2>
          <p>
            Information is used to understand and respond to enquiries,
            coordinate requested services, maintain website security, and meet
            applicable legal obligations.
          </p>
          <h2>Sharing and retention</h2>
          <p>
            We do not sell personal information. Information may be shared with
            relevant service providers only where reasonably required to respond
            to a request or support an agreed engagement. We retain information
            only as long as reasonably necessary.
          </p>
          <h2>Your choices</h2>
          <p>
            You may contact us to ask about information you have provided or
            request an appropriate correction or deletion, subject to applicable
            obligations.
          </p>
          <h2>Contact</h2>
          <p>Privacy questions may be sent to contact@biswasexports.com.</p>
        </div>
      </section>
    </>
  );
}
