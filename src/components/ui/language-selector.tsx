"use client"

import * as React from "react"
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const LANGUAGES = [
  {
    code: 'en-US',
    label: 'en',
    flag: '🇺🇸'
  },
  {
    code: 'fr-FR',
    label: 'fr',
    flag: '🇫🇷'
  }
] as const

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  // Stocker la langue sélectionnée dans localStorage pour la persister
  const handleLanguageChange = React.useCallback((newLocale: string) => {
    localStorage.setItem('userLocale', newLocale)
    // Recharger la page pour appliquer la nouvelle langue
    window.location.reload()
  }, [])

  // Récupérer la langue actuelle depuis localStorage ou utiliser la langue par défaut
  const currentLocale = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userLocale') || 'en-US'
    }
    return 'en-US'
  }, [])

  return (
    <Select
      value={currentLocale}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-auto min-w-[65px]">
        <SelectValue>
          {LANGUAGES.find(lang => lang.code === currentLocale)?.flag} {" "}
          {LANGUAGES.find(lang => lang.code === currentLocale)?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((language) => (
          <SelectItem 
            key={language.code} 
            value={language.code}
            className="cursor-pointer"
          >
            {language.flag} {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}