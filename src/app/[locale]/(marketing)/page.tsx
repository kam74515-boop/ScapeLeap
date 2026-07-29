import type { Metadata } from 'next';
import type { MarketingLocale } from '@/features/marketing/content';
import { setRequestLocale } from 'next-intl/server';
import { MarketingSite } from '@/features/marketing/MarketingSite';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return {
    title: isZh ? '构境 AI — 室内设计团队的 AI Studio OS' : 'AI Studio OS for interior design teams',
    description: isZh
      ? '连接客户需求、七阶段设计、AI 画布、FF&E Schedule、报价、施工和客户确认的一体化设计工作室管理系统。'
      : 'Connect client briefs, seven-stage design, AI canvas, FF&E schedules, fees, construction and approvals in one studio workspace.',
    alternates: {
      canonical: isZh ? '/' : '/en',
      languages: {
        'zh-CN': '/',
        'en': '/en',
        'x-default': '/',
      },
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const safeLocale: MarketingLocale = locale === 'en' ? 'en' : 'zh';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://scapeleap.com/#organization',
        'name': 'ScapeLeap',
        'url': 'https://scapeleap.com',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://scapeleap.com/#website',
        'url': 'https://scapeleap.com',
        'name': 'ScapeLeap',
        'publisher': { '@id': 'https://scapeleap.com/#organization' },
        'inLanguage': safeLocale === 'zh' ? 'zh-CN' : 'en',
      },
      {
        '@type': 'SoftwareApplication',
        'name': 'ScapeLeap',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'Web',
        'description': safeLocale === 'zh'
          ? '面向室内设计团队的 AI Studio OS'
          : 'AI Studio OS for interior design teams',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'CNY',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MarketingSite locale={safeLocale} />
    </>
  );
}
