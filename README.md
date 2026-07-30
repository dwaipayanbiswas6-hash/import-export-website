# Biswas Exports Frontend

Enterprise-grade Phase 1 frontend for a modern import and export company, built with Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, React Hook Form, and Zod.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- React Hook Form
- Zod
- ESLint
- Prettier

## Setup

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Quality Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for GitHub and Vercel deployment steps.

## Contact form setup

The Contact page submits enquiries through `/api/contact`, which sends the
business notification and buyer acknowledgement through the Resend API. Copy
`.env.example` to `.env.local` and configure:

- `RESEND_API_KEY`: server-only Resend API key.
- `CONTACT_TO_EMAIL`: inbox that receives enquiries.
- `CONTACT_FROM_EMAIL`: sender on a domain verified in Resend.
- `NEXT_PUBLIC_CONTACT_EMAIL`: public email shown on the Contact page.
- `NEXT_PUBLIC_CONTACT_PHONE`: public telephone number.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: WhatsApp number with international country code.

Add the same variables to the Vercel project settings for Preview and Production.
Never expose `RESEND_API_KEY` as a `NEXT_PUBLIC_` variable. Missing server-side
email configuration produces a controlled service-unavailable response instead
of displaying a false success state.

## Product catalogue

The complete catalogue source of truth is `src/lib/products.ts`. Product IDs and
lowercase kebab-case slugs must remain unique. Add or edit a seed there, provide
all buyer-facing fields through the typed profile architecture, and run
`npm run catalogue:validate`; this checks the 87-product total, required fields,
unique IDs and slugs, and all eight category totals.

Product visuals live in `public/images/products/<slug>.svg`. Replace a visual
only with an accurate, web-optimised asset for which usage rights are documented
in `IMAGE_SOURCES.md`, then update the product image path and alt text. Product
cards and detail pages use the central data rather than duplicate arrays.

Request Quote links pass a product slug through `/contact?product=<slug>`. The
Contact page validates that slug against the catalogue before prefilling its
editable category and requirement fields; the existing client/server validation,
honeypot, privacy consent, file controls, rate limiting, and Resend delivery
remain unchanged.

## Phase 2 Recommendations

Add CMS-backed content, customer portal authentication, shipment tracking integrations, multilingual routing, analytics dashboards, CRM form submission, and automated accessibility/performance monitoring.
