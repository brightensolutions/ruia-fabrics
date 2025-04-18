import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import Service from "@/lib/Models/Service"
import { put, del } from "@vercel/blob"
import { revalidatePath } from "next/cache"

// Get a specific service
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ConnectDb()
    const resolvedParams = await params
    const service = await Service.findById(resolvedParams.id)

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error) {
    console.error("Error fetching service:", error)
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 })
  }
}

// Update a service
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ConnectDb()
    const resolvedParams = await params

    const formData = await req.formData()
    const file = formData.get("image") as File | null
    const active = formData.get("active") === "true"

    // Find the existing service
    const existingService = await Service.findById(resolvedParams.id)
    if (!existingService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = { active }

    // If a new file is uploaded, update the image
    if (file && file.size > 0) {
      // Delete the old image from blob storage
      if (existingService.blobUrl) {
        try {
          await del(existingService.blobUrl)
        } catch (deleteError) {
          console.error("Error deleting old image:", deleteError)
          // Continue with the update even if delete fails
        }
      }

      // Upload the new image
      const blob = await put(file.name, file, {
        access: "public",
        addRandomSuffix: true,
      })

      updateData.imageUrl = blob.url
      updateData.blobUrl = blob.url
    }

    // Update the service
    const updatedService = await Service.findByIdAndUpdate(resolvedParams.id, updateData, { new: true })

    revalidatePath("/")
    return NextResponse.json(updatedService)
  } catch (error) {
    console.error("Error updating service:", error)
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 })
  }
}

// Delete a service
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ConnectDb()
    const resolvedParams = await params

    // Find the service to get the image URL
    const service = await Service.findById(resolvedParams.id)

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    // Delete the image from blob storage
    if (service.blobUrl) {
      try {
        await del(service.blobUrl)
      } catch (deleteError) {
        console.error("Error deleting image from blob storage:", deleteError)
        // Continue with deletion even if blob delete fails
      }
    }

    // Delete the service from the database
    await Service.findByIdAndDelete(resolvedParams.id)

    revalidatePath("/")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting service:", error)
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 })
  }
}
