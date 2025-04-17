import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define which paths are protected (require authentication)
  const isProtectedPath = path.startsWith("/admin") && path !== "/admin/login"

  const token = request.cookies.get("token")?.value || ""

  // Redirect logic
  if (isProtectedPath && !token) {
    // Redirect to login if trying to access protected route without token
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  if (path === "/admin/login" && token) {
    // Redirect to admin dashboard if already logged in
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ["/admin/:path*"],
}
