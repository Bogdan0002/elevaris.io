import { supabaseServer } from '@/lib/db/supabaseServer'

export async function consumeRateLimit(bucket: string, limit: number, windowMs: number): Promise<boolean> {
  const windowStart = new Date(Math.floor(Date.now() / windowMs) * windowMs).toISOString()
  const key = `${bucket}:${windowStart}`
  try {
    const { data, error } = await supabaseServer
      .from('rate_limits')
      .select('count')
      .eq('bucket', key)
      .maybeSingle()
    if (error) return true
    const count = (data?.count || 0) + 1
    if (count > limit) return false
    await supabaseServer.from('rate_limits').upsert({ bucket: key, count, window_start: windowStart })
    return true
  } catch {
    return true
  }
}
