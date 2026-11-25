import { NextResponse } from 'next/server'
import { STRIPE_CHECKOUT_URLS } from '@/lib/constants/pricing'
import { recordPreviewEvent } from '@/lib/previews/events'
import { consumeRateLimit } from '@/lib/ops/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PLANS = {
  launch: STRIPE_CHECKOUT_URLS.launch,
  growth: STRIPE_CHECKOUT_URLS.growth,
  accelerator: STRIPE_CHECKOUT_URLS.accelerator,
} as const

export async function GET(request: Request) {
  const url = new URL(request.url)
  const plan = url.searchParams.get('plan') as keyof typeof PLANS | null
  const ref = (url.searchParams.get('ref') || '').slice(0, 80)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  const allowed = await consumeRateLimit(`checkout:${ip}`, 20, 60_000)
  if (!allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  if (!plan || !PLANS[plan]) return NextResponse.json({ error: 'Unknown plan' }, { status: 400 })

  if (ref) {
    await recordPreviewEvent({
      event: 'checkout_started',
      attributionId: ref,
      path: `/api/checkout?plan=${plan}`,
      userAgent: request.headers.get('user-agent'),
    })
  }

  const destination = new URL(PLANS[plan])
  if (ref) destination.searchParams.set('client_reference_id', ref)
  return NextResponse.redirect(destination)
}
