import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import Brand from "@/lib/Models/Brand"
import { put, del } from "@vercel/blob"
import { revalidatePath } from "next/cache"

// Get a specific brand
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ConnectDb()
    const resolvedParams = await params
    const brand = await Brand.findById(resolvedParams.id)

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 })
    }

    return NextResponse.json(brand)
  } catch (error) {
    console.error("Error fetching brand:", error)
    return NextResponse.json({ error: "Failed to fetch brand" }, { status: 500 })
  }
}

// Update a brand
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ConnectDb()
    const resolvedParams = await params

    const formData = await req.formData()
    const file = formData.get("image") as File | null
    const active = formData.get("active") === "true"

    // Find the existing brand
    const existingBrand = await Brand.findById(resolvedParams.id)
    if (!existingBrand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = { active }

    // If a new file is uploaded, update the image
    if (file && file.size > 0) {
      // Delete the old image from blob storage
      if (existingBrand.blobUrl) {
        try {
          await del(existingBrand.blobUrl)
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

    // Update the brand
    const updatedBrand = await Brand.findByIdAndUpdate(resolvedParams.id, updateData, { new: true })

    revalidatePath("/admin/brands")
    return NextResponse.json(updatedBrand)
  } catch (error) {
    console.error("Error updating brand:", error)
    return NextResponse.json({ error: "Failed to update brand" }, { status: 500 })
  }
}

// Delete a brand
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ConnectDb()
    const resolvedParams = await params

    // Find the brand to get the image URL
    const brand = await Brand.findById(resolvedParams.id)

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 })
    }

    // Delete the image from blob storage
    if (brand.blobUrl) {
      try {
        await del(brand.blobUrl)
      } catch (deleteError) {
        console.error("Error deleting image from blob storage:", deleteError)
        // Continue with deletion even if blob delete fails
      }
    }

    // Delete the brand from the database
    await Brand.findByIdAndDelete(resolvedParams.id)

    revalidatePath("/admin/brands")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting brand:", error)
    return NextResponse.json({ error: "Failed to delete brand" }, { status: 500 })
  }
}
