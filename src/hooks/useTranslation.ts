// src/hooks/useTranslation.ts
"use client"

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import enUS from '@/locales/en-US.json'
import frFR from '@/locales/fr-FR.json'

const translations = {
  'en-US': enUS,
  'fr-FR': frFR,
} as const

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & (string | number)]

type TranslationKeys = RecursiveKeyOf<typeof enUS>

export function useTranslation() {
  const params = useParams()
  const [currentLocale, setCurrentLocale] = useState(params?.locale as string || 'en-US')

  useEffect(() => {
    // Écoute les changements de locale dans localStorage
    const storedLocale = localStorage.getItem('userLocale')
    if (storedLocale) {
      setCurrentLocale(storedLocale)
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userLocale' && e.newValue) {
        setCurrentLocale(e.newValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])
  
  const t = (key: TranslationKeys): string => {
    const keys = key.split('.')
    let current: any = translations[currentLocale as keyof typeof translations]
    
    for (const k of keys) {
      if (current?.[k] === undefined) {
        return key
      }
      current = current[k]
    }
    
    return current as string
  }

  return { t, locale: currentLocale }
}