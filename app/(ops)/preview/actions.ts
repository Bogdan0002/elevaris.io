'use server'

import { createPreview } from '@/lib/previews/repo'
import { slugify } from '@/lib/utils/slugify'
import { applyDefaults } from '@/lib/previews/helpers'
import { getGoogleReviewUrl } from '@/lib/previews/helpers'
import { cleaningPreviewConfigSchema } from '@/lib/previews/schema'
import { getTemplateById } from '@/lib/templates/registry'
import type { CleaningPreviewConfig } from '@/lib/previews/types'

interface CreatePreviewInput {
  templateId: string
  businessName: string
  city: string
  state: string
  phone: string
  placeId: string
  offerText: string
  primaryColor?: string
  accentColor?: string
  services: string[]
  areasServed: string[]
  hours?: string
  lat?: number
  lng?: number
  radiusMiles?: number
}

export async function createPreviewAction(input: CreatePreviewInput) {
  try {
    // Validate template exists
    const template = getTemplateById(input.templateId)
    if (!template) {
      return {
        success: false,
        error: `Template "${input.templateId}" not found in registry`,
      }
    }

    // Generate slug
    const slug = slugify(input.businessName, input.city, input.state)

    // Build config
    const config: CleaningPreviewConfig = {
      slug,
      niche: 'cleaning',
      templateId: input.templateId,
      business: {
        name: input.businessName,
        city: input.city,
        state: input.state,
        phone: input.phone,
      },
      placeId: input.placeId,
      offer: {
        shortText: input.offerText,
      },
      branding: {
        primaryColor: input.primaryColor,
        accentColor: input.accentColor,
      },
      services: input.services.filter((s) => s.trim().length > 0),
      areasServed: input.areasServed.filter((a) => a.trim().length > 0),
      hours: input.hours || undefined,
      map:
        input.lat && input.lng
          ? {
              lat: input.lat,
              lng: input.lng,
              radiusMiles: input.radiusMiles || 15,
            }
          : undefined,
    }

    // Apply defaults
    const configWithDefaults = applyDefaults(config)

    // Validate
    cleaningPreviewConfigSchema.parse(configWithDefaults)

    // Create in database
    const preview = await createPreview(configWithDefaults)

    // Generate URLs
    const previewUrl = `https://p.elevaris.app/${slug}`
    const reviewUrl = getGoogleReviewUrl(input.placeId)

    return {
      success: true,
      slug,
      previewUrl,
      reviewUrl,
      templateName: template.name,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      }
    }
    return {
      success: false,
      error: 'Unknown error occurred',
    }
  }
}

