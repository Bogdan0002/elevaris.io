import { supabaseServer } from '@/lib/db/supabaseServer'
import { cleaningPreviewConfigSchema } from './schema'
import type { CleaningPreviewConfig, ClientPreviewRow } from './types'

/**
 * Create a new preview configuration
 */
export async function createPreview(
  config: CleaningPreviewConfig
): Promise<ClientPreviewRow> {
  // Validate config
  const validated = cleaningPreviewConfigSchema.parse(config)

  const { data, error } = await supabaseServer
    .from('client_previews')
    .insert({
      slug: validated.slug,
      niche: validated.niche,
      status: 'preview',
      config: validated,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create preview: ${error.message}`)
  }

  return data as ClientPreviewRow
}

/**
 * Get preview by slug
 */
export async function getPreviewBySlug(slug: string): Promise<ClientPreviewRow | null> {
  const { data, error } = await supabaseServer
    .from('client_previews')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null
    }
    throw new Error(`Failed to fetch preview: ${error.message}`)
  }

  return data as ClientPreviewRow
}

/**
 * Update preview configuration
 */
export async function updatePreview(
  slug: string,
  partialConfig: Partial<CleaningPreviewConfig>
): Promise<ClientPreviewRow> {
  // Get existing config
  const existing = await getPreviewBySlug(slug)
  if (!existing) {
    throw new Error(`Preview with slug "${slug}" not found`)
  }

  // Merge with existing config
  const mergedConfig = {
    ...existing.config,
    ...partialConfig,
    // Ensure slug, niche, and templateId don't change
    slug: existing.config.slug,
    niche: existing.config.niche,
    templateId: existing.config.templateId,
  }

  // Validate merged config
  const validated = cleaningPreviewConfigSchema.parse(mergedConfig)

  const { data, error } = await supabaseServer
    .from('client_previews')
    .update({
      config: validated,
      updated_at: new Date().toISOString(),
    })
    .eq('slug', slug)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update preview: ${error.message}`)
  }

  return data as ClientPreviewRow
}

/**
 * List all previews with optional search
 */
export async function listPreviews(options?: {
  search?: string
  limit?: number
}): Promise<ClientPreviewRow[]> {
  let query = supabaseServer
    .from('client_previews')
    .select('*')
    .order('created_at', { ascending: false })

  if (options?.search) {
    const searchTerm = `%${options.search.toLowerCase()}%`
    // Search in slug and JSONB fields
    // Note: Supabase JSONB search syntax
    query = query.or(
      `slug.ilike.${searchTerm},config->>business->>name.ilike.${searchTerm},config->>business->>city.ilike.${searchTerm}`
    )
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to list previews: ${error.message}`)
  }

  return (data || []) as ClientPreviewRow[]
}

