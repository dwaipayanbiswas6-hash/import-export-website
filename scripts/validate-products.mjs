import { existsSync, rmSync } from 'node:fs';
import catalogue from '../.catalogue-check/products-verified.js';

const result = catalogue.validateCatalogue();
const missingImages = catalogue.products
  .map((product) => `public${product.image}`)
  .filter((image) => !existsSync(image));
if (missingImages.length)
  throw new Error(`Missing product images:\n${missingImages.join('\n')}`);

const unverifiedOriginClaims = catalogue.products.filter((product) =>
  product.shortDescription.toLowerCase().startsWith('india-origin'),
);
if (unverifiedOriginClaims.length)
  throw new Error(
    `Unverified origin wording remains:\n${unverifiedOriginClaims
      .map((product) => product.slug)
      .join('\n')}`,
  );

const missingCatalogueNotice = catalogue.products.filter(
  (product) =>
    !product.buyerNotes?.some((note) =>
      note.includes('Catalogue information is indicative'),
    ),
);
if (missingCatalogueNotice.length)
  throw new Error(
    `Catalogue disclosure missing:\n${missingCatalogueNotice
      .map((product) => product.slug)
      .join('\n')}`,
  );

console.log(`Validated ${result.products} products with unique IDs and slugs.`);
console.log(result.categories);
console.log('Verified every local product image path.');
console.log('Verified cautious sourcing copy and catalogue disclosures.');
rmSync('.catalogue-check', { recursive: true, force: true });
