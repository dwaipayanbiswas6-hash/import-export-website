import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Sourcing Enquiry',
  description:
    'Submit a professional B2B sourcing enquiry to Biswas Exports with product, specification, quantity, destination and timeline details.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
