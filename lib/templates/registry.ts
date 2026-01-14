import type { BusinessNiche } from '@/lib/previews/types'
import { NICHE_DISPLAY_NAMES } from '@/lib/previews/niche-defaults'

export interface Template {
  id: string
  niche: BusinessNiche
  name: string
  description: string
  thumbnail?: string
  features?: string[]
}

/**
 * Template registry - all available templates
 * The Universal Premium template works for all niches
 */
export const TEMPLATE_REGISTRY: Template[] = [
  // Universal template that adapts to any niche
  {
    id: 'universal-v1',
    niche: 'cleaning', // Base niche, but works for all
    name: 'Universal Premium V1',
    description: 'High-converting animated landing page that adapts to any industry',
    features: [
      'Multi-niche support',
      'Immersive animations',
      'Mobile-first design',
      'Conversion optimized',
    ],
  },
  // Legacy cleaning template (backward compatible)
  {
    id: 'cleaning-v1',
    niche: 'cleaning',
    name: 'Cleaning — Premium V1',
    description: 'High-converting animated landing for cleaning businesses',
    features: [
      'Cleaning-focused content',
      'Trust badges',
      'Service cards',
      'Review carousel',
    ],
  },
]

/**
 * Get all templates for a specific niche
 * Universal templates are always included
 */
export function getTemplatesByNiche(niche: BusinessNiche): Template[] {
  return TEMPLATE_REGISTRY.filter(
    (template) => 
      template.niche === niche || 
      template.id.startsWith('universal')
  )
}

/**
 * Get a template by ID
 */
export function getTemplateById(templateId: string): Template | undefined {
  return TEMPLATE_REGISTRY.find((template) => template.id === templateId)
}

/**
 * Get all available niches
 */
export function getAllNiches(): BusinessNiche[] {
  return Object.keys(NICHE_DISPLAY_NAMES) as BusinessNiche[]
}

/**
 * Get niche display name
 */
export function getNicheDisplayName(niche: BusinessNiche): string {
  return NICHE_DISPLAY_NAMES[niche] || 'Service Business'
}

/**
 * Get the best template for a niche
 */
export function getDefaultTemplateForNiche(niche: BusinessNiche): Template {
  // First try to find a niche-specific template
  const nicheTemplate = TEMPLATE_REGISTRY.find(t => t.niche === niche && !t.id.startsWith('universal'))
  if (nicheTemplate) return nicheTemplate
  
  // Fall back to universal template
  const universalTemplate = TEMPLATE_REGISTRY.find(t => t.id.startsWith('universal'))
  if (universalTemplate) return universalTemplate
  
  // Final fallback
  return TEMPLATE_REGISTRY[0]
}
