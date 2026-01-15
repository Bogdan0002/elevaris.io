/**
 * MULTI-NICHE PREVIEW CONFIGURATION SYSTEM
 * Supports: cleaning, landscaping, roofing, plumbing, HVAC, auto detailing, 
 * painting, moving, pest control, pool service, electrical, handyman, and more
 */

// ============================================================================
// NICHE DEFINITIONS
// ============================================================================

export type BusinessNiche = 
  | 'cleaning'
  | 'landscaping'
  | 'roofing'
  | 'plumbing'
  | 'hvac'
  | 'auto-detailing'
  | 'painting'
  | 'moving'
  | 'pest-control'
  | 'pool-service'
  | 'electrical'
  | 'handyman'
  | 'pressure-washing'
  | 'window-cleaning'
  | 'carpet-cleaning'
  | 'junk-removal'
  | 'locksmith'
  | 'garage-door'
  | 'concrete'
  | 'fencing'
  | 'tree-service'
  | 'gutter-cleaning'
  | 'solar'
  | 'flooring'
  | 'general-contractor'

// ============================================================================
// SERVICE CONFIGURATION
// ============================================================================

export interface ServiceItem {
  name: string
  description: string
  icon?: string // Lucide icon name
  image?: string // URL to service image
  features?: string[]
  badge?: {
    text: string
    type: 'popular' | 'value' | 'new' | 'premium'
  }
}

// ============================================================================
// REVIEW CONFIGURATION
// ============================================================================

export interface ReviewItem {
  name: string
  text: string
  stars: number
  date?: string
  service?: string // Which service they used
  image?: string // Reviewer avatar (optional)
  verified?: boolean
}

// ============================================================================
// BRANDING CONFIGURATION
// ============================================================================

export interface BrandingConfig {
  primaryColor?: string
  accentColor?: string
  logoUrl?: string
  logoAlt?: string
  // Typography preferences
  fontFamily?: 'modern' | 'classic' | 'bold' | 'elegant'
  // Style preferences
  style?: 'clean' | 'bold' | 'minimal' | 'corporate' | 'friendly'
}

// ============================================================================
// HERO CONFIGURATION
// ============================================================================

export interface HeroConfig {
  headline?: string // Custom headline override
  subheadline?: string // Custom subheadline override
  backgroundImage?: string // Hero background image URL
  backgroundVideo?: string // Hero background video URL
  showTrustBadges?: boolean
  showStats?: boolean
  ctaText?: string // Primary CTA button text
  ctaSecondaryText?: string // Secondary CTA button text
}

// ============================================================================
// ABOUT SECTION CONFIGURATION
// ============================================================================

export interface AboutConfig {
  story?: string // Company story/about text
  image?: string // URL to about section image
  yearFounded?: number
  teamSize?: string // e.g., "10-20 professionals"
  certifications?: string[]
  values?: Array<{
    title: string
    description: string
    icon?: string
  }>
}

// ============================================================================
// GALLERY CONFIGURATION
// ============================================================================

export interface GalleryItem {
  url: string
  alt: string
  caption?: string
  category?: string // For filtering
  beforeAfter?: {
    before: string
    after: string
  }
}

export interface GalleryConfig {
  images?: GalleryItem[]
  showBeforeAfter?: boolean
  layout?: 'grid' | 'masonry' | 'carousel'
}

// ============================================================================
// PRICING CONFIGURATION
// ============================================================================

export interface PricingTier {
  name: string
  price: string // e.g., "$99", "From $149", "Custom"
  priceNote?: string // e.g., "per visit", "starting at"
  description: string
  features: string[]
  highlighted?: boolean
  badge?: string
  ctaText?: string
}

export interface PricingConfig {
  showPricing?: boolean
  tiers?: PricingTier[]
  disclaimer?: string
}

// ============================================================================
// TRUST & SOCIAL PROOF
// ============================================================================

export interface TrustBadge {
  icon: string
  label: string
  description: string
}

export interface SocialProofConfig {
  googleRating?: number
  totalReviews?: number
  yearsInBusiness?: number
  projectsCompleted?: number
  customersServed?: number
  satisfactionRate?: number
  badges?: TrustBadge[]
}

// ============================================================================
// CONTENT OVERRIDES (AI-generated or custom)
// ============================================================================

export interface ContentOverrides {
  // Section headlines
  servicesHeadline?: string
  aboutHeadline?: string
  whyUsHeadline?: string
  areasHeadline?: string
  reviewsHeadline?: string
  contactHeadline?: string
  
  // Section descriptions
  servicesDescription?: string
  aboutDescription?: string
  whyUsDescription?: string
  areasDescription?: string
  reviewsDescription?: string
  contactDescription?: string
  
  // Custom "Why Us" reasons
  whyUsReasons?: Array<{
    icon?: string
    title: string
    description: string
    highlight?: string
  }>
  
  // Footer content
  footerTagline?: string
}

// ============================================================================
// MAIN PREVIEW CONFIGURATION
// ============================================================================

export interface PreviewConfig {
  // Required identifiers
  slug: string
  niche: BusinessNiche
  templateId: string
  
  // Business information
  business: {
    name: string
    city: string
    state: string
    phone: string
    email?: string
    address?: string
    website?: string
  }
  
  // Google integration
  placeId: string
  
  // Offer/tagline
  offer: {
    shortText: string
    longText?: string
    badge?: string // e.g., "LIMITED TIME"
  }
  
  // Branding
  branding: BrandingConfig
  
  // Services
  services: ServiceItem[] | string[] // Can be simple strings or detailed objects
  
  // Areas served
  areasServed: string[]
  
  // Operating hours
  hours?: string
  
  // Map configuration
  map?: {
    lat?: number
    lng?: number
    radiusMiles?: number
  }
  
  // Reviews
  sampleReviews?: ReviewItem[]
  
  // Section-specific configurations
  hero?: HeroConfig
  about?: AboutConfig
  gallery?: GalleryConfig
  pricing?: PricingConfig
  socialProof?: SocialProofConfig
  
  // Content overrides
  content?: ContentOverrides
  
  // Feature flags
  features?: {
    showGallery?: boolean
    showPricing?: boolean
    showMap?: boolean
    showReviews?: boolean
    showAreas?: boolean
    showAbout?: boolean
    showWhyUs?: boolean
    enableChat?: boolean
    enableBooking?: boolean
  }
}

// ============================================================================
// LEGACY SUPPORT - CleaningPreviewConfig
// ============================================================================

/**
 * @deprecated Use PreviewConfig instead
 * Kept for backward compatibility
 */
export interface CleaningPreviewConfig {
  slug: string
  niche: 'cleaning'
  templateId: string
  business: {
    name: string
    city: string
    state: string
    phone: string
  }
  placeId: string
  offer: {
    shortText: string
  }
  branding: {
    primaryColor?: string
    accentColor?: string
  }
  services: string[]
  areasServed: string[]
  hours?: string
  map?: {
    lat?: number
    lng?: number
    radiusMiles?: number
  }
  sampleReviews?: {
    name: string
    text: string
    stars: number
  }[]
}

/**
 * Database row structure for client_previews table
 */
export interface ClientPreviewRow {
  id: string
  slug: string
  niche: string
  status: string
  created_at: string
  updated_at: string
  config: PreviewConfig | CleaningPreviewConfig
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Partial config for creation (many fields are optional)
 */
export type PartialPreviewConfig = Partial<PreviewConfig> & {
  slug: string
  niche: BusinessNiche
  business: {
    name: string
    city: string
    state: string
    phone: string
  }
}

/**
 * Convert legacy CleaningPreviewConfig to new PreviewConfig
 */
export function migrateToPreviewConfig(legacy: CleaningPreviewConfig): PreviewConfig {
  return {
    ...legacy,
    services: legacy.services.map(s => 
      typeof s === 'string' ? { name: s, description: '' } : s
    ),
    sampleReviews: legacy.sampleReviews?.map(r => ({
      ...r,
      verified: true,
    })),
  }
}

/**
 * Check if config is legacy format
 */
export function isLegacyConfig(config: PreviewConfig | CleaningPreviewConfig): config is CleaningPreviewConfig {
  return config.niche === 'cleaning' && 
    Array.isArray(config.services) && 
    typeof config.services[0] === 'string'
}

