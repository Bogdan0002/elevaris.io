import { NextResponse } from 'next/server'
import { createPreview } from '@/lib/previews/repo'
import type { CleaningPreviewConfig } from '@/lib/previews/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const config = await request.json() as CleaningPreviewConfig

    // Create the preview
    const preview = await createPreview(config)

    return NextResponse.json({
      success: true,
      preview,
      url: `https://p.elevaris.app/${preview.slug}`,
    })
  } catch (error) {
    console.error('Error creating preview:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}

