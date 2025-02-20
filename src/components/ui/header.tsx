"use client"

import { TopRightActions } from "@/components/ui/headerToggle"

interface HeaderProps {
  className?: string
}

export function Header({ className = "" }: HeaderProps) {
  return (
    <div className={`flex items-center justify-end space-x-4 ${className}`}>
      <TopRightActions />
    </div>
  )
}