/**
 * Niche-specific default promotional offers
 * Used when AI doesn't find a specific offer in the input
 */

import type { BusinessNiche } from './types'

export interface DefaultOffer {
  shortText: string
  badge: string
}

export const NICHE_DEFAULT_OFFERS: Record<BusinessNiche, DefaultOffer[]> = {
  'cleaning': [
    { shortText: '20% Off Your First Cleaning', badge: 'NEW CUSTOMER' },
    { shortText: 'Free Estimate + $50 Off First Service', badge: 'LIMITED TIME' },
    { shortText: 'Book Today, Save 25% on Deep Cleaning', badge: 'SPECIAL OFFER' },
  ],
  'landscaping': [
    { shortText: 'Free Landscape Design Consultation', badge: 'NEW CUSTOMER' },
    { shortText: '15% Off First Month of Lawn Care', badge: 'LIMITED TIME' },
    { shortText: '$100 Off Any Project Over $500', badge: 'SPECIAL OFFER' },
  ],
  'roofing': [
    { shortText: 'Free Roof Inspection + $500 Off Replacement', badge: 'LIMITED TIME' },
    { shortText: '10% Off Any Roofing Service', badge: 'NEW CUSTOMER' },
    { shortText: 'Zero Down Financing Available', badge: 'SPECIAL OFFER' },
  ],
  'plumbing': [
    { shortText: '$50 Off Any Plumbing Service', badge: 'NEW CUSTOMER' },
    { shortText: 'Free Drain Inspection with Any Service', badge: 'LIMITED TIME' },
    { shortText: '24/7 Emergency Service - No Extra Charge', badge: 'SPECIAL' },
  ],
  'hvac': [
    { shortText: 'Free AC Tune-Up with New System Install', badge: 'LIMITED TIME' },
    { shortText: '$75 Off Any HVAC Repair', badge: 'NEW CUSTOMER' },
    { shortText: '0% Financing on New Systems', badge: 'SPECIAL OFFER' },
  ],
  'auto-detailing': [
    { shortText: '20% Off Full Detail Package', badge: 'NEW CUSTOMER' },
    { shortText: 'Free Interior Cleaning with Exterior Detail', badge: 'LIMITED TIME' },
    { shortText: '$50 Off Ceramic Coating', badge: 'SPECIAL OFFER' },
  ],
  'painting': [
    { shortText: 'Free Color Consultation + 15% Off', badge: 'NEW CUSTOMER' },
    { shortText: '10% Off Whole House Painting', badge: 'LIMITED TIME' },
    { shortText: 'Free Touch-Up for 1 Year', badge: 'SPECIAL OFFER' },
  ],
  'moving': [
    { shortText: '2 Hours Free Labor on Any Move', badge: 'NEW CUSTOMER' },
    { shortText: '15% Off Long Distance Moves', badge: 'LIMITED TIME' },
    { shortText: 'Free Packing Supplies with Full Service', badge: 'SPECIAL' },
  ],
  'pest-control': [
    { shortText: 'Free Inspection + 20% Off First Treatment', badge: 'NEW CUSTOMER' },
    { shortText: '$50 Off Quarterly Pest Control Plan', badge: 'LIMITED TIME' },
    { shortText: 'Satisfaction Guaranteed or Free Re-Treatment', badge: 'SPECIAL' },
  ],
  'pool-service': [
    { shortText: 'First Month Free with Annual Contract', badge: 'NEW CUSTOMER' },
    { shortText: '20% Off Pool Opening Service', badge: 'LIMITED TIME' },
    { shortText: 'Free Chemical Balance Check', badge: 'SPECIAL OFFER' },
  ],
  'electrical': [
    { shortText: '$50 Off Any Electrical Service', badge: 'NEW CUSTOMER' },
    { shortText: 'Free Home Safety Inspection', badge: 'LIMITED TIME' },
    { shortText: '10% Off Panel Upgrades', badge: 'SPECIAL OFFER' },
  ],
  'handyman': [
    { shortText: '15% Off First Service Call', badge: 'NEW CUSTOMER' },
    { shortText: '$25 Off Any Job Over $150', badge: 'LIMITED TIME' },
    { shortText: 'Free Estimate - No Trip Charge', badge: 'SPECIAL' },
  ],
  'pressure-washing': [
    { shortText: '20% Off First Pressure Washing Service', badge: 'NEW CUSTOMER' },
    { shortText: 'Free Driveway Cleaning with House Wash', badge: 'LIMITED TIME' },
    { shortText: 'Bundle & Save 25%', badge: 'SPECIAL OFFER' },
  ],
  'window-cleaning': [
    { shortText: '20% Off Your First Window Cleaning', badge: 'NEW CUSTOMER' },
    { shortText: 'Free Screen Cleaning with Service', badge: 'LIMITED TIME' },
    { shortText: 'Interior + Exterior Package - Save 15%', badge: 'SPECIAL' },
  ],
  'carpet-cleaning': [
    { shortText: '3 Rooms for $99 - Limited Time', badge: 'SPECIAL OFFER' },
    { shortText: '20% Off Whole House Carpet Cleaning', badge: 'NEW CUSTOMER' },
    { shortText: 'Free Stain Treatment with Any Service', badge: 'LIMITED TIME' },
  ],
  'junk-removal': [
    { shortText: '$25 Off Any Junk Removal', badge: 'NEW CUSTOMER' },
    { shortText: '10% Off Full Truck Load', badge: 'LIMITED TIME' },
    { shortText: 'Free On-Site Estimate', badge: 'SPECIAL' },
  ],
  'locksmith': [
    { shortText: '15% Off Lock Installation', badge: 'NEW CUSTOMER' },
    { shortText: '$20 Off Emergency Lockout Service', badge: 'LIMITED TIME' },
    { shortText: 'Free Security Assessment', badge: 'SPECIAL OFFER' },
  ],
  'garage-door': [
    { shortText: 'Free Service Call with Any Repair', badge: 'NEW CUSTOMER' },
    { shortText: '$100 Off New Garage Door Installation', badge: 'LIMITED TIME' },
    { shortText: '10% Off Spring Replacement', badge: 'SPECIAL OFFER' },
  ],
  'concrete': [
    { shortText: 'Free Estimate + 10% Off First Project', badge: 'NEW CUSTOMER' },
    { shortText: '$200 Off Driveway Installation', badge: 'LIMITED TIME' },
    { shortText: 'Free Sealing with Any Concrete Work', badge: 'SPECIAL' },
  ],
  'fencing': [
    { shortText: 'Free Estimate + 15% Off Installation', badge: 'NEW CUSTOMER' },
    { shortText: '$100 Off Any Fence Over 100ft', badge: 'LIMITED TIME' },
    { shortText: 'Free Gate with Full Fence Install', badge: 'SPECIAL OFFER' },
  ],
  'tree-service': [
    { shortText: 'Free Stump Grinding with Tree Removal', badge: 'NEW CUSTOMER' },
    { shortText: '15% Off Tree Trimming', badge: 'LIMITED TIME' },
    { shortText: 'Free Hazard Assessment', badge: 'SPECIAL' },
  ],
  'gutter-cleaning': [
    { shortText: '20% Off First Gutter Cleaning', badge: 'NEW CUSTOMER' },
    { shortText: 'Free Downspout Flush with Service', badge: 'LIMITED TIME' },
    { shortText: '$50 Off Gutter Guard Installation', badge: 'SPECIAL OFFER' },
  ],
  'solar': [
    { shortText: 'Free Solar Assessment + $500 Off Install', badge: 'LIMITED TIME' },
    { shortText: '$0 Down - Start Saving Today', badge: 'SPECIAL OFFER' },
    { shortText: '26% Federal Tax Credit Available', badge: 'SAVE BIG' },
  ],
  'flooring': [
    { shortText: 'Free In-Home Estimate + 10% Off', badge: 'NEW CUSTOMER' },
    { shortText: '$200 Off Any Flooring Over 500 sq ft', badge: 'LIMITED TIME' },
    { shortText: 'Free Furniture Moving with Install', badge: 'SPECIAL' },
  ],
  'general-contractor': [
    { shortText: 'Free Design Consultation', badge: 'NEW CUSTOMER' },
    { shortText: '10% Off Kitchen Remodels', badge: 'LIMITED TIME' },
    { shortText: 'Financing Available - 0% for 12 Months', badge: 'SPECIAL' },
  ],
}

/**
 * Get a random default offer for a niche
 */
export function getDefaultOffer(niche: BusinessNiche): DefaultOffer {
  const offers = NICHE_DEFAULT_OFFERS[niche] || NICHE_DEFAULT_OFFERS['cleaning']
  return offers[Math.floor(Math.random() * offers.length)]
}

/**
 * Check if an offer text looks like a real promotional offer
 */
export function isValidOffer(offerText: string): boolean {
  if (!offerText || offerText.trim().length < 10) return false
  
  // Check for common promotional keywords
  const promoKeywords = [
    '%', 'off', 'free', 'save', 'discount', 'special', 
    '$', 'deal', 'offer', 'limited', 'first', 'new customer'
  ]
  
  const lowerText = offerText.toLowerCase()
  return promoKeywords.some(keyword => lowerText.includes(keyword))
}


