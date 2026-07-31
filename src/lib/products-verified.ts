import {
  products,
  type ProductCategory,
} from './products-with-home-lifestyle-image-overrides';

const categoryContext: Record<ProductCategory, string> = {
  'Food & Agriculture':
    'Variety, crop form, food-safety parameters, shelf life and destination controls shape the review.',
  'Processed Vegetarian Food':
    'Recipe, ingredients, allergens, processing, pack format, shelf life and destination labelling shape the review.',
  'Textiles & Fashion':
    'Fibre composition, construction, dimensions, colour, finishing, testing and buyer branding shape the review.',
  'Engineering & Industrial':
    'Drawings, material grade, tolerances, surface treatment, operating conditions, testing and documentation shape the review.',
  Packaging:
    'Dimensions, material structure, barrier performance, print, filling process, transit use and destination rules shape the review.',
  'Electrical & Energy':
    'Ratings, interfaces, operating environment, testing, transport classification and destination standards shape the review.',
  'Chemicals & Healthcare':
    'Identity, intended use, authorised supply route, registration, safety documentation, transport and destination requirements shape the review.',
  'Home & Lifestyle':
    'Material, dimensions, workmanship, finish, safety, retail presentation, claims and protective packing shape the review.',
};

const commonBuyerNote =
  'Catalogue information is indicative. It does not confirm stock, price, supplier appointment, manufacturer identity, certification, registration, export eligibility or acceptance of an order.';

for (const product of products) {
  const productName = product.name.toLowerCase();
  product.shortDescription = `Professional B2B sourcing enquiries for ${productName} from potential Indian supply options, subject to verification.`;
  product.description = `Biswas Exports reviews professional B2B sourcing enquiries for ${productName}. ${categoryContext[product.category]} A suitable supplier, actual product origin, availability, specifications, claims, documentation, packaging, lead time and commercial terms must be confirmed before quotation or reliance.`;
  product.buyerNotes = [
    ...(product.buyerNotes ?? []),
    commonBuyerNote,
  ];
}

export * from './products-with-home-lifestyle-image-overrides';
