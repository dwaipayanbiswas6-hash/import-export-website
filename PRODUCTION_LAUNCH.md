# Biswas Exports — Phase 2 Production Launch

This runbook is the final checklist for the catalogue and enquiry website.

## 1. Confirm public business information

Approve the exact values before adding them to Vercel:

- Final public domain
- Public business email
- Enquiry-receiving inbox
- Resend sender address
- Reply-to address
- Public phone number, if it should be shown
- Public WhatsApp number, if it should be shown
- Response-time wording that does not create an unconditional guarantee
- Optional legal name and registration disclosure supported by records

Do not place API keys or other secrets in GitHub, source files, screenshots or public environment variables.

## 2. Connect and verify the domain

1. Add the final domain to the Vercel project.
2. Apply the DNS records shown by Vercel at the domain registrar.
3. Confirm the apex domain and preferred `www` behaviour.
4. Wait until Vercel reports that the domain and SSL certificate are valid.
5. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin with no trailing slash.
6. Keep `NEXT_PUBLIC_ALLOW_INDEXING=false` until all launch tests pass.

Preview deployments must remain non-indexable.

## 3. Verify the Resend sending domain

1. Add the chosen sending domain or subdomain in Resend.
2. Add every DNS record supplied by Resend.
3. Wait until the sending domain is verified.
4. Create a sender such as `Biswas Exports <enquiries@yourdomain.com>`.
5. Create or select the inbox that will receive buyer enquiries.
6. Generate a production API key and store it only in Vercel.

The public website email, enquiry inbox and sender email can be different, but each role must be intentional and monitored.

## 4. Add Vercel Production environment variables

Required:

```text
NEXT_PUBLIC_SITE_URL=https://your-final-domain.com
NEXT_PUBLIC_ALLOW_INDEXING=false
RESEND_API_KEY=your-secret-key
CONTACT_TO_EMAIL=your-monitored-inbox@example.com
CONTACT_FROM_EMAIL=Biswas Exports <enquiries@your-verified-domain.com>
CONTACT_REPLY_TO_EMAIL=your-reply-address@example.com
NEXT_PUBLIC_CONTACT_EMAIL=your-public-email@example.com
NEXT_PUBLIC_CONTACT_RESPONSE_TIME=Your approved response-time wording
```

Optional:

```text
NEXT_PUBLIC_CONTACT_PHONE=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_LEGAL_NAME=
NEXT_PUBLIC_REGISTRATION_LINE=
```

Use the Production environment for final values. Preview values may be omitted or replaced with non-public test addresses. Never expose `RESEND_API_KEY` through a `NEXT_PUBLIC_` variable.

## 5. Validate configuration

With the production variables loaded, run:

```bash
npm run launch:check
```

The check validates the required domain and contact configuration without printing secret values.

## 6. Test the complete enquiry flow

Complete at least these production tests:

1. Submit a normal enquiry without an attachment.
2. Confirm the owner inbox receives the enquiry.
3. Confirm the buyer receives the acknowledgement and enquiry reference.
4. Reply to the acknowledgement and confirm it reaches the configured reply-to inbox.
5. Submit an enquiry with an approved PDF attachment below 10 MB.
6. Confirm the attachment arrives and its filename is safe.
7. Try an invalid file type and a file over 10 MB; both must be rejected.
8. Try invalid fields and confirm useful validation messages appear.
9. Confirm repeated rapid submissions are rate-limited.
10. Confirm no enquiry data or API key appears in browser source, logs or public pages.

The built-in rate limiter is a basic per-instance safeguard. A shared durable rate-limit store should be added later if abuse becomes material.

## 7. Final site checks

- Check homepage, catalogue, every category filter and representative product pages.
- Check Contact, Privacy Policy and Terms pages.
- Check mobile, tablet and desktop layouts.
- Check keyboard navigation and visible focus states.
- Confirm all 87 images load.
- Confirm `robots.txt` blocks indexing while `NEXT_PUBLIC_ALLOW_INDEXING=false`.
- Confirm canonical URLs and the sitemap use the final domain.
- Confirm security headers are present.
- Confirm Vercel production deployment and GitHub CI both pass.

## 8. Enable public indexing

Only after all tests pass:

1. Set `NEXT_PUBLIC_ALLOW_INDEXING=true` in the Vercel Production environment.
2. Redeploy production.
3. Confirm `robots.txt` allows crawling and lists the final sitemap.
4. Confirm page metadata no longer contains `noindex`.
5. Submit the sitemap to the selected search-engine webmaster tools during Phase 4.

## Phase 2 completion rule

Phase 2 is complete only when the final domain works, the production environment passes `npm run launch:check`, a real enquiry and acknowledgement have both been delivered successfully, and the approved public contact details are visible and accurate.
