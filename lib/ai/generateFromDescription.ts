import OpenAI from 'openai'
import { z } from 'zod'
import type { BusinessNiche, CleaningCategory, CleaningProfile, GoogleBusinessProfile, ServiceItem } from '@/lib/previews/types'
import { getColorPalettes } from '@/lib/previews/niche-defaults'
import { CLEANING_CATEGORIES, inferCleaningProfile } from '@/lib/previews/cleaning-presentation'

function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY environment variable.')
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

export interface CompanyDescription {
  description: string
  placeId?: string
  niche?: BusinessNiche
}

export interface StructuredCompanyData {
  niche: BusinessNiche
  business: {
    name: string
    city: string
    state: string
    phone: string
    email?: string
    website?: string
  }
  offer: {
    shortText: string
    badge?: string
  }
  branding: {
    primaryColor: string
    accentColor: string
  }
  services: ServiceItem[]
  areasServed: string[]
  hours?: string
  sampleReviews?: Array<{
    name: string
    text: string
    stars: number
    service?: string
    kind: 'genuine' | 'illustrative'
    source: 'google' | 'operator' | 'unknown'
  }>
  heroHeadline?: string
  heroSubheadline?: string
  aboutStory?: string
  whyUsReasons?: Array<{
    title: string
    description: string
    highlight?: string
  }>
  cleaningProfile: CleaningProfile
  googleBusinessProfile?: GoogleBusinessProfile
}

const categorySchema = z.enum(CLEANING_CATEGORIES as [CleaningCategory, ...CleaningCategory[]])

const aiSchema = z.object({
  primaryCategory: categorySchema,
  secondaryCategories: z.array(categorySchema).max(6).default([]),
  audience: z.enum(['residential', 'commercial', 'mixed']),
  environment: z.enum(['interior', 'exterior', 'specialized']),
  business: z.object({
    name: z.string().min(1).max(200),
    city: z.string().max(100).default(''),
    state: z.string().max(32).default(''),
    phone: z.string().max(30).default(''),
    email: z.string().max(200).optional(),
    website: z.string().max(300).optional(),
  }),
  google: z.object({
    placeId: z.string().max(200).optional(),
    rating: z.number().min(1).max(5).optional(),
    reviewCount: z.number().min(0).max(1000000).optional(),
    primaryCategory: z.string().max(120).optional(),
    hours: z.string().max(300).optional(),
  }).optional(),
  services: z.array(z.object({
    name: z.string().min(1).max(100),
    description: z.string().max(500).default(''),
  })).max(8).default([]),
  areasServed: z.array(z.string().min(1).max(80)).max(15).default([]),
  hours: z.string().max(300).optional(),
  reviews: z.array(z.object({
    name: z.string().min(1).max(100),
    text: z.string().min(1).max(1000),
    stars: z.number().min(1).max(5),
    source: z.enum(['google', 'operator']).default('google'),
  })).max(8).default([]),
  heroHeadline: z.string().min(4).max(120),
  heroSubheadline: z.string().min(8).max(280),
  aboutParagraphs: z.array(z.string().min(8).max(600)).min(1).max(2),
  offerText: z.string().max(160).optional(),
})

function wordCount(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length
}

function normalizeAbout(paragraphs: string[]): string {
  const cleaned = paragraphs.map((part) => part.replace(/\s+/g, ' ').trim()).filter(Boolean).slice(0, 2)
  const words = cleaned.join(' ').split(/\s+/).filter(Boolean).slice(0, 100)
  const usable = words.length >= 40 ? words : [
    ...words,
    ...'This preview describes the listed services and service area. Final details are confirmed before launch.'.split(' '),
  ].slice(0, 70)
  const midpoint = Math.max(20, Math.ceil(usable.length / 2))
  return [usable.slice(0, midpoint).join(' '), usable.slice(midpoint).join(' ')].filter(Boolean).join('\n\n')
}

function stateCode(value: string): string {
  const match = value.toUpperCase().match(/\b[A-Z]{2}\b/)
  return match?.[0] || ''
}

function validateHexColor(color?: string): string | null {
  if (!color) return null
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color) ? color : null
}

export async function generateFromDescription(input: CompanyDescription): Promise<StructuredCompanyData> {
  const description = input.description.trim().slice(0, 8000)
  if (description.length < 20) {
    throw new Error('Add a longer company description before generating.')
  }

  const client = getOpenAIClient()
  const prompt = `Extract a cleaning-business website draft from the notes below. Return JSON only.

NOTES:
${description}
${input.placeId ? `KNOWN PLACE ID: ${input.placeId}` : ''}

Rules:
- Classify primaryCategory as one of: ${CLEANING_CATEGORIES.join(', ')}.
- Add secondaryCategories only when the notes clearly support them.
- audience is residential, commercial, or mixed. environment is interior, exterior, or specialized.
- Extract the business name, city, state abbreviation, and phone only when present. Use empty strings when missing. Never invent a phone number, email, address, discount, guarantee, certification, insurance, years in business, or customer count.
- services: only services explicitly mentioned or unmistakably implied by the business name. 1 to 6 items. Each description is one factual sentence, not a fabricated benefit claim.
- areasServed: only cities or neighborhoods named in the notes. Include the primary city when known.
- hours: only when stated.
- reviews: only reviews written out in the notes. If none are written out, return an empty array. Never invent reviewer names or quotes. Mark source as "google" only when the note says the review is from Google.
- google.rating and google.reviewCount only when numeric values are present.
- heroHeadline: specific service plus city, under 8 words. heroSubheadline: one sentence, under 25 words.
- aboutParagraphs: exactly two short paragraphs totaling 60 to 100 words. No invented facts.
- offerText: only if the notes state a real promotion. Otherwise omit it.

Return this shape:
{
  "primaryCategory": "residential-cleaning",
  "secondaryCategories": [],
  "audience": "residential",
  "environment": "interior",
  "business": { "name": "", "city": "", "state": "", "phone": "", "email": "", "website": "" },
  "google": { "placeId": "", "rating": 4.8, "reviewCount": 20, "primaryCategory": "", "hours": "" },
  "services": [{ "name": "", "description": "" }],
  "areasServed": [],
  "hours": "",
  "reviews": [{ "name": "", "text": "", "stars": 5, "source": "google" }],
  "heroHeadline": "",
  "heroSubheadline": "",
  "aboutParagraphs": ["", ""],
  "offerText": ""
}`

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You extract factual website drafts for cleaning businesses. Return valid JSON only. Do not invent reviews, ratings, discounts, credentials, or services.',
      },
      { role: 'user', content: prompt },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.2,
    max_tokens: 1800,
  })

  const content = completion.choices[0]?.message?.content
  if (!content) throw new Error('No content generated from OpenAI')

  const parsed = aiSchema.safeParse(JSON.parse(content))
  if (!parsed.success) {
    throw new Error(`Generated draft failed validation: ${parsed.error.issues.slice(0, 4).map((issue) => issue.message).join(', ')}`)
  }

  const generated = parsed.data
  const colors = getColorPalettes('cleaning')[0] || { primary: '#0EA5E9', accent: '#10B981' }
  const city = generated.business.city.trim()
  const services = generated.services.filter((service) => service.name.trim())
  const areas = Array.from(new Set(generated.areasServed.map((area) => area.trim()).filter(Boolean)))
  if (city && !areas.some((area) => area.toLowerCase() === city.toLowerCase())) areas.unshift(city)
  if (areas.length === 1) areas.push(`${areas[0]} area`)

  const profile: CleaningProfile = inferCleaningProfile({
    business: { name: generated.business.name, city, state: stateCode(generated.business.state), phone: generated.business.phone },
    services,
    cleaningProfile: {
      primaryCategory: generated.primaryCategory,
      secondaryCategories: generated.secondaryCategories,
      audience: generated.audience,
      environment: generated.environment,
      assetCollection: generated.primaryCategory,
    },
  })

  const rating = generated.google?.rating
  const googleBusinessProfile: GoogleBusinessProfile | undefined = (input.placeId || generated.google?.placeId || rating || generated.google?.reviewCount)
    ? {
        placeId: input.placeId || generated.google?.placeId || undefined,
        rating: typeof rating === 'number' && rating >= 4 ? rating : undefined,
        reviewCount: generated.google?.reviewCount,
        primaryCategory: generated.google?.primaryCategory,
      }
    : undefined

  return {
    niche: 'cleaning',
    business: {
      name: generated.business.name.trim(),
      city,
      state: stateCode(generated.business.state),
      phone: generated.business.phone.trim(),
      email: generated.business.email?.includes('@') ? generated.business.email : undefined,
      website: generated.business.website?.startsWith('http') ? generated.business.website : undefined,
    },
    offer: {
      shortText: generated.offerText?.trim() || 'Request a free quote',
    },
    branding: {
      primaryColor: validateHexColor(colors.primary) || '#0EA5E9',
      accentColor: validateHexColor(colors.accent) || '#10B981',
    },
    services: services.length ? services : [{ name: profile.primaryCategory.replace(/-/g, ' '), description: '' }],
    areasServed: areas.length ? areas.slice(0, 15) : ['Local area', 'Nearby communities'],
    hours: generated.hours || generated.google?.hours || undefined,
    sampleReviews: generated.reviews.map((review) => ({
      ...review,
      kind: 'genuine' as const,
      source: review.source,
    })),
    heroHeadline: generated.heroHeadline.trim(),
    heroSubheadline: generated.heroSubheadline.trim(),
    aboutStory: normalizeAbout(generated.aboutParagraphs),
    cleaningProfile: profile,
    googleBusinessProfile,
  }
}
