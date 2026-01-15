import OpenAI from 'openai'
import type { BusinessNiche, ServiceItem } from '@/lib/previews/types'
import { NICHE_DISPLAY_NAMES, getDefaultServices, getColorPalettes } from '@/lib/previews/niche-defaults'
import { getDefaultOffer, isValidOffer } from '@/lib/previews/niche-offers'

// Initialize OpenAI client
function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY environment variable.')
  }
  
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

export interface CompanyDescription {
  description: string // Free text description of the company
  placeId?: string // Optional Google Place ID
  niche?: BusinessNiche // Optional niche hint
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
  }>
  // New fields for multi-niche
  heroHeadline?: string
  heroSubheadline?: string
  aboutStory?: string
  whyUsReasons?: Array<{
    title: string
    description: string
    highlight?: string
  }>
}

// Build the niche list for the prompt
const NICHE_LIST = Object.entries(NICHE_DISPLAY_NAMES)
  .map(([key, name]) => `"${key}" (${name})`)
  .join(', ')

/**
 * Generate structured company data from free-form description
 * Now supports multiple niches and generates more comprehensive content
 */
export async function generateFromDescription(
  input: CompanyDescription
): Promise<StructuredCompanyData> {
  const client = getOpenAIClient()

  const prompt = `You are a professional content generator for local service business websites across multiple industries. Extract and generate structured data from the following company description.

COMPANY DESCRIPTION:
${input.description}

${input.niche ? `HINT: This appears to be a ${NICHE_DISPLAY_NAMES[input.niche]} business.` : ''}

STEP 1: IDENTIFY THE NICHE
First, determine which industry/niche this business belongs to. Choose from:
${NICHE_LIST}

STEP 2: GENERATE COMPREHENSIVE CONTENT

1. **Business Info** - Extract:
   - name: Company/business name
   - city: Primary city
   - state: State abbreviation (2 letters)
   - phone: Phone number format "+1 555-123-4567"
   - email: Email if mentioned
   - website: Website if mentioned

2. **Offer** - Create a compelling promotional offer:
   - shortText: A REAL promotional offer that drives action. If no specific offer is mentioned in the description, generate one like:
     * "20% Off Your First Service"
     * "Free Estimate + 15% Off First Visit"
     * "$50 Off Your First Cleaning"
     * "Book Today, Save 25%"
     * "First-Time Customer Special: 20% Off"
   - The offer should be specific to the niche and include a discount percentage or dollar amount
   - badge: Optional badge text (e.g., "LIMITED TIME", "NEW CUSTOMER", "SPECIAL OFFER")

3. **Branding Colors** - Choose professional, industry-appropriate colors:
   - primaryColor: Hex code
   - accentColor: Hex code (complementary)

4. **Services** - Generate 4-6 detailed services with:
   - name: Clear service name
   - description: 2-3 sentences explaining the service, benefits, and what's included
   - features: Array of 3-4 key features/benefits

5. **Areas Served** - 8-15 specific areas/cities/neighborhoods

6. **Hours** - Business hours if mentioned, otherwise realistic hours

7. **Sample Reviews** - Generate 3-5 authentic reviews with:
   - name: Realistic first and last name
   - text: 2-4 sentences mentioning specific services, quality, and experience
   - stars: 5
   - service: Which service they used (optional)

8. **Hero Content**:
   - heroHeadline: Powerful, benefit-focused headline (4-6 words)
   - heroSubheadline: Compelling subheadline (15-25 words)

9. **About Story** - 2-3 paragraph company story focusing on:
   - How the business started
   - What makes them unique
   - Their commitment to customers

10. **Why Us Reasons** - 4-6 reasons to choose this business:
    - title: Short title (2-4 words)
    - description: 1-2 sentences
    - highlight: Key stat or badge (e.g., "24/7", "100%", "5-Star")

OUTPUT FORMAT (JSON only, no markdown):
{
  "niche": "string (from niche list)",
  "business": {
    "name": "string",
    "city": "string",
    "state": "string (2 letters)",
    "phone": "string",
    "email": "string (optional)",
    "website": "string (optional)"
  },
  "offer": {
    "shortText": "string",
    "badge": "string (optional)"
  },
  "branding": {
    "primaryColor": "#hexcode",
    "accentColor": "#hexcode"
  },
  "services": [
    {
      "name": "string",
      "description": "string (2-3 sentences)",
      "features": ["string", "string", "string"]
    }
  ],
  "areasServed": ["string", ...],
  "hours": "string (optional)",
  "sampleReviews": [
    {
      "name": "string",
      "text": "string (2-4 sentences)",
      "stars": 5,
      "service": "string (optional)"
    }
  ],
  "heroHeadline": "string",
  "heroSubheadline": "string",
  "aboutStory": "string (2-3 paragraphs)",
  "whyUsReasons": [
    {
      "title": "string",
      "description": "string",
      "highlight": "string (optional)"
    }
  ]
}

CRITICAL REQUIREMENTS:
- Niche MUST be one of the valid options listed
- Services MUST have 4-6 items with detailed descriptions
- Areas MUST have 8-15 items
- Colors MUST be valid hex codes
- Content should be professional, American-style, and conversion-focused
- Reviews should sound authentic and specific
- Hero content should be punchy and memorable

Return ONLY valid JSON, no markdown, no code blocks, no explanations.`

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional content generator for local service business websites. Generate compelling, conversion-focused content. Always return valid JSON only, no markdown formatting. Strictly follow all constraints.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 4000,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No content generated from OpenAI')
    }

    const generated = JSON.parse(content) as Partial<StructuredCompanyData>
    
    // Validate and set defaults
    const niche = validateNiche(generated.niche) || input.niche || 'cleaning'
    const defaultColors = getColorPalettes(niche)[0] || { primary: '#0EA5E9', accent: '#10B981' }
    const defaultServices = getDefaultServices(niche)

    // Get a default offer for the niche in case AI doesn't generate a good one
    const defaultOffer = getDefaultOffer(niche)
    
    // Check if AI-generated offer is valid (contains promotional language)
    const aiOffer = generated.offer?.shortText || ''
    const useDefaultOffer = !isValidOffer(aiOffer)
    
    const result: StructuredCompanyData = {
      niche,
      business: {
        name: generated.business?.name || 'Service Business',
        city: generated.business?.city || 'Los Angeles',
        state: (generated.business?.state || 'CA').toUpperCase().slice(0, 2),
        phone: generated.business?.phone || '+1 555-123-4567',
        email: generated.business?.email,
        website: generated.business?.website,
      },
      offer: {
        shortText: useDefaultOffer ? defaultOffer.shortText : aiOffer,
        badge: useDefaultOffer ? defaultOffer.badge : generated.offer?.badge,
      },
      branding: {
        primaryColor: validateHexColor(generated.branding?.primaryColor) || defaultColors.primary,
        accentColor: validateHexColor(generated.branding?.accentColor) || defaultColors.accent,
      },
      services: [],
      areasServed: [],
      hours: generated.hours,
      sampleReviews: [],
      heroHeadline: generated.heroHeadline,
      heroSubheadline: generated.heroSubheadline,
      aboutStory: generated.aboutStory,
      whyUsReasons: generated.whyUsReasons,
    }

    // Process services
    if (generated.services && generated.services.length >= 4) {
      result.services = generated.services.slice(0, 6).map(s => ({
        name: s.name || 'Service',
        description: s.description || 'Professional service tailored to your needs.',
        features: s.features || [],
      }))
    } else {
      result.services = defaultServices.slice(0, 6)
    }

    // Process areas
    if (generated.areasServed && generated.areasServed.length >= 5) {
      result.areasServed = generated.areasServed.slice(0, 15)
    } else {
      const city = result.business.city
      result.areasServed = [
        city,
        `${city} Metro`,
        'Downtown',
        'Suburbs',
        'Surrounding Areas',
        `Greater ${city}`,
        'Nearby Communities',
        'Local Neighborhoods',
      ].slice(0, 10)
    }

    // Process reviews
    if (generated.sampleReviews && generated.sampleReviews.length >= 3) {
      result.sampleReviews = generated.sampleReviews.slice(0, 5).map(r => ({
        name: r.name || 'Happy Customer',
        text: r.text || 'Excellent service! Highly recommend.',
        stars: r.stars || 5,
        service: r.service,
      }))
    } else {
      result.sampleReviews = generateDefaultReviews(result.business.name, result.business.city)
    }

    return result
  } catch (error) {
    console.error('Error generating content from description:', error)
    throw new Error(
      `Failed to generate content: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Validate that a niche string is valid
 */
function validateNiche(niche?: string): BusinessNiche | null {
  if (!niche) return null
  if (niche in NICHE_DISPLAY_NAMES) {
    return niche as BusinessNiche
  }
  return null
}

/**
 * Validate hex color
 */
function validateHexColor(color?: string): string | null {
  if (!color) return null
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  return hexRegex.test(color) ? color : null
}

/**
 * Generate default reviews
 */
function generateDefaultReviews(businessName: string, city: string) {
  return [
    {
      name: 'Sarah Johnson',
      text: `Excellent service from ${businessName}! They were professional, punctual, and did an amazing job. I couldn't be happier with the results. Highly recommend to anyone in ${city}!`,
      stars: 5,
    },
    {
      name: 'Michael Chen',
      text: `Great experience from start to finish. The team was friendly, knowledgeable, and the quality of work exceeded my expectations. Will definitely use them again!`,
      stars: 5,
    },
    {
      name: 'Emily Rodriguez',
      text: `${businessName} is now my go-to service provider in ${city}. They're reliable, thorough, and their attention to detail is impressive. Worth every penny!`,
      stars: 5,
    },
    {
      name: 'David Martinez',
      text: `Outstanding service! They were on time, professional, and left everything spotless. The pricing was fair and transparent. Couldn't ask for more!`,
      stars: 5,
    },
    {
      name: 'Jennifer Lee',
      text: `Professional, efficient, and affordable. ${businessName} transformed our space. The team was a pleasure to work with. Will definitely use them again!`,
      stars: 5,
    },
  ]
}

