'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createPreviewAction } from './actions'
import { TEMPLATE_REGISTRY } from '@/lib/templates/registry'
import { Copy, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react'

export default function OpsConsolePage() {
  const searchParams = useSearchParams()
  const key = searchParams.get('key')

  // Access gate - check against server-side env var
  // Note: In production, this should be server-side validated
  const OPS_KEY = process.env.NEXT_PUBLIC_OPS_KEY || ''
  const isAuthorized = key && key === OPS_KEY

  const [formData, setFormData] = useState({
    templateId: 'cleaning-v1',
    businessName: '',
    city: '',
    state: '',
    phone: '',
    placeId: '',
    offerText: '',
    primaryColor: '#FF6A55',
    accentColor: '#7B63FF',
    services: '',
    areasServed: '',
    hours: '',
    lat: '',
    lng: '',
    radiusMiles: '15',
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    slug?: string
    previewUrl?: string
    reviewUrl?: string
    templateName?: string
    error?: string
  } | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const services = formData.services
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
      const areasServed = formData.areasServed
        .split('\n')
        .map((a) => a.trim())
        .filter((a) => a.length > 0)

      const response = await createPreviewAction({
        templateId: formData.templateId,
        businessName: formData.businessName,
        city: formData.city,
        state: formData.state,
        phone: formData.phone,
        placeId: formData.placeId,
        offerText: formData.offerText,
        primaryColor: formData.primaryColor,
        accentColor: formData.accentColor,
        services,
        areasServed,
        hours: formData.hours || undefined,
        lat: formData.lat ? parseFloat(formData.lat) : undefined,
        lng: formData.lng ? parseFloat(formData.lng) : undefined,
        radiusMiles: formData.radiusMiles
          ? parseFloat(formData.radiusMiles)
          : undefined,
      })

      setResult(response)
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0B0B] p-4">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold text-foreground">Unauthorized</h1>
          <p className="text-foreground-secondary">
            Access denied. Please provide a valid key.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Preview Generator
          </h1>
          <p className="text-foreground-secondary">
            Generate preview websites for cleaning businesses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Info */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Business Information
                </h2>
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    Business Name *
                  </label>
                  <Input
                    required
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    placeholder="Elite Cleaning Services"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground-secondary mb-2">
                      City *
                    </label>
                    <Input
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="Los Angeles"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground-secondary mb-2">
                      State *
                    </label>
                    <Input
                      required
                      maxLength={2}
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          state: e.target.value.toUpperCase(),
                        })
                      }
                      placeholder="CA"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    Phone *
                  </label>
                  <Input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 555-123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    Google Place ID *
                  </label>
                  <Input
                    required
                    value={formData.placeId}
                    onChange={(e) =>
                      setFormData({ ...formData, placeId: e.target.value })
                    }
                    placeholder="ChIJN1t_tDeuEmsRUsoyG83frY4"
                  />
                  <p className="text-xs text-foreground-muted mt-1">
                    Used to generate Google review button link
                  </p>
                </div>
              </div>

              {/* Offer */}
              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Offer Text *
                </label>
                <Textarea
                  required
                  value={formData.offerText}
                  onChange={(e) =>
                    setFormData({ ...formData, offerText: e.target.value })
                  }
                  placeholder="First-time customers get 20% off!"
                  rows={3}
                />
              </div>

              {/* Branding */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Branding
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground-secondary mb-2">
                      Primary Color
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={formData.primaryColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            primaryColor: e.target.value,
                          })
                        }
                        className="w-16 h-12 p-1"
                      />
                      <Input
                        value={formData.primaryColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            primaryColor: e.target.value,
                          })
                        }
                        placeholder="#FF6A55"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground-secondary mb-2">
                      Accent Color
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={formData.accentColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            accentColor: e.target.value,
                          })
                        }
                        className="w-16 h-12 p-1"
                      />
                      <Input
                        value={formData.accentColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            accentColor: e.target.value,
                          })
                        }
                        placeholder="#7B63FF"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Services * (one per line, 4-10 required)
                </label>
                <Textarea
                  required
                  value={formData.services}
                  onChange={(e) =>
                    setFormData({ ...formData, services: e.target.value })
                  }
                  placeholder="Residential Cleaning&#10;Commercial Cleaning&#10;Deep Cleaning&#10;Move-in/Move-out"
                  rows={6}
                />
              </div>

              {/* Areas Served */}
              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Areas Served * (one per line, 2-15 required)
                </label>
                <Textarea
                  required
                  value={formData.areasServed}
                  onChange={(e) =>
                    setFormData({ ...formData, areasServed: e.target.value })
                  }
                  placeholder="Los Angeles&#10;Beverly Hills&#10;Santa Monica&#10;West Hollywood"
                  rows={6}
                />
              </div>

              {/* Optional Fields */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Optional
                </h2>
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    Hours
                  </label>
                  <Input
                    value={formData.hours}
                    onChange={(e) =>
                      setFormData({ ...formData, hours: e.target.value })
                    }
                    placeholder="Mon-Fri: 8am-6pm, Sat: 9am-5pm"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground-secondary mb-2">
                      Latitude
                    </label>
                    <Input
                      type="number"
                      step="any"
                      value={formData.lat}
                      onChange={(e) =>
                        setFormData({ ...formData, lat: e.target.value })
                      }
                      placeholder="34.0522"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground-secondary mb-2">
                      Longitude
                    </label>
                    <Input
                      type="number"
                      step="any"
                      value={formData.lng}
                      onChange={(e) =>
                        setFormData({ ...formData, lng: e.target.value })
                      }
                      placeholder="-118.2437"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground-secondary mb-2">
                      Radius (miles)
                    </label>
                    <Input
                      type="number"
                      step="any"
                      value={formData.radiusMiles}
                      onChange={(e) =>
                        setFormData({ ...formData, radiusMiles: e.target.value })
                      }
                      placeholder="15"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={loading} className="w-full" size="lg">
                {loading ? 'Generating...' : 'Generate Preview'}
              </Button>
            </form>
          </div>

          {/* Right: Preview Summary Card */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-white/10 rounded-2xl p-6 space-y-6">
              <h2 className="text-xl font-semibold text-foreground">
                Generated Output
              </h2>

              {result?.success ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">Preview generated successfully!</span>
                  </div>

                  {result.templateName && (
                    <div className="text-sm text-foreground-secondary">
                      Template: <span className="font-medium text-foreground">{result.templateName}</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-foreground-muted mb-1 block">
                        Slug
                      </label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-black/30 px-3 py-2 rounded text-sm text-foreground">
                          {result.slug}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(result.slug!, 'slug')}
                        >
                          {copied === 'slug' ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-foreground-muted mb-1 block">
                        Preview URL
                      </label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-black/30 px-3 py-2 rounded text-sm text-foreground break-all">
                          {result.previewUrl}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(result.previewUrl!, 'preview')}
                        >
                          {copied === 'preview' ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-foreground-muted mb-1 block">
                        Review URL
                      </label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-black/30 px-3 py-2 rounded text-sm text-foreground break-all">
                          {result.reviewUrl}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(result.reviewUrl!, 'review')}
                        >
                          {copied === 'review' ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="default"
                      className="flex-1"
                      onClick={() => window.open(result.previewUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Preview
                    </Button>
                  </div>
                </div>
              ) : result?.error ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Error</span>
                  </div>
                  <p className="text-sm text-foreground-secondary">
                    {result.error}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 text-foreground-secondary">
                  <p className="text-sm">
                    Fill out the form and click "Generate Preview" to create a
                    preview website.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

