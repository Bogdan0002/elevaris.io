'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createPreviewAction } from './actions'
import { generateContentAction } from './ai-actions'
import { TEMPLATE_REGISTRY } from '@/lib/templates/registry'
import { Copy, ExternalLink, CheckCircle2, AlertCircle, Sparkles, Loader2 } from 'lucide-react'

function OpsConsoleContent() {
  const searchParams = useSearchParams()
  const key = searchParams.get('key')
  const [hostname, setHostname] = useState<string>('')

  useEffect(() => {
    // Get hostname on client side
    setHostname(window.location.hostname)
  }, [])

  // Access gate - check against server-side env var
  // Note: In production, this should be server-side validated
  const OPS_KEY = process.env.NEXT_PUBLIC_OPS_KEY || ''
  const isAuthorized = key && key === OPS_KEY
  const isOpsSubdomain = hostname.startsWith('ops.')

  const [formData, setFormData] = useState({
    templateId: 'cleaning-v1',
    businessName: '',
    city: '',
    state: '',
    phone: '',
    placeId: '',
    offerText: '',
    primaryColor: '#00A8E8',
    accentColor: '#00C896',
    services: '',
    areasServed: '',
    hours: '',
    lat: '',
    lng: '',
    radiusMiles: '15',
  })

  const [loading, setLoading] = useState(false)
  const [aiGenerating, setAiGenerating] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    slug?: string
    previewUrl?: string
    reviewUrl?: string
    templateName?: string
    error?: string
  } | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [additionalInfo, setAdditionalInfo] = useState('')

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

  const handleAiGenerate = async () => {
    // Validate required fields for AI generation
    if (!formData.businessName || !formData.city || !formData.state || !formData.phone) {
      alert('Please fill in Business Name, City, State, and Phone before generating content.')
      return
    }

    setAiGenerating(true)
    try {
      const aiResult = await generateContentAction({
        businessName: formData.businessName,
        city: formData.city,
        state: formData.state,
        phone: formData.phone,
        placeId: formData.placeId || '', // Optional for AI
        additionalInfo: additionalInfo,
      })

      if (aiResult.success && aiResult.content) {
        // Fill form with AI-generated content
        setFormData({
          ...formData,
          offerText: aiResult.content.offer.shortText,
          primaryColor: aiResult.content.branding.primaryColor,
          accentColor: aiResult.content.branding.accentColor,
          services: aiResult.content.services.join('\n'),
          areasServed: aiResult.content.areasServed.join('\n'),
          hours: aiResult.content.hours || '',
        })
        alert('Content generated successfully! Review and adjust as needed.')
      } else {
        alert(`Failed to generate content: ${aiResult.error || 'Unknown error'}`)
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setAiGenerating(false)
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!isAuthorized) {
    const opsKey = OPS_KEY || 'your-ops-key'
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
    const separator = currentUrl.includes('?') ? '&' : '?'
    const urlWithKey = `${currentUrl.split('?')[0]}${separator}key=${opsKey}`
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50 p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Unauthorized</h1>
            <p className="text-slate-600">
              Access denied. Please provide a valid key.
            </p>
          </div>
          {isOpsSubdomain && (
            <div className="mt-6 p-5 bg-white rounded-xl border border-slate-200 shadow-sm text-left">
              <p className="text-sm font-medium text-slate-700 mb-3">
                Access this page with:
              </p>
              <code className="block text-xs text-blue-600 break-all bg-blue-50 p-3 rounded-lg border border-blue-100 mb-3 font-mono">
                {urlWithKey}
              </code>
              <p className="text-xs text-slate-500">
                Or add <code className="text-blue-600 font-mono bg-blue-50 px-1.5 py-0.5 rounded">?key={opsKey}</code> to your URL
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Preview Generator
              </h1>
              <p className="text-slate-600">
                Generate professional preview websites for cleaning businesses
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Template Selection */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Template *
                </label>
                <select
                  required
                  value={formData.templateId}
                  onChange={(e) =>
                    setFormData({ ...formData, templateId: e.target.value })
                  }
                  className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {TEMPLATE_REGISTRY.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1.5">
                  Choose the template design for your preview
                </p>
              </div>

              {/* Business Info */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Business Information
                  </h2>
                  <Button
                    type="button"
                    onClick={handleAiGenerate}
                    disabled={aiGenerating || !formData.businessName || !formData.city || !formData.state || !formData.phone}
                    variant="outline"
                    className="flex items-center gap-2 border-slate-300 hover:bg-slate-50"
                  >
                    {aiGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        AI Generate
                      </>
                    )}
                  </Button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Business Name *
                  </label>
                  <Input
                    required
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    placeholder="Elite Cleaning Services"
                    className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      City *
                    </label>
                    <Input
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="Los Angeles"
                      className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
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
                      className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
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
                    className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Google Place ID *
                  </label>
                  <Input
                    required
                    value={formData.placeId}
                    onChange={(e) =>
                      setFormData({ ...formData, placeId: e.target.value })
                    }
                    placeholder="ChIJN1t_tDeuEmsRUsoyG83frY4"
                    className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-slate-500 mt-1.5">
                    Used to generate Google review button link
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Additional Info <span className="text-slate-400 font-normal">(Optional - for AI generation)</span>
                  </label>
                  <Textarea
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="Any additional context about the business (e.g., 'Family-owned since 2010', 'Specializes in eco-friendly cleaning', etc.)"
                    rows={3}
                    className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-slate-500 mt-1.5">
                    This helps AI generate more personalized content
                  </p>
                </div>
              </div>

              {/* Offer */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
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
                  className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Branding */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <h2 className="text-xl font-semibold text-slate-900 pb-4 border-b border-slate-200">
                  Branding
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
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
                        className="w-16 h-12 p-1 cursor-pointer border-slate-300"
                      />
                      <Input
                        value={formData.primaryColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            primaryColor: e.target.value,
                          })
                        }
                        placeholder="#00A8E8"
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
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
                        className="w-16 h-12 p-1 cursor-pointer border-slate-300"
                      />
                      <Input
                        value={formData.accentColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            accentColor: e.target.value,
                          })
                        }
                        placeholder="#00C896"
                        className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Services * <span className="text-slate-400 font-normal">(one per line, 4-10 required)</span>
                </label>
                <Textarea
                  required
                  value={formData.services}
                  onChange={(e) =>
                    setFormData({ ...formData, services: e.target.value })
                  }
                  placeholder="Residential Cleaning&#10;Commercial Cleaning&#10;Deep Cleaning&#10;Move-in/Move-out"
                  rows={6}
                  className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
                />
              </div>

              {/* Areas Served */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Areas Served * <span className="text-slate-400 font-normal">(one per line, 2-15 required)</span>
                </label>
                <Textarea
                  required
                  value={formData.areasServed}
                  onChange={(e) =>
                    setFormData({ ...formData, areasServed: e.target.value })
                  }
                  placeholder="Los Angeles&#10;Beverly Hills&#10;Santa Monica&#10;West Hollywood"
                  rows={6}
                  className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
                />
              </div>

              {/* Optional Fields */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <h2 className="text-xl font-semibold text-slate-900 pb-4 border-b border-slate-200">
                  Optional
                </h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Hours
                  </label>
                  <Input
                    value={formData.hours}
                    onChange={(e) =>
                      setFormData({ ...formData, hours: e.target.value })
                    }
                    placeholder="Mon-Fri: 8am-6pm, Sat: 9am-5pm"
                    className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
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
                      className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
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
                      className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
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
                      className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all"
                size="lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating Preview...
                  </span>
                ) : (
                  'Generate Preview'
                )}
              </Button>
            </form>
          </div>

          {/* Right: Preview Summary Card */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6 space-y-6">
              <div className="pb-4 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900">
                  Generated Output
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Your preview details will appear here
                </p>
              </div>

              {result?.success ? (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="font-medium text-green-900">Preview generated successfully!</span>
                  </div>

                  {result.templateName && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-xs text-slate-500 mb-1">Template</div>
                      <div className="text-sm font-semibold text-slate-900">{result.templateName}</div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-2 block uppercase tracking-wide">
                        Slug
                      </label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-sm text-slate-900 font-mono">
                          {result.slug}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(result.slug!, 'slug')}
                          className="border-slate-300 hover:bg-slate-50"
                        >
                          {copied === 'slug' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-2 block uppercase tracking-wide">
                        Preview URL
                      </label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs text-slate-900 break-all font-mono">
                          {result.previewUrl}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(result.previewUrl!, 'preview')}
                          className="border-slate-300 hover:bg-slate-50 flex-shrink-0"
                        >
                          {copied === 'preview' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-2 block uppercase tracking-wide">
                        Review URL
                      </label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs text-slate-900 break-all font-mono">
                          {result.reviewUrl}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(result.reviewUrl!, 'review')}
                          className="border-slate-300 hover:bg-slate-50 flex-shrink-0"
                        >
                          {copied === 'review' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-slate-200">
                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg"
                      onClick={() => window.open(result.previewUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Preview
                    </Button>
                  </div>
                </div>
              ) : result?.error ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <span className="font-medium text-red-900">Error</span>
                  </div>
                  <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    {result.error}
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                    <Sparkles className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    Fill out the form and click &ldquo;Generate Preview&rdquo; to create a preview website.
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

export default function OpsConsolePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="text-slate-600">Loading...</div>
      </div>
    }>
      <OpsConsoleContent />
    </Suspense>
  )
}

