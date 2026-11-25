'use server'

import { generateFromDescription, type StructuredCompanyData } from '@/lib/ai/generateFromDescription'
import type { BusinessNiche } from '@/lib/previews/types'
import { assertOpsAccess, OpsAuthError } from '@/lib/ops/guard'
import { consumeRateLimit } from '@/lib/ops/rate-limit'

export interface GenerateFromDescriptionInput {
  description: string
  placeId?: string
  niche?: BusinessNiche
}

export interface GenerateFromDescriptionResult {
  success: boolean
  data?: StructuredCompanyData
  error?: string
}

export async function generateFromDescriptionAction(
  input: GenerateFromDescriptionInput
): Promise<GenerateFromDescriptionResult> {
  try {
    await assertOpsAccess()
    const allowed = await consumeRateLimit('ai-generate', 20, 60 * 60 * 1000)
    if (!allowed) return { success: false, error: 'Too many generation requests. Try again later.' }
    const generated = await generateFromDescription({
      description: input.description,
      placeId: input.placeId,
      niche: input.niche,
    })

    return {
      success: true,
      data: generated,
    }
  } catch (error) {
    console.error('Error in generateFromDescriptionAction:', error)
    if (error instanceof OpsAuthError) return { success: false, error: 'Unauthorized' }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

