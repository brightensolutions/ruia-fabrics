import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import SustainableContent from "@/lib/Models/SustainableContent"
import { revalidatePath } from "next/cache"

// Get sustainable content
export async function GET() {
  try {
    await ConnectDb()

    // Find active sustainable content or create default if none exists
    let sustainableContent = await SustainableContent.findOne({ active: true })

    if (!sustainableContent) {
      sustainableContent = await SustainableContent.create({
        title: "Sustainable Style, Woven With Care.",
        quote:
          "\"Sustainability for us means creating long-term value for people, the planet, and shared prosperity. It's not just about doing good—it's about making a lasting impact through every choice we make.\"",
        description:
          "Our Responsible For framework reflects our commitment to mindful sourcing, ethical production, and conscious decision-making—ensuring every fabric is crafted with purpose and care.",
        active: true,
      })
    }

    return NextResponse.json(sustainableContent)
  } catch (error) {
    console.error("Error fetching sustainable content:", error)
    return NextResponse.json({ error: "Failed to fetch sustainable content" }, { status: 500 })
  }
}

// Update sustainable content
export async function PUT(req: NextRequest) {
  try {
    await ConnectDb()

    const data = await req.json()

    // Find existing sustainable content or create new one
    let sustainableContent = await SustainableContent.findOne({ active: true })

    if (sustainableContent) {
      // Update existing content
      sustainableContent = await SustainableContent.findByIdAndUpdate(
        sustainableContent._id,
        { ...data },
        { new: true },
      )
    } else {
      // Create new content
      sustainableContent = await SustainableContent.create({
        ...data,
        active: true,
      })
    }

    revalidatePath("/")
    return NextResponse.json(sustainableContent)
  } catch (error) {
    console.error("Error updating sustainable content:", error)
    return NextResponse.json({ error: "Failed to update sustainable content" }, { status: 500 })
  }
}
