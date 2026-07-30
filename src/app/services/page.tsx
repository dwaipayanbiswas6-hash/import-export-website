import type { Metadata } from 'next';
import { PageHero, PremiumCard, Section } from '@/components/ui';
import { services, workflow } from '@/lib/data';
export const metadata: Metadata = { title: 'Services' };
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Export services"
        title="Coordinated support for confident cross-border buying."
        intro="Our services are designed to bring structure and visibility to sourcing suitable products from India and preparing them for export."
      />
      <Section
        eyebrow="Capabilities"
        title="Support shaped around the transaction."
      >
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <PremiumCard key={service.title}>
              <service.icon className="text-[color:var(--gold)]" />
              <h3 className="mt-5 text-2xl font-semibold">{service.title}</h3>
              <p className="mt-3 leading-7 text-[color:var(--muted)]">
                {service.description}
              </p>
            </PremiumCard>
          ))}
        </div>
      </Section>
      <div className="section-tint">
        <Section
          eyebrow="Workflow"
          title="Measured progress, clearly communicated."
        >
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {workflow.map((item) => (
              <div className="workflow-card" key={item.step}>
                <span className="font-display text-4xl text-[color:var(--gold-soft)]">
                  {item.step}
                </span>
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
