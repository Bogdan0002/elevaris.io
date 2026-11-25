import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { opsKeyMatches, signOpsSession, verifyOpsSession } from '@/lib/ops/session'

export async function middleware(request: NextRequest) {
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

  const opsRoute = pathname.startsWith('/preview') || hostname.startsWith('ops.') || hostname.includes('ops.elevaris.app')
  if (opsRoute) {
    const key = request.nextUrl.searchParams.get('key')
    const cookie = request.cookies.get('elevaris_ops')?.value
    const validCookie = await verifyOpsSession(cookie)
    if (!validCookie && opsKeyMatches(key)) {
      const response = NextResponse.next()
      response.cookies.set('elevaris_ops', await signOpsSession(), {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 14,
      })
      return response
    }
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


