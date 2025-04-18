import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import ServiceContent from "@/lib/Models/ServiceContent"
import { revalidatePath } from "next/cache"

// Get service content
export async function GET() {
  try {
    await ConnectDb()

    // Find active service content or create default if none exists
    let serviceContent = await ServiceContent.findOne({ active: true })

    if (!serviceContent) {
      serviceContent = await ServiceContent.create({
        title: "Textile Is What We Do",
        paragraph1:
          "At Ruia Fabrics, textiles are at the core of who we are. We specialize in high-quality Velvet, Voile, Chiffon, Crepe, Georgette, and Linen fabrics, tailored for both domestic and international markets.",
        paragraph2:
          "Guided by innovation and a commitment to sustainability, we offer eco-conscious fabric solutions including BCI Cotton, European Flax, FSE Viscose, EcoLIVA, and EcoVero—delivering style with responsibility.",
        active: true,
      })
    }

    return NextResponse.json(serviceContent)
  } catch (error) {
    console.error("Error fetching service content:", error)
    return NextResponse.json({ error: "Failed to fetch service content" }, { status: 500 })
  }
}

// Update service content
export async function PUT(req: NextRequest) {
  try {
    await ConnectDb()

    const data = await req.json()

    // Find existing service content or create new one
    let serviceContent = await ServiceContent.findOne({ active: true })

    if (serviceContent) {
      // Update existing content
      serviceContent = await ServiceContent.findByIdAndUpdate(serviceContent._id, { ...data }, { new: true })
    } else {
      // Create new content
      serviceContent = await ServiceContent.create({
        ...data,
        active: true,
      })
    }

    revalidatePath("/")
    return NextResponse.json(serviceContent)
  } catch (error) {
    console.error("Error updating service content:", error)
    return NextResponse.json({ error: "Failed to update service content" }, { status: 500 })
  }
}
