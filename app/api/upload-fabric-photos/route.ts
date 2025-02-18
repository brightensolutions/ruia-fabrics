import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import FabricPhoto from "@/lib/Models/FabricPhoto"
import { writeFile } from "fs/promises"
import path from "path"

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: NextRequest) {
  try {
    await ConnectDb()

    const formData = await req.formData()
    const files = formData.getAll("images")
    const imageUrls: string[] = []

    for (const file of files) {
      if (file instanceof File) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Create a unique filename
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        const filename = `${file.name.split(".")[0]}-${uniqueSuffix}${path.extname(file.name)}`

        // Define the path where the file will be saved
        const filepath = path.join(process.cwd(), "public", "uploads", filename)

        // Write the file
        await writeFile(filepath, buffer)

        imageUrls.push(`/uploads/${filename}`)
      }
    }

    if (imageUrls.length === 0) {
      return NextResponse.json({ error: "No images uploaded" }, { status: 400 })
    }

    const fabricPhoto = new FabricPhoto({ imageUrls })
    await fabricPhoto.save()

    return NextResponse.json(
      {
        message: "Fabric photos uploaded successfully",
        fabricPhoto,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error uploading fabric photos:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

