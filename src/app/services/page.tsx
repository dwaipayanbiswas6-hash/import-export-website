import type { Metadata } from 'next';
import { PageHero, PremiumCard, Section } from '@/components/ui';
import { services, workflow } from '@/lib/data';

export const metadata: Metadata = { title: 'Services' };

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Export sourcing support"
        title="Structured coordination for professional cross-border enquiries."
        intro="The scope shown here describes the activities Biswas Exports may coordinate. The exact role, responsibility, fee and deliverable are confirmed separately for each accepted engagement."
      />
      <Section
        eyebrow="Coordination scope"
        title="Support shaped around the buyer brief and transaction."
        intro="No catalogue listing or website description guarantees supplier availability, product conformity, regulatory approval, shipment or commercial acceptance."
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
          title="Measured progress, clearly documented."
          intro="Each stage depends on the buyer’s information, suitable supply options, documentary verification and written agreement between the relevant parties."
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
