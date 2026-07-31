const required = [
  'NEXT_PUBLIC_SITE_URL',
  'RESEND_API_KEY',
  'CONTACT_TO_EMAIL',
  'CONTACT_FROM_EMAIL',
  'CONTACT_REPLY_TO_EMAIL',
  'NEXT_PUBLIC_CONTACT_EMAIL',
];

const missing = required.filter((name) => !process.env[name]?.trim());
const failures = [];

if (missing.length) {
  failures.push(`Missing variables: ${missing.join(', ')}`);
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (siteUrl) {
  try {
    const parsed = new URL(siteUrl);
    if (parsed.protocol !== 'https:')
      failures.push('NEXT_PUBLIC_SITE_URL must use https.');
    if (parsed.pathname !== '/' || parsed.search || parsed.hash)
      failures.push('NEXT_PUBLIC_SITE_URL must contain only the public origin.');
  } catch {
    failures.push('NEXT_PUBLIC_SITE_URL must be a valid absolute URL.');
  }
}

if (process.env.NEXT_PUBLIC_ALLOW_INDEXING?.trim().toLowerCase() !== 'true') {
  failures.push('NEXT_PUBLIC_ALLOW_INDEXING must be true for final launch.');
}

function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const recipientList = (process.env.CONTACT_TO_EMAIL ?? '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);
if (recipientList.some((value) => !looksLikeEmail(value)))
  failures.push('CONTACT_TO_EMAIL contains an invalid email address.');

const replyTo = process.env.CONTACT_REPLY_TO_EMAIL?.trim();
if (replyTo && !looksLikeEmail(replyTo))
  failures.push('CONTACT_REPLY_TO_EMAIL is not a valid email address.');

const publicEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
if (publicEmail && !looksLikeEmail(publicEmail))
  failures.push('NEXT_PUBLIC_CONTACT_EMAIL is not a valid email address.');

const sender = process.env.CONTACT_FROM_EMAIL?.trim();
if (sender && !sender.includes('@'))
  failures.push('CONTACT_FROM_EMAIL does not contain a sender email address.');

if (failures.length) {
  console.error('Production launch configuration failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Production launch environment is complete.');
console.log('Required contact and domain variables are present and valid.');
