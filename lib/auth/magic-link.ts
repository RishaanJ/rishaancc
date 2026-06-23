import { createHash, randomBytes, timingSafeEqual } from "node:crypto"
import { redis } from "@/lib/redis"

const TOKEN_TTL_SECONDS = 60 * 10 // 10 minutes

type MagicRecord = {
  email: string
  exp: number
}

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex")
}

export async function createMagicToken(email: string): Promise<string> {
  const token = randomBytes(32).toString("hex")
  const hash = sha256(token)
  const record: MagicRecord = {
    email,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  }
  await redis.set(`magic:${hash}`, JSON.stringify(record), {
    ex: TOKEN_TTL_SECONDS,
  })
  return token
}

export async function consumeMagicToken(token: string): Promise<string | null> {
  if (!/^[0-9a-f]{64}$/.test(token)) return null
  const hash = sha256(token)
  const raw = await redis.getdel<MagicRecord | string>(`magic:${hash}`)
  if (!raw) return null
  const record: MagicRecord = typeof raw === "string" ? JSON.parse(raw) : raw
  if (!record?.email || !record?.exp) return null
  if (record.exp < Math.floor(Date.now() / 1000)) return null
  return record.email
}

export function constantEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ba.length !== bb.length) return false
  return timingSafeEqual(ba, bb)
}

export { TOKEN_TTL_SECONDS as MAGIC_TTL_SECONDS }
