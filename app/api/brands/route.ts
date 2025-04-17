import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import Brand from "@/lib/Models/Brand"
import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"

// Get all brands
export async function GET() {
  try {
    await ConnectDb()
    const brands = await Brand.find({ active: true }).sort({ order: 1 })
    return NextResponse.json(brands)
  } catch (error) {
    console.error("Error fetching brands:", error)
    return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 })
  }
}

// Create a new brand
export async function POST(req: NextRequest) {
  try {
    await ConnectDb()

    const formData = await req.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 })
    }

    // Get the highest order value and add 1 for the new brand
    const highestOrderBrand = await Brand.findOne().sort({ order: -1 })
    const newOrder = highestOrderBrand ? highestOrderBrand.order + 1 : 0

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    })

    // Create new brand in database
    const newBrand = await Brand.create({
      image: blob.url,
      order: newOrder,
      blobUrl: blob.url,
    })

    revalidatePath("/admin/brands")
    return NextResponse.json(newBrand)
  } catch (error) {
    console.error("Error creating brand:", error)
    return NextResponse.json({ error: "Failed to create brand" }, { status: 500 })
  }
}

// Update brand order (for drag and drop)
export async function PATCH(req: NextRequest) {
  try {
    await ConnectDb()

    const data = await req.json()
    const { items } = data

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    // Update each brand's order
    const updatePromises = items.map((item, index) => {
      return Brand.findByIdAndUpdate(item._id, { order: index })
    })

    await Promise.all(updatePromises)

    revalidatePath("/admin/brands")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating brand order:", error)
    return NextResponse.json({ error: "Failed to update brand order" }, { status: 500 })
  }
}
