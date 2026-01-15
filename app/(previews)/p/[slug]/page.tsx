import { notFound } from 'next/navigation'
import { getPreviewBySlug } from '@/lib/previews/repo'
import { applyPreviewDefaults, validateConfigSafe } from '@/lib/previews/helpers'
import { isLegacyConfig, migrateToPreviewConfig } from '@/lib/previews/types'
import { renderTemplate } from '@/lib/templates/render'

// Force dynamic rendering for preview pages
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PreviewPageProps {
  params: Promise<{ slug: string }>
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params
  
  console.log('[PreviewPage] Attempting to load preview with slug:', slug)
  console.log('[PreviewPage] Environment check - SUPABASE_URL exists:', !!process.env.SUPABASE_URL)
  console.log('[PreviewPage] Environment check - SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)

  // Fetch config from database
  let previewRow
  try {
    previewRow = await getPreviewBySlug(slug)
    console.log('[PreviewPage] Database query completed, result:', previewRow ? 'found' : 'not found')
  } catch (error) {
    console.error('[PreviewPage] Database error:', error)
    // Return a more helpful error page in development
    if (process.env.NODE_ENV === 'development') {
      throw error
    }
    notFound()
  }

  if (!previewRow) {
    console.error('[PreviewPage] Preview not found for slug:', slug)
    notFound()
  }
  
  console.log('[PreviewPage] Found preview:', previewRow.id, previewRow.slug)

  // Normalize legacy config and apply defaults to ensure template never crashes
  const normalizedConfig = isLegacyConfig(previewRow.config)
    ? migrateToPreviewConfig(previewRow.config)
    : previewRow.config
  const config = applyPreviewDefaults(normalizedConfig)

  // Validate config is safe
  try {
    validateConfigSafe(config)
  } catch (error) {
    console.error('Invalid preview config:', error)
    notFound()
  }

  // Render template by templateId
  return renderTemplate(config.templateId, config)
}

