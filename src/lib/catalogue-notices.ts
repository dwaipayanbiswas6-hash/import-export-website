import type { Product, ProductCategory } from '@/lib/products';

const commonNotice =
  'This is an indicative sourcing-category listing. It does not confirm stock, price, supplier appointment, certification, export eligibility or acceptance of an order.';

const categoryNotices: Record<ProductCategory, string> = {
  'Food & Agriculture':
    'Variety, crop year, analytical parameters, residue limits, food-safety documents, allergens, shelf life and destination labelling must be verified for the selected supply.',
  'Processed Vegetarian Food':
    'Ingredients, allergens, recipe status, processing aids, shelf life, food-safety documents and destination labelling must be verified before quotation.',
  'Textiles & Fashion':
    'Fibre composition, dyes, finishes, dimensions, test requirements and any sustainability or material claim require supplier evidence and buyer approval.',
  'Engineering & Industrial':
    'Material grade, dimensions, tolerances, coatings, test certificates and end-use suitability must be confirmed against drawings and written specifications.',
  Packaging:
    'Material structure, dimensions, print, food-contact suitability, migration, recycling and destination packaging requirements must be verified where applicable.',
  'Electrical & Energy':
    'Ratings, applicable standards, test reports, installation conditions, transport classification and destination conformity requirements must be confirmed.',
  'Chemicals & Healthcare':
    'Regulated products are considered only for lawful B2B enquiries through appropriately authorised parties. Registration, licensing, SDS, classification, transport and destination requirements must be verified; no medical or therapeutic claim is made.',
  'Home & Lifestyle':
    'Materials, coatings, finishes, dimensions, safety requirements and environmental, vegan or plant-based claims require evidence from the selected supplier.',
};

const productNotices: Record<string, string[]> = {
  'organic-food-products': [
    'The term “organic” must be supported by valid certification acceptable in the destination market for the specific product and supply chain.',
  ],
  'ready-to-eat-vegan-curries': [
    'Vegan status requires ingredient, processing-aid, cross-contact and facility information from the selected manufacturer.',
  ],
  'plant-fibre-carpets-rugs': [
    'Fibre identity and any natural, sustainable or biodegradable claim must be supported by material documentation.',
  ],
  batteries: [
    'Battery chemistry, UN transport classification, test documentation, packing instruction and carrier acceptance must be confirmed before shipment planning.',
  ],
  'generic-medicines': [
    'Medicine enquiries require licensed manufacturers, exporters and importers, product registration, batch documentation and destination-specific authorisation. This website does not sell medicines to consumers.',
  ],
  'synthetic-nitrile-surgical-gloves': [
    'Examination, medical, sterile or surgical classification may be used only when supported by the applicable device registration, test evidence and labelled intended use.',
  ],
  syringes: [
    'Sterility, single-use status, device classification, registration, needle configuration and packaging integrity must be supported by manufacturer documentation.',
  ],
  'medical-disposables': [
    'Each item requires product-specific device classification, intended-use, sterility and registration review; the category name alone is not evidence of conformity.',
  ],
  'herbal-extracts': [
    'Botanical identity, extraction method, solvent residues, contaminants and intended use must be documented. No therapeutic benefit is represented.',
  ],
  'plant-essential-oils': [
    'Botanical name, plant part, extraction method, composition, allergens and intended use must be documented. No therapeutic benefit is represented.',
  ],
  'organic-chemicals': [
    'Chemical identity, concentration, SDS, hazard classification, packaging group and transport restrictions must be confirmed for the exact substance.',
  ],
  dyes: [
    'Chemical identity, restricted-substance requirements, SDS and suitability for the buyer’s process and destination must be verified.',
  ],
  pigments: [
    'Composition, heavy-metal limits, restricted-substance requirements, SDS and end-use suitability must be verified.',
  ],
  adhesives: [
    'Chemistry, curing conditions, shelf life, SDS, transport classification and substrate suitability require product-specific confirmation.',
  ],
  'plant-based-incense-sticks': [
    'Plant-based content, fragrance ingredients, binders, emissions and destination consumer-product requirements must be substantiated.',
  ],
  'plant-wax-candles': [
    'Wax composition, fragrance content, wick construction, burn testing and plant-based claims require supplier evidence.',
  ],
  'eco-friendly-bags': [
    'The term “eco-friendly” is not a certification. Material, recycled content, reusability, biodegradability or compostability claims require specific evidence.',
  ],
  'vegan-handmade-soaps': [
    'Vegan and handmade claims, ingredient composition, cosmetic registration, safety assessment and destination labelling must be supported.',
  ],
  'vegan-cosmetics': [
    'Vegan status, ingredient composition, safety assessment, manufacturing compliance, claims and destination cosmetic registration must be supported.',
  ],
  'plant-based-hair-oil': [
    'Plant-based content, ingredient composition, cosmetic classification, safety assessment and any performance claim require documentation.',
  ],
  'educational-toys': [
    'Age grading, material safety, mechanical and chemical testing, warnings and destination toy-safety requirements must be confirmed.',
  ],
};

export function getCatalogueNotices(product: Product) {
  return [
    commonNotice,
    categoryNotices[product.category],
    ...(productNotices[product.slug] ?? []),
  ];
}
