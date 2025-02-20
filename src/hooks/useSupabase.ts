import { useContext } from 'react'
import { SupabaseContext } from '@/lib/supabase/context'

export function useSupabase() {
  const context = useContext(SupabaseContext)
  
  if (!context) {
    throw new Error('useSupabase must be used within SupabaseProvider')
  }
  
  return context
}