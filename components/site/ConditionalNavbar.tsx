'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { useEffect, useState } from 'react'

export function ConditionalNavbar() {
  const pathname = usePathname()
  const [hostname, setHostname] = useState<string>('')
  
  useEffect(() => {
    // Get hostname on client side
    setHostname(window.location.hostname)
  }, [])
  
  // Hide navbar for preview subdomain
  if (hostname.startsWith('p.')) {
    return null
  }
  
  // Hide navbar for ops subdomain
  if (hostname.startsWith('ops.')) {
    return null
  }
  
  // Hide navbar for preview routes (fallback for main domain)
  if (pathname?.startsWith('/p/')) {
    return null
  }
  
  // Hide navbar for ops routes (fallback for main domain)
  if (pathname?.startsWith('/preview')) {
    return null
  }
  
  return <Navbar />
}

