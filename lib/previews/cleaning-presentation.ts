import type {
  CleaningAudience,
  CleaningCategory,
  CleaningEnvironment,
  CleaningProfile,
  PreviewConfig,
  ReviewItem,
  ServiceItem,
} from './types'

export const CLEANING_CATEGORIES: CleaningCategory[] = [
  'residential-cleaning',
  'commercial-janitorial',
  'exterior-cleaning',
  'window-cleaning',
  'carpet-upholstery',
  'vacation-rental',
  'post-construction',
  'mixed-specialized',
]

export type CleaningVariant =
  | 'residential'
  | 'commercial'
  | 'exterior'
  | 'window'
  | 'carpet'
  | 'vacation'
  | 'post-construction'
  | 'pressure-washing'
  | 'roof-gutter'
  | 'air-duct'
  | 'specialized'

export interface PresentationStat {
  label: string
  value: string
}

export interface PresentationBenefit {
  title: string
  description: string
  icon: string
}

export interface PresentationCard {
  label: string
  description: string
  icon: string
}

export interface CleaningPresentation {
  profile: CleaningProfile
  variant: CleaningVariant
  servicePhrase: string
  headline: string
  subheadline: string
  aboutHeadline: string
  aboutParagraphs: string[]
  bookingTitle: string
  bookingSubtitle: string
  bookingOptions: string[]
  dispatchLabel: string
  primaryCta: string
  secondaryCta: string
  benefits: PresentationBenefit[]
  transformations: PresentationCard[]
  gallery: PresentationCard[]
  whyUs: PresentationBenefit[]
  formPlaceholder: string
  contactHeadline: string
  areasIntro: string
  stats: PresentationStat[]
  showRating: boolean
  rating?: number
  reviewCount?: number
  reviews: ReviewItem[]
  reviewsAreGenuine: boolean
  sections: {
    about: boolean
    transformation: boolean
    gallery: boolean
    reviews: boolean
    areas: boolean
    whyUs: boolean
    chat: boolean
    booking: boolean
  }
}

const CATEGORY_DEFAULTS: Record<CleaningCategory, Pick<CleaningProfile, 'audience' | 'environment' | 'assetCollection' | 'serviceModel'>> = {
  'residential-cleaning': { audience: 'residential', environment: 'interior', assetCollection: 'residential-cleaning', serviceModel: 'recurring' },
  'commercial-janitorial': { audience: 'commercial', environment: 'interior', assetCollection: 'commercial-cleaning', serviceModel: 'recurring' },
  'exterior-cleaning': { audience: 'mixed', environment: 'exterior', assetCollection: 'exterior-cleaning', serviceModel: 'project' },
  'window-cleaning': { audience: 'mixed', environment: 'exterior', assetCollection: 'window-cleaning', serviceModel: 'project' },
  'carpet-upholstery': { audience: 'mixed', environment: 'interior', assetCollection: 'carpet-upholstery', serviceModel: 'project' },
  'vacation-rental': { audience: 'commercial', environment: 'interior', assetCollection: 'vacation-rental', serviceModel: 'recurring' },
  'post-construction': { audience: 'mixed', environment: 'specialized', assetCollection: 'post-construction', serviceModel: 'project' },
  'mixed-specialized': { audience: 'mixed', environment: 'specialized', assetCollection: 'specialized-cleaning', serviceModel: 'mixed' },
}

function serviceNames(config: Partial<PreviewConfig>): string[] {
  return (config.services || []).map((service) => typeof service === 'string' ? service : service.name).filter(Boolean)
}

function haystack(config: Partial<PreviewConfig>): string {
  return [
    config.business?.name,
    config.googleBusinessProfile?.primaryCategory,
    ...(config.googleBusinessProfile?.additionalCategories || []),
    ...serviceNames(config),
  ].filter(Boolean).join(' ').toLowerCase()
}

function includesAny(text: string, words: string[]): boolean {
  return words.some((word) => text.includes(word))
}

function variantFromName(name: string): CleaningVariant | null {
  const text = name.toLowerCase()
  if (includesAny(text, ['air duct', 'duct clean', 'dryer vent'])) return 'air-duct'
  if (includesAny(text, ['window'])) return 'window'
  if (includesAny(text, ['carpet', 'upholstery'])) return 'carpet'
  if (includesAny(text, ['pressure wash', 'soft wash', 'power wash'])) return 'pressure-washing'
  if (includesAny(text, ['gutter', 'roof clean'])) return 'roof-gutter'
  if (includesAny(text, ['janitorial'])) return 'commercial'
  return null
}

function variantForCategory(category: CleaningCategory, text: string): CleaningVariant {
  if (category === 'exterior-cleaning' && includesAny(text, ['pressure wash', 'soft wash', 'power wash'])) return 'pressure-washing'
  if (category === 'exterior-cleaning' && includesAny(text, ['roof clean', 'gutter', 'moss removal'])) return 'roof-gutter'
  if (category === 'mixed-specialized' && includesAny(text, ['air duct', 'duct clean', 'dryer vent'])) return 'air-duct'
  if (category === 'commercial-janitorial') return 'commercial'
  if (category === 'window-cleaning') return 'window'
  if (category === 'carpet-upholstery') return 'carpet'
  if (category === 'vacation-rental') return 'vacation'
  if (category === 'post-construction') return 'post-construction'
  if (category === 'residential-cleaning') return 'residential'
  if (category === 'exterior-cleaning') return 'exterior'
  return 'specialized'
}

export function inferVariant(text: string, category?: CleaningCategory): CleaningVariant {
  if (category) return variantForCategory(category, text)
  if (includesAny(text, ['air duct', 'duct clean', 'dryer vent', 'hvac duct', 'vent clean'])) return 'air-duct'
  if (includesAny(text, ['pressure wash', 'soft wash', 'power wash'])) return 'pressure-washing'
  if (includesAny(text, ['roof clean', 'gutter', 'moss removal'])) return 'roof-gutter'
  if (includesAny(text, ['window'])) return 'window'
  if (includesAny(text, ['carpet', 'upholstery', 'rug'])) return 'carpet'
  if (includesAny(text, ['airbnb', 'vacation rental', 'short-term rental', 'turnover'])) return 'vacation'
  if (includesAny(text, ['post-construction', 'post construction', 'construction clean'])) return 'post-construction'
  if (includesAny(text, ['janitorial', 'office clean', 'commercial'])) return 'commercial'
  if (category === 'exterior-cleaning') return 'exterior'
  if (category === 'window-cleaning') return 'window'
  if (category === 'carpet-upholstery') return 'carpet'
  if (category === 'vacation-rental') return 'vacation'
  if (category === 'post-construction') return 'post-construction'
  if (category === 'commercial-janitorial') return 'commercial'
  if (category === 'residential-cleaning') return 'residential'
  if (includesAny(text, ['exterior', 'house wash', 'driveway'])) return 'exterior'
  return category === 'mixed-specialized' ? 'specialized' : 'residential'
}

export function inferCleaningProfile(config: Partial<PreviewConfig>): CleaningProfile {
  if (config.cleaningProfile?.primaryCategory) {
    const defaults = CATEGORY_DEFAULTS[config.cleaningProfile.primaryCategory]
    return {
      ...defaults,
      ...config.cleaningProfile,
      secondaryCategories: config.cleaningProfile.secondaryCategories || [],
    }
  }

  const text = haystack(config)
  const variant = variantFromName(config.business?.name || '') || inferVariant(text)
  const primaryCategory = categoryForVariant(variant)
  const defaults = CATEGORY_DEFAULTS[primaryCategory]
  return {
    primaryCategory,
    secondaryCategories: [],
    ...defaults,
  }
}

function categoryForVariant(variant: CleaningVariant): CleaningCategory {
  switch (variant) {
    case 'commercial': return 'commercial-janitorial'
    case 'window': return 'window-cleaning'
    case 'carpet': return 'carpet-upholstery'
    case 'vacation': return 'vacation-rental'
    case 'post-construction': return 'post-construction'
    case 'pressure-washing':
    case 'roof-gutter':
    case 'exterior': return 'exterior-cleaning'
    case 'air-duct':
    case 'specialized': return 'mixed-specialized'
    default: return 'residential-cleaning'
  }
}

function shortName(name: string): string {
  return name.replace(/\s+(cleaning|services|service)$/i, '').trim()
}

function phraseFor(variant: CleaningVariant, names: string[]): string {
  const primary = names[0]
  if (primary && variant !== 'residential') return primary.toLowerCase()
  switch (variant) {
    case 'air-duct': return 'air duct cleaning'
    case 'pressure-washing': return 'pressure washing'
    case 'roof-gutter': return 'roof and gutter cleaning'
    case 'window': return 'window cleaning'
    case 'carpet': return 'carpet and upholstery cleaning'
    case 'vacation': return 'vacation rental cleaning'
    case 'post-construction': return 'post-construction cleaning'
    case 'commercial': return 'commercial cleaning'
    case 'exterior': return 'exterior cleaning'
    case 'specialized': return 'specialized cleaning'
    default: return 'house cleaning'
  }
}

function copyFor(variant: CleaningVariant, city: string, phrase: string) {
  const cityText = city || 'your area'
  const packs: Record<CleaningVariant, {
    headline: string
    subheadline: string
    aboutHeadline: string
    bookingTitle: string
    bookingSubtitle: string
    dispatchLabel: string
    contactHeadline: string
    areasIntro: string
    formPlaceholder: string
    transformations: PresentationCard[]
    gallery: PresentationCard[]
    benefits: PresentationBenefit[]
  }> = {
    residential: {
      headline: `A Cleaner Home in ${cityText}`,
      subheadline: `Recurring and deep house cleaning for homes in ${cityText}, with clear scheduling and careful attention to the rooms you use every day.`,
      aboutHeadline: 'House Cleaning, Organized Around Your Home',
      bookingTitle: 'Request a Home Cleaning',
      bookingSubtitle: 'Choose the visit that fits your home',
      dispatchLabel: 'Visit scheduled',
      contactHeadline: 'Ready for a Cleaner Home?',
      areasIntro: `House cleaning visits across ${cityText} and nearby neighborhoods.`,
      formPlaceholder: 'Home size, preferred frequency, pets, or rooms that need extra attention.',
      transformations: [
        { label: 'Kitchen reset', description: 'Placeholder for a kitchen cleaning before-and-after.', icon: 'UtensilsCrossed' },
        { label: 'Bathroom detail', description: 'Placeholder for a bathroom cleaning result.', icon: 'Bath' },
        { label: 'Living area refresh', description: 'Placeholder for a living area cleaning result.', icon: 'Sofa' },
      ],
      gallery: [
        { label: 'Recurring cleaning', description: 'Example of where recurring home-cleaning photos will appear.', icon: 'Home' },
        { label: 'Deep cleaning', description: 'Example of a detailed home-cleaning showcase.', icon: 'Sparkles' },
      ],
      benefits: [
        { title: 'Consistent visits', description: 'A simple schedule for weekly, biweekly, or one-time home cleaning.', icon: 'Calendar' },
        { title: 'Room-by-room care', description: 'Kitchens, bathrooms, and living areas handled with a clear checklist.', icon: 'Home' },
      ],
    },
    commercial: {
      headline: `A Cleaner Workplace in ${cityText}`,
      subheadline: `Janitorial and commercial cleaning schedules for offices and workspaces in ${cityText}.`,
      aboutHeadline: 'Commercial Cleaning That Fits the Workday',
      bookingTitle: 'Request a Commercial Quote',
      bookingSubtitle: 'Tell us about the workspace',
      dispatchLabel: 'Crew scheduled',
      contactHeadline: 'Ready for a Cleaner Workplace?',
      areasIntro: `Commercial cleaning coverage around ${cityText}.`,
      formPlaceholder: 'Building type, square footage, cleaning frequency, or after-hours access.',
      transformations: [
        { label: 'Office refresh', description: 'Placeholder for a commercial cleaning result.', icon: 'Building2' },
        { label: 'Common areas', description: 'Placeholder for lobby and shared-space cleaning.', icon: 'Users' },
      ],
      gallery: [
        { label: 'Office cleaning', description: 'Example commercial workspace visual.', icon: 'Building2' },
        { label: 'Janitorial service', description: 'Example of a scheduled workplace cleaning.', icon: 'ClipboardList' },
      ],
      benefits: [
        { title: 'Workday-friendly scheduling', description: 'Visits planned around business hours and after-hours access.', icon: 'Clock' },
        { title: 'Workspace presentation', description: 'Offices, restrooms, and shared areas kept presentable for staff and visitors.', icon: 'Building2' },
      ],
    },
    exterior: {
      headline: `Bring the Exterior Back to Life in ${cityText}`,
      subheadline: `Exterior washing for driveways, siding, patios, and other outdoor surfaces around ${cityText}.`,
      aboutHeadline: 'Exterior Cleaning for Curb Appeal',
      bookingTitle: 'Request an Exterior Quote',
      bookingSubtitle: 'Choose the surface that needs attention',
      dispatchLabel: 'Exterior visit scheduled',
      contactHeadline: 'Ready to Refresh the Exterior?',
      areasIntro: `Exterior cleaning projects around ${cityText}.`,
      formPlaceholder: 'Surface type, approximate size, and whether the property is residential or commercial.',
      transformations: [
        { label: 'Driveway wash', description: 'Placeholder for a driveway before-and-after.', icon: 'Car' },
        { label: 'Siding wash', description: 'Placeholder for an exterior siding result.', icon: 'Home' },
      ],
      gallery: [
        { label: 'Concrete surfaces', description: 'Example exterior surface visual.', icon: 'Square' },
        { label: 'Outdoor living areas', description: 'Example patio and walkway visual.', icon: 'Trees' },
      ],
      benefits: [
        { title: 'Surface-specific work', description: 'Different exterior materials can be quoted and treated separately.', icon: 'Layers' },
        { title: 'Curb appeal', description: 'A cleaner exterior makes the property look cared for.', icon: 'Home' },
      ],
    },
    window: {
      headline: `Clearer Windows Across ${cityText}`,
      subheadline: `Residential and commercial window cleaning for properties in ${cityText}.`,
      aboutHeadline: 'Window Cleaning Without the Housekeeping Script',
      bookingTitle: 'Request a Window Quote',
      bookingSubtitle: 'Choose the property type',
      dispatchLabel: 'Window visit scheduled',
      contactHeadline: 'Ready for Clearer Windows?',
      areasIntro: `Window cleaning coverage around ${cityText}.`,
      formPlaceholder: 'Number of stories, inside/outside service, screens, or storefront details.',
      transformations: [
        { label: 'Exterior glass', description: 'Placeholder for an exterior window result.', icon: 'Square' },
        { label: 'Storefront glass', description: 'Placeholder for a commercial window result.', icon: 'Building2' },
      ],
      gallery: [
        { label: 'Home windows', description: 'Example residential glass visual.', icon: 'Home' },
        { label: 'Commercial glass', description: 'Example storefront visual.', icon: 'Building2' },
      ],
      benefits: [
        { title: 'Interior or exterior visits', description: 'Quote the glass that actually needs service.', icon: 'Square' },
        { title: 'Property-ready presentation', description: 'Clear glass for homes, storefronts, and offices.', icon: 'Sparkles' },
      ],
    },
    carpet: {
      headline: `Cleaner Carpets and Upholstery in ${cityText}`,
      subheadline: `Carpet, rug, and upholstery cleaning for homes and businesses in ${cityText}.`,
      aboutHeadline: 'Fabric Cleaning for Carpets and Furniture',
      bookingTitle: 'Request a Carpet Quote',
      bookingSubtitle: 'Choose the fabric service',
      dispatchLabel: 'Cleaning visit scheduled',
      contactHeadline: 'Ready for Cleaner Fabrics?',
      areasIntro: `Carpet and upholstery appointments around ${cityText}.`,
      formPlaceholder: 'Rooms, carpet type, stairs, upholstery, or stain concerns.',
      transformations: [
        { label: 'Carpet cleaning', description: 'Placeholder for a carpet before-and-after.', icon: 'Square' },
        { label: 'Upholstery cleaning', description: 'Placeholder for a furniture cleaning result.', icon: 'Sofa' },
      ],
      gallery: [
        { label: 'Room carpets', description: 'Example carpet-cleaning visual.', icon: 'Home' },
        { label: 'Furniture fabrics', description: 'Example upholstery visual.', icon: 'Sofa' },
      ],
      benefits: [
        { title: 'Fabric-focused service', description: 'Carpets, rugs, and upholstery are quoted as distinct services.', icon: 'Sofa' },
        { title: 'Fresher indoor spaces', description: 'A practical refresh for rooms and seating areas.', icon: 'Sparkles' },
      ],
    },
    vacation: {
      headline: `Turnover Cleaning for Rentals in ${cityText}`,
      subheadline: `Cleaning between guest stays for vacation rentals and short-term properties in ${cityText}.`,
      aboutHeadline: 'Rental Turnovers, Ready for the Next Guest',
      bookingTitle: 'Request a Turnover Quote',
      bookingSubtitle: 'Choose the rental service',
      dispatchLabel: 'Turnover scheduled',
      contactHeadline: 'Ready for the Next Check-In?',
      areasIntro: `Vacation rental cleaning around ${cityText}.`,
      formPlaceholder: 'Number of properties, bedrooms, turnover window, or linen needs.',
      transformations: [
        { label: 'Guest-ready reset', description: 'Placeholder for a rental turnover result.', icon: 'Key' },
        { label: 'Kitchen reset', description: 'Placeholder for a rental kitchen refresh.', icon: 'UtensilsCrossed' },
      ],
      gallery: [
        { label: 'Turnover cleaning', description: 'Example short-term rental visual.', icon: 'Home' },
        { label: 'Guest spaces', description: 'Example of a guest-ready room.', icon: 'Bed' },
      ],
      benefits: [
        { title: 'Stay-based scheduling', description: 'Visits planned around check-out and check-in windows.', icon: 'Calendar' },
        { title: 'Guest presentation', description: 'Kitchens, baths, and living areas reset for the next arrival.', icon: 'Key' },
      ],
    },
    'post-construction': {
      headline: `Post-Construction Cleaning in ${cityText}`,
      subheadline: `Detail cleaning after renovations and construction projects in ${cityText}.`,
      aboutHeadline: 'Cleaning After the Build Is Finished',
      bookingTitle: 'Request a Construction Cleanup',
      bookingSubtitle: 'Tell us about the project',
      dispatchLabel: 'Cleanup scheduled',
      contactHeadline: 'Ready for the Final Clean?',
      areasIntro: `Post-construction cleaning around ${cityText}.`,
      formPlaceholder: 'Project type, square footage, dust level, and desired completion date.',
      transformations: [
        { label: 'Renovation cleanup', description: 'Placeholder for a post-construction result.', icon: 'Hammer' },
        { label: 'Detail clean', description: 'Placeholder for finished surfaces after construction.', icon: 'Sparkles' },
      ],
      gallery: [
        { label: 'Construction dust', description: 'Example post-construction visual.', icon: 'HardHat' },
        { label: 'Finished surfaces', description: 'Example of a detailed final clean.', icon: 'Sparkles' },
      ],
      benefits: [
        { title: 'Project-based visits', description: 'Scoped around the renovation instead of a recurring housekeeping plan.', icon: 'Hammer' },
        { title: 'Final presentation', description: 'Dust and debris removed so the finished space can be shown.', icon: 'CheckCircle2' },
      ],
    },
    'pressure-washing': {
      headline: `Pressure Washing for Properties in ${cityText}`,
      subheadline: `Driveways, siding, patios, and other exterior surfaces cleaned in ${cityText}.`,
      aboutHeadline: 'Exterior Washing for Concrete, Siding, and Patios',
      bookingTitle: 'Request a Washing Quote',
      bookingSubtitle: 'Choose the surface',
      dispatchLabel: 'Washing visit scheduled',
      contactHeadline: 'Ready to Wash the Exterior?',
      areasIntro: `Pressure and soft washing around ${cityText}.`,
      formPlaceholder: 'Surfaces, approximate area, staining, and property type.',
      transformations: [
        { label: 'Concrete wash', description: 'Placeholder for a pressure-washing before-and-after.', icon: 'Car' },
        { label: 'Siding wash', description: 'Placeholder for a soft-washing result.', icon: 'Home' },
      ],
      gallery: [
        { label: 'Driveways', description: 'Example concrete-washing visual.', icon: 'Car' },
        { label: 'House washing', description: 'Example exterior-washing visual.', icon: 'Home' },
      ],
      benefits: [
        { title: 'Surface matching', description: 'Pressure and soft washing can be selected for the material involved.', icon: 'Droplets' },
        { title: 'Visible curb appeal', description: 'Built-up dirt and organic staining are the focus of the visit.', icon: 'Sparkles' },
      ],
    },
    'roof-gutter': {
      headline: `Roof and Gutter Cleaning in ${cityText}`,
      subheadline: `Roof washing, gutter cleaning, and debris removal for properties in ${cityText}.`,
      aboutHeadline: 'Maintenance That Starts at the Roofline',
      bookingTitle: 'Request a Roof or Gutter Quote',
      bookingSubtitle: 'Choose the roofline service',
      dispatchLabel: 'Roofline visit scheduled',
      contactHeadline: 'Ready to Clean the Roofline?',
      areasIntro: `Roof and gutter service around ${cityText}.`,
      formPlaceholder: 'Roof type, stories, gutter length, or visible debris and staining.',
      transformations: [
        { label: 'Roof wash', description: 'Placeholder for a roof-cleaning result.', icon: 'Home' },
        { label: 'Gutter clearing', description: 'Placeholder for a gutter-cleaning result.', icon: 'Droplets' },
      ],
      gallery: [
        { label: 'Roof surfaces', description: 'Example roof-cleaning visual.', icon: 'Home' },
        { label: 'Gutters', description: 'Example gutter-cleaning visual.', icon: 'Droplets' },
      ],
      benefits: [
        { title: 'Roofline focus', description: 'Roof surfaces and gutters are treated as the actual scope of work.', icon: 'Home' },
        { title: 'Debris removal', description: 'Leaves, buildup, and drainage blockages can be quoted directly.', icon: 'Droplets' },
      ],
    },
    'air-duct': {
      headline: `Cleaner Air Ducts in ${cityText}`,
      subheadline: `Air duct and dryer vent cleaning for homes and properties in ${cityText}.`,
      aboutHeadline: 'Duct Cleaning for the Air System, Not the Living Room',
      bookingTitle: 'Request a Duct Cleaning Quote',
      bookingSubtitle: 'Choose the vent service',
      dispatchLabel: 'Duct visit scheduled',
      contactHeadline: 'Ready to Clean the Air Ducts?',
      areasIntro: `Air duct and vent cleaning around ${cityText}.`,
      formPlaceholder: 'Home or property size, number of systems, dryer vent, or access notes.',
      transformations: [
        { label: 'Air duct cleaning', description: 'Placeholder for an air-duct before-and-after.', icon: 'Wind' },
        { label: 'Dryer vent cleaning', description: 'Placeholder for a dryer-vent result.', icon: 'Fan' },
      ],
      gallery: [
        { label: 'Supply ducts', description: 'Example air-duct visual.', icon: 'Wind' },
        { label: 'Dryer vents', description: 'Example dryer-vent visual.', icon: 'Fan' },
      ],
      benefits: [
        { title: 'System-focused service', description: 'The work is scoped around ducts and vents rather than room cleaning.', icon: 'Wind' },
        { title: 'Clear visit purpose', description: 'Customers can request the exact vent service they need.', icon: 'Fan' },
      ],
    },
    specialized: {
      headline: `${shortName(phrase)} in ${cityText}`.replace(/^./, (char) => char.toUpperCase()),
      subheadline: `${phrase.charAt(0).toUpperCase()}${phrase.slice(1)} for customers in ${cityText}.`,
      aboutHeadline: 'Service Built Around the Actual Work',
      bookingTitle: 'Request a Quote',
      bookingSubtitle: 'Choose a service',
      dispatchLabel: 'Visit scheduled',
      contactHeadline: 'Ready to Request a Quote?',
      areasIntro: `Service coverage around ${cityText}.`,
      formPlaceholder: 'Property type, service needed, and any timing notes.',
      transformations: [
        { label: phrase, description: 'Placeholder for a service result.', icon: 'Sparkles' },
      ],
      gallery: [
        { label: phrase, description: 'Example visual for this service category.', icon: 'Sparkles' },
      ],
      benefits: [
        { title: 'Service-specific scope', description: 'The page follows the services this business actually offers.', icon: 'CheckCircle2' },
        { title: 'Straightforward scheduling', description: 'Customers can call or request a quote for the listed work.', icon: 'Calendar' },
      ],
    },
  }
  return packs[variant]
}

function wordCount(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length
}

export function splitAbout(story: string | undefined, fallback: string[]): string[] {
  const paragraphs = (story || '').split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean)
  if (paragraphs.length >= 2 && wordCount(paragraphs.slice(0, 2).join(' ')) <= 120) {
    return paragraphs.slice(0, 2)
  }
  if (paragraphs.length === 1 && wordCount(paragraphs[0]) <= 100) {
    const words = paragraphs[0].split(/\s+/)
    const midpoint = Math.ceil(words.length / 2)
    return [words.slice(0, midpoint).join(' '), words.slice(midpoint).join(' ')]
  }
  return fallback
}

export function resolveCleaningPresentation(config: PreviewConfig): CleaningPresentation {
  const profile = inferCleaningProfile(config)
  const names = serviceNames(config)
  const text = haystack(config)
  const variant = config.cleaningProfile
    ? inferVariant(`${profile.primaryCategory} ${text}`, profile.primaryCategory)
    : variantFromName(config.business.name) || inferVariant(text, profile.primaryCategory)
  const phrase = phraseFor(variant, names)
  const city = config.business.city
  const pack = copyFor(variant, city, phrase)
  const bookingOptions = (names.length ? names : [phrase]).slice(0, 3).map(shortName)
  const genuineReviews = (config.sampleReviews || []).filter((review) => review.kind === 'genuine' || review.source === 'google')
  const illustrativeReviews = (config.sampleReviews || []).filter((review) => !genuineReviews.includes(review))
  const rating = config.googleBusinessProfile?.rating ?? config.socialProof?.googleRating
  const reviewCount = config.googleBusinessProfile?.reviewCount ?? config.socialProof?.totalReviews
  const showRating = typeof rating === 'number' && rating >= 4
  const stats: PresentationStat[] = []
  if (showRating && rating) stats.push({ label: 'Google rating', value: rating.toFixed(1) })
  if (reviewCount) stats.push({ label: 'Google reviews', value: String(reviewCount) })
  if (names.length) stats.push({ label: 'Listed services', value: String(names.length) })
  if (config.areasServed?.length) stats.push({ label: 'Service areas', value: String(config.areasServed.length) })

  const aboutFallback = [
    `${config.business.name} provides ${phrase} in ${city || 'the local area'}. Visits are scoped around the services listed on this page, with straightforward scheduling and a clear quote request.`,
    `This preview shows the structure of the website. Final details, photos, and service notes are confirmed before launch.`,
  ]

  return {
    profile,
    variant,
    servicePhrase: phrase,
    headline: config.hero?.headline || pack.headline,
    subheadline: config.hero?.subheadline || pack.subheadline,
    aboutHeadline: config.content?.aboutHeadline || pack.aboutHeadline,
    aboutParagraphs: splitAbout(config.about?.story, aboutFallback),
    bookingTitle: pack.bookingTitle,
    bookingSubtitle: pack.bookingSubtitle,
    bookingOptions,
    dispatchLabel: pack.dispatchLabel,
    primaryCta: config.hero?.ctaText || 'Get Free Quote',
    secondaryCta: config.hero?.ctaSecondaryText || 'Call Now',
    benefits: pack.benefits,
    transformations: names.slice(0, 3).map((name, index) => ({
      label: name,
      description: pack.transformations[index % pack.transformations.length]?.description || `Placeholder result for ${name.toLowerCase()}.`,
      icon: pack.transformations[index % pack.transformations.length]?.icon || 'Sparkles',
    })),
    gallery: names.slice(0, 4).map((name, index) => ({
      label: name,
      description: `Preview placeholder for ${name.toLowerCase()}. Your approved photos can replace this after onboarding.`,
      icon: pack.gallery[index % pack.gallery.length]?.icon || 'Camera',
    })),
    whyUs: config.content?.whyUsReasons?.length
      ? config.content.whyUsReasons.map((reason) => ({ title: reason.title, description: reason.description, icon: reason.icon || 'CheckCircle2' }))
      : pack.benefits,
    formPlaceholder: pack.formPlaceholder,
    contactHeadline: pack.contactHeadline,
    areasIntro: pack.areasIntro,
    stats: stats.slice(0, 4),
    showRating,
    rating: showRating ? rating : undefined,
    reviewCount: showRating ? reviewCount : undefined,
    reviews: genuineReviews.length ? genuineReviews : illustrativeReviews,
    reviewsAreGenuine: genuineReviews.length > 0,
    sections: {
      about: config.features?.showAbout ?? true,
      transformation: config.features?.showGallery ?? true,
      gallery: config.features?.showGallery ?? true,
      reviews: (config.features?.showReviews ?? true) && (genuineReviews.length > 0 || illustrativeReviews.length > 0),
      areas: (config.features?.showAreas ?? true) && (config.areasServed?.length || 0) > 0,
      whyUs: config.features?.showWhyUs ?? true,
      chat: config.mode !== 'production' || Boolean(config.features?.enableChat),
      booking: config.mode !== 'production' || config.features?.enableBooking !== false,
    },
  }
}

export function servicesAsItems(services: PreviewConfig['services']): ServiceItem[] {
  return (services || []).map((service) => typeof service === 'string'
    ? { name: service, description: '' }
    : service)
}
