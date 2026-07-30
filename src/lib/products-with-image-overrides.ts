import {
  expectedCategoryCounts,
  productCategories,
  products as baseProducts,
  type Product,
  type ProductCategory,
  type ProductSpecification,
} from './products';

const textileImageOverrides: Record<
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
};

export const products: Product[] = baseProducts.map((product) => {
  const override = textileImageOverrides[product.slug];
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
