/**
 * Base preview configuration structure
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
  config: CleaningPreviewConfig
}

