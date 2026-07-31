# Biswas Exports — Phase 2 Production Launch

The enquiry database and Buyer Portal are the primary records. Email is used for passwordless sign-in and optional notifications; an enquiry must not be lost merely because a notification fails.

## 1. Confirm public and administrator details

Approve these values before adding them to Vercel:

- Final public domain
- Public business email, if displayed
- Administrator business email or comma-separated emails
- Public phone and WhatsApp numbers, if displayed
- Response-time wording that does not create an unconditional guarantee
- Optional legal name and registration disclosure supported by records

Do not place API keys, service-role keys or private inbox details in GitHub, screenshots or public environment variables.

## 2. Create the Supabase project

1. Create a Supabase project in the preferred region.
2. Open **Project Settings → API**.
3. Copy the project URL and publishable key.
4. Copy the service-role key separately and treat it as a secret.
5. Never expose the service-role key with a `NEXT_PUBLIC_` prefix.

## 3. Install the database and private storage schema

Open **Supabase → SQL Editor** and run:

```text
supabase/migrations/202608010001_buyer_portal.sql
```

The migration creates:

- `enquiries`
- `enquiry_messages`
- Buyer row-level security policies
- A function that links enquiries to the verified buyer account
- A private `enquiry-files` storage bucket
- Status and activity-update triggers

After running it, confirm that RLS is enabled on both public tables and that the storage bucket is private.

## 4. Configure passwordless business-email authentication

In **Supabase → Authentication → URL Configuration**:

1. Set the Site URL to the final HTTPS website origin.
2. Add the final callback URL:

```text
https://your-domain.com/portal/callback
```

3. During preview testing, add only the exact Vercel preview callback being tested.
4. Remove obsolete preview redirects after launch.

Email authentication and Magic Links must be enabled. The default Supabase email sender can be used for limited setup testing. Configure a production SMTP provider before inviting real buyers so delivery, sender identity and limits are suitable for business use.

The project also includes `/auth/confirm` for a future server-side token-hash email template. The default flow currently returns through `/portal/callback` and creates a cookie-based portal session.

## 5. Add Vercel environment variables

Required for the database-first portal:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ALLOW_INDEXING=false
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-secret-service-role-key
PORTAL_ADMIN_EMAILS=your-admin@company.com
NEXT_PUBLIC_CONTACT_RESPONSE_TIME=Your approved response-time wording
```

Optional public details:

```text
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_CONTACT_PHONE=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_LEGAL_NAME=
NEXT_PUBLIC_REGISTRATION_LINE=
```

Optional Resend notifications:

```text
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=Biswas Exports <enquiries@your-verified-domain.com>
CONTACT_REPLY_TO_EMAIL=
```

Resend is not required to store enquiries or portal messages. Configure all four Resend variables together or leave them blank.

Use real secrets only in the Vercel Production environment. Preview deployments can use a separate Supabase test project or remain unconfigured.

## 6. Deploy and validate configuration

After adding the variables, redeploy the project and run:

```bash
npm run launch:check
```

The validator checks the domain, Supabase settings, administrator emails and optional Resend group without printing secret values.

## 7. Test the complete buyer journey

1. Submit a valid enquiry without an attachment.
2. Confirm the success page displays an enquiry reference.
3. Confirm the row appears in Supabase and `/admin/enquiries`.
4. Confirm the buyer receives a Magic Link from Supabase Auth.
5. Open the link and verify `/portal` shows only enquiries for that business email.
6. Open the enquiry and post a buyer reply.
7. Sign in with an email that has no enquiry and confirm no data is exposed.
8. Submit a PDF below 10 MB and confirm the private file can be opened only through a temporary signed link.
9. Try an unsupported file and a file over 10 MB; both must be rejected.
10. Confirm repeated enquiry and login requests are rate-limited.

## 8. Test the administrator workflow

1. Sign in using an email listed in `PORTAL_ADMIN_EMAILS`.
2. Open `/admin/enquiries` and confirm all enquiries are visible.
3. Open one enquiry and change its status.
4. Post a response and optional document.
5. Confirm the buyer can read the response after portal login.
6. Confirm a non-admin authenticated buyer is redirected away from admin routes.
7. Confirm service-role keys and other secrets never appear in browser source or network responses.

## 9. Test optional email notifications

When Resend is configured:

1. Confirm the administrator receives a new-enquiry alert.
2. Confirm the buyer receives a response-available notification after an admin portal reply.
3. Confirm a Resend failure does not remove or reject the saved enquiry or message.

## 10. Connect the final domain and security checks

1. Add the domain to Vercel and apply the DNS records.
2. Wait for a valid SSL certificate.
3. Confirm canonical URLs, sitemap and robots configuration use the final domain.
4. Confirm security headers are present.
5. Check mobile, tablet, desktop and keyboard navigation.
6. Confirm all 87 product images and representative product pages load.
7. Confirm Privacy Policy and Terms describe portal storage and authentication.

## 11. Enable indexing only after portal acceptance

1. Keep `NEXT_PUBLIC_ALLOW_INDEXING=false` throughout setup and testing.
2. After every production test passes, set it to `true`.
3. Redeploy production.
4. Confirm `robots.txt` allows crawling and page metadata no longer contains `noindex`.

## Phase 2 completion rule

Phase 2 is operationally complete only when the final domain works, the Supabase migration is installed, a real enquiry is stored, the buyer can sign in and view the response, the administrator can reply from the private inbox, private files remain protected, and all approved public details are accurate.
