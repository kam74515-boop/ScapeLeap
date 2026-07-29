import type { Metadata } from 'next';
import type { MarketingLocale } from '@/features/marketing/content';
import { notFound } from 'next/navigation';
import { MarketingSubpage } from '@/features/marketing/MarketingSubpage';

const slugs = ['product', 'pricing', 'security', 'about', 'contact', 'docs', 'resources'] as const;
type Slug = (typeof slugs)[number];

function isSlug(value: string): value is Slug {
  return slugs.includes(value as Slug);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isSlug(slug)) {
    return {};
  }
  const zh = locale === 'zh';
  const titles: Record<Slug, string> = {
    product: zh ? '产品功能' : 'Product',
    pricing: zh ? '价格方案' : 'Pricing',
    security: zh ? '安全与数据' : 'Security',
    about: zh ? '关于我们' : 'About',
    contact: zh ? '联系团队' : 'Contact',
    docs: zh ? '产品文档' : 'Documentation',
    resources: zh ? '资源中心' : 'Resources',
  };
  return {
    title: titles[slug],
    robots: slug === 'contact' ? { index: true, follow: true } : undefined,
    alternates: {
      canonical: locale === 'en' ? `/en/${slug}` : `/${slug}`,
      languages: { 'zh-CN': `/${slug}`, 'en': `/en/${slug}`, 'x-default': `/${slug}` },
    },
  };
}

export default async function MarketingPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isSlug(slug)) {
    notFound();
  }
  return <MarketingSubpage locale={(locale === 'en' ? 'en' : 'zh') as MarketingLocale} slug={slug} />;
}
