import { NextResponse } from "next/server"
import { z } from "zod"
import { verifyPassword } from "@/lib/auth/password"
import { createMagicToken, MAGIC_TTL_SECONDS } from "@/lib/auth/magic-link"
import { sendMagicLink } from "@/lib/email/resend"
import { limiters, check } from "@/lib/security/ratelimit"
import { logFailedLogin } from "@/lib/security/audit"
import { getClientIp, getUserAgent, originMatches } from "@/lib/security/request"

export const runtime = "nodejs"

const bodySchema = z.object({ password: z.string().min(1).max(200) })

const MAX_BODY = 4 * 1024

function rateLimited(retryAfter: number) {
  return NextResponse.json(
    { error: "Too many requests. Try again later." },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  )
}

export async function POST(req: Request) {
  if (!originMatches(req)) {
    return NextResponse.json({ error: "Bad origin" }, { status: 403 })
  }

  const ip = getClientIp(req)
  const ua = getUserAgent(req)

  const outer = await check(limiters.adminOuter(), ip)
  if (!outer.ok) return rateLimited(outer.retryAfterSeconds)

  const ipDay = await check(limiters.loginPerIpDaily(), ip)
  if (!ipDay.ok) return rateLimited(ipDay.retryAfterSeconds)

  const ipWindow = await check(limiters.loginPerIp(), ip)
  if (!ipWindow.ok) return rateLimited(ipWindow.retryAfterSeconds)

  const globalWindow = await check(limiters.loginGlobal(), "global")
  if (!globalWindow.ok) return rateLimited(globalWindow.retryAfterSeconds)

  const contentLength = Number(req.headers.get("content-length") ?? "0")
  if (contentLength > MAX_BODY) {
    return NextResponse.json({ error: "Body too large" }, { status: 413 })
  }

  let json: unknown
  try {
    json = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const stored = process.env.ADMIN_PASSWORD_HASH
  const adminEmail = process.env.ADMIN_EMAIL
  if (!stored || !adminEmail) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 })
  }

  const ok = verifyPassword(parsed.data.password, stored)
  if (!ok) {
    await logFailedLogin({ ip, ua, reason: "wrong-password" })
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const emailLimit = await check(limiters.magicSendPerEmail(), adminEmail)
  if (!emailLimit.ok) return rateLimited(emailLimit.retryAfterSeconds)
  const ipMagic = await check(limiters.magicSendPerIp(), ip)
  if (!ipMagic.ok) return rateLimited(ipMagic.retryAfterSeconds)
  const globalMagic = await check(limiters.magicSendGlobal(), "global")
  if (!globalMagic.ok) return rateLimited(globalMagic.retryAfterSeconds)

  const token = await createMagicToken(adminEmail)
  const origin = new URL(req.url).origin
  const link = `${origin}/api/admin/verify?token=${token}`
  const sent = await sendMagicLink({ to: adminEmail, link })
  if (!sent.ok) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    message: `Magic link sent. Expires in ${Math.floor(MAGIC_TTL_SECONDS / 60)} minutes.`,
  })
}
