import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import SustainableFabric from "@/lib/Models/SustainableFabric"
import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"

// Get all sustainable fabrics
export async function GET() {
  try {
    await ConnectDb()
    const fabrics = await SustainableFabric.find({ active: true }).sort({ order: 1 })
    return NextResponse.json(fabrics)
  } catch (error) {
    console.error("Error fetching sustainable fabrics:", error)
    return NextResponse.json({ error: "Failed to fetch sustainable fabrics" }, { status: 500 })
  }
}

// Create a new sustainable fabric
export async function POST(req: NextRequest) {
  try {
    await ConnectDb()

    const formData = await req.formData()
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const imageFile = formData.get("image") as File
    const iconFile = formData.get("icon") as File

    if (!name || !description || !imageFile || !iconFile) {
      return NextResponse.json({ error: "Name, description, image, and icon are required" }, { status: 400 })
    }

    // Get the highest order value and add 1 for the new fabric
    const highestOrderFabric = await SustainableFabric.findOne().sort({ order: -1 })
    const newOrder = highestOrderFabric ? highestOrderFabric.order + 1 : 0

    // Upload image to Vercel Blob
    const imageBlob = await put(`sustainable-fabrics/${imageFile.name}`, imageFile, {
      access: "public",
      addRandomSuffix: true,
    })

    // Upload icon to Vercel Blob
    const iconBlob = await put(`sustainable-fabrics/icons/${iconFile.name}`, iconFile, {
      access: "public",
      addRandomSuffix: true,
    })

    // Create new fabric in database
    const newFabric = await SustainableFabric.create({
      name,
      description,
      image: imageBlob.url,
      icon: iconBlob.url,
      order: newOrder,
      blobImageUrl: imageBlob.url,
      blobIconUrl: iconBlob.url,
    })

    revalidatePath("/")
    return NextResponse.json(newFabric)
  } catch (error) {
    console.error("Error creating sustainable fabric:", error)
    return NextResponse.json({ error: "Failed to create sustainable fabric" }, { status: 500 })
  }
}

// Update fabric order (for drag and drop)
export async function PATCH(req: NextRequest) {
  try {
    await ConnectDb()

    const data = await req.json()
    const { items } = data

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    // Update each fabric's order
    const updatePromises = items.map((item, index) => {
      return SustainableFabric.findByIdAndUpdate(item._id, { order: index })
    })

    await Promise.all(updatePromises)

    revalidatePath("/")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating fabric order:", error)
    return NextResponse.json({ error: "Failed to update fabric order" }, { status: 500 })
  }
}
