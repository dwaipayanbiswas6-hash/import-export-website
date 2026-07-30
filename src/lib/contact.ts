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
  'Not decided',
  'EXW',
  'FOB',
  'CFR',
  'CIF',
  'DDP',
  'Other',
] as const;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name.'),
  businessEmail: z
    .string()
    .trim()
    .email('Please enter a valid business email.'),
  country: z.string().trim().min(1, 'Please enter your country.'),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone or WhatsApp number.'),
  companyName: z.string().trim().optional(),
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
  incoterm: z.enum(incoterms).optional(),
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
