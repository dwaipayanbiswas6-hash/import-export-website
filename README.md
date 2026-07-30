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

## Phase 2 Recommendations

Add CMS-backed content, customer portal authentication, shipment tracking integrations, multilingual routing, analytics dashboards, CRM form submission, and automated accessibility/performance monitoring.
