// src/components/LanguageSwitcher.tsx
"use client"

import * as React from "react"
import { 
  Select,  
  SelectContent,  
  SelectItem,  
  SelectTrigger,  
  SelectValue,  
} from "@/components/ui/select"
import { useTranslation } from "@/hooks/useTranslation"

const LANGUAGES = [
  { code: 'en-US', label: 'English', flag: '🇺🇸' },
  { code: 'fr-FR', label: 'Français', flag: '🇫🇷' }
] as const

export function LanguageSwitcher() {
  const { locale, changeLocale } = useTranslation()

  const handleLanguageChange = React.useCallback((newLocale: string) => {
    changeLocale(newLocale as 'en-US' | 'fr-FR')
  }, [changeLocale])

  return (
    <Select 
      value={locale} 
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Language">
          {LANGUAGES.find(lang => lang.code === locale)?.flag}{' '}
          {LANGUAGES.find(lang => lang.code === locale)?.label}
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
  )
}