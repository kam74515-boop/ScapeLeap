import { redirect } from 'next/navigation';

export default async function LegacyOrganizationSelectionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(locale === 'en' ? '/en/onboarding' : '/onboarding');
}
