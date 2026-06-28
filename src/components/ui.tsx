'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUp,
  ChevronDown,
  Globe,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { company, footerLinks, navItems, services } from '@/lib/data';

type Children = { children: React.ReactNode };

export function Reveal({
  children,
  className = '',
}: Children & { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-80px' }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  eyebrow,
  title,
  children,
  id,
}: Children & { eyebrow?: string; title: string; id?: string }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <Reveal>
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--gold)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <header className="glass sticky top-0 z-50 border-b border-black/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link className="font-display text-2xl font-bold tracking-tight" href="/">
          Aurex<span className="text-[color:var(--gold)]">Trade</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) =>
            item.label === 'Services' ? (
              <div
                className="relative"
                key={item.label}
                onMouseEnter={() => setMega(true)}
                onMouseLeave={() => setMega(false)}
              >
                <Link
                  className="flex items-center gap-1 text-sm font-medium hover:text-[color:var(--gold)]"
                  href={item.href}
                >
                  Services <ChevronDown size={14} />
                </Link>
                {mega ? (
                  <div className="absolute left-1/2 top-7 grid w-[680px] -translate-x-1/2 grid-cols-2 gap-3 rounded-3xl border border-black/10 bg-[color:var(--card)] p-5 shadow-2xl">
                    {services.map((service) => (
                      <Link
                        className="rounded-2xl p-4 hover:bg-black/5"
                        href="/services"
                        key={service.title}
                      >
                        <b>{service.title}</b>
                        <p className="mt-1 line-clamp-2 text-sm text-[color:var(--muted)]">
                          {service.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                className="text-sm font-medium hover:text-[color:var(--gold)]"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button aria-label="Search" className="focus-ring rounded-full border p-2">
            <Search size={18} />
          </button>
          <button
            aria-label="Language selector"
            className="focus-ring rounded-full border p-2"
          >
            <Globe size={18} />
          </button>
          <button
            aria-label="Toggle theme"
            className="focus-ring rounded-full border p-2"
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            className="rounded-full bg-[color:var(--navy)] px-5 py-3 text-sm font-semibold text-white shadow-lg"
            href="/contact"
          >
            Request Quote
          </Link>
        </div>

        <button
          aria-label="Open menu"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open ? (
        <div className="border-t bg-[color:var(--card)] p-6 lg:hidden">
          {navItems.map((item) => (
            <Link
              className="block py-3 text-lg"
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[color:var(--navy)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-5 lg:px-8">
        <div className="md:col-span-2">
          <div className="font-display text-3xl font-bold">
            Aurex<span className="text-[color:var(--gold)]">Trade</span>
          </div>
          <p className="mt-4 max-w-sm text-white/70">{company.tagline}</p>
          <p className="mt-6 text-sm text-white/55">{company.address}</p>
        </div>
        {footerLinks.map((group) => (
          <div key={group.title}>
            <h3 className="font-semibold">{group.title}</h3>
            {group.links.map((link) => (
              <Link
                className="mt-3 block text-sm text-white/65 hover:text-white"
                href={link.href}
                key={link.label}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-sm text-white/55">
        © 2026 {company.name}. All rights reserved.
      </div>
    </footer>
  );
}

export function Chrome() {
  const [cookie, setCookie] = useState(false);

  return (
    <>
      <button
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-40 rounded-full bg-[color:var(--gold)] p-3 text-black shadow-xl"
        onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp />
      </button>
      {!cookie ? (
        <div className="fixed bottom-6 left-6 z-40 max-w-md rounded-3xl border bg-[color:var(--card)] p-5 shadow-2xl">
          <p className="text-sm text-[color:var(--muted)]">
            We use essential cookies and privacy-conscious analytics to improve your
            experience.
          </p>
          <button
            className="mt-4 rounded-full bg-[color:var(--navy)] px-5 py-2 text-sm font-semibold text-white"
            onClick={() => setCookie(true)}
          >
            Accept
          </button>
        </div>
      ) : null}
    </>
  );
}
