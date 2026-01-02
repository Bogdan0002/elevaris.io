'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

// Import Mapbox CSS
if (typeof window !== 'undefined') {
  require('mapbox-gl/dist/mapbox-gl.css')
}

interface MapboxMapProps {
  lat: number
  lng: number
  radiusMiles: number
}

export default function MapboxMap({ lat, lng, radiusMiles }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

    if (!token) {
      console.warn('Mapbox access token not found')
      return
    }

    if (!mapContainer.current) return

    mapboxgl.accessToken = token

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Dark theme to match design
      center: [lng, lat],
      zoom: 11,
    })

    // Add marker
    new mapboxgl.Marker({ color: '#FF6A55' }).setLngLat([lng, lat]).addTo(map.current!)

    // Add circle for service radius
    const radiusMeters = radiusMiles * 1609.34 // Convert miles to meters

    map.current.on('load', () => {
      if (!map.current) return

      // Add circle source
      map.current.addSource('circle', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          properties: {
            radius: radiusMeters,
          },
        },
      })

      // Add circle layer
      map.current.addLayer({
        id: 'circle-fill',
        type: 'fill',
        source: 'circle',
        paint: {
          'fill-color': '#FF6A55',
          'fill-opacity': 0.1,
        },
      })

      map.current.addLayer({
        id: 'circle-stroke',
        type: 'line',
        source: 'circle',
        paint: {
          'line-color': '#FF6A55',
          'line-width': 2,
          'line-opacity': 0.5,
        },
      })

      // Create circle geometry
      const circle = createCircle([lng, lat], radiusMeters)
      const source = map.current.getSource('circle') as mapboxgl.GeoJSONSource
      source.setData({
        type: 'Feature',
        geometry: circle,
        properties: {},
      })
    })

    return () => {
      map.current?.remove()
    }
  }, [lat, lng, radiusMiles])

  return (
    <div
      ref={mapContainer}
      className="w-full h-full rounded-2xl overflow-hidden border border-white/10"
    />
  )
}

// Helper to create circle geometry
function createCircle(center: [number, number], radiusMeters: number) {
  const points = 64
  const coordinates: [number, number][] = []

  for (let i = 0; i < points; i++) {
    const angle = (i / points) * 2 * Math.PI
    const dx = (radiusMeters / 111320) * Math.cos(angle) // Approximate conversion
    const dy = (radiusMeters / 111320) * Math.sin(angle)
    coordinates.push([center[0] + dx, center[1] + dy])
  }

  coordinates.push(coordinates[0]) // Close the circle

  return {
    type: 'Polygon' as const,
    coordinates: [coordinates],
  }
}

