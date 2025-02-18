import { type NextRequest, NextResponse } from "next/server"
import Contact from "@/lib/Models/Contact"
import ConnectDb from "@/lib/db/db"

export async function PUT(req: NextRequest) {
  try {
    await ConnectDb()

    const body = await req.json()
    const { phone, email, address } = body

    if (!phone || !email || !address) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    let contact = await Contact.findOne()
    if (!contact) {
      contact = new Contact({ phone, email, address })
    } else {
      contact.phone = phone
      contact.email = email
      contact.address = address
    }

    await contact.save()

    return NextResponse.json({ message: "Contact updated successfully", contact }, { status: 200 })
  } catch (error) {
    console.error("Error updating contact:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    await ConnectDb()

    const contact = await Contact.findOne()
    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json({ contact }, { status: 200 })
  } catch (error) {
    console.error("Error fetching contact:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

