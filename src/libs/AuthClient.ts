'use client';

import { organizationClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { studioAccess, studioRoles } from '@/auth/permissions';

export const authClient = createAuthClient({
  plugins: [
    organizationClient({
      ac: studioAccess,
      roles: studioRoles,
      teams: {
        enabled: true,
      },
    }),
  ],
});
