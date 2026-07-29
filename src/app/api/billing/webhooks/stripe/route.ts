import type Stripe from 'stripe';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { getStripeClient } from '@/billing/StripeBillingProvider';
import { db } from '@/libs/DB';
import { Env } from '@/libs/Env';
import { billingEvents, subscriptions } from '@/models/Schema';

function mapSubscriptionStatus(status: Stripe.Subscription.Status) {
  if (status === 'trialing') {
    return 'trialing' as const;
  }
  if (status === 'active') {
    return 'active' as const;
  }
  if (status === 'past_due' || status === 'unpaid' || status === 'incomplete') {
    return 'past_due' as const;
  }
  if (status === 'paused') {
    return 'paused' as const;
  }
  return 'cancelled' as const;
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const organizationId = subscription.metadata.organizationId;
  const plan = subscription.metadata.plan;
  if (!organizationId || (plan !== 'studio' && plan !== 'business')) {
    return;
  }

  const item = subscription.items.data[0];
  const periodStart = item?.current_period_start;
  const periodEnd = item?.current_period_end;
  const amount = item?.price.unit_amount ?? 0;

  await db
    .insert(subscriptions)
    .values({
      organizationId,
      provider: 'stripe',
      providerCustomerId: String(subscription.customer),
      providerSubscriptionId: subscription.id,
      plan,
      status: mapSubscriptionStatus(subscription.status),
      seatCount: item?.quantity ?? 1,
      currency: item?.price.currency.toUpperCase() ?? 'CNY',
      amount: (amount / 100).toFixed(2),
      interval: item?.price.recurring?.interval ?? 'month',
      currentPeriodStartsAt: periodStart ? new Date(periodStart * 1000) : null,
      currentPeriodEndsAt: periodEnd ? new Date(periodEnd * 1000) : null,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      metadata: subscription.metadata,
    })
    .onConflictDoUpdate({
      target: subscriptions.organizationId,
      set: {
        providerCustomerId: String(subscription.customer),
        providerSubscriptionId: subscription.id,
        plan,
        status: mapSubscriptionStatus(subscription.status),
        seatCount: item?.quantity ?? 1,
        currency: item?.price.currency.toUpperCase() ?? 'CNY',
        amount: (amount / 100).toFixed(2),
        interval: item?.price.recurring?.interval ?? 'month',
        currentPeriodStartsAt: periodStart ? new Date(periodStart * 1000) : null,
        currentPeriodEndsAt: periodEnd ? new Date(periodEnd * 1000) : null,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        metadata: subscription.metadata,
        updatedAt: new Date(),
      },
    });
}

export async function POST(request: Request) {
  if (!Env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe webhook is not configured' }, { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripeClient().webhooks.constructEvent(
      await request.text(),
      signature,
      Env.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const organizationId = 'metadata' in event.data.object
    ? event.data.object.metadata?.organizationId
    : undefined;

  const inserted = await db
    .insert(billingEvents)
    .values({
      provider: 'stripe',
      providerEventId: event.id,
      type: event.type,
      organizationId: organizationId || null,
      payload: event as unknown as Record<string, unknown>,
    })
    .onConflictDoNothing({
      target: [billingEvents.provider, billingEvents.providerEventId],
    })
    .returning({ id: billingEvents.id });

  if (inserted.length === 0) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  if (
    event.type === 'customer.subscription.created'
    || event.type === 'customer.subscription.updated'
    || event.type === 'customer.subscription.deleted'
  ) {
    await syncSubscription(event.data.object);
  }

  await db
    .update(billingEvents)
    .set({ processedAt: new Date() })
    .where(eq(billingEvents.providerEventId, event.id));

  return NextResponse.json({ received: true });
}
