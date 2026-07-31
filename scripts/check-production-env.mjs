const required = [
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'PORTAL_ADMIN_EMAILS',
  'NEXT_PUBLIC_CONTACT_RESPONSE_TIME',
];

const missing = required.filter((name) => !process.env[name]?.trim());
const failures = [];

if (missing.length) failures.push(`Missing variables: ${missing.join(', ')}`);

function validateHttpsOrigin(name, value) {
  if (!value) return;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:') failures.push(`${name} must use https.`);
    if (parsed.pathname !== '/' || parsed.search || parsed.hash)
      failures.push(`${name} must contain only an origin.`);
  } catch {
    failures.push(`${name} must be a valid absolute URL.`);
  }
}

validateHttpsOrigin(
  'NEXT_PUBLIC_SITE_URL',
  process.env.NEXT_PUBLIC_SITE_URL?.trim(),
);
validateHttpsOrigin(
  'NEXT_PUBLIC_SUPABASE_URL',
  process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
);

if (process.env.NEXT_PUBLIC_ALLOW_INDEXING?.trim().toLowerCase() !== 'true') {
  failures.push('NEXT_PUBLIC_ALLOW_INDEXING must be true for final launch.');
}

function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function emailList(name) {
  const values = (process.env[name] ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  if (values.some((value) => !looksLikeEmail(value)))
    failures.push(`${name} contains an invalid email address.`);
  return values;
}

const adminEmails = emailList('PORTAL_ADMIN_EMAILS');
if (!adminEmails.length)
  failures.push('PORTAL_ADMIN_EMAILS must contain at least one email.');

const optionalEmailNames = [
  'CONTACT_TO_EMAIL',
  'CONTACT_REPLY_TO_EMAIL',
  'NEXT_PUBLIC_CONTACT_EMAIL',
];
for (const name of optionalEmailNames) {
  const value = process.env[name]?.trim();
  if (!value) continue;
  if (name === 'CONTACT_TO_EMAIL') emailList(name);
  else if (!looksLikeEmail(value)) failures.push(`${name} is not valid.`);
}

const resendVariables = [
  'RESEND_API_KEY',
  'CONTACT_TO_EMAIL',
  'CONTACT_FROM_EMAIL',
  'CONTACT_REPLY_TO_EMAIL',
];
const configuredResend = resendVariables.filter((name) =>
  process.env[name]?.trim(),
);
if (configuredResend.length && configuredResend.length !== resendVariables.length) {
  failures.push(
    'Configure all Resend notification variables together or leave all of them blank.',
  );
}

const sender = process.env.CONTACT_FROM_EMAIL?.trim();
if (sender && !sender.includes('@'))
  failures.push('CONTACT_FROM_EMAIL does not contain a sender email address.');

if (failures.length) {
  console.error('Production launch configuration failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Production launch environment is complete.');
console.log('Domain, Supabase portal and administrator settings are present.');
console.log('Resend notifications are optional because portal records are primary.');
