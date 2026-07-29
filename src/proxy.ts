import type { NextFetchEvent, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './libs/I18nRouting';

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest, _event: NextFetchEvent) {
  return handleI18nRouting(request);
}

export const config = {
  matcher: '/((?!api|_next|monitoring|.*\\..*).*)',
};
