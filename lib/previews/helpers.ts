import type { CleaningPreviewConfig } from './types'

/**
 * Default branding colors if not provided
 * Cleaning industry: Fresh, clean, professional colors
 */
const DEFAULT_PRIMARY_COLOR = '#00A8E8' // Bright professional blue
const DEFAULT_ACCENT_COLOR = '#00C896' // Fresh teal/green

/**
 * Default sample reviews if none provided
 */
const DEFAULT_SAMPLE_REVIEWS = [
  {
    name: 'Sarah Johnson',
    text: 'Excellent service! They did a thorough job cleaning our office. Very professional and punctual.',
    stars: 5,
  },
  {
    name: 'Michael Chen',
    text: 'Great experience from start to finish. The team was friendly and the results exceeded our expectations.',
    stars: 5,
  },
  {
    name: 'Emily Rodriguez',
    text: 'Highly recommend! Our home has never looked cleaner. Worth every penny.',
    stars: 5,
  },
]

/**
 * Applies defaults to a preview configuration
 * Ensures sampleReviews exist, radiusMiles default, and trims arrays to limits
 */
export function applyDefaults(
  config: Partial<CleaningPreviewConfig>
): CleaningPreviewConfig {
  // Ensure required fields exist (validation will catch missing required fields)
  const result: CleaningPreviewConfig = {
    slug: config.slug || '',
    niche: 'cleaning',
    templateId: config.templateId || 'cleaning-v1',
    business: {
      name: config.business?.name || '',
      city: config.business?.city || '',
      state: config.business?.state || '',
      phone: config.business?.phone || '',
    },
    placeId: config.placeId || '',
    offer: {
      shortText: config.offer?.shortText || '',
    },
    branding: {
      primaryColor: config.branding?.primaryColor || DEFAULT_PRIMARY_COLOR,
      accentColor: config.branding?.accentColor || DEFAULT_ACCENT_COLOR,
    },
    services: (config.services || []).slice(0, 10), // Max 10
    areasServed: (config.areasServed || []).slice(0, 15), // Max 15
  }

  // Apply optional fields
  if (config.hours) {
    result.hours = config.hours
  }

  if (config.map) {
    result.map = {
      lat: config.map.lat,
      lng: config.map.lng,
      radiusMiles: config.map.radiusMiles ?? 15, // Default 15 miles
    }
  } else {
    result.map = {
      radiusMiles: 15, // Default radius even if no map coords
    }
  }

  // Ensure sampleReviews exist (use defaults if not provided)
  result.sampleReviews = config.sampleReviews?.length
    ? config.sampleReviews
    : DEFAULT_SAMPLE_REVIEWS

  // Ensure services and areasServed meet minimums (validation will catch if too few)
  if (result.services.length < 4) {
    // Pad with placeholder services if needed (validation should prevent this)
    while (result.services.length < 4) {
      result.services.push('Service')
    }
  }

  if (result.areasServed.length < 2) {
    // Pad with placeholder areas if needed (validation should prevent this)
    while (result.areasServed.length < 2) {
      result.areasServed.push('Area')
    }
  }

  return result
}

/**
 * Generates Google Review URL from Place ID
 * @param placeId - Google Place ID
 * @returns URL to write a review on Google
 */
export function getGoogleReviewUrl(placeId: string): string {
  if (!placeId || placeId.trim().length === 0) {
    throw new Error('Place ID is required')
  }

  // Encode the place ID to handle special characters
  const encodedPlaceId = encodeURIComponent(placeId.trim())

  return `https://search.google.com/local/writereview?placeid=${encodedPlaceId}`
}

/**
 * Validates that a config is safe to use (won't crash template)
 * Returns true if config is valid, throws error if not
 */
export function validateConfigSafe(config: CleaningPreviewConfig): boolean {
  // Ensure all required fields are present and non-empty
  if (!config.slug || config.slug.trim().length === 0) {
    throw new Error('Slug is required')
  }

  if (!config.business?.name || config.business.name.trim().length === 0) {
    throw new Error('Business name is required')
  }

  if (!config.placeId || config.placeId.trim().length === 0) {
    throw new Error('Place ID is required')
  }

  // Ensure arrays are not empty (validation should catch this, but double-check)
  if (!config.services || config.services.length === 0) {
    throw new Error('At least one service is required')
  }

  if (!config.areasServed || config.areasServed.length === 0) {
    throw new Error('At least one area served is required')
  }

  // Ensure branding colors are valid hex colors (basic check)
  if (config.branding?.primaryColor) {
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(config.branding.primaryColor)) {
      throw new Error('Primary color must be a valid hex color')
    }
  }

  if (config.branding?.accentColor) {
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(config.branding.accentColor)) {
      throw new Error('Accent color must be a valid hex color')
    }
  }

  return true
}

