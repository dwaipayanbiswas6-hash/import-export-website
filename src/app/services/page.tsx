import type { Metadata } from 'next';
import {
  Boxes,
  FileCheck2,
  MessageSquareText,
  PackageSearch,
} from 'lucide-react';
import { ContactStrip, PageHero, Reveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Export Coordination Services',
  description:
    'Responsible sourcing and professional merchant export coordination services from Biswas Exports, India.',
  alternates: { canonical: '/services' },
};

const services = [
  {
    title: 'Product Sourcing',
    text: 'Requirement-led identification and coordination with suitable Indian manufacturers, processors, farmers and suppliers.',
    icon: PackageSearch,
  },
  {
    title: 'Supplier Coordination',
    text: 'Clear communication of agreed specifications, quantities, packing expectations and commercial requirements.',
    icon: MessageSquareText,
  },
  {
    title: 'Export Coordination',
    text: 'Structured support across offer confirmation, product readiness and dispatch planning with relevant partners.',
    icon: Boxes,
  },
  {
    title: 'Documentation Support',
    text: 'Coordination of appropriate commercial and shipment documentation without overstating in-house capabilities.',
    icon: FileCheck2,
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        description="A transparent merchant export approach focused on sourcing, supplier communication and dependable buyer coordination."
        eyebrow="What We Do"
        title="Practical support for sourcing from India."
      />
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Reveal className="soft-card p-9" key={service.title}>
              <service.icon className="text-gold" size={36} />
              <h2 className="mt-7 font-display text-3xl font-semibold text-navy">
                {service.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {service.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
