import { NextResponse } from 'next/server'
import { createPreview } from '@/lib/previews/repo'
import { previewConfigSchema } from '@/lib/previews/schema'
import type { PreviewConfig } from '@/lib/previews/types'
import { assertOpsRequest, OpsAuthError } from '@/lib/ops/guard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    await assertOpsRequest(request)
    const parsed = previewConfigSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid preview config' }, { status: 400 })
    }
    const preview = await createPreview({ ...parsed.data, placeId: parsed.data.placeId || '' } as PreviewConfig)

    return NextResponse.json({
      success: true,
      preview,
      url: `https://elevaris.app/p/${preview.slug}`,
    })
  } catch (error) {
    if (error instanceof OpsAuthError) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
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


