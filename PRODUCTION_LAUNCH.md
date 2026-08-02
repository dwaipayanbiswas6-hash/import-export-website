# Biswas Exports — Phase 2 Production Launch

The Supabase enquiry database and private administrator inbox are the primary records. Buyers do not receive portal accounts or sign-in links. Biswas Exports responds directly to the business email, phone or WhatsApp details supplied in the enquiry.

## 1. Confirm public and administrator details

Approve these values before adding them to Vercel:

- Final public domain
- Public business email, preferably `contact@biswasexports.com` after the mailbox is configured
- Administrator business email or comma-separated emails
- Public phone and WhatsApp numbers, if displayed
- Response-time wording that does not create an unconditional guarantee
- Optional legal name and registration disclosure supported by records

Do not place API keys, secret keys or private inbox details in GitHub, screenshots or public environment variables.

## 2. Supabase project and schema

The Supabase project must contain the migration:

```text
supabase/migrations/202608010001_buyer_portal.sql
```

The existing migration creates the `enquiries` table, supporting records and the private `enquiry-files` storage bucket. The current application uses the enquiry table and private storage through server-side administrator access. Buyer-facing portal routes and messaging are disabled.

Confirm:

- The Supabase project is healthy.
- The migration completed successfully.
- The `enquiry-files` bucket is private.
- The service secret is stored only in Vercel server-side environment variables.

## 3. Configure administrator authentication

Supabase passwordless authentication is used only by approved administrators.

In **Supabase → Authentication → URL Configuration**:

1. Set the Site URL to the final HTTPS website origin.
2. Add the final callback URL:

```text
https://your-domain.com/portal/callback**
```

3. During preview testing, add only the exact Vercel preview callback being tested.
4. Remove obsolete preview redirects after launch.

The administrator sign-in page is:

```text
/portal/login?next=/admin/enquiries
```

It sends a link only when the email is listed in `PORTAL_ADMIN_EMAILS`. This URL is not linked from the public buyer experience.

## 4. Add Vercel environment variables

Required:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ALLOW_INDEXING=false
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-server-secret
PORTAL_ADMIN_EMAILS=your-admin@company.com
NEXT_PUBLIC_CONTACT_RESPONSE_TIME=Your approved response-time wording
```

Optional public details:

```text
NEXT_PUBLIC_CONTACT_EMAIL=contact@biswasexports.com
NEXT_PUBLIC_CONTACT_PHONE=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_LEGAL_NAME=
NEXT_PUBLIC_REGISTRATION_LINE=
```

Optional Resend administrator alerts:

```text
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=Biswas Exports <contact@biswasexports.com>
```

Resend is not required to save an enquiry. When configured, it sends an alert to the administrator after the database record is created. Buyers are not sent authentication or portal-notification emails.

## 5. Deploy and validate configuration

After adding the variables, redeploy and run:

```bash
npm run launch:check
```

The validator checks the production domain, Supabase settings, administrator emails and optional Resend administrator-alert group without printing secret values.

## 6. Test the public enquiry flow

1. Submit a valid enquiry without an attachment.
2. Confirm the success page displays a unique `BE-YYYY-...` reference.
3. Confirm the page does not mention a buyer portal or ask the buyer to sign in.
4. Confirm the row appears in Supabase and `/admin/enquiries`.
5. Submit a PDF below 10 MB and confirm the private file can be opened from the admin workspace through a temporary signed link.
6. Try an unsupported file and a file over 10 MB; both must be rejected.
7. Confirm repeated enquiry requests are rate-limited.

## 7. Test the administrator workflow

1. Sign in using an email listed in `PORTAL_ADMIN_EMAILS`.
2. Open `/admin/enquiries` and confirm all enquiries are visible.
3. Confirm an unapproved email does not receive an administrator sign-in link.
4. Open one enquiry and change its status.
5. Tap **Reply by email** and confirm the device opens an email draft addressed to the buyer with the enquiry reference in the subject.
6. Send real responses from the official Biswas Exports mailbox, preferably `contact@biswasexports.com` after it is configured.
7. Confirm private RFQ files are not publicly accessible.
8. Confirm server secrets never appear in browser source or network responses.

## 8. Test optional administrator notifications

When Resend is configured:

1. Confirm the administrator receives a new-enquiry alert.
2. Confirm the alert contains the enquiry reference, buyer company and business email.
3. Confirm a Resend failure does not remove or reject the saved enquiry.

## 9. Connect the final domain and security checks

1. Add the domain to Vercel and apply the DNS records.
2. Wait for a valid SSL certificate.
3. Confirm canonical URLs, sitemap and robots configuration use the final domain.
4. Confirm security headers are present.
5. Check mobile, tablet, desktop and keyboard navigation.
6. Confirm all 87 product images and representative product pages load.
7. Confirm the Privacy Policy and Terms describe database storage and direct email responses accurately.

## 10. Enable indexing only after acceptance

1. Keep `NEXT_PUBLIC_ALLOW_INDEXING=false` throughout setup and testing.
2. After every production test passes, set it to `true`.
3. Redeploy production.
4. Confirm `robots.txt` allows crawling and page metadata no longer contains `noindex`.

## Phase 2 completion rule

Phase 2 is operationally complete only when the final domain works, a real enquiry is saved, an approved administrator can access the private inbox, status changes work, private RFQ files remain protected, direct email reply drafts open correctly and all approved public details are accurate.
