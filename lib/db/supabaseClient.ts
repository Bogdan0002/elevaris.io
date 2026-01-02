import { createClient } from '@supabase/supabase-js'

// Client-side Supabase - these are optional for preview system
// Only throw error in production if actually needed
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Only warn in development, don't break the app
  if (process.env.NODE_ENV === 'production') {
    console.warn('Supabase client credentials not configured - some features may not work')
  }
}

export const supabaseClient = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder-key'
)

