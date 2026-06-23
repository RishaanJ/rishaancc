import { pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto"

const ITERATIONS = 600_000
const KEY_LEN = 32
const DIGEST = "sha256"

export function hashPassword(password: string): string {
  const salt = randomBytes(16)
  const hash = pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, DIGEST)
  return `pbkdf2.${ITERATIONS}.${salt.toString("base64url")}.${hash.toString("base64url")}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split(".")
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false
  const iter = Number(parts[1])
  if (!Number.isFinite(iter) || iter < 1) return false
  let saltBuf: Buffer
  let hashBuf: Buffer
  try {
    saltBuf = Buffer.from(parts[2], "base64url")
    hashBuf = Buffer.from(parts[3], "base64url")
  } catch {
    return false
  }
  const candidate = pbkdf2Sync(password, saltBuf, iter, hashBuf.length, DIGEST)
  if (candidate.length !== hashBuf.length) return false
  return timingSafeEqual(candidate, hashBuf)
}
