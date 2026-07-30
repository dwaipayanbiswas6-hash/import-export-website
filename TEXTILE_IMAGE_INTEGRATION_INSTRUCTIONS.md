# Textiles & Fashion image integration

Update `src/lib/products.ts` so the seven Textiles & Fashion products use the corresponding WebP files under `public/images/products/`:

- cotton-garments.webp
- t-shirts.webp
- denim-fabric-garments.webp
- home-textiles.webp
- bed-sheets.webp
- towels.webp
- plant-fibre-carpets-rugs.webp

Add descriptive alt text for each image. Preserve the existing Food & Agriculture and Processed Vegetarian Food mappings and SVG fallback for all remaining products.

Update `IMAGE_SOURCES.md` to state that 35 products use AI-generated WebP catalogue visuals and 52 products retain SVG illustrations.

Delete the seven replaced SVG placeholders. Preserve all 87 products and category counts. Run catalogue validation, typecheck, lint, formatting checks and the production build.

Delete this instruction file before completing the pull request.
