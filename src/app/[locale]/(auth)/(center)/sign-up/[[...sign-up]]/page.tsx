import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AuthForm } from '@/features/auth/AuthForm';

export const metadata: Metadata = {
  title: '注册',
  robots: { index: false, follow: false },
};

export default async function SignUpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AuthForm mode="sign-up" locale={locale} />;
}
