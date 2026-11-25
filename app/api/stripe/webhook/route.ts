import { NextResponse } from 'next/server'
import { recordPreviewEvent } from '@/lib/previews/events'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function verifyStripeSignature(payload: string, header: string | null, secret: string): Promise<boolean> {
  if (!header) return false
  const parts = Object.fromEntries(header.split(',').map((part) => {
    const [key, value] = part.split('=')
    return [key, value]
  }))
  const timestamp = parts.t
  const signature = parts.v1
  if (!timestamp || !signature) return false
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signed = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}.${payload}`))
  const expected = Array.from(new Uint8Array(signed)).map((byte) => byte.toString(16).padStart(2, '0')).join('')
  return expected === signature
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  const payload = await request.text()
  if (!secret || !(await verifyStripeSignature(payload, request.headers.get('stripe-signature'), secret))) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const event = JSON.parse(payload) as {
    id?: string
    type?: string
    data?: { object?: { client_reference_id?: string; metadata?: { attributionId?: string } } }
  }
  if (event.type === 'checkout.session.completed') {
    const attributionId = event.data?.object?.client_reference_id || event.data?.object?.metadata?.attributionId
    if (attributionId) {
      await recordPreviewEvent({
        event: 'payment_succeeded',
        attributionId,
        eventKey: `${attributionId}:payment_succeeded:${event.id || 'stripe'}`,
      })
    }
  }

  return NextResponse.json({ received: true })
}
