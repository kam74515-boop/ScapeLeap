import { redirect } from 'next/navigation';

export default async function LegacyOrganizationProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(locale === 'en' ? '/en/app/scapeleap/settings' : '/app/scapeleap/settings');
}
