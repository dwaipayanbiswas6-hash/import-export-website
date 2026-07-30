import { z } from 'zod';

export const productCategories = [
  'Agricultural Products',
  'Textiles & Apparel',
  'Handicrafts & Home Décor',
  'Industrial Goods',
  'Consumer Products',
  'Custom Sourcing',
  'Other',
] as const;

export const incoterms = [
  'Not Decided',
  'EXW',
  'FOB',
  'FCA',
  'CFR',
  'CIF',
  'DAP',
  'DDP',
  'Other',
] as const;

export const contactSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, 'Please enter your company or business name.'),
  contactPerson: z.string().trim().min(2, 'Please enter the contact person.'),
  jobTitle: z.string().trim().min(1, 'Please enter the job title.'),
  companyWebsite: z
    .string()
    .trim()
    .refine(
      (value) => !value || z.url().safeParse(value).success,
      'Please enter a valid website URL, including https://.',
    )
    .optional(),
  businessEmail: z
    .string()
    .trim()
    .email('Please enter a valid business email.'),
  country: z.string().trim().min(1, 'Please enter your country.'),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone or WhatsApp number.'),
  productCategory: z.enum(productCategories, {
    error: 'Please select a product category.',
  }),
  productRequirement: z
    .string()
    .trim()
    .min(10, 'Please describe your requirement in at least 10 characters.'),
  productSpecifications: z.string().trim().optional(),
  quantity: z.string().trim().min(1, 'Please enter the required quantity.'),
  destination: z.string().trim().min(1, 'Please enter a destination.'),
  timeline: z.string().trim().min(1, 'Please enter your target timeline.'),
  incoterm: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.enum(incoterms).optional(),
  ),
  additionalNotes: z.string().trim().optional(),
  privacyConsent: z
    .boolean()
    .refine(
      (value) => value,
      'Please agree to the privacy statement before submitting.',
    ),
  website: z.string().max(0, 'Spam submission rejected.'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
