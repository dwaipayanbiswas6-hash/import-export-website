'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Gem, Globe2, MapPin } from 'lucide-react';
import Link from 'next/link';
import { industries, products, values, workflow } from '@/lib/data';
import { PremiumCard, Reveal, Section } from '@/components/ui';

export default function Home() {
  return (
    <>
      <section className="hero relative overflow-hidden px-6 py-24 lg:px-8 lg:py-32">
        <div className="hero-orb" />
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_.9fr]">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 26 }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow">From India to international buyers</p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-tight md:text-7xl">
              India-focused sourcing.
              <br />
              <span className="gold-text">Clear coordination.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
              Biswas Exports reviews professional buyer requirements and
              coordinates potential Indian product and supply options through
              documented communication and specification-led enquiry handling.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link className="button-primary" href="/contact">
                Discuss your requirement <ArrowRight size={18} />
              </Link>
              <Link className="button-secondary" href="/products">
                Explore products
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-3 text-sm text-[color:var(--muted)]">
              <MapPin className="text-[color:var(--gold)]" size={19} />
              <span>Asansol, West Bengal, India</span>
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="hero-panel"
            initial={{ opacity: 0, scale: 0.96 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            <div className="hero-panel-inner">
              <Globe2 className="text-[color:var(--gold)]" size={34} />
              <p className="mt-24 text-sm uppercase tracking-[.26em] text-[color:var(--gold)]">
                Structured B2B enquiries
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight">
                Buyer requirements, supply details and responsibilities aligned
                before commitment.
              </h2>
              <div className="mt-10 h-px bg-gradient-to-r from-[color:var(--gold)] to-transparent" />
              <p className="mt-5 text-[color:var(--muted)]">
                Requirement review · Supplier verification · Documentation ·
                Logistics handover
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Section
        eyebrow="Product portfolio"
        title="Indicative India-focused product categories."
        intro="The catalogue is a starting point for professional sourcing enquiries, not a statement of current stock, certification, price or manufacturer appointment."
      >
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <PremiumCard key={product.title}>
              <product.icon className="text-[color:var(--gold)]" />
              <h3 className="mt-6 text-2xl font-semibold">{product.title}</h3>
              <p className="mt-3 leading-7 text-[color:var(--muted)]">
                {product.description}
              </p>
              <Link className="gold-link mt-6" href="/products">
                View category <ArrowRight size={16} />
              </Link>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <div className="section-tint">
        <Section
          eyebrow="Why Biswas Exports"
          title="A disciplined approach to each export enquiry."
        >
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <PremiumCard key={value.title}>
                <value.icon className="text-[color:var(--gold)]" />
                <h3 className="mt-5 text-2xl font-semibold">{value.title}</h3>
                <p className="mt-3 leading-7 text-[color:var(--muted)]">
                  {value.text}
                </p>
              </PremiumCard>
            ))}
          </div>
        </Section>
      </div>

      <Section
        eyebrow="Our process"
        title="A clear process from enquiry to an agreed next step."
        intro="Progress depends on the product, supplier verification, destination requirements, commercial terms and each party’s written responsibilities."
      >
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {workflow.map((item) => (
            <Reveal className="workflow-card" key={item.step}>
              <span className="font-display text-5xl text-[color:var(--gold-soft)]">
                {item.step}
              </span>
              <h3 className="mt-7 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-3 leading-7 text-[color:var(--muted)]">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Buyer sectors"
        title="Commercial contexts considered across the catalogue."
      >
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <PremiumCard key={industry.title}>
              <industry.icon className="text-[color:var(--gold)]" />
              <h3 className="mt-5 text-xl font-semibold">{industry.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                {industry.description}
              </p>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <Reveal className="trade-banner">
          <div>
            <p className="eyebrow">International enquiries coordinated from India</p>
            <h2 className="max-w-3xl text-4xl font-semibold md:text-6xl">
              Rooted in India. Prepared to understand your market.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
              From Asansol, West Bengal, we receive professional B2B enquiries
              from buyers seeking a point of contact for potential Indian
              sourcing opportunities.
            </p>
          </div>
          <Gem
            className="hidden text-[color:var(--gold-soft)] lg:block"
            size={150}
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <Reveal className="contact-cta">
          <p className="text-sm font-semibold uppercase tracking-[.28em] text-[color:var(--gold)]">
            Start a conversation
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold md:text-6xl">
            Tell us what you are looking to source from India.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-white/70">
            Share your product, specification, quantity, destination, buyer
            status and preferred timeline.
          </p>
          <Link className="button-gold mt-9" href="/contact">
            Contact Biswas Exports <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
