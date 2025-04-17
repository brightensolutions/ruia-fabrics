import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import Slider from "@/lib/Models/Slider"
import { put, del } from "@vercel/blob"
import { revalidatePath } from "next/cache"

// Get a specific slider
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ConnectDb()
    const resolvedParams = await params
    const slider = await Slider.findById(resolvedParams.id)

    if (!slider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 })
    }

    return NextResponse.json(slider)
  } catch (error) {
    console.error("Error fetching slider:", error)
    return NextResponse.json({ error: "Failed to fetch slider" }, { status: 500 })
  }
}

// Update a slider
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ConnectDb()
    const resolvedParams = await params
    const formData = await req.formData()
    const title = formData.get("title") as string
    const file = formData.get("image") as File | null

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    // Find the existing slider
    const existingSlider = await Slider.findById(resolvedParams.id)
    if (!existingSlider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = { title }

    // If a new file is uploaded, update the image
    if (file && file.size > 0) {
      // Delete the old image from blob storage
      if (existingSlider.blobUrl) {
        try {
          await del(existingSlider.blobUrl)
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

      updateData.image = blob.url
      updateData.blobUrl = blob.url
    }

    // Update the slider
    const updatedSlider = await Slider.findByIdAndUpdate(resolvedParams.id, updateData, { new: true })

    revalidatePath("/admin/slider")
    return NextResponse.json(updatedSlider)
  } catch (error) {
    console.error("Error updating slider:", error)
    return NextResponse.json({ error: "Failed to update slider" }, { status: 500 })
  }
}

// Delete a slider
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ConnectDb()
    const resolvedParams = await params

    // Find the slider to get the image URL
    const slider = await Slider.findById(resolvedParams.id)

    if (!slider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 })
    }

    // Delete the image from blob storage
    if (slider.blobUrl) {
      try {
        await del(slider.blobUrl)
      } catch (deleteError) {
        console.error("Error deleting image from blob storage:", deleteError)
        // Continue with deletion even if blob delete fails
      }
    }

    // Delete the slider from the database
    await Slider.findByIdAndDelete(resolvedParams.id)

    revalidatePath("/admin/slider")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting slider:", error)
    return NextResponse.json({ error: "Failed to delete slider" }, { status: 500 })
  }
}
