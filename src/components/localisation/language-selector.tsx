import * as React from "react"
import { useTranslations } from 'next-intl';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { useRouter, usePathname } from 'next-intl/navigation';

const LANGUAGES = [
  {
    code: 'en',
    label: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'de',
    label: 'Deutsch',
    flag: '🇩🇪'
  }
] as const;

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('LanguageSwitcher');

  const handleLanguageChange = React.useCallback((newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  }, [pathname, router]);

  return (
    <Select 
      value={router.locale} 
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t('selectLanguage')}>
          {LANGUAGES.find(lang => lang.code === router.locale)?.flag}{' '}
          {LANGUAGES.find(lang => lang.code === router.locale)?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            {language.flag} {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}