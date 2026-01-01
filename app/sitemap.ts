import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://elevaris.app'
  const lastModified = new Date()

  // Define all routes
  const routes = [
    '',
    '/home',
    '/web-development',
    '/seo-strategies',
    '/ux-ui-design',
    '/advertising',
    '/ongoing-support',
    '/cleaning',
    '/contact-us',
    '/schedule-a-call',
    '/privacy-policy',
    '/terms-and-conditions',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' || route === '/home' ? 'daily' : 'weekly',
    priority: route === '' || route === '/home' ? 1.0 : 0.8,
  }))
}

