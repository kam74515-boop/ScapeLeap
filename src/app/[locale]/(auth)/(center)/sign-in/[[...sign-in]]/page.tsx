import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AuthForm } from '@/features/auth/AuthForm';

export const metadata: Metadata = {
  title: '登录',
  robots: { index: false, follow: false },
};

export default async function SignInPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AuthForm mode="sign-in" locale={locale} />;
}
