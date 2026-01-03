'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createPreviewAction } from './actions'
import { generateContentAction } from './ai-actions'
import { generateFromDescriptionAction } from './ai-description-action'
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

  const [companyDescription, setCompanyDescription] = useState('')
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
  const [aiGenerating, setAiGenerating] = useState(false)
  const [formGenerated, setFormGenerated] = useState(false)
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
      // Parse services - format is "Service Name\nDescription\n\nNext Service..."
      const serviceLines = formData.services.split('\n').map((s) => s.trim()).filter((s) => s.length > 0)
      const services: string[] = []
      for (let i = 0; i < serviceLines.length; i++) {
        if (serviceLines[i] && !serviceLines[i].startsWith(' ') && i === 0 || serviceLines[i - 1] === '') {
          // This is a service name (not a description)
          services.push(serviceLines[i])
        }
      }
      // Fallback: if parsing fails, just use all non-empty lines
      if (services.length === 0) {
        services.push(...serviceLines.filter(line => line.length > 0))
      }
      
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

  const handleGenerateFromDescription = async () => {
    if (!companyDescription.trim()) {
      alert('Please enter a company description.')
      return
    }

    setAiGenerating(true)
    setResult(null)
    try {
      const aiResult = await generateFromDescriptionAction({
        description: companyDescription,
        placeId: formData.placeId || undefined,
      })

      if (aiResult.success && aiResult.data) {
        const data = aiResult.data
        // Auto-fill form with generated data
        setFormData({
          ...formData,
          businessName: data.business.name,
          city: data.business.city,
          state: data.business.state,
          phone: data.business.phone,
          offerText: data.offer.shortText,
          primaryColor: data.branding.primaryColor,
          accentColor: data.branding.accentColor,
          services: data.services.map(s => `${s.name}\n${s.description}`).join('\n\n'),
          areasServed: data.areasServed.join('\n'),
          hours: data.hours || '',
        })
        setFormGenerated(true)
      } else {
        setResult({
          success: false,
          error: aiResult.error || 'Failed to generate content',
        })
      }
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
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
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B0B] via-[#111111] to-[#0B0B0B] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Preview Generator
              </h1>
              <p className="text-[#CFCFCF]">
                Paste company details and let AI generate everything
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-6">
            {/* Step 1: Company Description Input */}
            {!formGenerated && (
              <div className="bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-[#FF6A55]/30 rounded-2xl shadow-lg shadow-[#FF6A55]/10 p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6A55]/20 to-[#7B63FF]/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-[#FF6A55]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Company Description
                    </h2>
                    <p className="text-sm text-[#9A9A9A]">
                      Paste all company details here (name, location, services, etc.)
                    </p>
                  </div>
                </div>
                <Textarea
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  placeholder="Example: Elite Cleaning Services is a family-owned cleaning business in Los Angeles, CA. We offer residential and commercial cleaning, deep cleaning, move-in/move-out services, window cleaning, and carpet cleaning. We serve Los Angeles, Beverly Hills, Santa Monica, West Hollywood, and surrounding areas. Phone: +1 555-123-4567. We specialize in eco-friendly cleaning products and have been in business since 2010. Hours: Mon-Fri 8am-6pm, Sat 9am-5pm."
                  rows={12}
                  className="bg-[#111111] border-[#FF6A55]/30 text-white placeholder:text-[#9A9A9A] focus:border-[#FF6A55] focus:ring-[#FF6A55]/50"
                />
                <Button
                  type="button"
                  onClick={handleGenerateFromDescription}
                  disabled={aiGenerating || !companyDescription.trim()}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#FF6A55] to-[#7B63FF] hover:from-[#FF7A65] hover:to-[#8B73FF] text-white shadow-lg shadow-[#FF6A55]/30 hover:shadow-xl hover:shadow-[#FF6A55]/40 transition-all"
                >
                  {aiGenerating ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      AI is generating your content...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Generate Preview Content
                    </span>
                  )}
                </Button>
                {result?.error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-red-400">{result.error}</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Generated Form (editable) */}
            {formGenerated && (
              <form onSubmit={handleSubmit} className="space-y-6">
              {/* Template Selection */}
              <div className="bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-[#FF6A55]/30 rounded-2xl shadow-lg shadow-[#FF6A55]/10 p-6">
                <label className="block text-sm font-medium text-white mb-2">
                  Template *
                </label>
                <select
                  required
                  value={formData.templateId}
                  onChange={(e) =>
                    setFormData({ ...formData, templateId: e.target.value })
                  }
                  className="flex h-12 w-full rounded-md border border-[#FF6A55]/30 bg-[#111111] text-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A55]/50 focus-visible:border-[#FF6A55] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {TEMPLATE_REGISTRY.map((template) => (
                    <option key={template.id} value={template.id} className="bg-[#111111]">
                      {template.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-[#9A9A9A] mt-1.5">
                  Choose the template design for your preview
                </p>
              </div>

              {/* Business Info */}
              <div className="bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-[#FF6A55]/30 rounded-2xl shadow-lg shadow-[#FF6A55]/10 p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-[#FF6A55]/20">
                  <h2 className="text-xl font-semibold text-white">
                    Business Information
                  </h2>
                  <Button
                    type="button"
                    onClick={() => {
                      setFormGenerated(false)
                      setCompanyDescription('')
                    }}
                    variant="outline"
                    className="flex items-center gap-2 border-[#FF6A55]/30 hover:bg-[#FF6A55]/10 text-[#FF6A55]"
                  >
                    <Sparkles className="h-4 w-4" />
                    Regenerate
                  </Button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Business Name *
                  </label>
                  <Input
                    required
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    placeholder="Elite Cleaning Services"
                    className="bg-[#111111] border-[#FF6A55]/30 text-white placeholder:text-[#9A9A9A] focus:border-[#FF6A55] focus:ring-[#FF6A55]/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      City *
                    </label>
                    <Input
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="Los Angeles"
                      className="bg-[#111111] border-[#FF6A55]/30 text-white placeholder:text-[#9A9A9A] focus:border-[#FF6A55] focus:ring-[#FF6A55]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
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
                      className="bg-[#111111] border-[#FF6A55]/30 text-white placeholder:text-[#9A9A9A] focus:border-[#FF6A55] focus:ring-[#FF6A55]/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
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
                    className="bg-[#111111] border-[#FF6A55]/30 text-white placeholder:text-[#9A9A9A] focus:border-[#FF6A55] focus:ring-[#FF6A55]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Google Place ID *
                  </label>
                  <Input
                    required
                    value={formData.placeId}
                    onChange={(e) =>
                      setFormData({ ...formData, placeId: e.target.value })
                    }
                    placeholder="ChIJN1t_tDeuEmsRUsoyG83frY4"
                    className="bg-[#111111] border-[#FF6A55]/30 text-white placeholder:text-[#9A9A9A] focus:border-[#FF6A55] focus:ring-[#FF6A55]/50 font-mono"
                  />
                  <p className="text-xs text-[#9A9A9A] mt-1.5">
                    Used to generate Google review button link
                  </p>
                </div>
              </div>

              {/* Offer */}
              <div className="bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-[#FF6A55]/30 rounded-2xl shadow-lg shadow-[#FF6A55]/10 p-6">
                <label className="block text-sm font-medium text-white mb-2">
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
                  className="bg-[#111111] border-[#FF6A55]/30 text-white placeholder:text-[#9A9A9A] focus:border-[#FF6A55] focus:ring-[#FF6A55]/50"
                />
              </div>

              {/* Branding */}
              <div className="bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-[#FF6A55]/30 rounded-2xl shadow-lg shadow-[#FF6A55]/10 p-6 space-y-4">
                <h2 className="text-xl font-semibold text-white pb-4 border-b border-[#FF6A55]/20">
                  Branding
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
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
                        className="w-16 h-12 p-1 cursor-pointer border-[#FF6A55]/30 bg-[#111111]"
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
                        className="bg-[#111111] border-[#FF6A55]/30 text-white focus:border-[#FF6A55] focus:ring-[#FF6A55]/50 font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
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
                        className="w-16 h-12 p-1 cursor-pointer border-[#FF6A55]/30 bg-[#111111]"
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
                        className="bg-[#111111] border-[#FF6A55]/30 text-white focus:border-[#FF6A55] focus:ring-[#FF6A55]/50 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-[#FF6A55]/30 rounded-2xl shadow-lg shadow-[#FF6A55]/10 p-6">
                <label className="block text-sm font-medium text-white mb-2">
                  Services * <span className="text-[#9A9A9A] font-normal">(3-6 services with descriptions)</span>
                </label>
                <Textarea
                  required
                  value={formData.services}
                  onChange={(e) =>
                    setFormData({ ...formData, services: e.target.value })
                  }
                  placeholder="Residential Cleaning&#10;Thorough cleaning of homes and apartments...&#10;&#10;Commercial Cleaning&#10;Professional office and commercial space cleaning..."
                  rows={8}
                  className="bg-[#111111] border-[#FF6A55]/30 text-white placeholder:text-[#9A9A9A] focus:border-[#FF6A55] focus:ring-[#FF6A55]/50 font-mono text-sm"
                />
              </div>

              {/* Areas Served */}
              <div className="bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-[#FF6A55]/30 rounded-2xl shadow-lg shadow-[#FF6A55]/10 p-6">
                <label className="block text-sm font-medium text-white mb-2">
                  Areas Served * <span className="text-[#9A9A9A] font-normal">(5-15 areas, one per line)</span>
                </label>
                <Textarea
                  required
                  value={formData.areasServed}
                  onChange={(e) =>
                    setFormData({ ...formData, areasServed: e.target.value })
                  }
                  placeholder="Los Angeles&#10;Beverly Hills&#10;Santa Monica&#10;West Hollywood"
                  rows={6}
                  className="bg-[#111111] border-[#FF6A55]/30 text-white placeholder:text-[#9A9A9A] focus:border-[#FF6A55] focus:ring-[#FF6A55]/50 font-mono text-sm"
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
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#FF6A55] to-[#7B63FF] hover:from-[#FF7A65] hover:to-[#8B73FF] text-white shadow-lg shadow-[#FF6A55]/30 hover:shadow-xl hover:shadow-[#FF6A55]/40 transition-all"
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
            )}
          </div>

          {/* Right: Preview Summary Card */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-[#FF6A55]/30 rounded-2xl shadow-lg shadow-[#FF6A55]/10 p-6 space-y-6">
              <div className="pb-4 border-b border-[#FF6A55]/20">
                <h2 className="text-xl font-semibold text-white">
                  Generated Output
                </h2>
                <p className="text-sm text-[#9A9A9A] mt-1">
                  {formGenerated ? 'Review and edit the generated content, then submit' : 'Paste company description to get started'}
                </p>
              </div>

              {result?.success ? (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="font-medium text-green-400">Preview generated successfully!</span>
                  </div>

                  {result.templateName && (
                    <div className="p-3 bg-[#111111] rounded-lg border border-[#FF6A55]/20">
                      <div className="text-xs text-[#9A9A9A] mb-1">Template</div>
                      <div className="text-sm font-semibold text-white">{result.templateName}</div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-[#CFCFCF] mb-2 block uppercase tracking-wide">
                        Slug
                      </label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-[#111111] border border-[#FF6A55]/30 px-3 py-2 rounded-lg text-sm text-white font-mono">
                          {result.slug}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(result.slug!, 'slug')}
                          className="border-[#FF6A55]/30 hover:bg-[#FF6A55]/10 text-[#FF6A55]"
                        >
                          {copied === 'slug' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-[#CFCFCF] mb-2 block uppercase tracking-wide">
                        Preview URL
                      </label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-[#111111] border border-[#FF6A55]/30 px-3 py-2 rounded-lg text-xs text-white break-all font-mono">
                          {result.previewUrl}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(result.previewUrl!, 'preview')}
                          className="border-[#FF6A55]/30 hover:bg-[#FF6A55]/10 text-[#FF6A55] flex-shrink-0"
                        >
                          {copied === 'preview' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-[#CFCFCF] mb-2 block uppercase tracking-wide">
                        Review URL
                      </label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-[#111111] border border-[#FF6A55]/30 px-3 py-2 rounded-lg text-xs text-white break-all font-mono">
                          {result.reviewUrl}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(result.reviewUrl!, 'review')}
                          className="border-[#FF6A55]/30 hover:bg-[#FF6A55]/10 text-[#FF6A55] flex-shrink-0"
                        >
                          {copied === 'review' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-[#FF6A55]/20">
                    <Button
                      className="flex-1 bg-gradient-to-r from-[#FF6A55] to-[#7B63FF] hover:from-[#FF7A65] hover:to-[#8B73FF] text-white shadow-md hover:shadow-lg"
                      onClick={() => window.open(result.previewUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Preview
                    </Button>
                  </div>
                </div>
              ) : result?.error ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <span className="font-medium text-red-400">Error</span>
                  </div>
                  <p className="text-sm text-[#CFCFCF] bg-[#111111] p-3 rounded-lg border border-[#FF6A55]/20">
                    {result.error}
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#111111] mb-4 border border-[#FF6A55]/30">
                    <Sparkles className="h-8 w-8 text-[#FF6A55]" />
                  </div>
                  <p className="text-sm text-[#CFCFCF] font-medium">
                    {formGenerated ? 'Review the generated content and click "Generate Preview"' : 'Paste company description to get started'}
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

