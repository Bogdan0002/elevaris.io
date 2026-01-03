'use server'

import { generateFromDescription } from '@/lib/ai/generateFromDescription'

export interface GenerateFromDescriptionInput {
  description: string
  placeId?: string
}

export interface GenerateFromDescriptionResult {
  success: boolean
  data?: {
    business: {
      name: string
      city: string
      state: string
      phone: string
    }
    offer: {
      shortText: string
    }
    branding: {
      primaryColor: string
      accentColor: string
    }
    services: Array<{
      name: string
      description: string
    }>
    areasServed: string[]
    hours?: string
    sampleReviews?: Array<{
      name: string
      text: string
      stars: number
    }>
  }
  error?: string
}

export async function generateFromDescriptionAction(
  input: GenerateFromDescriptionInput
): Promise<GenerateFromDescriptionResult> {
  try {
    const generated = await generateFromDescription({
      description: input.description,
      placeId: input.placeId,
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

