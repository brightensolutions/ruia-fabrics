import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import Service from "@/lib/Models/Service"
import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"

// Get all services
export async function GET() {
  try {
    await ConnectDb()
    const services = await Service.find({ active: true }).sort({ order: 1 }).limit(3)
    return NextResponse.json(services)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

// Create a new service
export async function POST(req: NextRequest) {
  try {
    await ConnectDb()

    const formData = await req.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 })
    }

    // Count existing services
    const serviceCount = await Service.countDocuments()

    // Only allow up to 3 services
    if (serviceCount >= 3) {
      return NextResponse.json(
        { error: "Maximum of 3 services allowed. Please delete one before adding a new one." },
        { status: 400 },
      )
    }

    // Get the highest order value and add 1 for the new service
    const highestOrderService = await Service.findOne().sort({ order: -1 })
    const newOrder = highestOrderService ? highestOrderService.order + 1 : 0

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    })

    // Create new service in database
    const newService = await Service.create({
      imageUrl: blob.url,
      order: newOrder,
      blobUrl: blob.url,
    })

    revalidatePath("/")
    return NextResponse.json(newService)
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}

// Update service order (for drag and drop)
export async function PATCH(req: NextRequest) {
  try {
    await ConnectDb()

    const data = await req.json()
    const { items } = data

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    // Update each service's order
    const updatePromises = items.map((item, index) => {
      return Service.findByIdAndUpdate(item._id, { order: index })
    })

    await Promise.all(updatePromises)

    revalidatePath("/")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating service order:", error)
    return NextResponse.json({ error: "Failed to update service order" }, { status: 500 })
  }
}
