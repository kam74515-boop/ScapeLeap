import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { OnboardingForm } from '@/features/auth/OnboardingForm';
import { auth } from '@/libs/Auth';

export const metadata: Metadata = {
  title: '创建工作空间',
  robots: { index: false, follow: false },
};

export default async function OnboardingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(locale === 'en' ? '/en/sign-in' : '/sign-in');
  }
  return <OnboardingForm locale={locale} userName={session.user.name} />;
}
