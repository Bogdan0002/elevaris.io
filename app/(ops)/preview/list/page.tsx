'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, ExternalLink, CheckCircle2, AlertCircle, Search } from 'lucide-react'
import { getGoogleReviewUrl } from '@/lib/previews/helpers'

interface PreviewRow {
  id: string
  slug: string
  niche: string
  status: string
  created_at: string
  config: {
    business: { name: string; city: string; state: string }
    placeId: string
  }
}

export default function ListPreviewsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const key = searchParams.get('key')

  const [previews, setPreviews] = useState<PreviewRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  // Access gate
  if (!key || key !== OPS_KEY) {
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

  useEffect(() => {
    fetchPreviews()
  }, [search])

  const fetchPreviews = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      params.set('key', key)

      const response = await fetch(`/api/previews/list?${params.toString()}`)
      const data = await response.json()
      setPreviews(data)
    } catch (error) {
      console.error('Failed to fetch previews:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const getPreviewUrl = (slug: string) => `https://p.elevaris.app/${slug}`
  const getReviewUrl = (placeId: string) => getGoogleReviewUrl(placeId)

  return (
    <div className="min-h-screen bg-[#0B0B0B] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Preview List
              </h1>
              <p className="text-foreground-secondary">
                View and manage all generated previews
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push(`/preview?key=${key}`)}
            >
              Create New
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
            <Input
              placeholder="Search by name, city, or slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-white/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-foreground-secondary">
              Loading...
            </div>
          ) : previews.length === 0 ? (
            <div className="p-12 text-center text-foreground-secondary">
              No previews found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-foreground-secondary">
                      Business Name
                    </th>
                    <th className="text-left p-4 text-sm font-semibold text-foreground-secondary">
                      Location
                    </th>
                    <th className="text-left p-4 text-sm font-semibold text-foreground-secondary">
                      Created
                    </th>
                    <th className="text-left p-4 text-sm font-semibold text-foreground-secondary">
                      Status
                    </th>
                    <th className="text-right p-4 text-sm font-semibold text-foreground-secondary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {previews.map((preview) => {
                    const previewUrl = getPreviewUrl(preview.slug)
                    const reviewUrl = getReviewUrl(preview.config.placeId)
                    return (
                      <tr
                        key={preview.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4">
                          <div className="font-medium text-foreground">
                            {preview.config.business.name}
                          </div>
                          <div className="text-xs text-foreground-muted mt-1">
                            {preview.slug}
                          </div>
                        </td>
                        <td className="p-4 text-foreground-secondary">
                          {preview.config.business.city}, {preview.config.business.state}
                        </td>
                        <td className="p-4 text-foreground-secondary text-sm">
                          {new Date(preview.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                              preview.status === 'preview'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-green-500/20 text-green-400'
                            }`}
                          >
                            {preview.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(previewUrl, '_blank')}
                              title="Open Preview"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(previewUrl, `preview-${preview.id}`)
                              }
                              title="Copy Preview Link"
                            >
                              {copied === `preview-${preview.id}` ? (
                                <CheckCircle2 className="h-4 w-4 text-green-400" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(reviewUrl, `review-${preview.id}`)
                              }
                              title="Copy Review Link"
                            >
                              {copied === `review-${preview.id}` ? (
                                <CheckCircle2 className="h-4 w-4 text-green-400" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

