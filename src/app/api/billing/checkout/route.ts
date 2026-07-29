import { and, eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getBillingProvider } from '@/billing';
import { auth } from '@/libs/Auth';
import { db } from '@/libs/DB';
import { member, organization } from '@/models/Schema';

const checkoutSchema = z.object({
  organizationSlug: z.string().min(2).max(64),
  plan: z.enum(['studio', 'business']),
});

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parsed = checkoutSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const [access] = await db
    .select({
      organizationId: organization.id,
      organizationSlug: organization.slug,
      role: member.role,
    })
    .from(member)
    .innerJoin(organization, eq(member.organizationId, organization.id))
    .where(and(
      eq(member.userId, session.user.id),
      eq(organization.slug, parsed.data.organizationSlug),
    ))
    .limit(1);

  const roles = access?.role.split(',') ?? [];
  if (!access || !roles.some(role => ['owner', 'admin', 'finance'].includes(role))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const checkout = await getBillingProvider().createCheckout({
    organizationId: access.organizationId,
    organizationSlug: access.organizationSlug,
    email: session.user.email,
    plan: parsed.data.plan,
  });

  return NextResponse.json(checkout);
}
