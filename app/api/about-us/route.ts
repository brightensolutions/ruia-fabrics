import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import AboutUs from "@/lib/Models/AboutUs"
import { revalidatePath } from "next/cache"
import { put, del } from "@vercel/blob"

// Get about us information
export async function GET() {
  try {
    await ConnectDb()

    // Find active about us info or create default if none exists
    let aboutUsInfo = await AboutUs.findOne({ active: true })

    if (!aboutUsInfo) {
      aboutUsInfo = await AboutUs.create({
        title: "About Us",
        description:
          "Ruia Fabrics is a leading name in the textile industry, specializing in high-quality Velvet, Linen, and Viscose fabrics. With a legacy built on innovation, craftsmanship, and sustainability, we proudly cater to both domestic and international markets—offering competitive, world-class textile solutions that meet the evolving demands of fashion and lifestyle industries.",
        image: "/company/about-us-images.jpg",
        linkHref: "/compnay/contact-us",
        linkLabel: "Contact Us",
        active: true,
      })
    }

    return NextResponse.json(aboutUsInfo)
  } catch (error) {
    console.error("Error fetching about us information:", error)
    return NextResponse.json({ error: "Failed to fetch about us information" }, { status: 500 })
  }
}

// Update about us information
export async function PUT(req: NextRequest) {
  try {
    await ConnectDb()

    const formData = await req.formData()
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const linkHref = formData.get("linkHref") as string
    const linkLabel = formData.get("linkLabel") as string
    const imageFile = formData.get("image") as File | null
    const existingImage = formData.get("existingImage") as string | null
    const oldBlobUrl = formData.get("blobUrl") as string | null

    // Find existing about us info or create new one
    let aboutUsInfo = await AboutUs.findOne({ active: true })

    // Prepare update data
    const updateData: any = {
      title,
      description,
      linkHref,
      linkLabel,
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
      const blob = await put(`about-us/${imageFile.name}`, imageFile, {
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

    if (aboutUsInfo) {
      // Update existing content
      aboutUsInfo = await AboutUs.findByIdAndUpdate(aboutUsInfo._id, updateData, { new: true })
    } else {
      // Create new content
      aboutUsInfo = await AboutUs.create({
        ...updateData,
        active: true,
      })
    }

    revalidatePath("/")
    revalidatePath("/compnay/about-us")
    return NextResponse.json(aboutUsInfo)
  } catch (error) {
    console.error("Error updating about us information:", error)
    return NextResponse.json({ error: "Failed to update about us information" }, { status: 500 })
  }
}
