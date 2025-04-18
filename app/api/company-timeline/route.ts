import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import CompanyTimeline from "@/lib/Models/CompanyTimeline"
import { revalidatePath } from "next/cache"

// Get company timeline information
export async function GET() {
  try {
    await ConnectDb()

    // Find active timeline info or create default if none exists
    let timelineInfo = await CompanyTimeline.findOne({ active: true })

    if (!timelineInfo) {
      timelineInfo = await CompanyTimeline.create({
        title: "Our Rich Heritage",
        subtitle: "A legacy of textile excellence rooted in innovation, craftsmanship, and a commitment to quality.",
        events: [
          {
            year: "1960",
            title: "Our Beginnings",
            description:
              "Our journey in the textile industry began over five decades ago, rooted in a strong foundation of fabric trading. We specialized in sourcing premium yarns and fabrics from leading mills across India.",
            color: "#2c5e3f",
            order: 0,
          },
          {
            year: "1991",
            title: "Ruia Fabrics Established",
            description:
              "Ruia Fabrics Pvt. Ltd. was established with a focus on manufacturing and trading high-quality viscose, cotton, and linen fabrics. Our first state-of-the-art manufacturing facility is located in Surat, Gujarat.",
            color: "#d3a456",
            order: 1,
          },
          {
            year: "2004",
            title: "Sustainable Innovation",
            description:
              "Driven by a vision for innovation and sustainability, we expanded our portfolio to include linen and eco-friendly fabrics such as EcoVero,LivaEco, Bci Cotton, Organic Cotton and European Flax.",
            color: "#5e2c4f",
            order: 2,
          },
          {
            year: "2017",
            title: "The Klassiq Silk Mills",
            description:
              "Further expanding our capabilities, we developed The Klassiq Silk Mills in Surat to manufacture premium Velvet fabrics. With a current monthly production capacity exceeding 200,000 meters, the facility features a fully integrated, end-to-end production process.",
            color: "#2c4e5e",
            order: 3,
          },
          {
            year: "Present",
            title: "Global Excellence",
            description:
              "From humble beginnings to our evolution as a leader in sustainable and luxury textiles, our legacy is defined by craftsmanship, innovation, and an unwavering commitment to excellence.",
            color: "#5e452c",
            order: 4,
          },
        ],
        active: true,
      })
    }

    return NextResponse.json(timelineInfo)
  } catch (error) {
    console.error("Error fetching company timeline information:", error)
    return NextResponse.json({ error: "Failed to fetch company timeline information" }, { status: 500 })
  }
}

// Update company timeline information
export async function PUT(req: NextRequest) {
  try {
    await ConnectDb()

    const data = await req.json()

    // Find existing timeline info or create new one
    let timelineInfo = await CompanyTimeline.findOne({ active: true })

    if (timelineInfo) {
      // Update existing content
      timelineInfo = await CompanyTimeline.findByIdAndUpdate(timelineInfo._id, { ...data }, { new: true })
    } else {
      // Create new content
      timelineInfo = await CompanyTimeline.create({
        ...data,
        active: true,
      })
    }

    revalidatePath("/")
    revalidatePath("/compnay/about-us")
    return NextResponse.json(timelineInfo)
  } catch (error) {
    console.error("Error updating company timeline information:", error)
    return NextResponse.json({ error: "Failed to update company timeline information" }, { status: 500 })
  }
}
