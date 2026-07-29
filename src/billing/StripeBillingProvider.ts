import type { BillingPlan, BillingProvider } from './types';

import Stripe from 'stripe';
import { Env } from '@/libs/Env';
import 'server-only';

function getPriceId(plan: BillingPlan) {
  const priceId = plan === 'studio'
    ? Env.STRIPE_STUDIO_PRICE_ID
    : Env.STRIPE_BUSINESS_PRICE_ID;

  if (!priceId) {
    throw new Error(`Stripe price is not configured for plan: ${plan}`);
  }

  return priceId;
}

export function getStripeClient() {
  if (!Env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe is not configured');
  }

  return new Stripe(Env.STRIPE_SECRET_KEY);
}

export const stripeBillingProvider: BillingProvider = {
  async createCheckout(input) {
    const stripe = getStripeClient();
    const appUrl = Env.NEXT_PUBLIC_APP_URL ?? Env.BETTER_AUTH_URL;
    if (!appUrl) {
      throw new Error('Application URL is not configured');
    }

    const checkout = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: input.email,
      line_items: [
        {
          price: getPriceId(input.plan),
          quantity: 1,
        },
      ],
      metadata: {
        organizationId: input.organizationId,
        organizationSlug: input.organizationSlug,
        plan: input.plan,
      },
      subscription_data: {
        metadata: {
          organizationId: input.organizationId,
          organizationSlug: input.organizationSlug,
          plan: input.plan,
        },
      },
      success_url: `${appUrl}/app/${input.organizationSlug}/settings?billing=success`,
      cancel_url: `${appUrl}/app/${input.organizationSlug}/settings?billing=cancelled`,
      allow_promotion_codes: true,
    });

    return {
      provider: 'stripe',
      url: checkout.url,
    };
  },
};
