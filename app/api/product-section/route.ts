import { put, del } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import ProductSection from "@/lib/Models/ProductSection"
import ConnectDb from "@/lib/db/db"

export async function GET() {
  try {
    await ConnectDb()
    let section = await ProductSection.findOne()

    if (!section) {
      // Create default section if none exists
      section = await ProductSection.create({
        title: "Our Products",
        description:
          "Ruia Fabrics has grown into a global leader in high-quality Linen, Velvet and Viscose fabrics. With a longstanding commitment to innovation and excellence, we offer a diverse range of fabrics—including Viscose/Rayon Velvet, synthetic Velvet, and Cotton Velvet—designed to meet the needs of various applications across industries.",
        image: "/company/014A7572.JPG",
        linkHref: "/compnay/contact-us",
        linkLabel: "Contact Us",
      })
    }

    return NextResponse.json(section)
  } catch (error) {
    console.error("Error fetching product section:", error)
    return NextResponse.json({ error: "Failed to fetch product section" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await ConnectDb()

    const formData = await request.formData()
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const linkHref = formData.get("linkHref") as string
    const linkLabel = formData.get("linkLabel") as string

    const imageFile = formData.get("image") as File | null

    let section = await ProductSection.findOne()
    if (!section) {
      section = new ProductSection()
    }

    section.title = title
    section.description = description
    section.linkHref = linkHref
    section.linkLabel = linkLabel

    // Upload image to Vercel Blob if provided
    if (imageFile && imageFile.size > 0) {
      // Delete old blob if exists
      if (section.blobUrl) {
        try {
          await del(section.blobUrl)
        } catch (error) {
          console.error("Error deleting old image blob:", error)
        }
      }

      const blob = await put(`product-section/${Date.now()}-${imageFile.name}`, imageFile, {
        access: "public",
      })
      section.image = blob.url
      section.blobUrl = blob.url
    }

    await section.save()

    return NextResponse.json(section)
  } catch (error) {
    console.error("Error updating product section:", error)
    return NextResponse.json({ error: "Failed to update product section" }, { status: 500 })
  }
}
