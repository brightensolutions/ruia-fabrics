import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import Slider from "@/lib/Models/Slider"
import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"

// Get all sliders
export async function GET() {
  try {
    await ConnectDb()
    const sliders = await Slider.find().sort({ order: 1, createdAt: 1 })
    return NextResponse.json(sliders)
  } catch (error) {
    console.error("Error fetching sliders:", error)
    return NextResponse.json({ error: "Failed to fetch sliders" }, { status: 500 })
  }
}

// Create a new slider
export async function POST(req: NextRequest) {
  try {
    await ConnectDb()

    const formData = await req.formData()
    const title = formData.get("title") as string
    const file = formData.get("image") as File

    if (!title || !file) {
      return NextResponse.json({ error: "Title and image are required" }, { status: 400 })
    }

    // Get the highest order value and add 1 for the new slider
    const highestOrderSlider = await Slider.findOne().sort({ order: -1 })
    const newOrder = highestOrderSlider ? highestOrderSlider.order + 1 : 0

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
    })

    // Create new slider in database
    const newSlider = await Slider.create({
      title,
      image: blob.url,
      order: newOrder,
      blobUrl: blob.url,
    })

    revalidatePath("/admin/slider")
    return NextResponse.json(newSlider)
  } catch (error) {
    console.error("Error creating slider:", error)
    return NextResponse.json({ error: "Failed to create slider" }, { status: 500 })
  }
}

// Update slider order (for drag and drop)
export async function PATCH(req: NextRequest) {
  try {
    await ConnectDb()

    const data = await req.json()
    const { items } = data

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    // Update each slider's order
    const updatePromises = items.map((item, index) => {
      return Slider.findByIdAndUpdate(item._id, { order: index })
    })

    await Promise.all(updatePromises)

    revalidatePath("/admin/slider")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating slider order:", error)
    return NextResponse.json({ error: "Failed to update slider order" }, { status: 500 })
  }
}
