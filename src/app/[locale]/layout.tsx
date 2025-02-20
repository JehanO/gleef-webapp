// src/app/[locale]/layout.tsx
import { notFound } from 'next/navigation';
import { createTranslator, NextIntlClientProvider } from 'next-intl';
import { locales } from '@/i18n/config';
import { ThemeProvider } from '@/components/themeProvider';
import './globals.css';

function ClientProviders({ children, theme }: { children: React.ReactNode; theme: string }) {
  return (
    <ThemeProvider defaultTheme="system">
      {children}
    </ThemeProvider>
  );
}

async function getMessages(locale: string) {
  try {
    return (await import(`@/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const messages = await getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background antialiased" suppressHydrationWarning>
        <ClientProviders theme="system">
          <NextIntlClientProvider locale={locale} messages={messages}>
            {props.children}
          </NextIntlClientProvider>
        </ClientProviders>
      </body>
    </html>
  );
}