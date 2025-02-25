// src/middleware.ts - update auth middleware
import createMiddleware from 'next-intl/middleware';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales } from './i18n/config';

const PUBLIC_PATHS = ['/login', '/signup', '/forgot-password', '/callback'];

export async function middleware(request: NextRequest) {
  const supabase = createMiddlewareClient({ req: request, res: NextResponse.next() });
  
  const { data: { session } } = await supabase.auth.getSession();

  const pathname = request.nextUrl.pathname;
  const pathnameWithoutLocale = locales.reduce(
    (path, locale) => path.replace(`/${locale}`, ''),
    pathname
  );

  const intlMiddleware = createMiddleware({
    defaultLocale,
    locales,
    localePrefix: 'always'
  });

  if (pathnameWithoutLocale === '/callback') {
    return intlMiddleware(request);
  }

  if (PUBLIC_PATHS.includes(pathnameWithoutLocale)) {
    if (session && pathnameWithoutLocale !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return intlMiddleware(request);
  }

  if (!session && pathnameWithoutLocale !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};