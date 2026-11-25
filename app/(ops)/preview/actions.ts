'use server'

import { randomUUID } from 'crypto'
import { assertOpsAccess, OpsAuthError } from '@/lib/ops/guard'
import { consumeRateLimit } from '@/lib/ops/rate-limit'
import { recordPreviewEvent } from '@/lib/previews/events'
import { createPreview, getPreviewBySlug, updatePreview } from '@/lib/previews/repo'
import { slugify } from '@/lib/utils/slugify'
import { applyPreviewDefaults, getGoogleReviewUrl, normalizeServices } from '@/lib/previews/helpers'
import { previewConfigSchema } from '@/lib/previews/schema'
import { getDefaultTemplateForNiche, getTemplateById } from '@/lib/templates/registry'
import type { BusinessNiche, CleaningProfile, GoogleBusinessProfile, PreviewConfig, ReviewItem, ServiceItem } from '@/lib/previews/types'

interface CreatePreviewInput {
  templateId: string
  niche: BusinessNiche
  businessName: string
  city: string
  state: string
  phone: string
  placeId: string
  offerText: string
  offerBadge?: string
  primaryColor?: string
  accentColor?: string
  services: Array<string | ServiceItem>
  areasServed: string[]
  hours?: string
  lat?: number
  lng?: number
  radiusMiles?: number
  heroHeadline?: string
  heroSubheadline?: string
  aboutStory?: string
  sampleReviews?: ReviewItem[]
  cleaningProfile?: CleaningProfile
  googleBusinessProfile?: GoogleBusinessProfile
  updateExisting?: boolean
}

export async function createPreviewAction(input: CreatePreviewInput) {
  try {
    await assertOpsAccess()
    const allowed = await consumeRateLimit('preview-create', 30, 60 * 60 * 1000)
    if (!allowed) return { success: false, error: 'Too many previews created. Try again later.' }
    // Validate template exists (fallback to best template for niche)
    const template =
      getTemplateById(input.templateId) || getDefaultTemplateForNiche(input.niche)

    // Generate slug
    const slug = slugify(input.businessName, input.city, input.state)

    // Build config
    const rawServices = input.services || []
    const servicesForNormalize: ServiceItem[] | string[] = rawServices.every(
      (service) => typeof service === 'string'
    )
      ? (rawServices as string[])
      : rawServices.map((service) =>
          typeof service === 'string'
            ? { name: service, description: '', features: [] }
            : service
        )

    const servicesFinal = normalizeServices(servicesForNormalize, input.niche).slice(0, 8)

    const config: PreviewConfig = {
      schemaVersion: 2,
      mode: 'preview',
      attributionId: randomUUID(),
      cleaningProfile: input.cleaningProfile,
      googleBusinessProfile: input.googleBusinessProfile,
      slug,
      niche: input.niche,
      templateId: template.id,
      business: {
        name: input.businessName,
        city: input.city,
        state: input.state,
        phone: input.phone,
      },
      placeId: input.placeId,
      offer: {
        shortText: input.offerText,
        badge: input.offerBadge,
      },
      branding: {
        primaryColor: input.primaryColor,
        accentColor: input.accentColor,
      },
      services: servicesFinal,
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
      sampleReviews: input.sampleReviews?.map((review) => ({
        ...review,
        kind: review.kind || 'illustrative',
        source: review.source || 'operator',
        verified: review.source === 'google',
      })),
      hero: {
        headline: input.heroHeadline,
        subheadline: input.heroSubheadline,
      },
      about: {
        story: input.aboutStory,
      },
    }

    // Apply defaults
    const configWithDefaults = applyPreviewDefaults(config)

    // Validate
    const validationResult = previewConfigSchema.safeParse(configWithDefaults)
    if (!validationResult.success) {
      console.error('[CreatePreview] Validation failed:', validationResult.error.errors)
      return {
        success: false,
        error: `Validation failed: ${validationResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`,
      }
    }

    // Create in database
    let preview
    try {
      preview = await createPreview(configWithDefaults)
      console.log('[CreatePreview] Preview created successfully:', preview.id, preview.slug)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      if (message.toLowerCase().includes('duplicate') || message.toLowerCase().includes('already exists')) {
        const existing = await getPreviewBySlug(slug)
        if (existing && input.updateExisting) {
          const updated = await updatePreview(slug, {
            ...configWithDefaults,
            attributionId: ('attributionId' in existing.config ? existing.config.attributionId : undefined) || configWithDefaults.attributionId,
          })
          return {
            success: true,
            slug,
            updated: true,
            previewUrl: `https://elevaris.app/p/${updated.slug}`,
            reviewUrl: getGoogleReviewUrl(updated.config.placeId),
            templateName: template.name,
          }
        }
        if (existing) {
          return {
            success: false,
            conflict: true,
            slug,
            previewUrl: `https://elevaris.app/p/${slug}`,
            error: 'A preview with this business name and city already exists. Choose update to replace it.',
          }
        }
      }
      throw error
    }
    
    // Verify the preview was created
    const verifyPreview = await getPreviewBySlug(slug)
    if (!verifyPreview) {
      console.error('[CreatePreview] Preview verification failed - not found in database')
      return {
        success: false,
        error: 'Preview was created but could not be verified in database',
      }
    }
    console.log('[CreatePreview] Preview verified in database')

    // Generate URLs
    const previewUrl = `https://elevaris.app/p/${slug}`
    const reviewUrl = getGoogleReviewUrl(input.placeId)

    if (configWithDefaults.attributionId) {
      await recordPreviewEvent({
        event: 'preview_generated',
        attributionId: configWithDefaults.attributionId,
        eventKey: `${configWithDefaults.attributionId}:preview_generated`,
      })
    }

    return {
      success: true,
      slug,
      previewUrl,
      reviewUrl,
      templateName: template.name,
      attributionId: configWithDefaults.attributionId,
    }
  } catch (error) {
    if (error instanceof OpsAuthError) return { success: false, error: 'Unauthorized' }
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


