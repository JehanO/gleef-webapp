// src/hooks/useTranslation.ts
"use client"

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import enUS from '@/locales/en-US.json'
import frFR from '@/locales/fr-FR.json'

const translations = {
  'en-US': enUS,
  'fr-FR': frFR,
} as const

type TranslationLocale = keyof typeof translations
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & (string | number)]

type TranslationKeys = RecursiveKeyOf<typeof enUS>

export function useTranslation() {
  const params = useParams()
  const router = useRouter()
  const [currentLocale, setCurrentLocale] = useState<TranslationLocale>(
    (params?.locale as TranslationLocale) || 'en-US'
  )

  useEffect(() => {
    const storedLocale = localStorage.getItem('userLocale') as TranslationLocale
    if (storedLocale) setCurrentLocale(storedLocale)

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userLocale' && e.newValue) {
        setCurrentLocale(e.newValue as TranslationLocale)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])
  
  const changeLocale = useCallback((newLocale: TranslationLocale) => {
    setCurrentLocale(newLocale)
    localStorage.setItem('userLocale', newLocale)
    router.refresh()
  }, [router])
  
  const t = (key: TranslationKeys): string => {
    const keys = key.split('.')
    let current: any = translations[currentLocale]
    
    for (const k of keys) {
      if (current?.[k] === undefined) return key
      current = current[k]
    }
    
    return current as string
  }

  return { t, locale: currentLocale, changeLocale }
}