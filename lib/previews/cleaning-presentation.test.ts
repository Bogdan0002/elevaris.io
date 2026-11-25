import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { applyPreviewDefaults } from './helpers'
import { resolveCleaningPresentation } from './cleaning-presentation'
import type { PreviewConfig, ServiceItem } from './types'

function preview(input: {
  name: string
  services: string[]
  reviews?: PreviewConfig['sampleReviews']
  city?: string
}): PreviewConfig {
  return applyPreviewDefaults({
    slug: 'fixture',
    niche: 'cleaning',
    templateId: 'cleaning-v1',
    mode: 'preview',
    business: {
      name: input.name,
      city: input.city || 'Austin',
      state: 'TX',
      phone: '+1 512-555-0199',
    },
    offer: { shortText: 'Request a free quote' },
    services: input.services.map((name): ServiceItem => ({ name, description: `${name} for local customers.` })),
    areasServed: ['Austin', 'Round Rock'],
    sampleReviews: input.reviews,
  })
}

const fixtures = [
  {
    name: 'Bright Home Cleaning',
    services: ['Recurring House Cleaning', 'Deep Cleaning', 'Move-Out Cleaning'],
    category: 'residential-cleaning',
    phrase: 'house cleaning',
  },
  {
    name: 'Northside Janitorial',
    services: ['Office Cleaning', 'Restroom Sanitation', 'Floor Care'],
    category: 'commercial-janitorial',
    phrase: 'office cleaning',
  },
  {
    name: 'Mako Bros Window Cleaning',
    services: ['Residential Window Cleaning', 'Pressure Washing', 'Storefront Glass'],
    category: 'window-cleaning',
    phrase: 'residential window cleaning',
  },
  {
    name: 'Clear Path Pressure Washing',
    services: ['Pressure Washing', 'Soft Washing', 'Driveway Cleaning'],
    category: 'exterior-cleaning',
    phrase: 'pressure washing',
  },
  {
    name: 'Ridge Line Roof Cleaning',
    services: ['Roof Cleaning', 'Gutter Cleaning'],
    category: 'exterior-cleaning',
    phrase: 'roof cleaning',
  },
  {
    name: 'Soft Step Carpet Cleaning',
    services: ['Carpet Cleaning', 'Upholstery Cleaning'],
    category: 'carpet-upholstery',
    phrase: 'carpet cleaning',
  },
  {
    name: 'Home and Exterior Cleaning Co',
    services: ['House Cleaning', 'Pressure Washing'],
    category: 'exterior-cleaning',
    phrase: 'house cleaning',
  },
  {
    name: 'Quiet Broom Cleaning',
    services: ['House Cleaning'],
    category: 'residential-cleaning',
    phrase: 'house cleaning',
  },
]

for (const fixture of fixtures) {
  const config = preview(fixture)
  const presentation = resolveCleaningPresentation(config)
  assert.equal(presentation.profile.primaryCategory, fixture.category, fixture.name)
  assert.equal(presentation.servicePhrase, fixture.phrase, fixture.name)
  assert.equal(presentation.reviews.length, 0, fixture.name)
  assert.equal(presentation.headline.toLowerCase().includes('services services'), false, fixture.name)
  assert.equal(`${presentation.servicePhrase} services`.includes('services services'), false)
  assert.equal(presentation.aboutParagraphs.length, 2, fixture.name)
  assert.ok(presentation.bookingOptions.length > 0, fixture.name)
  assert.equal(presentation.stats.some((stat) => /insured|guarantee|customers/i.test(stat.label)), false)
}

const legacy = applyPreviewDefaults({
  slug: 'legacy-review',
  niche: 'cleaning',
  templateId: 'cleaning-v1',
  business: { name: 'Legacy Cleaners', city: 'Dallas', state: 'TX', phone: '+1 214-555-0100' },
  services: [{ name: 'Air Duct Cleaning', description: 'Clean supply and return ducts.' }],
  areasServed: ['Dallas'],
  sampleReviews: [{ name: 'Pat Lee', text: 'They cleaned the ducts.', stars: 5 }],
})
assert.equal(legacy.sampleReviews?.[0].kind, 'illustrative')
assert.equal(legacy.sampleReviews?.[0].verified, false)
assert.equal(legacy.sampleReviews?.[0].source, 'unknown')
const duct = resolveCleaningPresentation(legacy)
assert.equal(duct.variant, 'air-duct')
assert.equal(duct.reviewsAreGenuine, false)
assert.match(duct.headline.toLowerCase(), /duct/)

const generator = readFileSync(new URL('../ai/generateFromDescription.ts', import.meta.url), 'utf8')
assert.equal(generator.split('chat.completions.create').length - 1, 1)
assert.match(generator, /max_tokens: 1800/)
assert.equal(generator.includes('generateDefaultReviews'), false)

console.log('cleaning presentation fixtures passed')
