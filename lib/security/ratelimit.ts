import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/lib/redis"

const cache = new Map<string, Ratelimit>()

function make(name: string, limit: number, window: `${number} ${"s" | "m" | "h" | "d"}`): Ratelimit {
  const key = `${name}:${limit}:${window}`
  const hit = cache.get(key)
  if (hit) return hit
  const rl = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
    prefix: `rl:${name}`,
    analytics: false,
  })
  cache.set(key, rl)
  return rl
}

export const limiters = {
  loginPerIp: () => make("login_ip", 5, "15 m"),
  loginPerIpDaily: () => make("login_ip_day", 20, "1 d"),
  loginGlobal: () => make("login_global", 10, "5 m"),
  magicSendPerEmail: () => make("magic_email", 3, "1 h"),
  magicSendPerIp: () => make("magic_ip", 10, "1 h"),
  magicSendGlobal: () => make("magic_global", 30, "1 d"),
  verifyPerIp: () => make("verify_ip", 10, "15 m"),
  contentWritePerSession: () => make("content_sid", 60, "1 m"),
  adminOuter: () => make("admin_outer_ip", 200, "1 m"),
  alertEmail: () => make("alert_email", 3, "1 h"),
}

export type RatelimitResult = {
  ok: boolean
  retryAfterSeconds: number
}

export async function check(
  limiter: Ratelimit,
  key: string,
): Promise<RatelimitResult> {
  const r = await limiter.limit(key)
  return {
    ok: r.success,
    retryAfterSeconds: Math.max(0, Math.ceil((r.reset - Date.now()) / 1000)),
  }
}
