export type BillingPlan = 'studio' | 'business';

type CreateCheckoutInput = {
  organizationId: string;
  organizationSlug: string;
  email: string;
  plan: BillingPlan;
};

type BillingCheckout = {
  provider: 'manual' | 'stripe';
  url: string | null;
};

export type BillingProvider = {
  createCheckout: (input: CreateCheckoutInput) => Promise<BillingCheckout>;
};
