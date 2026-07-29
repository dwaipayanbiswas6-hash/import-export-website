import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Biswas Exports',
    short_name: 'Biswas Exports',
    description:
      'Merchant export company connecting international buyers with quality Indian products.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#07182e',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
