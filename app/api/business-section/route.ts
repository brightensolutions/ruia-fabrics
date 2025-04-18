import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db/db"
import BusinessSection from "@/lib/Models/BusinessSection"
import { del } from "@vercel/blob"

export async function GET() {
  try {
    await dbConnect()
    let section = await BusinessSection.findOne()

    // Create default section if none exists
    if (!section) {
      section = await BusinessSection.create({
        title: "Business",
        description: "",
        imageUrl: "/images/banner1.webp",
        buttonText: "Contact Us",
        buttonLink: "/compnay/contact-us",
      })
    }

    return NextResponse.json(section)
  } catch (error) {
    console.error("Error fetching business section:", error)
    return NextResponse.json({ error: "Failed to fetch business section" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()
    const formData = await request.formData()

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const buttonText = formData.get("buttonText") as string
    const buttonLink = formData.get("buttonLink") as string

    let section = await BusinessSection.findOne()

    // Create default section if none exists
    if (!section) {
      section = new BusinessSection({
        title,
        description,
        imageUrl: "/images/banner1.webp",
        buttonText,
        buttonLink,
      })
    } else {
      section.title = title
      section.description = description
      section.buttonText = buttonText
      section.buttonLink = buttonLink
    }

    // Handle image upload if a new image is provided
    const imageFile = formData.get("image") as File

    if (imageFile && imageFile.size > 0) {
      const response = await fetch(`${process.env.BLOB_UPLOAD_URL}`, {
        method: "POST",
        headers: {
          "x-api-key": process.env.BLOB_API_KEY || "",
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const result = await response.json()

      // Delete old image if it exists and is not the default
      if (section.imageUrl && section.imageUrl.startsWith("https://") && section.imageUrl !== "/images/banner1.webp") {
        try {
          // Pass the URL string directly to del()
          await del(section.imageUrl)
        } catch (error) {
          console.error("Error deleting old image:", error)
        }
      }

      section.imageUrl = result.url
    }

    await section.save()
    return NextResponse.json(section)
  } catch (error) {
    console.error("Error updating business section:", error)
    return NextResponse.json({ error: "Failed to update business section" }, { status: 500 })
  }
}
