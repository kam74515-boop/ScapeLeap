import { Env } from '@/libs/Env';

import { manualBillingProvider } from './ManualBillingProvider';
import { stripeBillingProvider } from './StripeBillingProvider';
import 'server-only';

export function getBillingProvider() {
  return Env.STRIPE_SECRET_KEY
    ? stripeBillingProvider
    : manualBillingProvider;
}
