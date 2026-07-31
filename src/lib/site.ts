function configured(value: string | undefined) {
  return value?.trim() || null;
}

function normaliseSiteUrl(value: string) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, '');
}

const vercelHost =
  configured(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  configured(process.env.VERCEL_URL);

export const siteUrl = normaliseSiteUrl(
  configured(process.env.NEXT_PUBLIC_SITE_URL) ??
    (vercelHost ? `https://${vercelHost}` : 'http://localhost:3000'),
);

export const allowIndexing =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING?.trim().toLowerCase() === 'true';

export const publicContact = {
  email: configured(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  phone: configured(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  whatsapp: configured(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  responseTime:
    configured(process.env.NEXT_PUBLIC_CONTACT_RESPONSE_TIME) ??
    'Response timing depends on the completeness and verification needs of the enquiry.',
};

export const publicBusiness = {
  brand: 'Biswas Exports',
  location: 'Asansol, West Bengal, India',
  legalName: configured(process.env.NEXT_PUBLIC_LEGAL_NAME),
  registrationLine: configured(process.env.NEXT_PUBLIC_REGISTRATION_LINE),
};

export function whatsappUrl(value: string | null) {
  if (!value) return null;
  const digits = value.replace(/\D/g, '');
  return digits ? `https://wa.me/${digits}` : null;
}
