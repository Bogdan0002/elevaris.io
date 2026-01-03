import OpenAI from 'openai'

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
}

export interface StructuredCompanyData {
  business: {
    name: string
    city: string
    state: string
    phone: string
  }
  offer: {
    shortText: string
  }
  branding: {
    primaryColor: string // Hex color
    accentColor: string // Hex color
  }
  services: Array<{
    name: string
    description: string // 1-2 sentence description
  }> // EXACTLY 3-6 services
  areasServed: string[] // 5-15 areas
  hours?: string
  sampleReviews?: Array<{
    name: string
    text: string
    stars: number
  }> // 3-5 reviews
}

/**
 * Generate structured company data from free-form description
 * Uses strict rules and constraints
 */
export async function generateFromDescription(
  input: CompanyDescription
): Promise<StructuredCompanyData> {
  const client = getOpenAIClient()

  const prompt = `You are a professional content generator for local cleaning business websites. Extract and generate structured data from the following company description.

COMPANY DESCRIPTION:
${input.description}

STRICT REQUIREMENTS:
1. Services: Generate EXACTLY 3-6 services. Each service MUST have:
   - name: Short, clear service name (e.g., "Residential Deep Cleaning")
   - description: 1-2 sentences explaining what the service includes (be specific and professional)

2. Areas Served: Generate 5-15 specific areas/cities/neighborhoods. Include the main city and nearby locations.

3. Business Info: Extract:
   - name: Company/business name
   - city: Primary city (if mentioned)
   - state: State abbreviation (2 letters, e.g., "CA", "NY")
   - phone: Phone number in format like "+1 555-123-4567" or "(555) 123-4567"

4. Offer: Create a compelling, specific offer (e.g., "First-time customers get 20% off!" or "Book 3 cleanings, get 1 free")

5. Branding Colors: Choose professional, complementary colors suitable for cleaning industry:
   - primaryColor: Hex code (e.g., "#00A8E8" for blue, "#00C896" for teal, "#FF6A55" for orange)
   - accentColor: Hex code (complementary to primary)

6. Hours: Business hours if mentioned, otherwise generate realistic hours (e.g., "Mon-Fri: 8am-6pm, Sat: 9am-5pm")

7. Sample Reviews: Generate 3-5 authentic-sounding reviews with:
   - name: Realistic first and last name
   - text: 2-3 sentences mentioning specific services or benefits
   - stars: 5 (all positive)

OUTPUT FORMAT (JSON only, no markdown):
{
  "business": {
    "name": "string",
    "city": "string",
    "state": "string (2 letters)",
    "phone": "string"
  },
  "offer": {
    "shortText": "string"
  },
  "branding": {
    "primaryColor": "#hexcode",
    "accentColor": "#hexcode"
  },
  "services": [
    {
      "name": "string",
      "description": "string (1-2 sentences)"
    }
  ],
  "areasServed": ["string", "string", ...],
  "hours": "string (optional)",
  "sampleReviews": [
    {
      "name": "string",
      "text": "string (2-3 sentences)",
      "stars": 5
    }
  ]
}

CRITICAL CONSTRAINTS:
- services array MUST have EXACTLY 3-6 items, each with name AND description
- areasServed MUST have 5-15 items
- All colors MUST be valid hex codes (6 characters, starting with #)
- Phone MUST be in a standard format
- State MUST be 2 uppercase letters
- If information is missing, use realistic defaults based on the description

Return ONLY valid JSON, no markdown, no code blocks, no explanations.`

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional content generator. Always return valid JSON only, no markdown formatting. Strictly follow all constraints.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No content generated from OpenAI')
    }

    const generated = JSON.parse(content) as Partial<StructuredCompanyData>

    // Validate and enforce strict rules
    const result: StructuredCompanyData = {
      business: {
        name: generated.business?.name || 'Cleaning Services',
        city: generated.business?.city || 'Los Angeles',
        state: (generated.business?.state || 'CA').toUpperCase().slice(0, 2),
        phone: generated.business?.phone || '+1 555-123-4567',
      },
      offer: generated.offer || {
        shortText: 'Professional cleaning services you can trust',
      },
      branding: {
        primaryColor: generated.branding?.primaryColor || '#00A8E8',
        accentColor: generated.branding?.accentColor || '#00C896',
      },
      services: generated.services || [],
      areasServed: generated.areasServed || [],
      hours: generated.hours,
      sampleReviews: generated.sampleReviews || [],
    }

    // Enforce service constraints: MUST have 3-6 services with descriptions
    if (result.services.length < 3) {
      // Add default services if not enough
      const defaultServices = [
        { name: 'Residential Cleaning', description: 'Thorough cleaning of homes and apartments, including all rooms, bathrooms, and common areas.' },
        { name: 'Commercial Cleaning', description: 'Professional office and commercial space cleaning to maintain a clean work environment.' },
        { name: 'Deep Cleaning', description: 'Intensive cleaning service for move-ins, move-outs, or seasonal deep cleans.' },
        { name: 'Move-in/Move-out Cleaning', description: 'Comprehensive cleaning service for homes before move-in or after move-out.' },
        { name: 'Window Cleaning', description: 'Professional interior and exterior window cleaning for crystal-clear views.' },
        { name: 'Carpet Cleaning', description: 'Deep carpet and upholstery cleaning using professional-grade equipment.' },
      ]
      result.services = [...result.services, ...defaultServices].slice(0, 6)
    } else if (result.services.length > 6) {
      result.services = result.services.slice(0, 6)
    }

    // Ensure all services have descriptions
    result.services = result.services.map(service => ({
      name: service.name || 'Cleaning Service',
      description: service.description || 'Professional cleaning service tailored to your needs.',
    }))

    // Enforce areas constraints: 5-15 areas
    if (result.areasServed.length < 5) {
      const city = result.business.city
      result.areasServed = [
        ...result.areasServed,
        city,
        `${city} Metro`,
        'Surrounding Areas',
        'Downtown',
        'Suburbs',
      ].slice(0, 15)
    } else if (result.areasServed.length > 15) {
      result.areasServed = result.areasServed.slice(0, 15)
    }

    // Ensure reviews (3-5)
    if (!result.sampleReviews || result.sampleReviews.length < 3) {
      const businessName = result.business.name
      const city = result.business.city
      result.sampleReviews = [
        {
          name: 'Sarah Johnson',
          text: `Excellent service from ${businessName}! They did a thorough job cleaning our office. Very professional and punctual. Highly recommend!`,
          stars: 5,
        },
        {
          name: 'Michael Chen',
          text: `Great experience from start to finish. The team was friendly and the results exceeded our expectations. Our home has never looked cleaner!`,
          stars: 5,
        },
        {
          name: 'Emily Rodriguez',
          text: `${businessName} is now our go-to cleaning service in ${city}. They're reliable, thorough, and always leave our space spotless.`,
          stars: 5,
        },
        {
          name: 'David Martinez',
          text: `Outstanding deep cleaning service! They paid attention to every detail and used eco-friendly products. Couldn't be happier!`,
          stars: 5,
        },
        {
          name: 'Jennifer Lee',
          text: `Professional, efficient, and affordable. ${businessName} transformed our workspace. Will definitely use them again!`,
          stars: 5,
        },
      ].slice(0, 5)
    } else if (result.sampleReviews.length > 5) {
      result.sampleReviews = result.sampleReviews.slice(0, 5)
    }

    // Validate colors (must be hex)
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    if (!hexRegex.test(result.branding.primaryColor)) {
      result.branding.primaryColor = '#00A8E8'
    }
    if (!hexRegex.test(result.branding.accentColor)) {
      result.branding.accentColor = '#00C896'
    }

    return result
  } catch (error) {
    console.error('Error generating content from description:', error)
    throw new Error(
      `Failed to generate content: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

