import { NextResponse } from "next/server"
import { destroySession, SESSION_COOKIE, verifySession } from "@/lib/auth/session"
import { originMatches } from "@/lib/security/request"

export const runtime = "nodejs"

export async function POST(req: Request) {
  if (!originMatches(req)) {
    return NextResponse.json({ error: "Bad origin" }, { status: 403 })
  }
  const cookie = req.headers.get("cookie") ?? ""
  const match = cookie.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))
  const token = match?.[1]
  const session = await verifySession(token)
  if (session) await destroySession(session.sid)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
  return res
}
