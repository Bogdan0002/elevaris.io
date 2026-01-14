import type { CleaningPreviewConfig, PreviewConfig, BusinessNiche, ServiceItem } from './types'
import { getDefaultServices, getDefaultTrustBadges, getColorPalettes } from './niche-defaults'

/**
 * Default branding colors if not provided
 * These will be overridden by niche-specific defaults when available
 */
const DEFAULT_PRIMARY_COLOR = '#0EA5E9' // Sky blue
const DEFAULT_ACCENT_COLOR = '#10B981' // Emerald green

/**
 * Default sample reviews if none provided
 */
const DEFAULT_SAMPLE_REVIEWS = [
  {
    name: 'Sarah Johnson',
    text: 'Excellent service! They did a thorough job. Very professional and punctual.',
    stars: 5,
  },
  {
    name: 'Michael Chen',
    text: 'Great experience from start to finish. The team was friendly and the results exceeded our expectations.',
    stars: 5,
  },
  {
    name: 'Emily Rodriguez',
    text: 'Highly recommend! Worth every penny. Will definitely use them again.',
    stars: 5,
  },
]

/**
 * Get niche-appropriate default colors
 */
export function getNicheDefaultColors(niche: BusinessNiche): { primary: string; accent: string } {
  const palettes = getColorPalettes(niche)
  if (palettes.length > 0) {
    return { primary: palettes[0].primary, accent: palettes[0].accent }
  }
  return { primary: DEFAULT_PRIMARY_COLOR, accent: DEFAULT_ACCENT_COLOR }
}

/**
 * Normalize services to ServiceItem[] format
 */
export function normalizeServices(services: ServiceItem[] | string[], niche: BusinessNiche): ServiceItem[] {
  if (!services || services.length === 0) {
    return getDefaultServices(niche)
  }
  
  // If already ServiceItem[], return as-is
  if (typeof services[0] === 'object' && 'name' in services[0]) {
    return services as ServiceItem[]
  }
  
  // Convert string[] to ServiceItem[]
  const defaultServices = getDefaultServices(niche)
  return (services as string[]).map((serviceName, index) => {
    // Try to find matching default service for description
    const matchingDefault = defaultServices.find(
      ds => ds.name.toLowerCase() === serviceName.toLowerCase()
    )
    
    return {
      name: serviceName,
      description: matchingDefault?.description || `Professional ${serviceName.toLowerCase()} services.`,
      icon: matchingDefault?.icon,
      features: matchingDefault?.features,
    }
  })
}

/**
 * Applies defaults to a preview configuration
 * Works with both legacy CleaningPreviewConfig and new PreviewConfig
 */
export function applyDefaults(
  config: Partial<PreviewConfig> | Partial<CleaningPreviewConfig>
): CleaningPreviewConfig {
  const niche = (config.niche || 'cleaning') as BusinessNiche
  const defaultColors = getNicheDefaultColors(niche)
  
  // Ensure required fields exist
  const result: CleaningPreviewConfig = {
    slug: config.slug || '',
    niche: 'cleaning', // Keep as 'cleaning' for backward compatibility
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
      primaryColor: config.branding?.primaryColor || defaultColors.primary,
      accentColor: config.branding?.accentColor || defaultColors.accent,
    },
    services: [], // Will be populated below
    areasServed: (config.areasServed || []).slice(0, 15), // Max 15
  }

  // Handle services (can be string[] or ServiceItem[])
  if (config.services && Array.isArray(config.services)) {
    if (typeof config.services[0] === 'string') {
      result.services = (config.services as string[]).slice(0, 10)
    } else {
      // Extract names from ServiceItem[]
      result.services = (config.services as ServiceItem[]).map(s => s.name).slice(0, 10)
    }
  }

  // Apply optional fields
  if (config.hours) {
    result.hours = config.hours
  }

  if (config.map) {
    result.map = {
      lat: config.map.lat,
      lng: config.map.lng,
      radiusMiles: config.map.radiusMiles ?? 15,
    }
  } else {
    result.map = {
      radiusMiles: 15,
    }
  }

  // Ensure sampleReviews exist
  if ('sampleReviews' in config && config.sampleReviews?.length) {
    result.sampleReviews = config.sampleReviews.map(r => ({
      name: r.name,
      text: r.text,
      stars: r.stars,
    }))
  } else {
    result.sampleReviews = DEFAULT_SAMPLE_REVIEWS
  }

  // Ensure services meet minimums
  if (result.services.length < 4) {
    const defaultServices = getDefaultServices(niche)
    while (result.services.length < 4 && defaultServices[result.services.length]) {
      result.services.push(defaultServices[result.services.length].name)
    }
  }

  // Ensure areasServed meet minimums
  if (result.areasServed.length < 2) {
    if (result.business.city) {
      result.areasServed = [result.business.city, `${result.business.city} Metro`]
    } else {
      result.areasServed = ['Local Area', 'Surrounding Areas']
    }
  }

  return result
}

/**
 * Apply defaults for the new multi-niche PreviewConfig
 */
export function applyPreviewDefaults(config: Partial<PreviewConfig>): PreviewConfig {
  const niche = config.niche || 'cleaning'
  const defaultColors = getNicheDefaultColors(niche)
  const defaultServices = getDefaultServices(niche)
  const defaultTrustBadges = getDefaultTrustBadges(niche)
  
  return {
    slug: config.slug || '',
    niche,
    templateId: config.templateId || `${niche}-v1`,
    business: {
      name: config.business?.name || '',
      city: config.business?.city || '',
      state: config.business?.state || '',
      phone: config.business?.phone || '',
      email: config.business?.email,
      address: config.business?.address,
      website: config.business?.website,
    },
    placeId: config.placeId || '',
    offer: {
      shortText: config.offer?.shortText || '',
      longText: config.offer?.longText,
      badge: config.offer?.badge,
    },
    branding: {
      primaryColor: config.branding?.primaryColor || defaultColors.primary,
      accentColor: config.branding?.accentColor || defaultColors.accent,
      logoUrl: config.branding?.logoUrl,
      logoAlt: config.branding?.logoAlt,
      fontFamily: config.branding?.fontFamily || 'modern',
      style: config.branding?.style || 'clean',
    },
    services: config.services?.length 
      ? normalizeServices(config.services, niche)
      : defaultServices,
    areasServed: config.areasServed?.length 
      ? config.areasServed.slice(0, 15)
      : config.business?.city 
        ? [config.business.city, `${config.business.city} Metro`]
        : ['Local Area'],
    hours: config.hours,
    map: config.map || { radiusMiles: 15 },
    sampleReviews: config.sampleReviews?.length 
      ? config.sampleReviews.map(r => ({ ...r, verified: r.verified ?? true }))
      : DEFAULT_SAMPLE_REVIEWS.map(r => ({ ...r, verified: true })),
    hero: config.hero,
    about: config.about,
    gallery: config.gallery,
    pricing: config.pricing,
    socialProof: config.socialProof || {
      badges: defaultTrustBadges,
    },
    content: config.content,
    features: {
      showGallery: config.features?.showGallery ?? true,
      showPricing: config.features?.showPricing ?? false,
      showMap: config.features?.showMap ?? true,
      showReviews: config.features?.showReviews ?? true,
      showAreas: config.features?.showAreas ?? true,
      showAbout: config.features?.showAbout ?? true,
      showWhyUs: config.features?.showWhyUs ?? true,
      enableChat: config.features?.enableChat ?? false,
      enableBooking: config.features?.enableBooking ?? false,
    },
  }
}

/**
 * Generates Google Review URL from Place ID
 */
export function getGoogleReviewUrl(placeId: string): string {
  if (!placeId || placeId.trim().length === 0) {
    return '#'
  }

  const encodedPlaceId = encodeURIComponent(placeId.trim())
  return `https://search.google.com/local/writereview?placeid=${encodedPlaceId}`
}

/**
 * Validates that a config is safe to use (won't crash template)
 */
export function validateConfigSafe(config: CleaningPreviewConfig | PreviewConfig): boolean {
  if (!config.slug || config.slug.trim().length === 0) {
    throw new Error('Slug is required')
  }

  if (!config.business?.name || config.business.name.trim().length === 0) {
    throw new Error('Business name is required')
  }

  if (!config.placeId || config.placeId.trim().length === 0) {
    throw new Error('Place ID is required')
  }

  if (!config.services || config.services.length === 0) {
    throw new Error('At least one service is required')
  }

  if (!config.areasServed || config.areasServed.length === 0) {
    throw new Error('At least one area served is required')
  }

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

/**
 * Generate a slug from business name and city
 */
export function generateSlug(businessName: string, city?: string): string {
  const base = city 
    ? `${businessName}-${city}`
    : businessName
    
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100)
}

/**
 * Format phone number for display
 */
export function formatPhoneDisplay(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  return phone
}

/**
 * Format phone number for tel: link
 */
export function formatPhoneLink(phone: string): string {
  return phone.replace(/\s/g, '')
}
