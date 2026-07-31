import {
  expectedCategoryCounts,
  productCategories,
  products as baseProducts,
  type Product,
  type ProductCategory,
  type ProductSpecification,
} from './products';

const imageOverrides: Record<
  string,
  Pick<Product, 'image' | 'imageAlt'>
> = {
  'cotton-garments': {
    image: '/images/products/cotton-garments.webp',
    imageAlt: 'Folded cotton garments in soft earthy colours on a wooden table',
  },
  't-shirts': {
    image: '/images/products/t-shirts.webp',
    imageAlt: 'Stack of plain cotton T-shirts in white, grey, olive and navy',
  },
  'denim-fabric-garments': {
    image: '/images/products/denim-fabric-garments.webp',
    imageAlt: 'Folded blue denim jeans beside coordinated denim fabric rolls',
  },
  'home-textiles': {
    image: '/images/products/home-textiles.webp',
    imageAlt: 'Coordinated cushions, throws and folded woven home textiles',
  },
  'bed-sheets': {
    image: '/images/products/bed-sheets.webp',
    imageAlt: 'Neatly made bed with neutral striped bed sheets and pillows',
  },
  towels: {
    image: '/images/products/towels.webp',
    imageAlt: 'Stack of plush towels in white, beige, blue and charcoal',
  },
  'plant-fibre-carpets-rugs': {
    image: '/images/products/plant-fibre-carpets-rugs.webp',
    imageAlt: 'Woven plant-fibre rugs with natural and geometric patterns',
  },
  fasteners: {
    image: '/images/products/fasteners.webp',
    imageAlt: 'Assorted threaded fasteners, washers, screws and hex nuts',
  },
  'nuts-and-bolts': {
    image: '/images/products/nuts-and-bolts.webp',
    imageAlt: 'Assorted steel nuts and threaded bolts on a dark work surface',
  },
  'pipe-fittings': {
    image: '/images/products/pipe-fittings.webp',
    imageAlt: 'Assorted threaded metal pipe elbows, couplings and connectors',
  },
  'steel-fabrication': {
    image: '/images/products/steel-fabrication.webp',
    imageAlt: 'Fabricated structural steel frame for an industrial building',
  },
  'aluminium-products': {
    image: '/images/products/aluminium-products.webp',
    imageAlt: 'Stacked extruded aluminium profiles in multiple cross-sections',
  },
  'brass-fittings': {
    image: '/images/products/brass-fittings.webp',
    imageAlt: 'Assorted polished brass threaded fittings and connectors',
  },
  'industrial-valves': {
    image: '/images/products/industrial-valves.webp',
    imageAlt: 'Assorted flanged industrial valves with handwheel controls',
  },
  bearings: {
    image: '/images/products/bearings.webp',
    imageAlt: 'Assorted precision ball bearings in multiple industrial sizes',
  },
  'industrial-castings': {
    image: '/images/products/industrial-castings.webp',
    imageAlt: 'Assorted unfinished metal industrial castings and housings',
  },
  'machine-components': {
    image: '/images/products/machine-components.webp',
    imageAlt: 'Precision-machined shafts, gears, couplings and flanged components',
  },
  'synthetic-rubber-products': {
    image: '/images/products/synthetic-rubber-products.webp',
    imageAlt: 'Assorted black synthetic rubber sheets, hoses, seals and O-rings',
  },
  'industrial-tools': {
    image: '/images/products/industrial-tools.webp',
    imageAlt: 'Power tools and heavy-duty workshop tools arranged on a bench',
  },
  'hand-tools': {
    image: '/images/products/hand-tools.webp',
    imageAlt:
      'Assorted hand tools including spanners, sockets, pliers and screwdrivers',
  },
  'plastic-packaging': {
    image: '/images/products/plastic-packaging.webp',
    imageAlt:
      'Assorted plastic bottles, jerry cans, tubs and food containers in multiple sizes',
  },
  'hdpe-bags': {
    image: '/images/products/hdpe-bags.webp',
    imageAlt:
      'White HDPE carrier bags, flat bags, filled sacks and film rolls arranged in a warehouse',
  },
  'corrugated-boxes': {
    image: '/images/products/corrugated-boxes.webp',
    imageAlt:
      'Stacked kraft corrugated shipping boxes in assorted sizes inside a warehouse',
  },
  'flexible-packaging': {
    image: '/images/products/flexible-packaging.webp',
    imageAlt:
      'Assorted flexible stand-up pouches and sealed packs in metallic, kraft and clear formats',
  },
};

export const products: Product[] = baseProducts.map((product) => {
  const override = imageOverrides[product.slug];
  return override ? { ...product, ...override } : product;
});

export { expectedCategoryCounts, productCategories };
export type { Product, ProductCategory, ProductSpecification };

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
