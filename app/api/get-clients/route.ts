import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import Client from "@/lib/Models/Client"
import { getAllRecords } from "@/lib/Services/queryFn"

export async function GET(req: NextRequest) {
  try {
    await ConnectDb()

    const clients = await getAllRecords(Client)

    return NextResponse.json({ clients: clients.slice(0, 6) }, { status: 200 })
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

