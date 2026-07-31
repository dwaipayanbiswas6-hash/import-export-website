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
        intro="How information submitted through the Biswas Exports website and Buyer Portal may be handled."
      />
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="premium-card prose-card leading-8 text-[color:var(--muted)]">
          <p className="text-sm">Last updated: 1 August 2026</p>

          <h2>Information you provide</h2>
          <p>
            We may receive information that you choose to submit through the
            enquiry form, Buyer Portal or direct business communication. This
            can include your name, job title, company name, business email,
            phone number, country, website, product requirement,
            specifications, quantity, destination, timeline, preferred trade
            term, messages, notes and uploaded RFQ, quotation or specification
            files.
          </p>

          <h2>Buyer Portal accounts</h2>
          <p>
            The Buyer Portal uses passwordless authentication. A one-time link
            is sent to the business email entered for the enquiry. Authentication
            records, session information and the verified email may be processed
            to control access. A signed-in buyer is permitted to view only
            enquiries linked to that verified business email under the portal's
            access-control rules.
          </p>

          <h2>Portal records and conversations</h2>
          <p>
            Enquiries, status changes, portal messages, timestamps and authorised
            attachments may be stored as the primary business conversation
            record. Email messages may be used for secure sign-in and
            notifications, but the portal record is intended to remain available
            even when an optional notification is delayed or fails.
          </p>

          <h2>Technical and security information</h2>
          <p>
            Website hosting, authentication, database and security systems may
            process limited technical information such as an IP address, request
            time, browser or device information, requested page, authentication
            event and security event. This information may be used to operate the
            website, protect portal sessions, prevent misuse, investigate errors
            and enforce submission or login limits.
          </p>

          <h2>How information is used</h2>
          <p>
            Information may be used to save, review and respond to an enquiry,
            verify business context, operate the Buyer Portal, communicate about
            requested products or services, coordinate an accepted engagement,
            maintain records, protect the website and meet applicable legal or
            contractual obligations.
          </p>

          <h2>Files and sensitive information</h2>
          <p>
            Do not upload passwords, payment-card data, government identity
            documents, medical records, trade secrets unrelated to the enquiry
            or other unnecessary sensitive personal information. Uploaded files
            should contain only information needed for the business enquiry.
          </p>

          <h2>Service providers and sharing</h2>
          <p>
            We do not sell personal information. Information may be processed by
            service providers used for website hosting, database storage,
            authentication, private file storage, security, email delivery and
            technical operations. It may also be shared with potential suppliers,
            laboratories, inspection providers, logistics providers or
            professional advisers only where reasonably necessary for an enquiry
            or agreed engagement and subject to appropriate review.
          </p>

          <h2>International processing</h2>
          <p>
            Because website, authentication, database and email service
            providers may operate in multiple countries, information may be
            processed outside your country. The location and safeguards can
            depend on the providers and services in use at the relevant time.
          </p>

          <h2>Retention</h2>
          <p>
            Enquiry and portal information is retained only for as long as
            reasonably needed for communication, business records, dispute
            handling, security and applicable legal obligations. Unnecessary
            information may be deleted or anonymised when it is no longer
            required.
          </p>

          <h2>Security</h2>
          <p>
            Reasonable technical and organisational measures may be used,
            including passwordless email verification, private storage,
            short-lived file links and row-level access controls. No online
            transmission, authentication system, email system or storage method
            can be guaranteed completely secure.
          </p>

          <h2>Your requests</h2>
          <p>
            You may ask about information you submitted or request an
            appropriate correction or deletion. A request may require identity
            and business-email verification and may be limited where retention
            is reasonably necessary for legal, security, dispute or
            record-keeping purposes.
          </p>

          <h2>Policy changes</h2>
          <p>
            This policy may be updated as the website, Buyer Portal, service
            providers or business processes change. The latest version will be
            shown on this page with its update date.
          </p>

          <h2>Contact</h2>
          <p>
            Privacy questions or requests may be submitted through the{' '}
            <Link className="contact-link" href="/contact">
              Contact page
            </Link>
            . Existing buyers may also use the secure{' '}
            <Link className="contact-link" href="/portal/login">
              Buyer Portal
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
