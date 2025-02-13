import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import { getAllRecords } from "@/lib/Services/queryFn"
import FabricPhoto from "@/lib/Models/FabricPhoto"

export async function GET(req: NextRequest) {
  try {
    await ConnectDb()

    const getFabricPhotos = await getAllRecords(FabricPhoto)

    if (getFabricPhotos && getFabricPhotos.length > 0) {
      return NextResponse.json(
        {
          message: "सभी fabric photos सफलतापूर्वक प्राप्त किए गए",
          photos: getFabricPhotos,
        },
        { status: 200 },
      )
    } else {
      return NextResponse.json(
        {
          message: "कोई fabric photos नहीं मिले",
          photos: [],
        },
        { status: 404 },
      )
    }
  } catch (error) {
    console.error("Fabric photos को fetch करने में error:", error)
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 },
    )
  }
}

