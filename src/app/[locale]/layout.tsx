import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/libs/I18nRouting';
import '@/styles/global.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  title: {
    default: 'ScapeLeap · 构境 AI',
    template: '%s · ScapeLeap',
  },
  description: '面向室内设计团队的 AI Studio OS，连接客户、设计、FF&E、报价、施工与交付。',
  applicationName: 'ScapeLeap',
  category: 'business',
  keywords: ['室内设计项目管理', '设计工作室管理', 'FF&E Schedule', 'AI 室内设计', '客户门户'],
  openGraph: {
    type: 'website',
    siteName: 'ScapeLeap',
    title: 'ScapeLeap · 构境 AI',
    description: '把设计灵感，推进到真实交付。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScapeLeap · 构境 AI',
    description: '面向室内设计团队的 AI Studio OS',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/icon.svg',
    },
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          {props.children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
