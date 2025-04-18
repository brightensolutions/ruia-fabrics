import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import SustainableFabric from "@/lib/Models/SustainableFabric"
import { put, del } from "@vercel/blob"
import { revalidatePath } from "next/cache"

// Get a specific sustainable fabric
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ConnectDb()
    const resolvedParams = await params
    const fabric = await SustainableFabric.findById(resolvedParams.id)

    if (!fabric) {
      return NextResponse.json({ error: "Sustainable fabric not found" }, { status: 404 })
    }

    return NextResponse.json(fabric)
  } catch (error) {
    console.error("Error fetching sustainable fabric:", error)
    return NextResponse.json({ error: "Failed to fetch sustainable fabric" }, { status: 500 })
  }
}

// Update a sustainable fabric
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ConnectDb()
    const resolvedParams = await params

    const formData = await req.formData()
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const imageFile = formData.get("image") as File | null
    const iconFile = formData.get("icon") as File | null
    const active = formData.get("active") === "true"

    if (!name || !description) {
      return NextResponse.json({ error: "Name and description are required" }, { status: 400 })
    }

    // Find the existing fabric
    const existingFabric = await SustainableFabric.findById(resolvedParams.id)
    if (!existingFabric) {
      return NextResponse.json({ error: "Sustainable fabric not found" }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = { name, description, active }

    // If a new image file is uploaded, update the image
    if (imageFile && imageFile.size > 0) {
      // Delete the old image from blob storage
      if (existingFabric.blobImageUrl) {
        try {
          await del(existingFabric.blobImageUrl)
        } catch (deleteError) {
          console.error("Error deleting old image:", deleteError)
          // Continue with the update even if delete fails
        }
      }

      // Upload the new image
      const imageBlob = await put(`sustainable-fabrics/${imageFile.name}`, imageFile, {
        access: "public",
        addRandomSuffix: true,
      })

      updateData.image = imageBlob.url
      updateData.blobImageUrl = imageBlob.url
    }

    // If a new icon file is uploaded, update the icon
    if (iconFile && iconFile.size > 0) {
      // Delete the old icon from blob storage
      if (existingFabric.blobIconUrl) {
        try {
          await del(existingFabric.blobIconUrl)
        } catch (deleteError) {
          console.error("Error deleting old icon:", deleteError)
          // Continue with the update even if delete fails
        }
      }

      // Upload the new icon
      const iconBlob = await put(`sustainable-fabrics/icons/${iconFile.name}`, iconFile, {
        access: "public",
        addRandomSuffix: true,
      })

      updateData.icon = iconBlob.url
      updateData.blobIconUrl = iconBlob.url
    }

    // Update the fabric
    const updatedFabric = await SustainableFabric.findByIdAndUpdate(resolvedParams.id, updateData, { new: true })

    revalidatePath("/")
    return NextResponse.json(updatedFabric)
  } catch (error) {
    console.error("Error updating sustainable fabric:", error)
    return NextResponse.json({ error: "Failed to update sustainable fabric" }, { status: 500 })
  }
}

// Delete a sustainable fabric
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ConnectDb()
    const resolvedParams = await params

    // Find the fabric to get the image and icon URLs
    const fabric = await SustainableFabric.findById(resolvedParams.id)

    if (!fabric) {
      return NextResponse.json({ error: "Sustainable fabric not found" }, { status: 404 })
    }

    // Delete the image from blob storage
    if (fabric.blobImageUrl) {
      try {
        await del(fabric.blobImageUrl)
      } catch (deleteError) {
        console.error("Error deleting image from blob storage:", deleteError)
        // Continue with deletion even if blob delete fails
      }
    }

    // Delete the icon from blob storage
    if (fabric.blobIconUrl) {
      try {
        await del(fabric.blobIconUrl)
      } catch (deleteError) {
        console.error("Error deleting icon from blob storage:", deleteError)
        // Continue with deletion even if blob delete fails
      }
    }

    // Delete the fabric from the database
    await SustainableFabric.findByIdAndDelete(resolvedParams.id)

    revalidatePath("/")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting sustainable fabric:", error)
    return NextResponse.json({ error: "Failed to delete sustainable fabric" }, { status: 500 })
  }
}
