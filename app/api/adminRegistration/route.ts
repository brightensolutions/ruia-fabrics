import { NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import { CreateOneRecord, findOneRecord, hashPassword } from "@/lib/Services/queryFn"
import adminRegistration from "@/lib/Models/Registration"

export async function POST(req: Request) {
  try {
    await ConnectDb()

    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
    }

    const existingAdmin = await findOneRecord(adminRegistration, { email })
    if (existingAdmin) {
      return NextResponse.json({ error: "Admin account already exists." }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await hashPassword(password)

    const data = {
      email,
      password: hashedPassword,
    }

    const newAdmin = await CreateOneRecord(adminRegistration, data)

    if (newAdmin) {
      return NextResponse.json({ message: "Admin account created successfully." }, { status: 201 })
    } else {
      return NextResponse.json({ error: "Failed to create admin account." }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in admin registration:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}

