import type { MetadataRoute } from 'next';

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
  const baseUrl = 'https://aurextrade.example';

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
