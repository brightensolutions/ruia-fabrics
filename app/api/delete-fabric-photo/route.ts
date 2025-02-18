import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import FabricPhoto from "@/lib/Models/FabricPhoto"
import { deleteMultipleRecords } from "@/lib/Services/queryFn"
import fs from "fs/promises"
import path from "path"

export async function DELETE(req: NextRequest) {
  try {
    await ConnectDb()

    const { fabricPhotoId, imageUrl } = await req.json()

    if (!fabricPhotoId || !imageUrl) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const fabricPhoto = await FabricPhoto.findById(fabricPhotoId)

    if (!fabricPhoto) {
      return NextResponse.json({ error: "Fabric photo not found" }, { status: 404 })
    }

    fabricPhoto.imageUrls = fabricPhoto.imageUrls.filter((url: string) => url !== imageUrl)

    if (fabricPhoto.imageUrls.length === 0) {
      await deleteMultipleRecords(FabricPhoto, { _id: fabricPhotoId })
    } else {
      await fabricPhoto.save()
    }

    const filePath = path.join(process.cwd(), "public", imageUrl)
    await fs.unlink(filePath)

    return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting fabric photo:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

