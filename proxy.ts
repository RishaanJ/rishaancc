import { NextResponse, type NextRequest } from "next/server"
import { SESSION_COOKIE, verifySession } from "@/lib/auth/session"

const PUBLIC_ADMIN_PATHS = new Set(["/admin/login"])

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // public auth endpoints
  if (
    PUBLIC_ADMIN_PATHS.has(pathname) ||
    pathname.startsWith("/api/admin/login") ||
    pathname.startsWith("/api/admin/verify")
  ) {
    return NextResponse.next()
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value
  let valid = false
  try {
    const session = await verifySession(token)
    valid = !!session
  } catch {
    valid = false
  }

  if (valid) return NextResponse.next()

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = req.nextUrl.clone()
  url.pathname = "/admin/login"
  url.search = ""
  return NextResponse.redirect(url)
}
