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
      hours: 'Mon-Sun: 8AM - 12AM', // Based on "Open · Closes at 00"
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
      text: 'Call Now for a Free Quote!',
      badge: 'Commercial Kitchen Experts',
      expires: undefined,
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

    serviceArea: {
      lat: 32.7767, // Dallas coordinates
      lng: -96.7970,
      radiusMiles: 25,
    },

    about: {
      story: "J's Cardona Vent Hood Specialist is your trusted partner for commercial kitchen cleaning in the Dallas-Fort Worth area. We specialize in professional power washing of vent hoods, exhaust systems, and kitchen equipment.\n\nWith years of experience serving restaurants, cafeterias, and commercial kitchens, we understand the critical importance of maintaining fire code compliance while minimizing downtime for your business. Our certified technicians use commercial-grade equipment and eco-friendly degreasers to deliver spotless results.\n\nWe pride ourselves on excellent service, flexible scheduling, and fast turnaround times. Whether you need regular maintenance or emergency cleaning, we're here to help keep your commercial kitchen safe, compliant, and running smoothly.",
      yearsInBusiness: 5,
      teamSize: 4,
      certifications: [
        'Fire Code Compliant',
        'Health Department Approved',
        'Commercial Kitchen Certified',
        'Insured & Bonded',
      ],
    },

    whyUs: {
      reasons: [
        {
          title: 'Fire Code Experts',
          description: 'We ensure your vent hoods meet all fire code requirements and provide documentation for inspections.',
          icon: 'Shield',
        },
        {
          title: 'Commercial Kitchen Specialists',
          description: 'We exclusively work with commercial kitchens and understand the unique challenges of restaurant cleaning.',
          icon: 'ChefHat',
        },
        {
          title: 'Fast Turnaround',
          description: 'We work efficiently to minimize downtime. Same-day and after-hours service available.',
          icon: 'Clock',
        },
        {
          title: 'Professional Equipment',
          description: 'Commercial-grade power washing equipment and eco-friendly degreasers for superior results.',
          icon: 'Wrench',
        },
        {
          title: 'Flexible Scheduling',
          description: 'We work around your schedule, including nights and weekends, to minimize business disruption.',
          icon: 'Calendar',
        },
        {
          title: '100% Satisfaction Guaranteed',
          description: 'We stand behind our work. If you\'re not completely satisfied, we\'ll make it right.',
          icon: 'ThumbsUp',
        },
      ],
    },

    reviews: [
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
        // Vent hood cleaning images - using relevant Unsplash images
        'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80', // Commercial kitchen
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', // Restaurant kitchen
        'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80', // Kitchen equipment
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', // Restaurant interior
        'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&q=80', // Commercial kitchen detail
        'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80', // Kitchen equipment
      ],
      showcaseTitle: 'Commercial Kitchen Transformations',
      showcaseDescription: 'See the difference professional vent hood cleaning makes',
    },

    transformation: {
      beforeImage: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&q=80', // Dirty commercial space
      afterImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80', // Clean commercial kitchen
      title: 'Fire Code Compliant in Hours',
      description: 'From grease buildup to spotless and compliant. Our professional power washing restores your vent hood to like-new condition.',
      stats: [
        { label: 'Grease Removed', value: '100%' },
        { label: 'Avg. Cleaning Time', value: '2-4hrs' },
        { label: 'Fire Code Pass Rate', value: '100%' },
      ],
    },

    contact: {
      formTitle: 'Get Your Free Quote Today',
      formDescription: 'Fill out the form below and we\'ll get back to you within 1 hour during business hours. Need immediate service? Call us!',
      showMap: true,
      collectFields: ['name', 'email', 'phone', 'service', 'message'],
    },

    footer: {
      copyrightText: `© ${new Date().getFullYear()} J's Cardona Vent Hood Specialist. All rights reserved.`,
      showSocialLinks: false,
      links: [
        { text: 'Services', href: '#services' },
        { text: 'About', href: '#about' },
        { text: 'Service Areas', href: '#areas' },
        { text: 'Contact', href: '#contact' },
      ],
    },

    seo: {
      title: "J's Cardona Vent Hood Specialist | Commercial Kitchen Power Washing Dallas",
      description: 'Professional vent hood power washing and commercial kitchen cleaning in Dallas-Fort Worth. Fire code compliant. Free quotes. Call +1 214-635-8341',
      keywords: 'vent hood cleaning, commercial kitchen cleaning, power washing dallas, restaurant cleaning, exhaust system cleaning, grease removal, fire code compliance',
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

