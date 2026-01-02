'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'

export function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Hide navbar for preview routes
  if (pathname?.startsWith('/p/')) {
    return null
  }
  
  // Hide navbar for ops routes
  if (pathname?.startsWith('/preview')) {
    return null
  }
  
  return <Navbar />
}

