import { StudioView } from '@/features/studio/StudioViews';

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: string; orgSlug: string; path?: string[] }>;
}) {
  const { locale, orgSlug, path = [] } = await params;
  return <StudioView pathSegments={path} locale={locale} orgSlug={orgSlug} />;
}
