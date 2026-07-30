import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Export Enquiry',
  description:
    'Contact Biswas Exports in Asansol, India, for product sourcing and merchant export enquiries.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
