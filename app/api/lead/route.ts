import { NextRequest, NextResponse } from "next/server"
import { leadSchema } from "@/lib/validation/leadSchema"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate with Zod
    const validationResult = leadSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Honeypot check - if filled, it's a bot
    if (data.honeypot && data.honeypot.length > 0) {
      // Silent success to avoid alerting bots
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Here you would typically save to a database
    // For now, we'll just log it
    console.log("Lead submission:", {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      additionalInfo: data.additionalInfo,
      smsConsent: data.smsConsent,
    })

    // TODO: Save to database (e.g., Prisma, Supabase, etc.)
    // await db.lead.create({ data: { ... } })

    // TODO: Send email notification
    // await sendEmail({ ... })

    return NextResponse.json(
      { success: true, message: "Lead submitted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing lead:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

