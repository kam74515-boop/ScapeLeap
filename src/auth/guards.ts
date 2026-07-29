import { and, eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/libs/Auth';
import { db } from '@/libs/DB';
import { member, organization } from '@/models/Schema';

export async function requireStudioContext({
  locale,
  orgSlug,
}: {
  locale: string;
  orgSlug: string;
}) {
  const prefix = locale === 'en' ? '/en' : '';
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`${prefix}/sign-in`);
  }

  const [membership] = await db
    .select({
      organizationId: organization.id,
      organizationName: organization.name,
      organizationSlug: organization.slug,
      role: member.role,
    })
    .from(member)
    .innerJoin(organization, eq(member.organizationId, organization.id))
    .where(and(eq(member.userId, session.user.id), eq(organization.slug, orgSlug)))
    .limit(1);

  if (!membership) {
    redirect(`${prefix}/onboarding`);
  }

  return {
    session,
    membership,
  };
}
