import { NextResponse } from 'next/server'
import { PREVIEW_EVENTS, recordPreviewEvent, type PreviewEventName } from '@/lib/previews/events'
import { consumeRateLimit } from '@/lib/ops/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PUBLIC_EVENTS = new Set<PreviewEventName>(['preview_viewed', 'cta_clicked', 'sales_page_viewed'])

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  const allowed = await consumeRateLimit(`events:${ip}`, 60, 60_000)
  if (!allowed) return NextResponse.json({ ok: false }, { status: 429 })

  const body = await request.json().catch(() => null) as { event?: string; attributionId?: string; path?: string } | null
  if (!body?.event || !body.attributionId || !PREVIEW_EVENTS.includes(body.event as PreviewEventName)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
  if (!PUBLIC_EVENTS.has(body.event as PreviewEventName)) {
    return NextResponse.json({ ok: false }, { status: 403 })
  }
  if (body.attributionId.length < 8 || body.attributionId.length > 80) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  await recordPreviewEvent({
    event: body.event as PreviewEventName,
    attributionId: body.attributionId,
    path: body.path,
    userAgent: request.headers.get('user-agent'),
    internal: request.headers.get('x-elevaris-test') === '1',
  })

  const response = NextResponse.json({ ok: true })
  response.cookies.set('elevaris_ref', body.attributionId, {
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 90,
    path: '/',
  })
  return response
}
