import type { Metadata } from 'next';
import { MarketingSubpage } from '@/features/marketing/MarketingSubpage';

export const metadata: Metadata = {
  title: '设计工作室资源',
  description: '设计项目管理、FF&E Schedule、报价、客户协作与 AI 工作流指南。',
};

export default async function ResourceCategoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <MarketingSubpage locale={locale === 'en' ? 'en' : 'zh'} slug="resources" />;
}
