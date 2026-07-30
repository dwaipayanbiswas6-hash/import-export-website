import type { MetadataRoute } from 'next';
import { getAllProductSlugs } from '@/lib/products';

const routes = [
  '',
  '/about',
  '/services',
  '/industries',
  '/products',
  '/global-presence',
  '/contact',
  '/privacy-policy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://biswasexports.com';

  return [
    ...routes,
    ...getAllProductSlugs().map((slug) => `/products/${slug}`),
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
