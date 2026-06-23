import type { NextRequest } from "next/server"

export function getClientIp(req: NextRequest | Request): string {
  const headers = "headers" in req ? req.headers : new Headers()
  const xff = headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0].trim()
  const real = headers.get("x-real-ip")
  if (real) return real
  return "unknown"
}

export function getUserAgent(req: NextRequest | Request): string {
  return req.headers.get("user-agent")?.slice(0, 200) ?? ""
}

export function originMatches(req: Request): boolean {
  const origin = req.headers.get("origin")
  if (!origin) return false
  const host = req.headers.get("host")
  if (!host) return false
  try {
    const o = new URL(origin)
    return o.host === host
  } catch {
    return false
  }
}
