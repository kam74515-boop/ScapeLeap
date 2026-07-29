import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utils/Helpers';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/app/',
          '/en/app/',
          '/dashboard',
          '/en/dashboard',
          '/onboarding',
          '/en/onboarding',
          '/sign-in',
          '/en/sign-in',
          '/sign-up',
          '/en/sign-up',
          '/portal/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${getBaseUrl()}/sitemap.xml`,
    host: getBaseUrl(),
  };
}
