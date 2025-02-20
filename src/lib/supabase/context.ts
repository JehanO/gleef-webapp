import { User } from '@supabase/supabase-js'
import { createContext } from 'react'

interface SupabaseContextType {
  user: User | null
  loading: boolean
}

export const SupabaseContext = createContext<SupabaseContextType>({
  user: null,
  loading: true
})