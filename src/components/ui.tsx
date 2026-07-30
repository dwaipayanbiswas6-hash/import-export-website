'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Globe2,
  Mail,
  Menu,
  Moon,
  Phone,
  Sun,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { navItems, siteConfig } from '@/lib/data';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      aria-label="Biswas Exports home"
      className="group inline-flex items-center gap-3"
      href="/"
    >
      <span className="grid size-11 place-items-center rounded-full border border-gold/50 bg-navy text-sm font-bold text-gold shadow-sm">
        BE
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-xl font-semibold tracking-tight ${light ? 'text-white' : 'text-navy'}`}
        >
          Biswas Exports
        </span>
        <span
          className={`mt-1 block text-[9px] font-semibold uppercase tracking-[0.2em] ${light ? 'text-white/55' : 'text-slate-500'}`}
        >
          Merchant Export Company
        </span>
      </span>
    </Link>
  );
}

export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  inverted?: boolean;
}) {
  return (
    <Reveal
      className={
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'
      }
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={`mt-4 text-balance font-display text-4xl font-semibold leading-tight md:text-5xl ${inverted ? 'text-white' : 'text-navy'}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-pretty text-lg leading-8 ${inverted ? 'text-white/65' : 'text-slate-600'}`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy px-6 py-24 text-white lg:px-8 lg:py-32">
      <div className="hero-grid absolute inset-0 opacity-40" />
      <div className="absolute -right-24 -top-24 size-96 rounded-full border border-gold/20" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="max-w-4xl">
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h1 className="mt-5 text-balance font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            {title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('be-theme');
    const useDark = savedTheme
      ? savedTheme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark-mode', useDark);
    const frame = window.requestAnimationFrame(() => setDark(useDark));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="hidden bg-navy text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 px-6 py-2 text-xs lg:px-8">
          <a
            className="flex items-center gap-2 text-white/70 hover:text-gold"
            href={siteConfig.phoneHref}
          >
            <Phone size={13} />
            {siteConfig.phone}
          </a>
          <a
            className="text-white/70 hover:text-gold"
            href={siteConfig.whatsappHref}
            rel="noreferrer"
            target="_blank"
          >
            WhatsApp
          </a>
          <a
            className="flex items-center gap-2 text-white/70 hover:text-gold"
            href={siteConfig.emailHref}
          >
            <Mail size={13} />
            {siteConfig.email}
          </a>
        </div>
      </div>
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
      >
        <Logo />
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) =>
            item.label === 'Services' ? (
              <div className="group relative" key={item.href}>
                <Link
                  className="flex items-center gap-1 text-sm font-semibold text-slate-700 transition hover:text-gold"
                  href={item.href}
                >
                  Services <ChevronDown size={14} />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-20 w-80 -translate-x-1/2 pt-5 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
                    {[
                      'Product Sourcing',
                      'Supplier Coordination',
                      'Export Coordination',
                      'Documentation Support',
                    ].map((service) => (
                      <Link
                        className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-cream hover:text-navy"
                        href="/services"
                        key={service}
                      >
                        {service}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                className="text-sm font-semibold text-slate-700 transition hover:text-gold"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ),
          )}
          <button
            aria-label={dark ? 'Use light theme' : 'Use dark theme'}
            className="grid size-10 place-items-center rounded-full border border-slate-200 text-navy hover:border-gold"
            onClick={() => {
              const next = !dark;
              setDark(next);
              document.documentElement.classList.toggle('dark-mode', next);
              window.localStorage.setItem('be-theme', next ? 'dark' : 'light');
            }}
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Link className="button-primary" href="/contact">
            Send Enquiry <ChevronRight size={17} />
          </Link>
        </div>
        <button
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="grid size-11 place-items-center rounded-full border border-slate-200 text-navy lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1, height: 'auto' }}
            className="fixed inset-x-0 top-[77px] h-[calc(100vh-77px)] overflow-auto border-t bg-white px-6 py-8 lg:hidden"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item) => (
              <Link
                className="block border-b border-slate-100 py-4 font-display text-2xl text-navy"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              className="button-primary mt-7 w-full justify-center"
              href="/contact"
              onClick={() => setOpen(false)}
            >
              Send Enquiry
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
            {siteConfig.tagline}. Responsible sourcing and professional export
            coordination from India.
          </p>
          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-gold">
            Merchant Export Company · {siteConfig.location}
          </p>
        </div>
        <div>
          <h2 className="font-semibold">Explore</h2>
          <div className="mt-5 grid gap-3 text-sm text-white/65">
            {navItems.slice(1, 5).map((item) => (
              <Link
                className="hover:text-gold"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-semibold">Contact</h2>
          <div className="mt-5 grid gap-3 text-sm text-white/65">
            <a className="hover:text-gold" href={siteConfig.phoneHref}>
              {siteConfig.phone}
            </a>
            <a
              className="hover:text-gold"
              href={siteConfig.whatsappHref}
              rel="noreferrer"
              target="_blank"
            >
              WhatsApp
            </a>
            <a
              className="break-all hover:text-gold"
              href={siteConfig.emailHref}
            >
              {siteConfig.email}
            </a>
            <span>{siteConfig.location}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} Biswas Exports. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteTools() {
  const [visible, setVisible] = useState(false);
  const [cookiesVisible, setCookiesVisible] = useState(false);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setCookiesVisible(
        window.localStorage.getItem('be-cookie-notice') !== 'accepted',
      );
    });
    const listener = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', listener, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', listener);
    };
  }, []);
  return (
    <>
      {visible ? (
        <button
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full bg-gold text-navy shadow-xl transition hover:-translate-y-1"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp size={20} />
        </button>
      ) : null}
      {cookiesVisible ? (
        <div className="fixed bottom-5 left-5 z-40 max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
          <p className="text-sm leading-6 text-slate-600">
            We use only essential browser storage to remember this notice. The
            Phase 1 website does not use advertising cookies.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <button
              className="rounded-full bg-navy px-5 py-2 text-xs font-bold text-white"
              onClick={() => {
                window.localStorage.setItem('be-cookie-notice', 'accepted');
                setCookiesVisible(false);
              }}
            >
              Understood
            </button>
            <Link
              className="text-xs font-bold text-navy underline"
              href="/privacy-policy"
            >
              Privacy policy
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function ContactStrip() {
  return (
    <section className="relative overflow-hidden bg-gold px-6 py-16 lg:px-8">
      <div className="absolute right-0 top-0 size-72 rounded-full border border-navy/10" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-navy/60">
            Start a conversation
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-navy">
            Ready to discuss your sourcing requirement in India?
          </h2>
        </div>
        <Link
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-7 py-4 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
          href="/contact"
        >
          Discuss your requirement <ChevronRight size={18} />
        </Link>
      </div>
    </section>
  );
}

export function WorldMap() {
  return (
    <div
      className="relative mx-auto aspect-[2/1] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
      role="img"
      aria-label="Stylized world map showing Biswas Exports connecting India with international markets"
    >
      <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 1000 500">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-white/15"
        >
          <path d="M79 141 122 95l96-22 73 30 20 57-32 30-59-7-33 31-52-20-35 5-36-27Z" />
          <path d="m232 236 48 35 35 71-16 94-40-21-29-90-32-48Z" />
          <path d="m434 105 60-34 92 18 43 45-23 37-69-8-31 28-71-21-32-40Z" />
          <path d="m485 207 92-20 73 43-18 105-62 85-59-55-30-97Z" />
          <path d="m626 108 84-40 122 22 103 61-47 46-96-6-57 37-91-20-35-57Z" />
          <path d="m810 324 75-24 67 47-25 60-82 8-50-46Z" />
        </g>
        <g fill="none" stroke="#cba052" strokeDasharray="7 8" strokeWidth="2">
          <path d="M696 216 Q580 115 470 136" />
          <path d="M696 216 Q505 65 242 130" />
          <path d="M696 216 Q776 152 874 170" />
          <path d="M696 216 Q690 302 602 337" />
          <path d="M696 216 Q786 286 862 352" />
        </g>
        <circle cx="696" cy="216" fill="#cba052" r="8" />
        <circle
          cx="696"
          cy="216"
          fill="none"
          stroke="#cba052"
          strokeWidth="2"
          r="16"
        >
          <animate
            attributeName="r"
            dur="2s"
            from="10"
            to="24"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            dur="2s"
            from="1"
            to="0"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-navy/80 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
        <Globe2 className="text-gold" size={16} /> India to global markets
      </div>
    </div>
  );
}
