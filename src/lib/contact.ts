import { z } from 'zod';

export const productCategories = [
  'Food & Agriculture',
  'Processed Vegetarian Food',
  'Textiles & Fashion',
  'Engineering & Industrial',
  'Packaging',
  'Electrical & Energy',
  'Chemicals & Healthcare',
  'Home & Lifestyle',
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

const optionalText = (maximum: number, message: string) =>
  z.string().trim().max(maximum, message).optional();

export const contactSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, 'Please enter your company or business name.')
    .max(160, 'Company or business name is too long.'),
  contactPerson: z
    .string()
    .trim()
    .min(2, 'Please enter the contact person.')
    .max(120, 'Contact person name is too long.'),
  jobTitle: z
    .string()
    .trim()
    .min(1, 'Please enter the job title.')
    .max(120, 'Job title is too long.'),
  companyWebsite: z
    .string()
    .trim()
    .max(300, 'Website URL is too long.')
    .refine(
      (value) => !value || z.url().safeParse(value).success,
      'Please enter a valid website URL, including https://.',
    )
    .optional(),
  businessEmail: z
    .string()
    .trim()
    .max(254, 'Business email is too long.')
    .email('Please enter a valid business email.'),
  country: z
    .string()
    .trim()
    .min(1, 'Please enter your country.')
    .max(100, 'Country name is too long.'),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone or WhatsApp number.')
    .max(40, 'Phone or WhatsApp number is too long.')
    .regex(
      /^[+()\-\s0-9.]+$/,
      'Use only numbers and standard phone-number symbols.',
    ),
  productCategory: z.enum(productCategories, {
    error: 'Please select a product category.',
  }),
  productRequirement: z
    .string()
    .trim()
    .min(10, 'Please describe your requirement in at least 10 characters.')
    .max(5000, 'Product requirement must be 5,000 characters or fewer.'),
  productSpecifications: optionalText(
    5000,
    'Product specifications must be 5,000 characters or fewer.',
  ),
  quantity: z
    .string()
    .trim()
    .min(1, 'Please enter the required quantity.')
    .max(160, 'Quantity description is too long.'),
  destination: z
    .string()
    .trim()
    .min(1, 'Please enter a destination.')
    .max(160, 'Destination is too long.'),
  timeline: z
    .string()
    .trim()
    .min(1, 'Please enter your target timeline.')
    .max(160, 'Timeline description is too long.'),
  incoterm: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.enum(incoterms).optional(),
  ),
  additionalNotes: optionalText(
    5000,
    'Additional notes must be 5,000 characters or fewer.',
  ),
  privacyConsent: z
    .boolean()
    .refine(
      (value) => value,
      'Please agree to the privacy statement before submitting.',
    ),
  website: z.string().max(0, 'Spam submission rejected.'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
