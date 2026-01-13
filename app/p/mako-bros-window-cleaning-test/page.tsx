'use client'

/**
 * TEST PAGE for Mako Bros Window Cleaning
 * This is a static test version before creating the actual database preview
 * Access at: /p/mako-bros-window-cleaning-test
 */

import type { CleaningPreviewConfig } from '@/lib/previews/types'
import { applyDefaults } from '@/lib/previews/helpers'
import CleaningTemplate from '@/components/templates/cleaning/v1/Template'

const MAKO_BROS_CONFIG: Partial<CleaningPreviewConfig> = {
  slug: 'mako-bros-window-cleaning',
  niche: 'cleaning',
  templateId: 'cleaning-v1',
  
  business: {
    name: 'Mako Bros Window Cleaning',
    city: 'Orlando',
    state: 'FL',
    phone: '+1 407-883-2877',
  },
  
  placeId: 'ChIJMakoBrosPlaceID',
  
  offer: {
    shortText: 'Professional Window Cleaning - Get Your Sharky Shine Today!',
  },
  
  branding: {
    primaryColor: '#1B8CA8', // Teal blue from shark logo
    accentColor: '#0D3B52', // Navy blue from shark logo
  },
  
  services: [
    'Residential Window Cleaning',
    'Commercial Window Cleaning',
    'Pressure Washing',
    '2-Story Window Cleaning',
    'Hard Water Stain Removal',
    'Driveway & Sidewalk Cleaning',
    'Fence Cleaning',
    'Roof Drainage Cleaning',
  ],
  
  areasServed: [
    'Orlando',
    'Winter Park',
    'Maitland',
    'Altamonte Springs',
    'Lake Mary',
    'Apopka',
    'Oviedo',
    'Windermere',
    'Dr. Phillips',
    'College Park',
  ],
  
  hours: 'Mon-Sat: 8am-7pm',
  
  map: {
    lat: 28.5383, // Orlando, FL coordinates
    lng: -81.3792,
    radiusMiles: 25,
  },
  
  sampleReviews: [
    {
      name: 'Nina Ahumada',
      text: 'Did a great job with window cleaning and pressure washing house, sidewalk, driveway, and fences. Highly recommend based on quality work, attention to detail, and reasonable price.',
      stars: 5,
    },
    {
      name: 'Jaudon Marlette',
      text: 'Great job getting pollen and roof drainage off my 2nd story windows. They came out the same day I called and did a great job and great price. Highly recommend them to do your windows and pressure washing.',
      stars: 5,
    },
    {
      name: 'T P',
      text: 'They did great job. Took the time to get rid of some stubborn hard water stains and shined up the exterior windows. Highly recommend.',
      stars: 5,
    },
  ],
}

export default function MakoBrosTestPage() {
  // Apply defaults to ensure all required fields are populated
  const config = applyDefaults(MAKO_BROS_CONFIG)
  
  return <CleaningTemplate config={config} />
}

