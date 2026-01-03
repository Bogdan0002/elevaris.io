'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { useEffect, useState } from 'react'

export function ConditionalNavbar() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [hostname, setHostname] = useState<string>('')
  
  useEffect(() => {
    // Get hostname on client side
    setHostname(window.location.hostname)
    setMounted(true)
  }, [])
  
  // Check pathname immediately (works on server and client)
  // Hide navbar for preview routes (fallback for main domain)
  if (pathname?.startsWith('/p/')) {
    return null
  }
  
  // Hide navbar for ops routes (fallback for main domain)
  if (pathname?.startsWith('/preview')) {
    return null
  }
  
  // Wait for client-side mount before showing navbar
  // This prevents flash on pages that need hostname check
  if (!mounted) {
    return null
  }
  
  // Hide navbar for preview subdomain
  if (hostname.startsWith('p.')) {
    return null
  }
  
  // Hide navbar for ops subdomain
  if (hostname.startsWith('ops.')) {
    return null
  }
  
  return <Navbar />
}

