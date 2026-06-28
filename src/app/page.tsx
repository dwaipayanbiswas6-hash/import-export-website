'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import Link from 'next/link';
import { industries, products, regions, services, stats } from '@/lib/data';
import { Reveal, Section } from '@/components/ui';

function Card({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="rounded-[2rem] border border-black/10 bg-[color:var(--card)] p-7 shadow-[0_24px_80px_rgba(0,0,0,.08)]">
      {children}
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden px-6 py-28 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,rgba(184,137,57,.24),transparent_32%),linear-gradient(135deg,rgba(8,21,37,.05),transparent)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-[color:var(--gold)]">
              International trade, precisely managed
            </p>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              Luxury-grade logistics for companies moving the world.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
              AurexTrade Global designs resilient import, export, customs,
              sourcing, and distribution programs for premium businesses that
              require certainty across borders.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                className="rounded-full bg-[color:var(--navy)] px-7 py-4 font-semibold text-white shadow-xl"
                href="/contact"
              >
                Start a shipment
              </Link>
              <Link
                className="rounded-full border border-black/15 px-7 py-4 font-semibold"
                href="/services"
              >
                Explore services
              </Link>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[3rem] border border-white/30 bg-[color:var(--navy)] p-6 text-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.96 }}
          >
            <div className="rounded-[2.2rem] bg-[linear-gradient(135deg,rgba(255,255,255,.18),rgba(255,255,255,.03))] p-8">
              <MapPin className="text-[color:var(--gold)]" />
              <h2 className="mt-24 font-display text-4xl">
                Control tower visibility across six regions.
              </h2>
              <p className="mt-4 text-white/70">
                Milestone tracking, executive reporting, and proactive exception
                handling.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="font-display text-5xl font-semibold text-[color:var(--gold)]">
              {stat.value}
            </div>
            <p className="mt-2 uppercase tracking-widest text-[color:var(--muted)]">
              {stat.label}
            </p>
          </Card>
        ))}
      </section>

      <Section eyebrow="Solutions" title="Services built for confident international growth.">
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.title}>
              <service.icon className="text-[color:var(--gold)]" />
              <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Why choose us" title="Board-level assurance for borderless commerce.">
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            'Compliance-first execution',
            'Premium account management',
            'Resilient global network',
          ].map((item) => (
            <Card key={item}>
              <CheckCircle2 className="text-[color:var(--gold)]" />
              <h3 className="mt-4 text-2xl font-semibold">{item}</h3>
              <p className="mt-3 text-[color:var(--muted)]">
                Clear governance, refined communication, and practical risk
                controls from first mile to final mile.
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Industries" title="Specialist operating models for complex sectors.">
        <div className="mt-10 flex flex-wrap gap-3">
          {industries.map((industry) => (
            <Link
              className="rounded-full border border-black/10 bg-[color:var(--card)] px-5 py-3 shadow-sm hover:border-[color:var(--gold)]"
              href="/industries"
              key={industry}
            >
              {industry}
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Products" title="Representative product categories we move and source.">
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {products.map((product) => (
            <Card key={product}>
              <h3 className="text-2xl font-semibold">{product}</h3>
              <Link
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[color:var(--gold)]"
                href="/products"
              >
                Learn more <ArrowRight size={16} />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Global presence" title="Local expertise across strategic trade gateways.">
        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {regions.map((region) => (
            <Card key={region}>
              <p className="font-semibold">{region}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Client voice" title="Trusted by operators who cannot afford uncertainty.">
        <Card>
          <blockquote className="text-2xl leading-10">
            “AurexTrade transformed our import program from reactive
            firefighting into a predictable executive operating system.”
          </blockquote>
          <p className="mt-6 text-[color:var(--muted)]">
            COO, premium manufacturing group
          </p>
        </Card>
      </Section>

      <Section eyebrow="FAQ" title="Answers before your first shipment.">
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            'Can you manage customs documentation?',
            'Do you support multimodal freight?',
            'Can you source verified suppliers?',
            'Do you provide door-to-door delivery?',
          ].map((question) => (
            <Card key={question}>
              <h3 className="font-semibold">{question}</h3>
              <p className="mt-2 text-[color:var(--muted)]">
                Yes. We create a tailored operating plan after assessing lane,
                product, timeline, compliance, and budget requirements.
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="rounded-[3rem] bg-[color:var(--navy)] p-10 text-white md:p-16">
          <h2 className="font-display text-4xl md:text-6xl">
            Ready to move with certainty?
          </h2>
          <p className="mt-5 max-w-2xl text-white/70">
            Speak with a trade specialist and receive a practical route-to-market
            plan.
          </p>
          <form className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              aria-label="Email"
              className="min-h-12 flex-1 rounded-full px-5 text-black"
              placeholder="work email"
            />
            <button className="rounded-full bg-[color:var(--gold)] px-7 py-3 font-bold text-black">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
