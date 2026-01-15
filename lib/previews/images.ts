import type { BusinessNiche } from './types'
import { getDefaultImages, getNicheDisplayName } from './niche-defaults'

export interface NicheImageSet {
  hero: string
  about: string
  services: string[]
  gallery: string[]
}

const DEFAULT_PHOTO_COUNT = 8

async function fetchPexelsImages(query: string, count: number): Promise<string[]> {
  const apiKey = process.env.PEXELS_API_KEY
  if (!apiKey) return []

  const url = new URL('https://api.pexels.com/v1/search')
  url.searchParams.set('query', query)
  url.searchParams.set('per_page', String(count))
  url.searchParams.set('orientation', 'landscape')

  try {
    const response = await fetch(url.toString(), {
      headers: { Authorization: apiKey },
      cache: 'no-store',
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json() as {
      photos?: Array<{ src?: { large?: string; landscape?: string } }>
    }

    return (data.photos || [])
      .map((photo) => photo.src?.landscape || photo.src?.large)
      .filter((src): src is string => Boolean(src))
  } catch {
    return []
  }
}

export async function getNicheImageSet(options: {
  niche: BusinessNiche
  businessName?: string
  services?: string[]
}): Promise<NicheImageSet> {
  const fallback = getDefaultImages(options.niche)
  const nicheLabel = getNicheDisplayName(options.niche)
  const serviceHint = options.services?.[0] ? ` ${options.services[0]}` : ''
  const query = `${nicheLabel}${serviceHint} service`

  const pexelsImages = await fetchPexelsImages(query, DEFAULT_PHOTO_COUNT)
  if (!pexelsImages.length) {
    return fallback
  }

  const hero = pexelsImages[0] || fallback.hero
  const about = pexelsImages[1] || fallback.about
  const services = pexelsImages.slice(2, 5)
  const gallery = pexelsImages.slice(0, 6)

  return {
    hero,
    about,
    services: services.length ? services : fallback.services,
    gallery: gallery.length ? gallery : fallback.gallery,
  }
}

