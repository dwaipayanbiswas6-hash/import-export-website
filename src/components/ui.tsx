'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUp, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { company, footerLinks, navItems, products } from '@/lib/data';

export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-60px' }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  eyebrow,
  title,
  intro,
  children,
  id,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-7xl px-6 py-24 lg:px-8 ${className}`}
    >
      <Reveal>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            {intro}
          </p>
        )}
      </Reveal>
      {children}
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="page-hero">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            {intro}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function PremiumCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <Reveal className={`premium-card ${className}`}>{children}</Reveal>;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  return (
    <header className="glass sticky top-0 z-50 border-b border-[color:var(--line)]">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
      >
        <Link
          className="font-display text-2xl font-bold tracking-tight"
          href="/"
        >
          Biswas <span className="text-[color:var(--gold)]">Exports</span>
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) =>
            item.label === 'Products' ? (
              <div
                className="relative"
                key={item.href}
                onMouseEnter={() => setMega(true)}
                onMouseLeave={() => setMega(false)}
              >
                <Link
                  className="nav-link flex items-center gap-1"
                  href={item.href}
                >
                  Products <ChevronDown size={14} />
                </Link>
                {mega && (
                  <div className="absolute left-1/2 top-7 grid w-[620px] -translate-x-1/2 grid-cols-2 gap-2 rounded-3xl border border-[color:var(--line)] bg-white p-4 shadow-2xl">
                    {products.map((product) => (
                      <Link
                        className="rounded-2xl p-4 transition hover:bg-[color:var(--cream)]"
                        href="/products"
                        key={product.title}
                      >
                        <b>{product.title}</b>
                        <p className="mt-1 line-clamp-2 text-sm text-[color:var(--muted)]">
                          {product.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link className="nav-link" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ),
          )}
        </div>
        <Link className="button-primary hidden lg:inline-flex" href="/contact">
          Request a quote
        </Link>
        <button
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="rounded-full border border-[color:var(--line)] p-2 lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-[color:var(--line)] bg-white px-6 py-5 lg:hidden">
          {navItems.map((item) => (
            <Link
              className="block border-b border-[color:var(--line)] py-3 text-lg"
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="button-primary mt-5 inline-flex"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Request a quote
          </Link>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--gold-soft)] bg-[color:var(--cream)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-5 lg:px-8">
        <div className="md:col-span-2">
          <Link className="font-display text-3xl font-bold" href="/">
            Biswas <span className="text-[color:var(--gold)]">Exports</span>
          </Link>
          <p className="mt-4 max-w-sm text-[color:var(--muted)]">
            {company.tagline}
          </p>
          <p className="mt-6 text-sm text-[color:var(--muted)]">
            {company.address}
          </p>
        </div>
        {footerLinks.map((group) => (
          <div key={group.title}>
            <h3 className="font-semibold">{group.title}</h3>
            {group.links.map((link) => (
              <Link
                className="mt-3 block text-sm text-[color:var(--muted)] transition hover:text-[color:var(--gold-dark)]"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-[color:var(--line)] px-6 py-6 text-center text-sm text-[color:var(--muted)]">
        © 2026 {company.name}. All rights reserved.
      </div>
    </footer>
  );
}

export function Chrome() {
  return (
    <button
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 rounded-full bg-[color:var(--gold)] p-3 text-white shadow-xl transition hover:-translate-y-1 hover:bg-[color:var(--gold-dark)]"
      onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp />
    </button>
  );
}
