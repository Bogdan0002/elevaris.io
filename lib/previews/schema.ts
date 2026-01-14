import { z } from 'zod'
import { NICHE_DISPLAY_NAMES } from './niche-defaults'

// Get all valid niche keys
const VALID_NICHES = Object.keys(NICHE_DISPLAY_NAMES) as [string, ...string[]]

/**
 * Service item schema
 */
const serviceItemSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  icon: z.string().optional(),
  image: z.string().url().optional(),
  features: z.array(z.string()).optional(),
  badge: z.object({
    text: z.string(),
    type: z.enum(['popular', 'value', 'new', 'premium']),
  }).optional(),
})

/**
 * Review item schema
 */
const reviewItemSchema = z.object({
  name: z.string().min(1).max(100),
  text: z.string().min(1).max(1000),
  stars: z.number().min(1).max(5),
  date: z.string().optional(),
  service: z.string().optional(),
  image: z.string().url().optional(),
  verified: z.boolean().optional(),
})

/**
 * Branding schema
 */
const brandingSchema = z.object({
  primaryColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color')
    .optional(),
  accentColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color')
    .optional(),
  logoUrl: z.string().url().optional(),
  logoAlt: z.string().optional(),
  fontFamily: z.enum(['modern', 'classic', 'bold', 'elegant']).optional(),
  style: z.enum(['clean', 'bold', 'minimal', 'corporate', 'friendly']).optional(),
})

/**
 * Hero config schema
 */
const heroConfigSchema = z.object({
  headline: z.string().optional(),
  subheadline: z.string().optional(),
  backgroundImage: z.string().url().optional(),
  backgroundVideo: z.string().url().optional(),
  showTrustBadges: z.boolean().optional(),
  showStats: z.boolean().optional(),
  ctaText: z.string().optional(),
  ctaSecondaryText: z.string().optional(),
}).optional()

/**
 * About config schema
 */
const aboutConfigSchema = z.object({
  story: z.string().optional(),
  yearFounded: z.number().min(1900).max(2030).optional(),
  teamSize: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  values: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  })).optional(),
}).optional()

/**
 * Gallery config schema
 */
const galleryConfigSchema = z.object({
  images: z.array(z.object({
    url: z.string().url(),
    alt: z.string(),
    caption: z.string().optional(),
    category: z.string().optional(),
    beforeAfter: z.object({
      before: z.string().url(),
      after: z.string().url(),
    }).optional(),
  })).optional(),
  showBeforeAfter: z.boolean().optional(),
  layout: z.enum(['grid', 'masonry', 'carousel']).optional(),
}).optional()

/**
 * Pricing config schema
 */
const pricingConfigSchema = z.object({
  showPricing: z.boolean().optional(),
  tiers: z.array(z.object({
    name: z.string(),
    price: z.string(),
    priceNote: z.string().optional(),
    description: z.string(),
    features: z.array(z.string()),
    highlighted: z.boolean().optional(),
    badge: z.string().optional(),
    ctaText: z.string().optional(),
  })).optional(),
  disclaimer: z.string().optional(),
}).optional()

/**
 * Social proof config schema
 */
const socialProofConfigSchema = z.object({
  googleRating: z.number().min(1).max(5).optional(),
  totalReviews: z.number().optional(),
  yearsInBusiness: z.number().optional(),
  projectsCompleted: z.number().optional(),
  customersServed: z.number().optional(),
  satisfactionRate: z.number().min(0).max(100).optional(),
  badges: z.array(z.object({
    icon: z.string(),
    label: z.string(),
    description: z.string(),
  })).optional(),
}).optional()

/**
 * Content overrides schema
 */
const contentOverridesSchema = z.object({
  servicesHeadline: z.string().optional(),
  aboutHeadline: z.string().optional(),
  whyUsHeadline: z.string().optional(),
  areasHeadline: z.string().optional(),
  reviewsHeadline: z.string().optional(),
  contactHeadline: z.string().optional(),
  servicesDescription: z.string().optional(),
  aboutDescription: z.string().optional(),
  whyUsDescription: z.string().optional(),
  areasDescription: z.string().optional(),
  reviewsDescription: z.string().optional(),
  contactDescription: z.string().optional(),
  whyUsReasons: z.array(z.object({
    icon: z.string().optional(),
    title: z.string(),
    description: z.string(),
    highlight: z.string().optional(),
  })).optional(),
  footerTagline: z.string().optional(),
}).optional()

/**
 * Features flags schema
 */
const featuresSchema = z.object({
  showGallery: z.boolean().optional(),
  showPricing: z.boolean().optional(),
  showMap: z.boolean().optional(),
  showReviews: z.boolean().optional(),
  showAreas: z.boolean().optional(),
  showAbout: z.boolean().optional(),
  showWhyUs: z.boolean().optional(),
  enableChat: z.boolean().optional(),
  enableBooking: z.boolean().optional(),
}).optional()

/**
 * Full preview config schema (new multi-niche version)
 */
export const previewConfigSchema = z.object({
  slug: z.string().min(1).max(100),
  niche: z.enum(VALID_NICHES),
  templateId: z.string().min(1),
  business: z.object({
    name: z.string().min(1).max(200),
    city: z.string().min(1).max(100),
    state: z.string().min(2).max(2),
    phone: z.string().min(10).max(20),
    email: z.string().email().optional(),
    address: z.string().optional(),
    website: z.string().url().optional(),
  }),
  placeId: z.string().min(1),
  offer: z.object({
    shortText: z.string().min(1).max(500),
    longText: z.string().optional(),
    badge: z.string().optional(),
  }),
  branding: brandingSchema,
  services: z.union([
    z.array(z.string()).min(2).max(10),
    z.array(serviceItemSchema).min(2).max(10),
  ]),
  areasServed: z.array(z.string()).min(2).max(15),
  hours: z.string().optional(),
  map: z.object({
    lat: z.number().min(-90).max(90).optional(),
    lng: z.number().min(-180).max(180).optional(),
    radiusMiles: z.number().min(1).max(100).optional(),
  }).optional(),
  sampleReviews: z.array(reviewItemSchema).optional(),
  hero: heroConfigSchema,
  about: aboutConfigSchema,
  gallery: galleryConfigSchema,
  pricing: pricingConfigSchema,
  socialProof: socialProofConfigSchema,
  content: contentOverridesSchema,
  features: featuresSchema,
})

/**
 * Legacy cleaning preview config schema (backward compatible)
 */
export const cleaningPreviewConfigSchema = z.object({
  slug: z.string().min(1).max(100),
  niche: z.literal('cleaning'),
  templateId: z.string().min(1),
  business: z.object({
    name: z.string().min(1).max(200),
    city: z.string().min(1).max(100),
    state: z.string().min(2).max(2),
    phone: z.string().min(10).max(20),
  }),
  placeId: z.string().min(1),
  offer: z.object({
    shortText: z.string().min(1).max(500),
  }),
  branding: z.object({
    primaryColor: z
      .string()
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color')
      .optional(),
    accentColor: z
      .string()
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color')
      .optional(),
  }),
  services: z.array(z.string()).min(2).max(10),
  areasServed: z.array(z.string()).min(2).max(15),
  hours: z.string().optional(),
  map: z
    .object({
      lat: z.number().min(-90).max(90).optional(),
      lng: z.number().min(-180).max(180).optional(),
      radiusMiles: z.number().min(1).max(100).optional(),
    })
    .optional(),
  sampleReviews: z
    .array(
      z.object({
        name: z.string().min(1).max(100),
        text: z.string().min(1).max(1000),
        stars: z.number().min(1).max(5),
      })
    )
    .optional(),
})

export type CleaningPreviewConfigInput = z.infer<typeof cleaningPreviewConfigSchema>
export type PreviewConfigInput = z.infer<typeof previewConfigSchema>
