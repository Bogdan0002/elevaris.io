import { NextResponse } from 'next/server'
import { createPreview } from '@/lib/previews/repo'
import type { PreviewConfig } from '@/lib/previews/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const config = await request.json() as PreviewConfig

    // Create the preview
    const preview = await createPreview(config)

    return NextResponse.json({
      success: true,
      preview,
      url: `https://elevaris.app/p/${preview.slug}`,
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


