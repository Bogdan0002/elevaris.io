import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host') || ''

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
  if (hostname.startsWith('p.')) {
    // Extract slug from pathname (e.g., /some-slug -> some-slug)
    const slug = pathname.slice(1) // Remove leading /

    // If it's root or empty, don't rewrite
    if (!slug || slug === '') {
      return NextResponse.next()
    }

    // Rewrite to internal preview route
    const url = request.nextUrl.clone()
    url.pathname = `/p/${slug}`
    return NextResponse.rewrite(url)
  }

  // ops. subdomain behaves normally (no rewrite needed)
  // Routes are already under /preview in the (ops) route group

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

