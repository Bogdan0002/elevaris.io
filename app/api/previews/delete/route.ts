import { NextResponse } from 'next/server'
import { deletePreview, deletePreviewById } from '@/lib/previews/repo'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function DELETE(request: Request) {
  try {
    // Check for API key
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    
    if (key !== process.env.OPS_ACCESS_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { slug, id } = body

    if (!slug && !id) {
      return NextResponse.json(
        { success: false, error: 'Must provide either slug or id' },
        { status: 400 }
      )
    }

    // Delete by slug or id
    if (slug) {
      await deletePreview(slug)
    } else if (id) {
      await deletePreviewById(id)
    }

    return NextResponse.json({
      success: true,
      message: `Preview ${slug || id} deleted successfully`,
    })
  } catch (error) {
    console.error('Error deleting preview:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}


