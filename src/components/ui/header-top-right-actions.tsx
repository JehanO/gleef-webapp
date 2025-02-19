// components/ui/top-right-actions.tsx
"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/ui/language-selector"

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