import { NextRequest, NextResponse } from 'next/server'
import { listPreviews } from '@/lib/previews/repo'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || undefined
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : undefined

    const previews = await listPreviews({ search, limit })

    return NextResponse.json(previews)
  } catch (error) {
    console.error('Error listing previews:', error)
    return NextResponse.json(
      { error: 'Failed to list previews' },
      { status: 500 }
    )
  }
}

