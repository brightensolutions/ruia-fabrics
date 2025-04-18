import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import Business from "@/lib/Models/Business"
import { put, del } from "@vercel/blob"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ConnectDb()
    const resolvedParams = await params
    const business = await Business.findById(resolvedParams.id)

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    return NextResponse.json(business)
  } catch (error) {
    console.error("Error fetching business:", error)
    return NextResponse.json({ error: "Failed to fetch business" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ConnectDb()
    const resolvedParams = await params

    const formData = await req.formData()
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const titleColor = formData.get("titleColor") as string
    const paragraphColor = formData.get("paragraphColor") as string
    const sectionId = formData.get("sectionId") as string
    const bgcolor = formData.get("bgcolor") as string
    const sectioncolor = formData.get("sectioncolor") as string
    const btncolor = formData.get("btncolor") as string

    // Get the existing business to check for image changes
    const existingBusiness = await Business.findById(resolvedParams.id)
    if (!existingBusiness) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    let mainImageUrl = existingBusiness.mainImage
    let overlayImageUrl = existingBusiness.overlayImage

    // Handle main image upload if a new one is provided
    const mainImageFile = formData.get("mainImage") as File
    if (mainImageFile && mainImageFile.size > 0) {
      // Delete old image if it exists and is from Blob storage
      if (mainImageUrl && mainImageUrl.includes("blob.vercel-storage.com")) {
        try {
          await del(mainImageUrl)
        } catch (error) {
          console.error("Error deleting old main image:", error)
        }
      }

      // Upload new image
      const mainImageBlob = await put(mainImageFile.name, mainImageFile, {
        access: "public",
      })
      mainImageUrl = mainImageBlob.url
    }

    // Handle overlay image upload if a new one is provided
    const overlayImageFile = formData.get("overlayImage") as File
    if (overlayImageFile && overlayImageFile.size > 0) {
      // Delete old overlay image if it exists and is from Blob storage
      if (overlayImageUrl && overlayImageUrl.includes("blob.vercel-storage.com")) {
        try {
          await del(overlayImageUrl)
        } catch (error) {
          console.error("Error deleting old overlay image:", error)
        }
      }

      // Upload new overlay image
      const overlayImageBlob = await put(overlayImageFile.name, overlayImageFile, {
        access: "public",
      })
      overlayImageUrl = overlayImageBlob.url
    }

    // Check if overlay image should be removed
    const removeOverlay = formData.get("removeOverlay") === "true"
    if (removeOverlay) {
      // Delete overlay image if it exists and is from Blob storage
      if (overlayImageUrl && overlayImageUrl.includes("blob.vercel-storage.com")) {
        try {
          await del(overlayImageUrl)
        } catch (error) {
          console.error("Error deleting overlay image:", error)
        }
      }
      overlayImageUrl = undefined
    }

    // Update the business
    const updatedBusiness = await Business.findByIdAndUpdate(
      resolvedParams.id,
      {
        title,
        description,
        titleColor,
        paragraphColor,
        mainImage: mainImageUrl,
        overlayImage: overlayImageUrl,
        sectionId,
        bgcolor,
        sectioncolor,
        btncolor,
      },
      { new: true },
    )

    return NextResponse.json(updatedBusiness)
  } catch (error) {
    console.error("Error updating business:", error)
    return NextResponse.json({ error: "Failed to update business" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ConnectDb()
    const resolvedParams = await params

    // Get the business to delete its images
    const business = await Business.findById(resolvedParams.id)
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    // Delete main image from Blob storage if it exists
    if (business.mainImage && business.mainImage.includes("blob.vercel-storage.com")) {
      try {
        await del(business.mainImage)
      } catch (error) {
        console.error("Error deleting main image:", error)
      }
    }

    // Delete overlay image from Blob storage if it exists
    if (business.overlayImage && business.overlayImage.includes("blob.vercel-storage.com")) {
      try {
        await del(business.overlayImage)
      } catch (error) {
        console.error("Error deleting overlay image:", error)
      }
    }

    // Delete the business
    await Business.findByIdAndDelete(resolvedParams.id)

    return NextResponse.json({ message: "Business deleted successfully" })
  } catch (error) {
    console.error("Error deleting business:", error)
    return NextResponse.json({ error: "Failed to delete business" }, { status: 500 })
  }
}
