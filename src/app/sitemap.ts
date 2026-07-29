import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/data';

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
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
