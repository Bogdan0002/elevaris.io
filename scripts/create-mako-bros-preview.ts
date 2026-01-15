/**
 * Create Mako Bros Window Cleaning Preview
 * Run: tsx scripts/create-mako-bros-preview.ts
 */

import { createPreview } from '../lib/previews/repo'
import type { CleaningPreviewConfig } from '../lib/previews/types'

const makoBrosConfig: CleaningPreviewConfig = {
  slug: 'mako-bros-window-cleaning',
  niche: 'cleaning',
  templateId: 'cleaning-v1',
  
  business: {
    name: 'Mako Bros Window Cleaning',
    city: 'Orlando',
    state: 'FL',
    phone: '+1 407-883-2877',
  },
  
  // Google Place ID (you'll need to get the actual one from Google)
  placeId: 'ChIJMako123456789',
  
  offer: {
    shortText: 'Crystal Clear. Shark Sharp. Locally trusted, professionally driven.',
  },
  
  branding: {
    primaryColor: '#1B8CA8', // Teal blue from shark logo
    accentColor: '#0D3B52', // Navy blue from shark logo
  },
  
  services: [
    'Residential Window Cleaning',
    'Pressure Washing',
    'Soft Washing',
    'Exterior Window Cleaning',
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

async function main() {
  try {
    console.log('Creating Mako Bros Window Cleaning preview...')
    const preview = await createPreview(makoBrosConfig)
    console.log('✅ Preview created successfully!')
    console.log(`   Slug: ${preview.slug}`)
    console.log(`   URL: https://elevaris.app/p/${preview.slug}`)
    console.log(`   ID: ${preview.id}`)
  } catch (error) {
    console.error('❌ Error creating preview:', error)
    process.exit(1)
  }
}

main()


