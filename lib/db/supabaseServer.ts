import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Lazy initialization to avoid issues with environment variables at build time
let _supabaseServer: SupabaseClient | null = null

function getSupabaseServer(): SupabaseClient {
  if (_supabaseServer) {
    return _supabaseServer
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    throw new Error('Missing SUPABASE_URL environment variable')
  }

  if (!supabaseKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  }

  _supabaseServer = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return _supabaseServer
}

// Export as a getter to ensure lazy initialization
export const supabaseServer = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    const client = getSupabaseServer()
    // @ts-expect-error - Proxy access pattern
    const value = client[prop]
    if (typeof value === 'function') {
      return value.bind(client)
    }
    return value
  },
})


