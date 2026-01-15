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

  // Handle ops. subdomain - ensure routes work correctly
  if (hostname.startsWith('ops.') || hostname.includes('ops.elevaris.app')) {
    // If visiting root of ops subdomain, redirect to /preview (preserve query params)
    if (pathname === '/') {
      const url = request.nextUrl.clone()
      url.pathname = '/preview'
      // Preserve query parameters (like ?key=...)
      return NextResponse.redirect(url)
    }
    // For other paths, pass through - the (ops) route group will handle it
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


