import { z } from 'zod'

/**
 * Zod schema for cleaning preview configuration
 * This will be expanded in Prompt 2 with full field definitions
 */
export const cleaningPreviewConfigSchema = z.object({
  slug: z.string().min(1).max(100),
  niche: z.literal('cleaning'),
  templateId: z.string().min(1),
  business: z.object({
    name: z.string().min(1).max(200),
    city: z.string().min(1).max(100),
    state: z.string().min(2).max(2), // US state code
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
  services: z.array(z.string()).min(4).max(10),
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

