import {
  products,
  type Product,
} from './products-with-image-overrides';

const healthcareImageOverrides: Record<
  string,
  Pick<Product, 'image' | 'imageAlt'>
> = {
  'generic-medicines': {
    image: '/images/products/generic-medicines.webp',
    imageAlt:
      'Assorted medicine boxes, bottles, tablets and capsules arranged on a clean surface',
  },
  'synthetic-nitrile-surgical-gloves': {
    image: '/images/products/synthetic-nitrile-surgical-gloves.webp',
    imageAlt:
      'Blue nitrile examination gloves with a glove box in a clinical setting',
  },
  syringes: {
    image: '/images/products/syringes.webp',
    imageAlt:
      'Individually packed sterile syringes with one unpacked syringe',
  },
  'medical-disposables': {
    image: '/images/products/medical-disposables.webp',
    imageAlt:
      'Assorted medical disposables including masks, gloves, tubing, dressings and specimen cups',
  },
  'herbal-extracts': {
    image: '/images/products/herbal-extracts.webp',
    imageAlt:
      'Herbal ingredients, amber extract bottles and a mortar arranged on a wooden table',
  },
  'plant-essential-oils': {
    image: '/images/products/plant-essential-oils.webp',
    imageAlt:
      'Amber essential-oil bottles with lemon, lavender and aromatic plant sprigs',
  },
  'organic-chemicals': {
    image: '/images/products/organic-chemicals.webp',
    imageAlt:
      'Laboratory glassware and chemical bottles containing clear and coloured liquids',
  },
  dyes: {
    image: '/images/products/dyes.webp',
    imageAlt:
      'Assorted brightly coloured dye powders with prepared liquid dye samples',
  },
  pigments: {
    image: '/images/products/pigments.webp',
    imageAlt:
      'Assorted industrial pigment powders in blue, red, yellow, black, white and orange',
  },
  adhesives: {
    image: '/images/products/adhesives.webp',
    imageAlt:
      'Assorted adhesive and sealant cartridges, tubes and dispensing bottles',
  },
};

// The imported catalogue functions reference this same products array, so
// applying overrides here keeps every existing catalogue helper consistent.
for (const product of products) {
  const override = healthcareImageOverrides[product.slug];
  if (override) Object.assign(product, override);
}

export * from './products-with-image-overrides';
