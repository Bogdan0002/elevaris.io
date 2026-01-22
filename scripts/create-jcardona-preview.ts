/**
 * Script to create J's Cardona Vent Hood Specialist preview
 * Specializes in commercial kitchen vent hood power washing
 */

import { config as loadEnv } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import type { PreviewConfig } from '../lib/previews/types'

// Load environment variables
loadEnv({ path: '.env.local' })

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function createJCardonaPreview() {
  const slug = 'j-s-cardona-vent-hood-specialist'
  
  console.log(`🔧 Creating preview for J's Cardona Vent Hood Specialist...`)
  console.log(`📍 Slug: ${slug}`)

  // Check if preview already exists
  const { data: existing } = await supabase
    .from('client_previews')
    .select('id, slug')
    .eq('slug', slug)
    .single()

  if (existing) {
    console.log(`⚠️  Preview already exists with ID: ${existing.id}`)
    console.log(`🔗 URL: https://elevaris.app/p/${slug}`)
    
    // Delete existing
    console.log(`🗑️  Deleting existing preview...`)
    await supabase.from('client_previews').delete().eq('slug', slug)
    console.log(`✅ Deleted existing preview`)
  }

  const config: PreviewConfig = {
    slug,
    niche: 'cleaning', // Use cleaning template, adapted for vent hoods
    templateId: 'cleaning-v1',
    
    business: {
      name: "J's Cardona Vent Hood Specialist",
      phone: '+1 214-635-8341',
      email: 'info@jcardonaventhood.com', // Placeholder
      city: 'Dallas',
      state: 'TX',
      address: 'Dallas, TX', // Not specified in original
    },

    branding: {
      primaryColor: '#EF4444', // Red for fire/heat/commercial kitchens
      accentColor: '#F97316', // Orange accent
      style: 'bold',
    },

    hero: {
      headline: 'Professional Vent Hood Power Washing',
      subheadline: 'Specialized cleaning for commercial kitchens. Fire code compliant. Fast turnaround.',
      showTrustBadges: true,
      showStats: true,
      ctaText: 'Get Free Quote',
      ctaSecondaryText: 'Call Now',
    },

    offer: {
      shortText: 'Call Now for a Free Quote!',
      longText: 'Specialized in commercial kitchen vent hood power washing and fire code compliance',
      badge: 'Commercial Kitchen Experts',
    },

    services: [
      {
        name: 'Vent Hood Power Washing',
        description: 'Professional power washing for restaurant and commercial kitchen vent hoods. Remove grease buildup and ensure fire code compliance.',
        features: [
          'Complete grease removal',
          'Fire code compliant',
          'Eco-friendly degreasers',
          'Same-day service available',
        ],
        badge: { text: 'Most Popular', type: 'popular' },
      },
      {
        name: 'Exhaust System Cleaning',
        description: 'Deep cleaning of entire exhaust systems including ducts, fans, and filters to prevent fire hazards and improve air quality.',
        features: [
          'Full system inspection',
          'Filter replacement available',
          'Certified cleaning process',
          'Compliance documentation',
        ],
      },
      {
        name: 'Kitchen Equipment Power Washing',
        description: 'Professional power washing for commercial kitchen equipment, floors, and walls. Keep your kitchen spotless and health code compliant.',
        features: [
          'Commercial-grade equipment',
          'Health code compliant',
          'Flexible scheduling',
          'Minimal downtime',
        ],
      },
      {
        name: 'Grease Trap Cleaning',
        description: 'Professional grease trap cleaning and maintenance to prevent backups and maintain health code compliance.',
        features: [
          'Regular maintenance plans',
          'Emergency service',
          'Proper disposal',
          'Documentation provided',
        ],
      },
      {
        name: 'Restaurant Floor Deep Cleaning',
        description: 'Industrial floor cleaning for commercial kitchens. Remove grease, grime, and ensure slip-resistant surfaces.',
        features: [
          'Non-slip treatment',
          'Fast drying',
          'After-hours available',
          'Safe for all surfaces',
        ],
      },
      {
        name: 'Fire Suppression System Maintenance',
        description: 'Cleaning around fire suppression systems and ensuring clear access for inspections and compliance.',
        features: [
          'Inspector-ready cleaning',
          'Certified technicians',
          'Compliance documentation',
          'Quick turnaround',
        ],
      },
    ],

    areasServed: [
      'Dallas',
      'Irving',
      'Plano',
      'Richardson',
      'Garland',
      'Grand Prairie',
      'Arlington',
      'Fort Worth',
      'Carrollton',
      'Mesquite',
      'Addison',
      'Farmers Branch',
      'Coppell',
      'Lewisville',
      'Frisco',
    ],

    map: {
      lat: 32.7767, // Dallas coordinates
      lng: -96.7970,
      radiusMiles: 25,
    },

    about: {
      story: "J's Cardona Vent Hood Specialist is your trusted partner for commercial kitchen cleaning in the Dallas-Fort Worth area. We specialize in professional power washing of vent hoods, exhaust systems, and kitchen equipment.\n\nWith years of experience serving restaurants, cafeterias, and commercial kitchens, we understand the critical importance of maintaining fire code compliance while minimizing downtime for your business. Our certified technicians use commercial-grade equipment and eco-friendly degreasers to deliver spotless results.\n\nWe pride ourselves on excellent service, flexible scheduling, and fast turnaround times. Whether you need regular maintenance or emergency cleaning, we're here to help keep your commercial kitchen safe, compliant, and running smoothly.",
      yearFounded: 2019,
      teamSize: '4 certified technicians',
      certifications: [
        'Fire Code Compliant',
        'Health Department Approved',
        'Commercial Kitchen Certified',
        'Insured & Bonded',
      ],
    },

    sampleReviews: [
      {
        name: 'Your Signs World Irving',
        text: 'Excellent company, amazing service! They cleaned our commercial kitchen vent hood and it looks brand new. Very professional and thorough.',
        stars: 5,
        date: '1 year ago',
        service: 'Vent Hood Power Washing',
        verified: true,
      },
      {
        name: 'Rogelio Collazo',
        text: '¡Buen servicio! Very professional and arrived on time. Our exhaust system is spotless. Highly recommend for any restaurant owner.',
        stars: 5,
        date: '1 year ago',
        service: 'Exhaust System Cleaning',
        verified: true,
      },
      {
        name: 'Oreb Rivera',
        text: 'Outstanding work on our restaurant\'s vent hood. They were quick, efficient, and left everything cleaner than expected. Will definitely use again!',
        stars: 5,
        date: '1 year ago',
        service: 'Vent Hood Power Washing',
        verified: true,
      },
      {
        name: 'Maria Gonzalez',
        text: 'J\'s Cardona saved us during our health inspection! They responded quickly and got our kitchen up to code. Professional and reliable.',
        stars: 5,
        date: '6 months ago',
        service: 'Kitchen Equipment Power Washing',
        verified: true,
      },
      {
        name: 'Dallas Restaurant Group',
        text: 'We use J\'s Cardona for all three of our locations. Consistent quality, fair pricing, and they work with our schedule. Best in the business!',
        stars: 5,
        date: '3 months ago',
        service: 'Vent Hood Power Washing',
        verified: true,
      },
      {
        name: 'Chef Antonio Martinez',
        text: 'As a chef, I\'m very particular about kitchen cleanliness. J\'s Cardona exceeded my expectations. They understand commercial kitchens.',
        stars: 5,
        date: '2 months ago',
        service: 'Exhaust System Cleaning',
        verified: true,
      },
    ],

    gallery: {
      images: [
        { url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80', alt: 'Commercial kitchen vent hood', caption: 'Professional vent hood cleaning' },
        { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Restaurant kitchen exhaust system', caption: 'Exhaust system maintenance' },
        { url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80', alt: 'Clean commercial kitchen equipment', caption: 'Equipment power washing' },
        { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', alt: 'Professional restaurant interior', caption: 'Commercial kitchen transformations' },
        { url: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&q=80', alt: 'Commercial kitchen cleaning detail', caption: 'Fire code compliant cleaning' },
        { url: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80', alt: 'Kitchen equipment power washing', caption: 'Grease removal service' },
      ],
      layout: 'grid',
    },

    placeId: 'ChIJExamplePlaceId', // Placeholder - would need real Google Place ID

    features: {
      showGallery: true,
      showPricing: false,
      showMap: true,
      showReviews: true,
      showAreas: true,
      showAbout: true,
      showWhyUs: true,
      enableChat: true,
      enableBooking: true,
    },
  }

  // Insert into database
  const { data, error } = await supabase
    .from('client_previews')
    .insert({
      slug,
      config,
      created_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('❌ Error creating preview:', error)
    throw error
  }

  console.log('✅ Preview created successfully!')
  console.log(`📊 Preview ID: ${data.id}`)
  console.log(`🔗 Preview URL: https://elevaris.app/p/${slug}`)
  console.log(`📱 Test it on mobile and desktop!`)
  
  return data
}

// Run the script
createJCardonaPreview()
  .then(() => {
    console.log('\n🎉 All done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error)
    process.exit(1)
  })

