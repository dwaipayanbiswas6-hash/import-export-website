import { existsSync, rmSync } from 'node:fs';
import catalogue from '../.catalogue-check/products.js';

const result = catalogue.validateCatalogue();
const missingImages = catalogue.products
  .map((product) => `public${product.image}`)
  .filter((image) => !existsSync(image));
if (missingImages.length)
  throw new Error(`Missing product images:\n${missingImages.join('\n')}`);
console.log(`Validated ${result.products} products with unique IDs and slugs.`);
console.log(result.categories);
console.log('Verified every local product image path.');
rmSync('.catalogue-check', { recursive: true, force: true });
