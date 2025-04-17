import { NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import Slider from "@/lib/Models/Slider"
import { revalidatePath } from "next/cache"

// Fix all slider orders
export async function POST() {
  try {
    await ConnectDb()

    // Get all sliders sorted by createdAt
    const sliders = await Slider.find().sort({ createdAt: 1 })

    // Update each slider with sequential order
    for (let i = 0; i < sliders.length; i++) {
      await Slider.findByIdAndUpdate(sliders[i]._id, { order: i })
    }

    revalidatePath("/admin/slider")
    return NextResponse.json({ success: true, message: "All slider orders fixed" })
  } catch (error) {
    console.error("Error fixing slider orders:", error)
    return NextResponse.json({ error: "Failed to fix slider orders" }, { status: 500 })
  }
}
