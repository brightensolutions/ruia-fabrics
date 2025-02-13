import { type NextRequest, NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import Client from "@/lib/Models/Client"
import { CreateOneRecord } from "@/lib/Services/queryFn"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function POST(req: NextRequest) {
  try {
    await ConnectDb()

    const formData = await req.formData()
    const logos = formData.getAll("logos") as File[]

    if (logos.length === 0) {
      return NextResponse.json({ error: "At least one client logo is required" }, { status: 400 })
    }

    
    const uploadDir = path.join(process.cwd(), "public", "uploads", "clients")
    await mkdir(uploadDir, { recursive: true })

    const newClients = []

    for (const logo of logos) {
      const bytes = await logo.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Create a unique filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
      const filename = `client-logo-${uniqueSuffix}${path.extname(logo.name)}`
      const filepath = path.join(uploadDir, filename)

      // Write the file
      await writeFile(filepath, buffer)

      const logoUrl = `/uploads/clients/${filename}`

      const newClient = await CreateOneRecord(Client, { logoUrl })
      newClients.push(newClient)
    }

    return NextResponse.json({ message: "Client logos added successfully", clients: newClients }, { status: 201 })
  } catch (error) {
    console.error("Error adding client logos:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

