import type { MetadataRoute } from 'next';
import { getAllProductSlugs } from '@/lib/products';
import { siteUrl } from '@/lib/site';

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
  return [
    ...routes,
    ...getAllProductSlugs().map((slug) => `/products/${slug}`),
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/products/') ? 0.6 : 0.7,
  }));
}
