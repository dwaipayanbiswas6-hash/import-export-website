import {
  products,
  type Product,
} from './products-with-healthcare-image-overrides';

const homeLifestyleImageOverrides: Record<
  string,
  Pick<Product, 'image' | 'imageAlt'>
> = {
  'wooden-furniture': {
    image: '/images/products/wooden-furniture.webp',
    imageAlt:
      'Solid wooden dining table with matching chairs in a bright interior',
  },
  'bamboo-products': {
    image: '/images/products/bamboo-products.webp',
    imageAlt:
      'Assorted woven bamboo baskets, trays, containers and household accessories',
  },
  'cane-furniture': {
    image: '/images/products/cane-furniture.webp',
    imageAlt:
      'Cane lounge chairs with woven backs and a matching round side table',
  },
  'decorative-lamps': {
    image: '/images/products/decorative-lamps.webp',
    imageAlt:
      'Decorative mosaic pendant and table lamps glowing against a dark background',
  },
  'ceramic-items': {
    image: '/images/products/ceramic-items.webp',
    imageAlt:
      'Coordinated handcrafted ceramic bowls, plates, cups and decorative vases',
  },
  kitchenware: {
    image: '/images/products/kitchenware.webp',
    imageAlt:
      'Assorted cookware, pans, chopping boards and wooden kitchen utensils',
  },
  'stainless-steel-utensils': {
    image: '/images/products/stainless-steel-utensils.webp',
    imageAlt:
      'Polished stainless-steel pots, bowls, plates, cups, cutlery and serving utensils',
  },
  'copper-products': {
    image: '/images/products/copper-products.webp',
    imageAlt:
      'Hammered copper bottles, jug, bowls, tumbler and serving pieces',
  },
  'brass-handicrafts': {
    image: '/images/products/brass-handicrafts.webp',
    imageAlt:
      'Assorted polished brass statues, oil lamps and traditional decorative handicrafts',
  },
  'home-decor': {
    image: '/images/products/home-decor.webp',
    imageAlt:
      'Neutral home decor arrangement with mirror, vases, framed art and woven accessories',
  },
  'artificial-jewellery': {
    image: '/images/products/artificial-jewellery.webp',
    imageAlt:
      'Decorative artificial jewellery set with necklace, earrings, bangles and stones',
  },
  'plant-based-incense-sticks': {
    image: '/images/products/plant-based-incense-sticks.webp',
    imageAlt:
      'Plant-based incense sticks burning beside a holder, flowers and botanical packaging',
  },
  'plant-wax-candles': {
    image: '/images/products/plant-wax-candles.webp',
    imageAlt:
      'Lit plant-wax candles in glass jars arranged with flowers and greenery',
  },
  'yoga-mats': {
    image: '/images/products/yoga-mats.webp',
    imageAlt:
      'Rolled and unrolled yoga mats in assorted colours with textured surfaces',
  },
  'cotton-bags': {
    image: '/images/products/cotton-bags.webp',
    imageAlt:
      'Reusable natural cotton tote bags with long handles and simple botanical designs',
  },
  'eco-friendly-bags': {
    image: '/images/products/eco-friendly-bags.webp',
    imageAlt:
      'Reusable jute and natural-fibre shopping bags in assorted sizes',
  },
  'vegan-handmade-soaps': {
    image: '/images/products/vegan-handmade-soaps.webp',
    imageAlt:
      'Assorted handmade vegan soap bars with botanical ingredients and paper packaging',
  },
  'vegan-cosmetics': {
    image: '/images/products/vegan-cosmetics.webp',
    imageAlt:
      'Assorted plant-based cosmetic jars, pump bottles and dropper bottles',
  },
  'plant-based-hair-oil': {
    image: '/images/products/plant-based-hair-oil.webp',
    imageAlt:
      'Plant-based hair oil bottle and carton arranged with fresh herbs and flowers',
  },
  stationery: {
    image: '/images/products/stationery.webp',
    imageAlt:
      'Notebooks, pencils, pens, sticky notes and desk stationery arranged neatly',
  },
  'educational-toys': {
    image: '/images/products/educational-toys.webp',
    imageAlt:
      'Colourful wooden educational toys including stacking rings, shape sorters and an abacus',
  },
};

// The imported catalogue helpers use this same products array, so mutating the
// matching product objects keeps search, filtering and detail pages consistent.
for (const product of products) {
  const override = homeLifestyleImageOverrides[product.slug];
  if (override) Object.assign(product, override);
}

export * from './products-with-healthcare-image-overrides';
