import { NextResponse } from "next/server"
import { consumeMagicToken } from "@/lib/auth/magic-link"
import { createSession, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth/session"
import { limiters, check } from "@/lib/security/ratelimit"
import { getClientIp, getUserAgent } from "@/lib/security/request"

export const runtime = "nodejs"

function rateLimited(retryAfter: number) {
  return NextResponse.json(
    { error: "Too many requests. Try again later." },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  )
}

export async function GET(req: Request) {
  const ip = getClientIp(req)
  const ua = getUserAgent(req)

  const outer = await check(limiters.adminOuter(), ip)
  if (!outer.ok) return rateLimited(outer.retryAfterSeconds)

  const ipWindow = await check(limiters.verifyPerIp(), ip)
  if (!ipWindow.ok) return rateLimited(ipWindow.retryAfterSeconds)

  const url = new URL(req.url)
  const token = url.searchParams.get("token") ?? ""

  const email = await consumeMagicToken(token)
  if (!email) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid_link", url))
  }

  const { token: jwt } = await createSession(email, ip, ua)
  const res = NextResponse.redirect(new URL("/admin", url))
  res.cookies.set(SESSION_COOKIE, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  })
  return res
}
