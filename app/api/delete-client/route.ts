import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import Client from "@/lib/Models/Client"
import { deleteMultipleRecords } from "@/lib/Services/queryFn"
import fs from "fs/promises"
import path from "path"

export async function DELETE(req: NextRequest) {
  try {
    await ConnectDb()

    const { clientId } = await req.json()

    if (!clientId) {
      return NextResponse.json({ error: "Client ID is required" }, { status: 400 })
    }

    // Find the client to get the logo URL
    const client = await Client.findById(clientId)

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 })
    }

    // Delete the client from the database
    await deleteMultipleRecords(Client, { _id: clientId })

    // Delete the logo file if it exists
    if (client.logoUrl) {
      const filePath = path.join(process.cwd(), "public", client.logoUrl)
      await fs.unlink(filePath).catch((err) => console.error("Error deleting file:", err))
    }

    return NextResponse.json({ message: "Client logo deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting client logo:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

