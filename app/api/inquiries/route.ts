import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import Inquiry from "@/lib/Models/Inquiry"

export async function POST(req: NextRequest) {
  try {
    await ConnectDb()

    const body = await req.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const inquiry = new Inquiry({
      name,
      email,
      phone,
      subject,
      message,
    })

    await inquiry.save()

    return NextResponse.json({ message: "Inquiry submitted successfully", inquiry }, { status: 201 })
  } catch (error) {
    console.error("Error submitting inquiry:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    await ConnectDb()

    const { searchParams } = new URL(req.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const tab = searchParams.get("tab") || "all"

    const skip = (page - 1) * limit

    let query = {}
    if (tab === "today") {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      query = {
        createdAt: {
          $gte: today,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      }
    }

    const [inquiries, total] = await Promise.all([
      Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Inquiry.countDocuments(query),
    ])

    return NextResponse.json({
      inquiries,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    })
  } catch (error) {
    console.error("Error fetching inquiries:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

