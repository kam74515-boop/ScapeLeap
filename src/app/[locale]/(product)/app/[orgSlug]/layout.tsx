import type { Metadata } from 'next';
import { requireStudioContext } from '@/auth/guards';
import { StudioShell } from '@/features/studio/StudioShell';

export const metadata: Metadata = {
  title: '工作空间',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function StudioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; orgSlug: string }>;
}) {
  const { locale, orgSlug } = await params;
  const { session } = await requireStudioContext({ locale, orgSlug });

  return (
    <StudioShell orgSlug={orgSlug} locale={locale} userName={session.user.name}>
      {children}
    </StudioShell>
  );
}
