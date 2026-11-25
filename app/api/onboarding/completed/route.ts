import { NextResponse } from 'next/server'
import { recordPreviewEvent } from '@/lib/previews/events'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const expected = process.env.ONBOARDING_CALLBACK_SECRET
  if (!expected || request.headers.get('x-onboarding-secret') !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await request.json().catch(() => null) as { attributionId?: string } | null
  if (!body?.attributionId || body.attributionId.length < 8 || body.attributionId.length > 80) {
    return NextResponse.json({ error: 'Invalid attribution id' }, { status: 400 })
  }
  await recordPreviewEvent({
    event: 'onboarding_completed',
    attributionId: body.attributionId,
    eventKey: `${body.attributionId}:onboarding_completed`,
  })
  return NextResponse.json({ ok: true })
}
