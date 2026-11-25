import { cookies } from 'next/headers'
import { opsKeyMatches, verifyOpsSession } from './session'

export class OpsAuthError extends Error {
  constructor() {
    super('Unauthorized')
  }
}

export async function assertOpsAccess(): Promise<void> {
  const token = cookies().get('elevaris_ops')?.value
  if (await verifyOpsSession(token)) return
  if (process.env.NODE_ENV !== 'production' && !process.env.OPS_ACCESS_KEY && !process.env.NEXT_PUBLIC_OPS_KEY && !process.env.OPS_SESSION_SECRET) return
  throw new OpsAuthError()
}

export async function assertOpsRequest(request: Request): Promise<void> {
  const headerToken = request.headers.get('cookie')?.split(';').map((part) => part.trim()).find((part) => part.startsWith('elevaris_ops='))?.slice('elevaris_ops='.length)
  if (await verifyOpsSession(headerToken ? decodeURIComponent(headerToken) : null)) return
  const url = new URL(request.url)
  if (opsKeyMatches(url.searchParams.get('key') || request.headers.get('x-ops-key'))) return
  if (process.env.NODE_ENV !== 'production' && !process.env.OPS_ACCESS_KEY && !process.env.NEXT_PUBLIC_OPS_KEY && !process.env.OPS_SESSION_SECRET) return
  throw new OpsAuthError()
}
