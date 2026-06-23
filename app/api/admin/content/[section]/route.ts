import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { SESSION_COOKIE, verifySession } from "@/lib/auth/session"
import { limiters, check } from "@/lib/security/ratelimit"
import { originMatches } from "@/lib/security/request"
import { sectionSchemas } from "@/lib/content/schemas"
import { getSection, setSection } from "@/lib/content/store"
import type { SectionKey } from "@/lib/content/types"

export const runtime = "nodejs"

const MAX_BODY = 64 * 1024
const KNOWN_SECTIONS = new Set<SectionKey>([
  "projects",
  "about",
  "subtitle",
  "greeting",
  "stack",
  "design",
])

function isKnownSection(s: string): s is SectionKey {
  return (KNOWN_SECTIONS as Set<string>).has(s)
}

async function readSession(req: Request) {
  const cookie = req.headers.get("cookie") ?? ""
  const match = cookie.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))
  return verifySession(match?.[1])
}

function rateLimited(retryAfter: number) {
  return NextResponse.json(
    { error: "Too many requests. Try again later." },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  )
}

export async function GET(
  req: Request,
  ctx: { params: Promise<{ section: string }> },
) {
  const session = await readSession(req)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { section } = await ctx.params
  if (!isKnownSection(section)) {
    return NextResponse.json({ error: "Unknown section" }, { status: 404 })
  }
  const value = await getSection(section)
  return NextResponse.json({ value })
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ section: string }> },
) {
  if (!originMatches(req)) {
    return NextResponse.json({ error: "Bad origin" }, { status: 403 })
  }

  const session = await readSession(req)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const sessionRl = await check(limiters.contentWritePerSession(), session.sid)
  if (!sessionRl.ok) return rateLimited(sessionRl.retryAfterSeconds)

  const { section } = await ctx.params
  if (!isKnownSection(section)) {
    return NextResponse.json({ error: "Unknown section" }, { status: 404 })
  }

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

  const schema = sectionSchemas[section]
  const parsed = schema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues.slice(0, 20) },
      { status: 400 },
    )
  }

  await setSection(section, parsed.data as never)
  revalidatePath("/")
  revalidatePath("/design")

  return NextResponse.json({ ok: true })
}
