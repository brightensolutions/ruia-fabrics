import { NextResponse } from "next/server"
import ConnectDb from "@/lib/db/db"
import adminRegistration from "@/lib/Models/Registration"
import { findOneRecord, verifyPassword } from "@/lib/Services/queryFn"

export async function POST(req: Request) {
  try {
    await ConnectDb()

    const { email, password } = await req.json()
    console.log("email",email);
    console.log("password",password);

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
    }

    const existingAdmin = await findOneRecord(adminRegistration, { email })
    console.log("existingAdmin",existingAdmin);
    if (!existingAdmin) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 })
    }

    const isPasswordValid = verifyPassword(existingAdmin.password, password)
    console.log("isPasswordValid",isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 })
    }

    return NextResponse.json({ message: "Login successful", adminId: existingAdmin._id }, { status: 200 })
  } catch (error) {
    console.error("Error in admin login:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}

