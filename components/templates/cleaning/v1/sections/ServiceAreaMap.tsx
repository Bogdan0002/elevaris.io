'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

interface ServiceAreaMapProps {
  config: {
    map?: { lat?: number; lng?: number; radiusMiles?: number }
    areasServed: string[]
  }
}

// Placeholder component when map isn't available
function MapPlaceholder({ areasServed }: { areasServed: string[] }) {
  return (
    <div className="w-full h-full bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-white/10 rounded-2xl flex items-center justify-center">
      <div className="text-center p-8 space-y-4">
        <div className="text-4xl mb-4">🗺️</div>
        <h3 className="text-xl font-semibold text-foreground">Service Areas</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {areasServed.map((area, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-foreground-secondary"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Dynamically import Mapbox component
const MapboxMap = dynamic(() => import('./MapboxMap'), {
  ssr: false,
  loading: () => <MapPlaceholder areasServed={[]} />,
})

export function ServiceAreaMap({ config }: ServiceAreaMapProps) {
  if (!config.map?.lat || !config.map?.lng) {
    return <MapPlaceholder areasServed={config.areasServed} />
  }

  return (
    <MapboxMap
      lat={config.map.lat}
      lng={config.map.lng}
      radiusMiles={config.map.radiusMiles || 15}
    />
  )
}

