import { SignJWT, jwtVerify } from "jose"
import { redis } from "@/lib/redis"

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 days
const ALG = "HS256"

export const SESSION_COOKIE = "rcc_admin_session"

type SessionPayload = {
  sid: string
  email: string
}

type SessionRecord = {
  email: string
  ip: string
  ua: string
  iat: number
}

function getSecret(): Uint8Array {
  const s = process.env.ADMIN_SESSION_SECRET
  if (!s || s.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be set and at least 32 chars")
  }
  return new TextEncoder().encode(s)
}

function randomSid(): string {
  const arr = new Uint8Array(24)
  crypto.getRandomValues(arr)
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export async function createSession(
  email: string,
  ip: string,
  ua: string,
): Promise<{ token: string; sid: string }> {
  const sid = randomSid()
  const record: SessionRecord = {
    email,
    ip,
    ua,
    iat: Math.floor(Date.now() / 1000),
  }
  await redis.set(`session:${sid}`, JSON.stringify(record), {
    ex: SESSION_TTL_SECONDS,
  })
  const token = await new SignJWT({ sid, email })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret())
  return { token, sid }
}

export async function verifySession(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify<SessionPayload>(token, getSecret(), {
      algorithms: [ALG],
    })
    if (!payload.sid || !payload.email) return null
    const record = await redis.get<SessionRecord>(`session:${payload.sid}`)
    if (!record) return null
    if (record.email !== payload.email) return null
    return { sid: payload.sid, email: payload.email }
  } catch {
    return null
  }
}

export async function destroySession(sid: string): Promise<void> {
  await redis.del(`session:${sid}`)
}

export const SESSION_MAX_AGE = SESSION_TTL_SECONDS
