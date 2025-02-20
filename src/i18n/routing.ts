import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en-US', 'fr-FR'],
  defaultLocale: 'en-US',
  pathnames: {
    '/': '/',
    '/login': '/login',
    '/signup': '/signup',
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const {
  Link,
  getPathname,
  redirect,
  usePathname,
  useRouter
} = createNavigation(routing);