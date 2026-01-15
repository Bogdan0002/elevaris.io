'use server'

import { generateFromDescription, type StructuredCompanyData } from '@/lib/ai/generateFromDescription'
import type { BusinessNiche } from '@/lib/previews/types'

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
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

