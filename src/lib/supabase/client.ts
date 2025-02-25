// src/lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

// Note: This file is kept for backward compatibility
// It's recommended to use createClientComponentClient or createServerComponentClient instead

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing environment variables for Supabase')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)