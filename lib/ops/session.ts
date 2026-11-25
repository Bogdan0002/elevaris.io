const encoder = new TextEncoder()

export function opsSecret(): string {
  return process.env.OPS_SESSION_SECRET || process.env.OPS_ACCESS_KEY || process.env.NEXT_PUBLIC_OPS_KEY || ''
}

export function opsKeyMatches(key: string | null | undefined): boolean {
  const secret = process.env.OPS_ACCESS_KEY || process.env.NEXT_PUBLIC_OPS_KEY || ''
  return Boolean(key && secret && key === secret)
}

async function hmac(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(opsSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  return Buffer.from(signature).toString('base64url')
}

export async function signOpsSession(): Promise<string> {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + 1000 * 60 * 60 * 24 * 14 })).toString('base64url')
  return `${payload}.${await hmac(payload)}`
}

export async function verifyOpsSession(token?: string | null): Promise<boolean> {
  if (!token || !opsSecret()) return false
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false
  const expected = await hmac(payload)
  if (expected.length !== signature.length) return false
  let mismatch = 0
  for (let i = 0; i < expected.length; i += 1) mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i)
  if (mismatch !== 0) return false
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { exp?: number }
    return typeof data.exp === 'number' && data.exp > Date.now()
  } catch {
    return false
  }
}
