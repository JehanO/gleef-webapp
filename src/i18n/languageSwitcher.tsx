// src/components/localization/languageSwitcher.tsx
'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { locales } from '@/i18n/config';

const LOCALE_LABELS = {
  'en-US': { flag: '🇺🇸', short: 'En', full: 'English (US)' },
  'fr-FR': { flag: '🇫🇷', short: 'Fr', full: 'French (FR)' }
} as const;

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSelect = async (locale: string) => {
    setIsPending(true);
    const newPathname = pathname.split('/').slice(2).join('/');
    router.push(`/${locale}/${newPathname}`);
    setIsPending(false);
  };

  const currentLocale = pathname.split('/')[1] || 'en-US';

  return (
    <Select
      defaultValue={currentLocale}
      onValueChange={handleSelect}
      disabled={isPending}
    >
      <SelectTrigger className="min-w-[20px]">
        <div className="flex items-center gap-2">
          <div>{LOCALE_LABELS[currentLocale as keyof typeof LOCALE_LABELS].flag}</div>
          <div>{LOCALE_LABELS[currentLocale as keyof typeof LOCALE_LABELS].short}</div>
        </div>
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            <div className="flex items-center gap-2">
              <div>{LOCALE_LABELS[locale as keyof typeof LOCALE_LABELS].flag}</div>
              <div>{LOCALE_LABELS[locale as keyof typeof LOCALE_LABELS].full}</div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}