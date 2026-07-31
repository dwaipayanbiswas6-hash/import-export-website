'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUp, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
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
      className={`mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 ${className}`}
    >
      <Reveal>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="max-w-4xl break-words text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-5 max-w-2xl text-base leading-7 text-[color:var(--muted)] sm:mt-6 sm:text-lg sm:leading-8">
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
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="max-w-4xl break-words text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[color:var(--muted)] sm:mt-7 sm:text-lg sm:leading-8">
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
  const pathname = usePathname();
  const mobileMenuId = useId();
  const productMenuId = useId();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        setMega(false);
      }
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  function isCurrent(href: string) {
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  }

  return (
    <header className="glass sticky top-0 z-50 border-b border-[color:var(--line)]">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-8 lg:py-4"
      >
        <Link
          className="whitespace-nowrap font-display text-xl font-bold tracking-tight sm:text-2xl"
          href="/"
          aria-label="Biswas Exports home"
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
                onFocusCapture={() => setMega(true)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node))
                    setMega(false);
                }}
              >
                <div className="flex items-center">
                  <Link
                    aria-current={isCurrent(item.href) ? 'page' : undefined}
                    className="nav-link"
                    href={item.href}
                  >
                    Products
                  </Link>
                  <button
                    aria-controls={productMenuId}
                    aria-expanded={mega}
                    aria-label="Toggle product categories"
                    className="ml-1 rounded-full p-1 text-[color:var(--muted)] transition hover:text-[color:var(--gold-dark)]"
                    onClick={() => setMega((value) => !value)}
                    type="button"
                  >
                    <ChevronDown
                      aria-hidden="true"
                      className={`transition-transform ${mega ? 'rotate-180' : ''}`}
                      size={15}
                    />
                  </button>
                </div>
                {mega && (
                  <div
                    id={productMenuId}
                    className="absolute left-1/2 top-8 grid w-[620px] -translate-x-1/2 grid-cols-2 gap-2 rounded-3xl border border-[color:var(--line)] bg-[color:var(--card)] p-4 shadow-2xl"
                  >
                    {products.map((product) => (
                      <Link
                        className="rounded-2xl p-4 transition hover:bg-[color:var(--cream)] focus-visible:bg-[color:var(--cream)]"
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
              <Link
                aria-current={isCurrent(item.href) ? 'page' : undefined}
                className="nav-link"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
        <Link className="button-primary hidden lg:inline-flex" href="/contact">
          Request a quote
        </Link>
        <button
          aria-controls={mobileMenuId}
          aria-expanded={open}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          className="shrink-0 rounded-full border border-[color:var(--line)] p-2 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      {open && (
        <div
          id={mobileMenuId}
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[color:var(--line)] bg-[color:var(--card)] px-5 py-4 sm:px-6 lg:hidden"
        >
          {navItems.map((item) => (
            <Link
              aria-current={isCurrent(item.href) ? 'page' : undefined}
              className="block border-b border-[color:var(--line)] py-3 text-lg"
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="button-primary mt-5 inline-flex w-full"
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
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-5 md:gap-12 md:py-16 lg:px-8">
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
      <div className="border-t border-[color:var(--line)] px-5 py-6 text-center text-sm text-[color:var(--muted)] sm:px-6">
        © 2026 {company.name}. All rights reserved.
      </div>
    </footer>
  );
}

export function Chrome() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      setVisible(window.scrollY > 560);
    }
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  if (!visible) return null;

  return (
    <button
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-40 rounded-full bg-[color:var(--gold)] p-3 text-white shadow-xl transition hover:-translate-y-1 hover:bg-[color:var(--gold-dark)] sm:bottom-6 sm:right-6"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        })
      }
      type="button"
    >
      <ArrowUp aria-hidden="true" />
    </button>
  );
}
