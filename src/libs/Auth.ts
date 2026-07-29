import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { organization } from 'better-auth/plugins';
import { studioAccess, studioRoles } from '@/auth/permissions';
import { db } from '@/libs/DB';
import { Env } from '@/libs/Env';

export const auth = betterAuth({
  appName: 'ScapeLeap',
  baseURL: Env.BETTER_AUTH_URL ?? Env.NEXT_PUBLIC_APP_URL,
  secret: Env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
    minPasswordLength: 10,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
  },
  plugins: [
    organization({
      ac: studioAccess,
      roles: studioRoles,
      creatorRole: 'owner',
      membershipLimit: 500,
      teams: {
        enabled: true,
        defaultTeam: {
          enabled: true,
        },
      },
    }),
    nextCookies(),
  ],
});
