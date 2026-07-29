import type { BillingProvider } from './types';

import 'server-only';

export const manualBillingProvider: BillingProvider = {
  async createCheckout() {
    return {
      provider: 'manual',
      url: null,
    };
  },
};
