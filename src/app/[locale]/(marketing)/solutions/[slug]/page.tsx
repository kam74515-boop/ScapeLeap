import type { Metadata } from 'next';
import { MarketingSubpage } from '@/features/marketing/MarketingSubpage';

export const metadata: Metadata = {
  title: '室内设计工作室解决方案',
  description: '面向室内设计事务所的一体化客户、项目、AI、FF&E、报价与交付系统。',
};

export default async function StudioSolutionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <MarketingSubpage locale={locale === 'en' ? 'en' : 'zh'} slug="product" />;
}
