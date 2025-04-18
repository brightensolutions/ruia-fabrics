import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import Contact from "@/lib/Models/Contact"
import { revalidatePath } from "next/cache"

// Get contact information
export async function GET() {
  try {
    await ConnectDb()

    // Find active contact info or create default if none exists
    let contactInfo = await Contact.findOne({ active: true })

    if (!contactInfo) {
      contactInfo = await Contact.create({
        phone: "+91 7021418483",
        email: "admin@ruiafabrics.com",
        headOfficeAddress: "Ruia Fabrics Pvt Ltd, A2/187 Shah & Nahar Ind Est, Lower Parel- West, Mumbai : 400013",
        factoryAddress:
          "Govindji Industrial Park-3, Plot No: 0-168/ 0-171, Near Hotel Sabar, Palsana Road, Surat : 394315, Gujarat",
        title: "Contact Us",
        subtitle: "We'd love to hear from you! Reach out using the contact information below.",
        active: true,
      })
    }

    return NextResponse.json(contactInfo)
  } catch (error) {
    console.error("Error fetching contact information:", error)
    return NextResponse.json({ error: "Failed to fetch contact information" }, { status: 500 })
  }
}

// Update contact information
export async function PUT(req: NextRequest) {
  try {
    await ConnectDb()

    const data = await req.json()

    // Find existing contact info or create new one
    let contactInfo = await Contact.findOne({ active: true })

    if (contactInfo) {
      // Update existing content
      contactInfo = await Contact.findByIdAndUpdate(contactInfo._id, { ...data }, { new: true })
    } else {
      // Create new content
      contactInfo = await Contact.create({
        ...data,
        active: true,
      })
    }

    revalidatePath("/")
    return NextResponse.json(contactInfo)
  } catch (error) {
    console.error("Error updating contact information:", error)
    return NextResponse.json({ error: "Failed to update contact information" }, { status: 500 })
  }
}
