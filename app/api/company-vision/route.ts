import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import CompanyVision from "@/lib/Models/CompanyVision"
import { revalidatePath } from "next/cache"
import { put, del } from "@vercel/blob"

// Get company vision information
export async function GET() {
  try {
    await ConnectDb()

    // Find active vision info or create default if none exists
    let visionInfo = await CompanyVision.findOne({ active: true })

    if (!visionInfo) {
      visionInfo = await CompanyVision.create({
        title: "Our Vision",
        paragraph1:
          "To be recognized as one of the leading textile producers in the country, committed to quality, sustainability, and innovation. We aim to establish a strong global presence in the textile industry while upholding the highest standards of craftsmanship.",
        paragraph2:
          "Our goal is to exceed customer expectations by delivering premium, sustainable fabrics and to be among the most esteemed textile companies by maintaining integrity, transparency, and excellence in all our stakeholder relationships.",
        image: "/company/OurVision.jpg",
        mobileTitle: "Crafting Tomorrow's Textiles",
        active: true,
      })
    }

    return NextResponse.json(visionInfo)
  } catch (error) {
    console.error("Error fetching company vision information:", error)
    return NextResponse.json({ error: "Failed to fetch company vision information" }, { status: 500 })
  }
}

// Update company vision information
export async function PUT(req: NextRequest) {
  try {
    await ConnectDb()

    const formData = await req.formData()
    const title = formData.get("title") as string
    const paragraph1 = formData.get("paragraph1") as string
    const paragraph2 = formData.get("paragraph2") as string
    const mobileTitle = formData.get("mobileTitle") as string
    const imageFile = formData.get("image") as File | null
    const existingImage = formData.get("existingImage") as string | null
    const oldBlobUrl = formData.get("blobUrl") as string | null

    // Find existing vision info or create new one
    let visionInfo = await CompanyVision.findOne({ active: true })

    // Prepare update data
    const updateData: any = {
      title,
      paragraph1,
      paragraph2,
      mobileTitle,
    }

    // Handle image upload if a new file is provided
    if (imageFile && imageFile.size > 0) {
      // Delete old blob if it exists
      if (oldBlobUrl) {
        try {
          await del(oldBlobUrl)
          console.log("Old blob deleted successfully")
        } catch (deleteError) {
          console.error("Error deleting old blob:", deleteError)
          // Continue with update even if delete fails
        }
      }

      // Upload new image to blob storage
      const blob = await put(`company-vision/${imageFile.name}`, imageFile, {
        access: "public",
        addRandomSuffix: true,
      })

      // Update image data
      updateData.image = blob.url
      updateData.blobUrl = blob.url
    } else if (existingImage) {
      // Keep existing image if no new file is uploaded
      updateData.image = existingImage
    }

    if (visionInfo) {
      // Update existing content
      visionInfo = await CompanyVision.findByIdAndUpdate(visionInfo._id, updateData, { new: true })
    } else {
      // Create new content
      visionInfo = await CompanyVision.create({
        ...updateData,
        active: true,
      })
    }

    revalidatePath("/")
    revalidatePath("/compnay/about-us")
    return NextResponse.json(visionInfo)
  } catch (error) {
    console.error("Error updating company vision information:", error)
    return NextResponse.json({ error: "Failed to update company vision information" }, { status: 500 })
  }
}
