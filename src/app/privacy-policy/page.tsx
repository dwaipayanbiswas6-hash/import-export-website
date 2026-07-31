import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        intro="How information submitted through the Biswas Exports website may be handled."
      />
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="premium-card prose-card leading-8 text-[color:var(--muted)]">
          <p className="text-sm">Last updated: 31 July 2026</p>

          <h2>Information you provide</h2>
          <p>
            We may receive information that you choose to submit through the
            enquiry form or direct business communication. This can include your
            name, job title, company name, business email, phone number, country,
            website, product requirement, specifications, quantity, destination,
            timeline, preferred trade term, notes and an optional uploaded RFQ
            or specification file.
          </p>

          <h2>Technical and security information</h2>
          <p>
            Website hosting and security systems may process limited technical
            information such as an IP address, request time, browser or device
            information, requested page and security events. This information
            may be used to operate the website, prevent misuse, investigate
            errors and enforce submission limits.
          </p>

          <h2>How information is used</h2>
          <p>
            Information may be used to review and respond to an enquiry, verify
            business context, communicate about requested products or services,
            coordinate an accepted engagement, maintain records, protect the
            website and meet applicable legal or contractual obligations.
          </p>

          <h2>Files and sensitive information</h2>
          <p>
            Do not upload passwords, payment-card data, government identity
            documents, medical records or other unnecessary sensitive personal
            information. Uploaded files should contain only information needed
            for the business enquiry.
          </p>

          <h2>Service providers and sharing</h2>
          <p>
            We do not sell personal information. Information may be processed by
            service providers used for website hosting, security, email delivery
            and technical operations. It may also be shared with potential
            suppliers, laboratories, inspection providers, logistics providers
            or professional advisers only where reasonably necessary for an
            enquiry or agreed engagement and subject to appropriate review.
          </p>

          <h2>International processing</h2>
          <p>
            Because website and email service providers may operate in multiple
            countries, information may be processed outside your country. The
            location and safeguards can depend on the providers and services in
            use at the relevant time.
          </p>

          <h2>Retention</h2>
          <p>
            Enquiry information is retained only for as long as reasonably
            needed for communication, business records, dispute handling,
            security and applicable legal obligations. Unnecessary information
            may be deleted or anonymised when it is no longer required.
          </p>

          <h2>Security</h2>
          <p>
            Reasonable technical and organisational measures may be used to
            protect information, but no online transmission, email system or
            storage method can be guaranteed completely secure.
          </p>

          <h2>Your requests</h2>
          <p>
            You may ask about information you submitted or request an
            appropriate correction or deletion. A request may require identity
            or business verification and may be limited where retention is
            reasonably necessary for legal, security or record-keeping purposes.
          </p>

          <h2>Policy changes</h2>
          <p>
            This policy may be updated as the website, service providers or
            business processes change. The latest version will be shown on this
            page with its update date.
          </p>

          <h2>Contact</h2>
          <p>
            Privacy questions or requests may be submitted through the{' '}
            <Link className="contact-link" href="/contact">
              Contact page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
