import { NextResponse } from 'next/server'
import { getPreviewBySlug, listPreviews } from '@/lib/previews/repo'
import { assertOpsRequest, OpsAuthError } from '@/lib/ops/guard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    await assertOpsRequest(request)
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    // Check environment
    const envCheck = {
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      OPS_ACCESS_KEY: !!process.env.OPS_ACCESS_KEY,
    }

    // If slug provided, check specific preview
    if (slug) {
      try {
        const preview = await getPreviewBySlug(slug)
        return NextResponse.json({
          success: true,
          envCheck,
          slug,
          found: !!preview,
          preview: preview ? {
            id: preview.id,
            slug: preview.slug,
            niche: preview.niche,
            status: preview.status,
            created_at: preview.created_at,
            businessName: preview.config?.business?.name,
          } : null,
        })
      } catch (error) {
        return NextResponse.json({
          success: false,
          envCheck,
          slug,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    // List all previews (limited)
    try {
      const previews = await listPreviews({ limit: 10 })
      return NextResponse.json({
        success: true,
        envCheck,
        totalPreviews: previews.length,
        previews: previews.map(p => ({
          id: p.id,
          slug: p.slug,
          businessName: p.config?.business?.name,
          created_at: p.created_at,
        })),
      })
    } catch (error) {
      return NextResponse.json({
        success: false,
        envCheck,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  } catch (error) {
    if (error instanceof OpsAuthError) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Debug error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}


