import OpenAI from 'openai'

// Initialize OpenAI client (will throw if key is missing when used)
function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY environment variable. Add it to Vercel environment variables.')
  }
  
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

export interface ClientInfo {
  businessName: string
  city: string
  state: string
  phone: string
  placeId: string
  niche?: string
  additionalInfo?: string // Any extra context about the business
}

export interface GeneratedContent {
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
    primaryColor: string
    accentColor: string
  }
  services: string[]
  areasServed: string[]
  hours?: string
  sampleReviews?: {
    name: string
    text: string
    stars: number
  }[]
}

/**
 * Generate preview content using OpenAI based on client information
 */
export async function generatePreviewContent(
  clientInfo: ClientInfo
): Promise<GeneratedContent> {
  const prompt = `You are a professional content generator for local cleaning business websites. Generate compelling, professional content based on the following client information:

Business Name: ${clientInfo.businessName}
Location: ${clientInfo.city}, ${clientInfo.state}
Phone: ${clientInfo.phone}
${clientInfo.additionalInfo ? `Additional Info: ${clientInfo.additionalInfo}` : ''}

Generate content in the following JSON format:
{
  "offer": {
    "shortText": "A compelling offer (e.g., 'First-time customers get 20% off!' or 'Book now and get free deep cleaning')"
  },
  "branding": {
    "primaryColor": "#FF6A55",
    "accentColor": "#7B63FF"
  },
  "services": [
    "List 6-8 specific cleaning services relevant to this business",
    "Be specific (e.g., 'Residential Deep Cleaning' not just 'Cleaning')"
  ],
  "areasServed": [
    "List 5-10 areas/cities/neighborhoods they serve",
    "Include ${clientInfo.city} and nearby areas"
  ],
  "hours": "Business hours in format like 'Mon-Fri: 8am-6pm, Sat: 9am-5pm' or '24/7 Available'",
  "sampleReviews": [
    {
      "name": "Realistic first name and last name",
      "text": "Authentic-sounding review mentioning specific services or benefits (2-3 sentences)",
      "stars": 5
    }
  ]
}

Requirements:
- Services should be specific and professional (6-8 items)
- Areas should include the city and nearby locations (5-10 items)
- Offer should be compelling and specific
- Reviews should sound authentic and mention the business name or location
- Colors should be professional (suggest complementary colors if not provided)
- Hours should be realistic for a cleaning business

Return ONLY valid JSON, no markdown, no code blocks, no explanations.`

  try {
    const client = getOpenAIClient()
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini', // Using mini for cost efficiency, can upgrade to gpt-4 if needed
      messages: [
        {
          role: 'system',
          content:
            'You are a professional content generator for local business websites. Always return valid JSON only, no markdown formatting.',
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

    // Parse the JSON response
    const generated = JSON.parse(content) as Partial<GeneratedContent>

    // Merge with client info and ensure all required fields
    const result: GeneratedContent = {
      business: {
        name: clientInfo.businessName,
        city: clientInfo.city,
        state: clientInfo.state,
        phone: clientInfo.phone,
      },
      offer: generated.offer || {
        shortText: `Professional cleaning services in ${clientInfo.city}`,
      },
      branding: generated.branding || {
        primaryColor: '#FF6A55',
        accentColor: '#7B63FF',
      },
      services: generated.services || [
        'Residential Cleaning',
        'Commercial Cleaning',
        'Deep Cleaning',
        'Move-in/Move-out Cleaning',
      ],
      areasServed: generated.areasServed || [clientInfo.city],
      hours: generated.hours,
      sampleReviews: generated.sampleReviews || [],
    }

    // Validate and ensure minimums
    if (result.services.length < 4) {
      result.services = [
        ...result.services,
        'Post-Construction Cleaning',
        'Window Cleaning',
        'Carpet Cleaning',
        'Office Cleaning',
      ].slice(0, 8)
    }

    if (result.areasServed.length < 2) {
      result.areasServed = [
        ...result.areasServed,
        `${clientInfo.city} Metro`,
        'Surrounding Areas',
      ].slice(0, 10)
    }

    if (!result.sampleReviews || result.sampleReviews.length === 0) {
      result.sampleReviews = [
        {
          name: 'Sarah Johnson',
          text: `Excellent service from ${clientInfo.businessName}! They did a thorough job cleaning our office. Very professional and punctual.`,
          stars: 5,
        },
        {
          name: 'Michael Chen',
          text: `Great experience from start to finish. The team was friendly and the results exceeded our expectations. Highly recommend!`,
          stars: 5,
        },
        {
          name: 'Emily Rodriguez',
          text: `Our home has never looked cleaner. ${clientInfo.businessName} is now our go-to cleaning service in ${clientInfo.city}.`,
          stars: 5,
        },
      ]
    }

    return result
  } catch (error) {
    console.error('Error generating content with OpenAI:', error)
    throw new Error(
      `Failed to generate content: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

