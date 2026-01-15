import { notFound } from 'next/navigation'
import type { PreviewConfig } from '@/lib/previews/types'

// Dynamic imports for templates
const templateComponents: Record<string, () => Promise<{ default: React.ComponentType<{ config: PreviewConfig }> }>> = {
  'cleaning-v1': () => import('@/components/templates/cleaning/v1/Template'),
  // Universal template currently maps to cleaning template (dynamic content drives niche)
  'universal-v1': () => import('@/components/templates/cleaning/v1/Template'),
}

/**
 * Render a preview template based on templateId
 */
export async function renderTemplate(
  templateId: string,
  config: PreviewConfig
) {
  const templateLoader = templateComponents[templateId]

  if (!templateLoader) {
    console.error(`Unknown templateId: ${templateId}`)
    notFound()
  }

  try {
    const TemplateModule = await templateLoader()
    const Template = TemplateModule.default
    return <Template config={config} />
  } catch (error) {
    console.error(`Failed to load template ${templateId}:`, error)
    notFound()
  }
}


