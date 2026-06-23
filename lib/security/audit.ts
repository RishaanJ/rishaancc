import { redis } from "@/lib/redis"
import { limiters, check } from "./ratelimit"
import { sendAlert } from "@/lib/email/resend"

const AUDIT_KEY = "audit:login"
const ALERT_THRESHOLD = 5
const ALERT_WINDOW_SECONDS = 5 * 60

export type AuditEntry = {
  ts: number
  ip: string
  ua: string
  reason: string
}

export async function logFailedLogin(entry: Omit<AuditEntry, "ts">): Promise<void> {
  const full: AuditEntry = { ...entry, ts: Date.now() }
  await redis.lpush(AUDIT_KEY, JSON.stringify(full))
  await redis.ltrim(AUDIT_KEY, 0, 199)
  await redis.expire(AUDIT_KEY, 60 * 60 * 24 * 7)

  const counterKey = "audit:fail_counter"
  const count = await redis.incr(counterKey)
  if (count === 1) await redis.expire(counterKey, ALERT_WINDOW_SECONDS)
  if (count >= ALERT_THRESHOLD) {
    const adminEmail = process.env.ADMIN_EMAIL
    if (!adminEmail) return
    const rate = await check(limiters.alertEmail(), "global")
    if (!rate.ok) return
    await redis.del(counterKey)
    await sendAlert({
      to: adminEmail,
      subject: "[rishaan.cc] suspicious admin-login activity",
      body: `${count} failed admin login attempts in the last ${ALERT_WINDOW_SECONDS / 60} minutes.\nLatest IP: ${entry.ip}\nLatest UA: ${entry.ua}\nReason: ${entry.reason}\n\nIf this wasn't you, rotate ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET in Vercel.`,
    })
  }
}

export async function listFailedLogins(limit = 50): Promise<AuditEntry[]> {
  const raw = await redis.lrange<string>(AUDIT_KEY, 0, limit - 1)
  const out: AuditEntry[] = []
  for (const r of raw) {
    try {
      const parsed = typeof r === "string" ? JSON.parse(r) : (r as AuditEntry)
      out.push(parsed)
    } catch {
      // ignore
    }
  }
  return out
}
