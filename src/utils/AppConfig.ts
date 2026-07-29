import type { LocalePrefixMode } from 'next-intl/routing';
import type { AppLocale } from '@/types/I18n';

/** Locale prefix strategy for next-intl routing. */
const localePrefix: LocalePrefixMode = 'as-needed';
const locales = [
  {
    id: 'zh',
    name: '简体中文',
  },
  {
    id: 'en',
    name: 'English',
  },
] satisfies AppLocale[];

/** Centralized application configuration */
export const AppConfig = {
  name: 'ScapeLeap',
  chineseName: '构境 AI',
  description: '面向室内设计团队的 AI Studio OS',
  i18n: {
    locales,
    defaultLocale: 'zh',
    localePrefix,
  },
  email: {
    support: 'support@scapeleap.com',
  },
} as const;

export const AllLocales = AppConfig.i18n.locales.map(locale => locale.id);
