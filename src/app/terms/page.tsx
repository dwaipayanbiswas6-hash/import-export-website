import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui';

export const metadata: Metadata = { title: 'Terms & Conditions' };

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        intro="General terms governing access to and use of the Biswas Exports website."
      />
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="premium-card prose-card leading-8 text-[color:var(--muted)]">
          <p className="text-sm">Last updated: 1 August 2026</p>

          <h2>Website operator and purpose</h2>
          <p>
            References to “Biswas Exports”, “we”, “us” or “our” mean the
            operator of this website under the public-facing Biswas Exports
            name. The website is intended for general business information and
            professional B2B sourcing enquiries.
          </p>

          <h2>Enquiry communication</h2>
          <p>
            Enquiries are reviewed through the private Biswas Exports admin
            workflow. Responses may be sent directly to the business email or
            phone number supplied by the buyer. Status labels, emails and
            preliminary communications do not by themselves create a binding
            quotation, order, contract or guarantee. Binding terms must be
            expressly confirmed in the applicable written commercial agreement.
          </p>

          <h2>Indicative catalogue</h2>
          <p>
            Catalogue entries describe product categories that may be considered
            for sourcing enquiries. A listing does not confirm current stock,
            price, supplier appointment, manufacturer identity, certification,
            registration, country of origin, export eligibility or acceptance of
            an order.
          </p>
          <p>
            Product images are illustrative. They must not be interpreted as
            photographs of confirmed Biswas Exports inventory, supplier
            facilities, packaging, certificates or completed shipments.
          </p>

          <h2>No binding offer</h2>
          <p>
            Website content, enquiry responses and preliminary discussions do
            not constitute a binding offer, quotation, purchase contract, agency
            appointment, warranty or guarantee unless the relevant communication
            expressly states otherwise and is issued by an authorised person. A
            transaction proceeds only under separately agreed written commercial
            terms between the relevant parties.
          </p>

          <h2>Buyer and supplier verification</h2>
          <p>
            Buyers remain responsible for confirming intended use, destination
            requirements, import permissions and the suitability of the selected
            product. Supplier identity, authority, specifications, testing,
            documentation, production capability and claims must be verified
            before reliance or commitment.
          </p>

          <h2>Regulated products</h2>
          <p>
            Medicines, medical devices, chemicals, food products, electrical
            goods, batteries, cosmetics, toys and other regulated categories are
            considered only for lawful B2B enquiries. Required licences,
            registrations, classifications, safety information, transport rules
            and destination approvals must be confirmed for the specific product
            and transaction. No medical, therapeutic or professional advice is
            provided through this website.
          </p>

          <h2>Files and messages</h2>
          <p>
            You may upload only lawful business documents necessary for the
            enquiry. Do not upload malware, executable files, unrelated personal
            data, confidential information you are not authorised to disclose or
            material that infringes third-party rights. We may reject, quarantine
            or remove unsafe or irrelevant files.
          </p>

          <h2>Third-party services</h2>
          <p>
            Website hosting, database, email, storage, suppliers, laboratories,
            inspection bodies, logistics providers, payment providers and other
            third parties act under their own terms and responsibilities.
            Reference to a third party does not guarantee its performance,
            approval or continued availability.
          </p>

          <h2>Permitted use</h2>
          <p>
            You may use this website for lawful business enquiries. You must not
            submit false or unlawful information, upload harmful files, attempt
            unauthorised access, interfere with the service, overwhelm enquiry
            endpoints, scrape it in a way that disrupts service, or misuse its
            content or branding.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Website design, text, branding and original materials may not be
            copied, republished or commercially reused without permission,
            except where applicable law permits. Third-party rights remain with
            their respective owners.
          </p>

          <h2>Availability and limitation</h2>
          <p>
            We may change, suspend or remove website functionality without notice
            where reasonably necessary. To the extent permitted by applicable
            law, we are not responsible for decisions made solely from general
            website content or for losses caused by third-party services,
            unauthorised access, email-account compromise or circumstances
            outside reasonable control.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms may be submitted through the{' '}
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
