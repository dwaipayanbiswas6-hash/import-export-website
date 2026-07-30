export const productCategories = [
  'Food & Agriculture',
  'Processed Vegetarian Food',
  'Textiles & Fashion',
  'Engineering & Industrial',
  'Packaging',
  'Electrical & Energy',
  'Chemicals & Healthcare',
  'Home & Lifestyle',
] as const;
export type ProductCategory = (typeof productCategories)[number];
export type ProductSpecification = { label: string; value: string };
export type Product = {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  packagingOptions: string[];
  moq: string;
  origin: 'India';
  specifications: ProductSpecification[];
  applications: string[];
  buyerNotes?: string[];
  keywords: string[];
  featured: boolean;
};
type ProductSeed = {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
};
const seeds: ProductSeed[] = [
  {
    id: 1,
    slug: 'spices-blended-assorted',
    name: 'Spices – blended/assorted',
    category: 'Food & Agriculture',
  },
  {
    id: 2,
    slug: 'basmati-rice',
    name: 'Basmati rice',
    category: 'Food & Agriculture',
  },
  {
    id: 3,
    slug: 'tea',
    name: 'Tea',
    category: 'Food & Agriculture',
  },
  {
    id: 4,
    slug: 'coffee',
    name: 'Coffee',
    category: 'Food & Agriculture',
  },
  {
    id: 5,
    slug: 'mango-pulp',
    name: 'Mango pulp',
    category: 'Food & Agriculture',
  },
  {
    id: 6,
    slug: 'organic-food-products',
    name: 'Organic food products',
    category: 'Food & Agriculture',
  },
  {
    id: 7,
    slug: 'fresh-grapes',
    name: 'Fresh grapes',
    category: 'Food & Agriculture',
  },
  {
    id: 8,
    slug: 'pomegranates',
    name: 'Pomegranates',
    category: 'Food & Agriculture',
  },
  {
    id: 9,
    slug: 'turmeric',
    name: 'Turmeric',
    category: 'Food & Agriculture',
  },
  {
    id: 10,
    slug: 'chilli',
    name: 'Chilli',
    category: 'Food & Agriculture',
  },
  {
    id: 11,
    slug: 'cumin',
    name: 'Cumin',
    category: 'Food & Agriculture',
  },
  {
    id: 12,
    slug: 'coriander-seed',
    name: 'Coriander seed',
    category: 'Food & Agriculture',
  },
  {
    id: 13,
    slug: 'cardamom',
    name: 'Cardamom',
    category: 'Food & Agriculture',
  },
  {
    id: 14,
    slug: 'black-pepper',
    name: 'Black pepper',
    category: 'Food & Agriculture',
  },
  {
    id: 15,
    slug: 'ginger',
    name: 'Ginger',
    category: 'Food & Agriculture',
  },
  {
    id: 16,
    slug: 'garlic',
    name: 'Garlic',
    category: 'Food & Agriculture',
  },
  {
    id: 17,
    slug: 'onion',
    name: 'Onion',
    category: 'Food & Agriculture',
  },
  {
    id: 18,
    slug: 'groundnuts',
    name: 'Groundnuts',
    category: 'Food & Agriculture',
  },
  {
    id: 19,
    slug: 'pickles',
    name: 'Pickles',
    category: 'Processed Vegetarian Food',
  },
  {
    id: 20,
    slug: 'papad',
    name: 'Papad',
    category: 'Processed Vegetarian Food',
  },
  {
    id: 21,
    slug: 'instant-vegetarian-mixes',
    name: 'Instant vegetarian mixes',
    category: 'Processed Vegetarian Food',
  },
  {
    id: 22,
    slug: 'vegetarian-biscuits',
    name: 'Vegetarian biscuits',
    category: 'Processed Vegetarian Food',
  },
  {
    id: 23,
    slug: 'namkeen',
    name: 'Namkeen',
    category: 'Processed Vegetarian Food',
  },
  {
    id: 24,
    slug: 'ready-to-eat-vegan-curries',
    name: 'Ready-to-eat vegan curries',
    category: 'Processed Vegetarian Food',
  },
  {
    id: 25,
    slug: 'fruit-juice-concentrates',
    name: 'Fruit juice concentrates',
    category: 'Processed Vegetarian Food',
  },
  {
    id: 26,
    slug: 'coconut-products',
    name: 'Coconut products',
    category: 'Processed Vegetarian Food',
  },
  {
    id: 27,
    slug: 'cashews',
    name: 'Cashews',
    category: 'Processed Vegetarian Food',
  },
  {
    id: 28,
    slug: 'raisins',
    name: 'Raisins',
    category: 'Processed Vegetarian Food',
  },
  {
    id: 29,
    slug: 'cotton-garments',
    name: 'Cotton garments',
    category: 'Textiles & Fashion',
  },
  {
    id: 30,
    slug: 't-shirts',
    name: 'T-shirts',
    category: 'Textiles & Fashion',
  },
  {
    id: 31,
    slug: 'denim-fabric-garments',
    name: 'Denim fabric/garments',
    category: 'Textiles & Fashion',
  },
  {
    id: 32,
    slug: 'home-textiles',
    name: 'Home textiles',
    category: 'Textiles & Fashion',
  },
  {
    id: 33,
    slug: 'bed-sheets',
    name: 'Bed sheets',
    category: 'Textiles & Fashion',
  },
  {
    id: 34,
    slug: 'towels',
    name: 'Towels',
    category: 'Textiles & Fashion',
  },
  {
    id: 35,
    slug: 'plant-fibre-carpets-rugs',
    name: 'Plant-fibre carpets/rugs',
    category: 'Textiles & Fashion',
  },
  {
    id: 36,
    slug: 'fasteners',
    name: 'Fasteners',
    category: 'Engineering & Industrial',
  },
  {
    id: 37,
    slug: 'nuts-and-bolts',
    name: 'Nuts and bolts',
    category: 'Engineering & Industrial',
  },
  {
    id: 38,
    slug: 'pipe-fittings',
    name: 'Pipe fittings',
    category: 'Engineering & Industrial',
  },
  {
    id: 39,
    slug: 'steel-fabrication',
    name: 'Steel fabrication',
    category: 'Engineering & Industrial',
  },
  {
    id: 40,
    slug: 'aluminium-products',
    name: 'Aluminium products',
    category: 'Engineering & Industrial',
  },
  {
    id: 41,
    slug: 'brass-fittings',
    name: 'Brass fittings',
    category: 'Engineering & Industrial',
  },
  {
    id: 42,
    slug: 'industrial-valves',
    name: 'Industrial valves',
    category: 'Engineering & Industrial',
  },
  {
    id: 43,
    slug: 'bearings',
    name: 'Bearings',
    category: 'Engineering & Industrial',
  },
  {
    id: 44,
    slug: 'industrial-castings',
    name: 'Industrial castings',
    category: 'Engineering & Industrial',
  },
  {
    id: 45,
    slug: 'machine-components',
    name: 'Machine components',
    category: 'Engineering & Industrial',
  },
  {
    id: 46,
    slug: 'synthetic-rubber-products',
    name: 'Synthetic rubber products',
    category: 'Engineering & Industrial',
  },
  {
    id: 47,
    slug: 'industrial-tools',
    name: 'Industrial tools',
    category: 'Engineering & Industrial',
  },
  {
    id: 48,
    slug: 'hand-tools',
    name: 'Hand tools',
    category: 'Engineering & Industrial',
  },
  {
    id: 49,
    slug: 'plastic-packaging',
    name: 'Plastic packaging',
    category: 'Packaging',
  },
  {
    id: 50,
    slug: 'hdpe-bags',
    name: 'HDPE bags',
    category: 'Packaging',
  },
  {
    id: 51,
    slug: 'corrugated-boxes',
    name: 'Corrugated boxes',
    category: 'Packaging',
  },
  {
    id: 52,
    slug: 'flexible-packaging',
    name: 'Flexible packaging',
    category: 'Packaging',
  },
  {
    id: 53,
    slug: 'electrical-cables',
    name: 'Electrical cables',
    category: 'Electrical & Energy',
  },
  {
    id: 54,
    slug: 'led-components',
    name: 'LED components',
    category: 'Electrical & Energy',
  },
  {
    id: 55,
    slug: 'solar-components',
    name: 'Solar components',
    category: 'Electrical & Energy',
  },
  {
    id: 56,
    slug: 'batteries',
    name: 'Batteries',
    category: 'Electrical & Energy',
  },
  {
    id: 57,
    slug: 'generic-medicines',
    name: 'Generic medicines',
    category: 'Chemicals & Healthcare',
  },
  {
    id: 58,
    slug: 'synthetic-nitrile-surgical-gloves',
    name: 'Synthetic/nitrile surgical gloves',
    category: 'Chemicals & Healthcare',
  },
  {
    id: 59,
    slug: 'syringes',
    name: 'Syringes',
    category: 'Chemicals & Healthcare',
  },
  {
    id: 60,
    slug: 'medical-disposables',
    name: 'Medical disposables',
    category: 'Chemicals & Healthcare',
  },
  {
    id: 61,
    slug: 'herbal-extracts',
    name: 'Herbal extracts',
    category: 'Chemicals & Healthcare',
  },
  {
    id: 62,
    slug: 'plant-essential-oils',
    name: 'Plant essential oils',
    category: 'Chemicals & Healthcare',
  },
  {
    id: 63,
    slug: 'organic-chemicals',
    name: 'Organic chemicals',
    category: 'Chemicals & Healthcare',
  },
  {
    id: 64,
    slug: 'dyes',
    name: 'Dyes',
    category: 'Chemicals & Healthcare',
  },
  {
    id: 65,
    slug: 'pigments',
    name: 'Pigments',
    category: 'Chemicals & Healthcare',
  },
  {
    id: 66,
    slug: 'adhesives',
    name: 'Adhesives',
    category: 'Chemicals & Healthcare',
  },
  {
    id: 67,
    slug: 'wooden-furniture',
    name: 'Wooden furniture',
    category: 'Home & Lifestyle',
  },
  {
    id: 68,
    slug: 'bamboo-products',
    name: 'Bamboo products',
    category: 'Home & Lifestyle',
  },
  {
    id: 69,
    slug: 'cane-furniture',
    name: 'Cane furniture',
    category: 'Home & Lifestyle',
  },
  {
    id: 70,
    slug: 'decorative-lamps',
    name: 'Decorative lamps',
    category: 'Home & Lifestyle',
  },
  {
    id: 71,
    slug: 'ceramic-items',
    name: 'Ceramic items',
    category: 'Home & Lifestyle',
  },
  {
    id: 72,
    slug: 'kitchenware',
    name: 'Kitchenware',
    category: 'Home & Lifestyle',
  },
  {
    id: 73,
    slug: 'stainless-steel-utensils',
    name: 'Stainless-steel utensils',
    category: 'Home & Lifestyle',
  },
  {
    id: 74,
    slug: 'copper-products',
    name: 'Copper products',
    category: 'Home & Lifestyle',
  },
  {
    id: 75,
    slug: 'brass-handicrafts',
    name: 'Brass handicrafts',
    category: 'Home & Lifestyle',
  },
  {
    id: 76,
    slug: 'home-decor',
    name: 'Home décor',
    category: 'Home & Lifestyle',
  },
  {
    id: 77,
    slug: 'artificial-jewellery',
    name: 'Artificial jewellery',
    category: 'Home & Lifestyle',
  },
  {
    id: 78,
    slug: 'plant-based-incense-sticks',
    name: 'Plant-based incense sticks',
    category: 'Home & Lifestyle',
  },
  {
    id: 79,
    slug: 'plant-wax-candles',
    name: 'Plant-wax candles',
    category: 'Home & Lifestyle',
  },
  {
    id: 80,
    slug: 'yoga-mats',
    name: 'Yoga mats',
    category: 'Home & Lifestyle',
  },
  {
    id: 81,
    slug: 'cotton-bags',
    name: 'Cotton bags',
    category: 'Home & Lifestyle',
  },
  {
    id: 82,
    slug: 'eco-friendly-bags',
    name: 'Eco-friendly bags',
    category: 'Home & Lifestyle',
  },
  {
    id: 83,
    slug: 'vegan-handmade-soaps',
    name: 'Vegan handmade soaps',
    category: 'Home & Lifestyle',
  },
  {
    id: 84,
    slug: 'vegan-cosmetics',
    name: 'Vegan cosmetics',
    category: 'Home & Lifestyle',
  },
  {
    id: 85,
    slug: 'plant-based-hair-oil',
    name: 'Plant-based hair oil',
    category: 'Home & Lifestyle',
  },
  {
    id: 86,
    slug: 'stationery',
    name: 'Stationery',
    category: 'Home & Lifestyle',
  },
  {
    id: 87,
    slug: 'educational-toys',
    name: 'Educational toys',
    category: 'Home & Lifestyle',
  },
] as ProductSeed[];
type Profile = {
  buyers: string;
  packagingOptions: string[];
  moq: string;
  specLabels: string[];
  applications: string[];
  buyerNote: string;
};
const profiles: Record<ProductCategory, Profile> = {
  'Food & Agriculture': {
    buyers: 'importers, food processors, wholesalers and retail packers',
    packagingOptions: [
      'Food-grade pouches or laminated bags',
      'Bulk sacks, cartons or product-appropriate containers',
      'Private-label retail packs subject to volume',
    ],
    moq: 'MOQ: Depends on packaging and grade',
    specLabels: ['Variety / form', 'Quality and analytical parameters'],
    applications: [
      'Food manufacturing',
      'Wholesale distribution',
      'Retail and food-service',
    ],
    buyerNote:
      'Destination food rules may require residue, microbiological, allergen, labelling and shelf-life review.',
  },
  'Processed Vegetarian Food': {
    buyers: 'food-service, wholesale and private-label buyers',
    packagingOptions: [
      'Sealed food-grade retail packs',
      'Food-service cartons or bulk packs',
      'Buyer-branded formats subject to volume',
    ],
    moq: 'MOQ: Depends on recipe and packaging',
    specLabels: ['Recipe / format', 'Shelf-life and labelling brief'],
    applications: [
      'Retail distribution',
      'Food service',
      'Private-label programmes',
    ],
    buyerNote:
      'Ingredients, allergens, processing aids, labelling and shelf-life requirements must be confirmed for the destination.',
  },
  'Textiles & Fashion': {
    buyers: 'apparel, hospitality, institutional and private-label buyers',
    packagingOptions: [
      'Individual polybag or paper-based packing',
      'Export cartons or bale packing',
      'Buyer-branded packaging subject to volume',
    ],
    moq: 'MOQ: Confirmed against construction and colour',
    specLabels: ['Material / construction', 'Size / colour range'],
    applications: [
      'Retail collections',
      'Hospitality and institutional supply',
      'Private-label programmes',
    ],
    buyerNote:
      'Fibre composition, trims, dyes, finishes and destination labelling must be verified before production.',
  },
  'Engineering & Industrial': {
    buyers: 'OEMs, distributors, maintenance teams and project buyers',
    packagingOptions: [
      'Part-specific cartons or crates',
      'Palletised export packing',
      'Rust-protective packing where applicable',
    ],
    moq: 'MOQ: Determined after drawing or specification review',
    specLabels: ['Material / grade', 'Dimensions / tolerances'],
    applications: [
      'Original equipment manufacture',
      'Maintenance and distribution',
      'Industrial projects',
    ],
    buyerNote:
      'Material, tolerances, coatings, lubricants, testing and documentation depend on the drawing, end use and destination.',
  },
  Packaging: {
    buyers: 'manufacturers, exporters, retailers and contract packers',
    packagingOptions: [
      'Nested, bundled or roll packing as applicable',
      'Palletised export packing',
      'Buyer-printed formats subject to artwork and volume',
    ],
    moq: 'MOQ: Depends on dimensions, structure and print',
    specLabels: ['Dimensions / capacity', 'Material / print structure'],
    applications: [
      'Food and consumer goods',
      'Industrial transit',
      'Retail and private label',
    ],
    buyerNote:
      'Food-contact, recycling, migration, print and destination packaging requirements must be confirmed where applicable.',
  },
  'Electrical & Energy': {
    buyers: 'OEMs, electrical distributors and project procurement teams',
    packagingOptions: [
      'Protective cartons with internal cushioning',
      'Crates or palletised project packing',
      'Moisture-protective export packing where required',
    ],
    moq: 'MOQ: Confirmed against technical specification',
    specLabels: ['Electrical rating', 'Construction / interface'],
    applications: [
      'Electrical distribution',
      'OEM and assembly',
      'Infrastructure projects',
    ],
    buyerNote:
      'Technical standards, testing, transport classification and destination conformity requirements must be confirmed.',
  },
  'Chemicals & Healthcare': {
    buyers:
      'authorised importers, formulators, institutions and industrial users',
    packagingOptions: [
      'Specification-appropriate sealed containers',
      'Approved drums, HDPE containers or lined bags where applicable',
      'Protective cartons for healthcare items',
    ],
    moq: 'MOQ: Subject to supplier and regulatory requirements',
    specLabels: ['Identity / product form', 'Required documentation'],
    applications: [
      'Authorised B2B distribution',
      'Manufacturing and formulation',
      'Institutional procurement',
    ],
    buyerNote:
      'B2B enquiry only. Manufacturer authorisation, registration, SDS, classification, transport and destination documents must be verified; no therapeutic claim is made.',
  },
  'Home & Lifestyle': {
    buyers:
      'retailers, hospitality buyers, interior projects and private labels',
    packagingOptions: [
      'Individual protective packing',
      'Master cartons',
      'Palletised or buyer-branded retail packing',
    ],
    moq: 'MOQ: Available on request after design review',
    specLabels: ['Material / construction', 'Dimensions / finish'],
    applications: [
      'Retail collections',
      'Hospitality and interiors',
      'Corporate gifting and private label',
    ],
    buyerNote:
      'Material declarations for coatings, colours, waxes, binders and adhesives should be obtained from the final supplier where relevant.',
  },
};
const categoryNarrative: Record<ProductCategory, string> = {
  'Food & Agriculture':
    'Variety, crop form, sensory expectations and destination food controls shape the sourcing review.',
  'Processed Vegetarian Food':
    'Recipe, ingredient declaration, pack format, shelf-life brief and destination labelling shape the programme.',
  'Textiles & Fashion':
    'Fibre composition, construction, dimensions, colour, finishing and buyer branding are aligned from the buyer brief.',
  'Engineering & Industrial':
    'Drawings, material grade, tolerances, surface treatment, operating conditions and inspection needs guide supplier coordination.',
  Packaging:
    'Dimensions, material structure, barrier performance, print artwork, filling process and transit use define the specification.',
  'Electrical & Energy':
    'Electrical ratings, interfaces, operating environment, testing and destination standards must be established for each project.',
  'Chemicals & Healthcare':
    'Product identity, intended use, documentation, authorised supply route and destination registration determine whether an enquiry can proceed.',
  'Home & Lifestyle':
    'Material, dimensions, workmanship, finish, retail presentation and protective export packing are developed around the buyer’s collection.',
};
const foodAndAgricultureImages: Record<
  string,
  { image: string; imageAlt: string }
> = {
  'spices-blended-assorted': {
    image: '/images/products/spices-blended-assorted.webp',
    imageAlt:
      'Assortment of ground and whole Indian spices in bowls on a wooden table',
  },
  'basmati-rice': {
    image: '/images/products/basmati-rice.webp',
    imageAlt: 'Long-grain basmati rice in a rustic sack with loose rice grains',
  },
  tea: {
    image: '/images/products/tea.webp',
    imageAlt: 'Dried tea leaves beside a cup of brewed tea',
  },
  coffee: {
    image: '/images/products/coffee.webp',
    imageAlt: 'Roasted coffee beans beside a rustic cup of black coffee',
  },
  'mango-pulp': {
    image: '/images/products/mango-pulp.webp',
    imageAlt: 'Golden mango pulp in a bowl with fresh ripe mangoes',
  },
  'organic-food-products': {
    image: '/images/products/organic-food-products.webp',
    imageAlt: 'Assorted organic grains, pulses and fresh vegetables',
  },
  'fresh-grapes': {
    image: '/images/products/fresh-grapes.webp',
    imageAlt: 'Bunches of fresh green grapes on a rustic wooden table',
  },
  pomegranates: {
    image: '/images/products/pomegranates.webp',
    imageAlt: 'Whole and cut ripe pomegranates with visible seeds',
  },
  turmeric: {
    image: '/images/products/turmeric.webp',
    imageAlt: 'Ground turmeric powder with fresh turmeric roots',
  },
  chilli: {
    image: '/images/products/chilli.webp',
    imageAlt: 'Dried red chillies in a rustic woven basket',
  },
  cumin: {
    image: '/images/products/cumin.webp',
    imageAlt: 'Whole cumin seeds in a wooden bowl',
  },
  'coriander-seed': {
    image: '/images/products/coriander-seed.webp',
    imageAlt: 'Whole coriander seeds in a wooden bowl',
  },
  cardamom: {
    image: '/images/products/cardamom.webp',
    imageAlt: 'Green cardamom pods in a wooden bowl',
  },
  'black-pepper': {
    image: '/images/products/black-pepper.webp',
    imageAlt: 'Whole black peppercorns in a wooden bowl',
  },
  ginger: {
    image: '/images/products/ginger.webp',
    imageAlt: 'Fresh whole and sliced ginger roots',
  },
  garlic: {
    image: '/images/products/garlic.webp',
    imageAlt: 'Whole garlic bulbs and separated garlic cloves',
  },
  onion: {
    image: '/images/products/onion.webp',
    imageAlt: 'Natural Indian red onions with one halved onion',
  },
  groundnuts: {
    image: '/images/products/groundnuts.webp',
    imageAlt: 'Shelled groundnuts with groundnut pods',
  },
};
/** Catalogue governance: MOQ must be confirmed before quotation; packaging is specification-dependent; certifications must not be claimed without documentary proof; regulated products require destination-specific verification. */
export const products: Product[] = seeds.map((seed) => {
  const profile = profiles[seed.category];
  const productImage = foodAndAgricultureImages[seed.slug];
  return {
    ...seed,
    shortDescription: `India-origin ${seed.name.toLowerCase()} sourcing for ${profile.buyers}.`,
    description: `Biswas Exports coordinates B2B enquiries for ${seed.name.toLowerCase()} from India. ${categoryNarrative[seed.category]} Final specifications, documentation and packing are confirmed before quotation, and availability remains subject to the agreed buyer brief.`,
    image: productImage?.image ?? `/images/products/${seed.slug}.svg`,
imageAlt:
  productImage?.imageAlt ??
  `Neutral catalogue illustration representing ${seed.name}`,
    packagingOptions: profile.packagingOptions,
    moq: profile.moq,
    origin: 'India',
    specifications: [
      { label: profile.specLabels[0], value: 'Confirmed to buyer requirement' },
      { label: profile.specLabels[1], value: 'Agreed before quotation' },
      { label: 'Product', value: seed.name },
    ],
    applications: profile.applications,
    buyerNotes: [profile.buyerNote],
    keywords: [
      seed.name,
      seed.category,
      ...seed.name
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean),
    ],
    featured: [2, 5, 24, 29, 36, 53, 61, 67, 73, 80].includes(seed.id),
  };
});
export const expectedCategoryCounts: Record<ProductCategory, number> = {
  'Food & Agriculture': 18,
  'Processed Vegetarian Food': 10,
  'Textiles & Fashion': 7,
  'Engineering & Industrial': 13,
  Packaging: 4,
  'Electrical & Energy': 4,
  'Chemicals & Healthcare': 10,
  'Home & Lifestyle': 21,
};
export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
export function getProductsByCategory(category: ProductCategory) {
  return products.filter((product) => product.category === category);
}
export function getRelatedProducts(product: Product, limit = 3) {
  return products
    .filter(
      (candidate) =>
        candidate.category === product.category && candidate.id !== product.id,
    )
    .slice(0, limit);
}
export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}
export function getAllProductSlugs() {
  return products.map((product) => product.slug);
}
export function getCategoryCounts() {
  return Object.fromEntries(
    productCategories.map((category) => [
      category,
      getProductsByCategory(category).length,
    ]),
  ) as Record<ProductCategory, number>;
}
export function filterProducts(query = '', category = '') {
  const needle = query.trim().toLowerCase();
  return products.filter(
    (product) =>
      (!category || product.category === category) &&
      (!needle ||
        [
          product.name,
          product.category,
          product.shortDescription,
          ...product.keywords,
        ]
          .join(' ')
          .toLowerCase()
          .includes(needle)),
  );
}
export function validateCatalogue() {
  const failures: string[] = [];
  if (products.length !== 87)
    failures.push(`Expected 87 products; found ${products.length}.`);
  if (new Set(products.map((product) => product.id)).size !== products.length)
    failures.push('Product IDs must be unique.');
  if (new Set(products.map((product) => product.slug)).size !== products.length)
    failures.push('Product slugs must be unique.');
  for (const product of products) {
    const required = [
      product.id,
      product.slug,
      product.name,
      product.category,
      product.shortDescription,
      product.description,
      product.image,
      product.imageAlt,
      product.moq,
      product.origin,
    ];
    if (
      required.some(
        (value) => value === '' || value === null || value === undefined,
      )
    )
      failures.push(`Required field missing for ${product.slug}.`);
    if (
      !product.packagingOptions.length ||
      !product.specifications.length ||
      !product.applications.length ||
      !product.keywords.length
    )
      failures.push(`Required product details missing for ${product.slug}.`);
  }
  const counts = getCategoryCounts();
  for (const category of productCategories)
    if (counts[category] !== expectedCategoryCounts[category])
      failures.push(
        `${category}: expected ${expectedCategoryCounts[category]}, found ${counts[category]}.`,
      );
  if (filterProducts('black pepper').length !== 1)
    failures.push('Search validation failed.');
  if (filterProducts('', 'Packaging').length !== 4)
    failures.push('Category-filter validation failed.');
  if (filterProducts('not-a-catalogue-product').length !== 0)
    failures.push('Empty-results validation failed.');
  if (failures.length) throw new Error(failures.join('\n'));
  return {
    products: products.length,
    ids: products.length,
    slugs: products.length,
    categories: counts,
  };
}
