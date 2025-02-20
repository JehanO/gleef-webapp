"use client"

import { ThemeToggle } from "@/components/themeToggle"
import { LanguageSwitcher } from "@/i18n/languageSwitcher"

interface TopRightActionsProps {
  className?: string
}

export function TopRightActions({ className = "" }: TopRightActionsProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  )
}