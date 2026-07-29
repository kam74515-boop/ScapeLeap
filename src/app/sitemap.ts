import type { MetadataRoute } from 'next';
import { routing } from '@/libs/I18nRouting';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  const routes = [
    '',
    '/product',
    '/solutions/studios',
    '/pricing',
    '/resources',
    '/resources/blog',
    '/resources/guides',
    '/resources/templates',
    '/docs',
    '/security',
    '/about',
    '/contact',
  ];

  return routes.flatMap(route =>
    routing.locales.map(locale => ({
      url: `${baseUrl}${getI18nPath(route, locale)}`,
      changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
      priority: route === '' ? 1 : route === '/product' ? 0.9 : 0.7,
      alternates: {
        languages: {
          'zh-CN': `${baseUrl}${getI18nPath(route, 'zh')}`,
          'en': `${baseUrl}${getI18nPath(route, 'en')}`,
          'x-default': `${baseUrl}${getI18nPath(route, 'zh')}`,
        },
      },
    })),
  );
}
