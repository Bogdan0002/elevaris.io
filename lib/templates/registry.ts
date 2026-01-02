export interface Template {
  id: string
  niche: string
  name: string
  description: string
}

export const TEMPLATE_REGISTRY: Template[] = [
  {
    id: 'cleaning-v1',
    niche: 'cleaning',
    name: 'Cleaning — Premium V1',
    description: 'High-converting animated landing',
  },
]

/**
 * Get all templates for a specific niche
 */
export function getTemplatesByNiche(niche: string): Template[] {
  return TEMPLATE_REGISTRY.filter((template) => template.niche === niche)
}

/**
 * Get a template by ID
 */
export function getTemplateById(templateId: string): Template | undefined {
  return TEMPLATE_REGISTRY.find((template) => template.id === templateId)
}

/**
 * Get all niches
 */
export function getAllNiches(): string[] {
  return Array.from(new Set(TEMPLATE_REGISTRY.map((t) => t.niche)))
}

