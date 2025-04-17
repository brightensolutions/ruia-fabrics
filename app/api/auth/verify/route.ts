import { type NextRequest, NextResponse } from "next/server"
import User from "@/lib/Models/User"
import ConnectDb from "@/lib/db/db"
import { decodeJwtToken, findOneRecord } from "@/lib/Services/queryFn"

export async function GET(req: NextRequest) {
  try {
    await ConnectDb()

    const token = req.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const decoded = decodeJwtToken(token)

    if (!decoded || !decoded.id) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const user = await findOneRecord(User, { _id: decoded.id })

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    console.error("Verify token error:", error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
