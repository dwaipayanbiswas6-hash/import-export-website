'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Compass,
  Eye,
  Flag,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import {
  ContactStrip,
  Reveal,
  SectionHeading,
  WorldMap,
} from '@/components/ui';
import {
  advantages,
  coreValues,
  exportProcess,
  industries,
  mission,
  products,
  siteConfig,
  targetMarkets,
  vision,
} from '@/lib/data';

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[780px] overflow-hidden bg-navy px-6 py-24 text-white lg:px-8 lg:py-32">
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="absolute -right-48 top-12 size-[580px] rounded-full border border-gold/20" />
        <div className="absolute -right-24 top-36 size-[380px] rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_.9fr]">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold backdrop-blur">
              <span className="size-1.5 rounded-full bg-gold" /> Merchant Export
              Company · India
            </div>
            <h1 className="mt-8 max-w-4xl text-balance font-display text-5xl font-semibold leading-[1.03] md:text-7xl lg:text-[5.35rem]">
              Bridging Indian Excellence to{' '}
              <span className="text-gold">Global Markets</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
              Responsible product sourcing, transparent coordination and
              dependable service for international B2B buyers.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-bold text-navy shadow-xl transition hover:-translate-y-0.5 hover:bg-white"
                href="/contact"
              >
                Send your enquiry <ArrowRight size={18} />
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white transition hover:border-gold hover:text-gold"
                href="/products"
              >
                Explore products
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-7 text-sm text-white/55">
              <span className="flex items-center gap-2">
                <MapPin className="text-gold" size={17} /> Asansol, West Bengal
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="text-gold" size={17} /> Transparent &
                responsible
              </span>
            </div>
          </motion.div>

          <Reveal className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-lg rounded-full border border-white/10 p-10">
              <div className="absolute inset-10 rounded-full border border-gold/20" />
              <div className="grid h-full place-items-center rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(203,160,82,.25),rgba(255,255,255,.03)_55%,transparent_56%)]">
                <div className="text-center">
                  <Compass
                    className="mx-auto text-gold"
                    size={64}
                    strokeWidth={1}
                  />
                  <p className="mt-5 font-display text-3xl">
                    India to the world
                  </p>
                  <p className="mt-2 text-sm text-white/50">
                    Sourcing · Coordination · Trust
                  </p>
                </div>
              </div>
              {['Quality', 'Integrity', 'Service'].map((item, index) => (
                <div
                  className={`absolute rounded-full border border-white/10 bg-navy-light px-5 py-3 text-xs font-bold uppercase tracking-widest text-gold shadow-2xl ${index === 0 ? 'right-0 top-16' : index === 1 ? '-left-6 top-1/2' : 'bottom-10 right-10'}`}
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <Reveal className="relative min-h-[460px] overflow-hidden rounded-[2rem] bg-cream p-8">
            <div className="absolute -bottom-16 -left-16 size-72 rounded-full border border-gold/25" />
            <div className="absolute -right-10 -top-10 size-52 rounded-full bg-gold/10" />
            <div className="relative flex h-full flex-col justify-between">
              <p className="font-display text-8xl text-gold/30">BE</p>
              <div>
                <p className="text-7xl font-semibold text-navy">2023</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                  Established in Asansol
                </p>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="About Biswas Exports"
              title="A dependable bridge between Indian producers and global buyers."
            />
            <p className="mt-7 text-lg leading-8 text-slate-600">
              Biswas Exports is a merchant export company based in Asansol, West
              Bengal. We connect international buyers with quality Indian
              products through responsible sourcing, clear communication and
              professional export coordination.
            </p>
            <p className="mt-5 leading-7 text-slate-600">
              We collaborate with verified manufacturers, processors, farmers
              and suppliers across India, with a long-term focus on
              transparency, reliability and shared business value.
            </p>
            <Link className="button-primary mt-8" href="/about">
              Discover our company <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          {[
            {
              eyebrow: 'Our Mission',
              title: 'Trade built on trust and mutual growth.',
              text: mission,
              icon: Flag,
            },
            {
              eyebrow: 'Our Vision',
              title: 'Representing the strength of Indian products globally.',
              text: vision,
              icon: Eye,
            },
          ].map((item) => (
            <Reveal className="soft-card p-8 md:p-10" key={item.eyebrow}>
              <item.icon className="text-gold" size={34} strokeWidth={1.6} />
              <p className="eyebrow mt-7">{item.eyebrow}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-navy">
                {item.title}
              </h2>
              <p className="mt-5 leading-7 text-slate-600">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            align="center"
            description="The principles that guide how we source, communicate and build every business relationship."
            eyebrow="Core Values"
            title="A strong foundation for responsible trade."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value, index) => (
              <Reveal
                className={`rounded-3xl border border-slate-200 p-6 ${index === coreValues.length - 1 ? 'lg:col-start-2' : ''}`}
                key={value.title}
              >
                <value.icon className="text-gold" size={28} />
                <h3 className="mt-5 font-display text-xl font-semibold text-navy">
                  {value.title}
                </h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            description="Practical support, honest communication and a relationship-first approach for every buyer requirement."
            eyebrow="Why Choose Us"
            inverted
            title="Why international buyers can choose Biswas Exports."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item) => (
              <Reveal
                className="bg-navy p-7 transition hover:bg-navy-light"
                key={item.title}
              >
                <item.icon className="text-gold" size={30} />
                <h3 className="mt-6 font-display text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/55">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            align="center"
            description="A clear, buyer-led workflow designed to keep requirements, expectations and communication aligned."
            eyebrow="Export Process"
            title="From enquiry to dispatch coordination."
          />
          <div className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {exportProcess.map((item) => (
              <Reveal
                className="soft-card relative overflow-hidden p-7"
                key={item.step}
              >
                <span className="absolute -right-3 -top-6 font-display text-8xl text-slate-100">
                  {item.step}
                </span>
                <span className="relative grid size-10 place-items-center rounded-full bg-gold text-sm font-bold text-navy">
                  {item.step}
                </span>
                <h3 className="relative mt-6 font-display text-2xl font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="relative mt-3 leading-7 text-slate-600">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            description="Our future-ready sourcing structure is designed to evaluate buyer-specific opportunities across selected Indian product ecosystems."
            eyebrow="Industries We Serve"
            title="Connecting diverse Indian capabilities with market demand."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <Reveal className="soft-card p-7" key={industry.title}>
                <industry.icon className="text-gold" size={32} />
                <h3 className="mt-7 font-display text-2xl font-semibold text-navy">
                  {industry.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {industry.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              description="Flexible placeholder categories ready to grow as our product portfolio develops."
              eyebrow="Featured Products"
              title="Indian products, sourced to your requirement."
            />
            <Link className="button-primary shrink-0" href="/products">
              View product categories <ArrowRight size={17} />
            </Link>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product, index) => (
              <Reveal
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white"
                key={product.title}
              >
                <div
                  className={`relative h-48 overflow-hidden ${index % 3 === 0 ? 'bg-navy' : index % 3 === 1 ? 'bg-cream' : 'bg-slate-100'}`}
                >
                  <div className="absolute -right-12 -top-12 size-44 rounded-full border border-gold/30" />
                  <div className="absolute bottom-6 left-6 grid size-14 place-items-center rounded-2xl bg-gold font-display text-2xl font-semibold text-navy">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="p-7">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold">
                    {product.category}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-navy">
                    {product.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {product.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            align="center"
            description="Biswas Exports aims to serve international buyers across global markets. The highlighted regions represent our business development focus—not claims of completed exports."
            eyebrow="Global Markets"
            inverted
            title="Ambition without overstatement."
          />
          <div className="mt-12">
            <WorldMap />
          </div>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {targetMarkets.map((market) => (
              <span
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/65"
                key={market}
              >
                {market}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
