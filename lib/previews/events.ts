import { supabaseServer } from '@/lib/db/supabaseServer'

export const PREVIEW_EVENTS = [
  'preview_generated',
  'preview_sent',
  'preview_viewed',
  'cta_clicked',
  'sales_page_viewed',
  'checkout_started',
  'payment_succeeded',
  'onboarding_completed',
] as const

export type PreviewEventName = typeof PREVIEW_EVENTS[number]

const BOT_PATTERN = /bot|spider|crawler|preview|facebookexternalhit|slackbot|whatsapp|telegrambot|discordbot|embedly|quora/i

export function isLikelyBot(userAgent: string | null): boolean {
  return Boolean(userAgent && BOT_PATTERN.test(userAgent))
}

export async function recordPreviewEvent(input: {
  event: PreviewEventName
  attributionId: string
  path?: string
  eventKey?: string
  userAgent?: string | null
  internal?: boolean
}): Promise<void> {
  if (!input.attributionId || input.attributionId.length < 8 || input.attributionId.length > 80) return
  if (input.internal || input.attributionId.startsWith('test_')) return
  if (isLikelyBot(input.userAgent || null) && input.event !== 'payment_succeeded' && input.event !== 'onboarding_completed') return
  const eventKey = (input.eventKey || `${input.attributionId}:${input.event}`).slice(0, 180)
  try {
    const { error } = await supabaseServer.from('preview_events').upsert({
      attribution_id: input.attributionId,
      event: input.event,
      event_key: eventKey,
      path: input.path?.slice(0, 300),
    }, { onConflict: 'event_key', ignoreDuplicates: true })
    if (error) console.error('[preview-events]', error.message)
  } catch (error) {
    console.error('[preview-events]', error)
  }
}
