import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import Welcome from "@/lib/Models/Welcome"
import { revalidatePath } from "next/cache"

// Get welcome section content
export async function GET() {
  try {
    await ConnectDb()

    // Find active welcome content or create default if none exists
    let welcomeContent = await Welcome.findOne({ active: true })

    if (!welcomeContent) {
      welcomeContent = await Welcome.create({
        title: "Welcome To Ruia Fabrics",
        paragraph1:
          "Ruia Fabrics is a premier textile solutions provider based in Western India, specializing in the manufacturing and trading of a diverse range of high-quality fabrics. With over a decade of industry expertise, we are committed to delivering value-added textile solutions while building a strong and distinguished presence in the Indian textile market.",
        paragraph2:
          "Our core expertise lies in producing premium resort wear fabrics, including 100% Cotton, 100% Linen, and Blends with Lyocell, Modal, and Viscose. We also offer luxurious fabrics such as Chiffon, Crepe, and Georgette, catering to the evolving needs of the fashion industry. With our expansion into luxury textiles—particularly Velvet—Ruia Fabrics continues to set new benchmarks in quality, innovation, and craftsmanship.",
        button1Text: "About Us",
        button1Link: "/compnay/about-us",
        button2Text: "Contact Us",
        button2Link: "/compnay/contact-us",
        active: true,
      })
    }

    return NextResponse.json(welcomeContent)
  } catch (error) {
    console.error("Error fetching welcome content:", error)
    return NextResponse.json({ error: "Failed to fetch welcome content" }, { status: 500 })
  }
}

// Update welcome section content
export async function PUT(req: NextRequest) {
  try {
    await ConnectDb()

    const data = await req.json()

    // Find existing welcome content or create new one
    let welcomeContent = await Welcome.findOne({ active: true })

    if (welcomeContent) {
      // Update existing content
      welcomeContent = await Welcome.findByIdAndUpdate(welcomeContent._id, { ...data }, { new: true })
    } else {
      // Create new content
      welcomeContent = await Welcome.create({
        ...data,
        active: true,
      })
    }

    revalidatePath("/")
    return NextResponse.json(welcomeContent)
  } catch (error) {
    console.error("Error updating welcome content:", error)
    return NextResponse.json({ error: "Failed to update welcome content" }, { status: 500 })
  }
}
