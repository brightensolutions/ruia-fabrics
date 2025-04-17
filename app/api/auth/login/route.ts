import { type NextRequest, NextResponse } from "next/server"
import User from "@/lib/Models/User"
import ConnectDb from "@/lib/db/db"
import { findOneRecord ,generateJwtToken, verifyPassword, hashPassword, CreateOneRecord } from "@/lib/Services/queryFn"

export async function POST(req: NextRequest) {
  try {
    await ConnectDb()
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Check if any user exists in the database
    const users = await User.find({})

    // If no users exist, create the default admin
    if (users.length === 0) {
      const hashedPassword = hashPassword("123")
      await CreateOneRecord(User, {
        email: "admin@ruiafabrics.com",
        password: hashedPassword,
        name: "Admin",
        role: "admin",
      })
      console.log("Default admin created")
    }

    // Find the user
    const user = await findOneRecord(User, { email })

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = verifyPassword(user.password, password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Generate JWT token
    const token = generateJwtToken(user._id.toString())

    // Create response
    const response = NextResponse.json(
      { success: true, user: { id: user._id, email: user.email, name: user.name } },
      { status: 200 },
    )

    // Set cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
