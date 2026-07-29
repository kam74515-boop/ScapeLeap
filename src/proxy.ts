import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const localePath = /^\/(?:en|zh)(?:\/|$)/;

export default function proxy(request: NextRequest) {
  if (localePath.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const internalUrl = request.nextUrl.clone();
  internalUrl.protocol = 'http:';
  internalUrl.hostname = '127.0.0.1';
  internalUrl.port = process.env.PORT ?? request.nextUrl.port ?? '3000';
  internalUrl.pathname = `/zh${request.nextUrl.pathname === '/' ? '' : request.nextUrl.pathname}`;

  return NextResponse.rewrite(internalUrl);
}

export const config = {
  matcher: '/((?!api|_next|monitoring|.*\\..*).*)',
};
