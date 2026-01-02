'use server'

import { generatePreviewContent, type ClientInfo } from '@/lib/ai/generateContent'

export interface GenerateContentResult {
  success: boolean
  content?: {
    offer: { shortText: string }
    branding: { primaryColor: string; accentColor: string }
    services: string[]
    areasServed: string[]
    hours?: string
    sampleReviews?: {
      name: string
      text: string
      stars: number
    }[]
  }
  error?: string
}

/**
 * Server action to generate preview content using AI
 */
export async function generateContentAction(
  clientInfo: ClientInfo
): Promise<GenerateContentResult> {
  try {
    // Validate required fields
    if (!clientInfo.businessName || !clientInfo.city || !clientInfo.state || !clientInfo.phone) {
      return {
        success: false,
        error: 'Business name, city, state, and phone are required',
      }
    }

    const generated = await generatePreviewContent(clientInfo)

    return {
      success: true,
      content: {
        offer: generated.offer,
        branding: generated.branding,
        services: generated.services,
        areasServed: generated.areasServed,
        hours: generated.hours,
        sampleReviews: generated.sampleReviews,
      },
    }
  } catch (error) {
    console.error('Error in generateContentAction:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to generate content. Please try again.',
    }
  }
}

