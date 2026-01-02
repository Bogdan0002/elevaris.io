import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host') || ''
  
  // Debug: log hostname in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Middleware] Hostname:', hostname, 'Pathname:', pathname)
  }

  // Skip middleware for static assets and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next()
  }

  // Handle p. subdomain (preview subdomain)
  // Check for both 'p.' at start and 'p.elevaris.app' pattern
  if (hostname.startsWith('p.') || hostname.includes('p.elevaris.app')) {
    // Extract slug from pathname (e.g., /some-slug -> some-slug)
    const slug = pathname.slice(1).split('?')[0] // Remove leading / and query params

    // If it's root or empty, show a helpful message
    if (!slug || slug === '') {
      const url = request.nextUrl.clone()
      url.pathname = '/p'
      return NextResponse.rewrite(url)
    }

    // Rewrite to internal preview route
    const url = request.nextUrl.clone()
    url.pathname = `/p/${slug}`
    return NextResponse.rewrite(url)
  }

  // Handle ops. subdomain - routes should work normally
  // The (ops) route group handles /preview routes
  if (hostname.startsWith('ops.') || hostname.includes('ops.elevaris.app')) {
    // No rewrite needed - routes are already under /preview
    // But ensure we're not blocking it
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)).*)',
  ],
}

