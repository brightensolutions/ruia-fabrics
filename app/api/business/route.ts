import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import Business from "@/lib/Models/Business"
import { put } from "@vercel/blob"

export async function GET() {
  try {
    await ConnectDb()
    const businesses = await Business.find().sort({ order: 1 })
    return NextResponse.json(businesses)
  } catch (error) {
    console.error("Error fetching businesses:", error)
    return NextResponse.json({ error: "Failed to fetch businesses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await ConnectDb()

    const formData = await request.formData()
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const titleColor = formData.get("titleColor") as string
    const paragraphColor = formData.get("paragraphColor") as string
    const sectionId = formData.get("sectionId") as string
    const bgcolor = formData.get("bgcolor") as string
    const sectioncolor = formData.get("sectioncolor") as string
    const btncolor = formData.get("btncolor") as string

    // Handle main image upload
    const mainImageFile = formData.get("mainImage") as File
    let mainImageUrl = ""

    if (mainImageFile && mainImageFile.size > 0) {
      const mainImageBlob = await put(mainImageFile.name, mainImageFile, {
        access: "public",
      })
      mainImageUrl = mainImageBlob.url
    } else {
      return NextResponse.json({ error: "Main image is required" }, { status: 400 })
    }

    // Handle optional overlay image upload
    const overlayImageFile = formData.get("overlayImage") as File
    let overlayImageUrl = ""

    if (overlayImageFile && overlayImageFile.size > 0) {
      const overlayImageBlob = await put(overlayImageFile.name, overlayImageFile, {
        access: "public",
      })
      overlayImageUrl = overlayImageBlob.url
    }

    // Get the highest order value
    const highestOrder = await Business.findOne().sort({ order: -1 }).select("order")
    const newOrder = highestOrder ? highestOrder.order + 1 : 0

    const newBusiness = new Business({
      title,
      description,
      titleColor,
      paragraphColor,
      mainImage: mainImageUrl,
      overlayImage: overlayImageUrl || undefined,
      order: newOrder,
      sectionId,
      bgcolor,
      sectioncolor,
      btncolor,
    })

    await newBusiness.save()
    return NextResponse.json(newBusiness)
  } catch (error) {
    console.error("Error creating business:", error)
    return NextResponse.json({ error: "Failed to create business" }, { status: 500 })
  }
}
