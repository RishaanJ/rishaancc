/**
 * Calendly API v2 — read-only availability, a calendar month at a time.
 *
 * Needs a personal access token in CALENDLY_TOKEN (calendly.com → Integrations →
 * API & webhooks → personal access token). Without it every helper returns null
 * and the UI falls back to a plain link to CALENDLY_URL.
 *
 * Optional: CALENDLY_EVENT_SLUG picks a specific event type ("30min"), otherwise
 * the first active one is used.
 */

const API = "https://api.calendly.com"
const REVALIDATE = 300

// Calendly caps each availability query at 7 days, so a month takes ~5 requests.
const MAX_WINDOW_DAYS = 7
const DAY = 24 * 60 * 60 * 1000

export interface Slot {
  /** ISO 8601, UTC. Formatted in the visitor's timezone client-side. */
  start: string
  /** Deep link to Calendly's confirm step with this time preselected. */
  schedulingUrl: string
}

export interface Availability {
  /** False when CALENDLY_TOKEN is missing or Calendly errored. */
  configured: boolean
  /** Echoes the requested month, "YYYY-MM". */
  month: string
  owner: { name: string | null; avatarUrl: string | null }
  name: string | null
  /** Minutes. */
  duration: number | null
  location: string | null
  /** The event type's public page — used for the fallback / "full calendar". */
  schedulingUrl: string | null
  slots: Slot[]
}

function unconfigured(month: string): Availability {
  return {
    configured: false,
    month,
    owner: { name: null, avatarUrl: null },
    name: null,
    duration: null,
    location: null,
    schedulingUrl: process.env.CALENDLY_URL ?? null,
    slots: [],
  }
}

async function calendly<T>(path: string): Promise<T | null> {
  const token = process.env.CALENDLY_TOKEN
  if (!token) return null

  try {
    const res = await fetch(`${API}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: REVALIDATE },
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

interface User {
  uri: string
  name: string | null
  avatar_url: string | null
}

interface EventType {
  uri: string
  name: string
  slug: string
  duration: number
  scheduling_url: string
  active: boolean
  locations: { kind: string; location?: string }[] | null
}

const LOCATION_LABELS: Record<string, string> = {
  zoom: "zoom",
  google_conference: "google meet",
  microsoft_teams_conference: "teams",
  gotomeeting: "gotomeeting",
  webex_conference: "webex",
  physical: "in person",
  outbound_call: "phone",
  inbound_call: "phone",
  ask_invitee: "your call",
}

function locationLabel(locations: EventType["locations"]): string | null {
  const kind = locations?.[0]?.kind
  if (!kind) return null
  return LOCATION_LABELS[kind] ?? locations?.[0]?.location ?? null
}

/**
 * Personal access tokens are JWTs carrying the account's user_uuid.
 *
 * /users/me needs the users:read scope, which a token isn't necessarily granted
 * — but that call only supplies the owner's name and avatar. Reading the uuid
 * straight off the token lets everything else work without it.
 */
function userUriFromToken(): string | null {
  const token = process.env.CALENDLY_TOKEN
  if (!token) return null

  try {
    const claims = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString()
    ) as { user_uuid?: string }

    return claims.user_uuid ? `${API}/users/${claims.user_uuid}` : null
  } catch {
    return null
  }
}

export function currentMonth() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
}

/**
 * Query windows covering `month`, each at most 7 days.
 *
 * The lower bound is rounded up to a 5-minute boundary so the generated URLs are
 * stable within each cache period — otherwise every request is a fresh URL and
 * Next's fetch cache never hits. Rounding up also keeps start_time in the
 * future, which Calendly requires.
 *
 * Month boundaries are computed in the server's timezone, so the range is padded
 * a day on each side; the client regroups slots by the visitor's local date.
 */
function windows(month: string): { start: string; end: string }[] {
  const bucket = 5 * 60 * 1000
  const earliest = Math.ceil((Date.now() + 60_000) / bucket) * bucket

  const [year, m] = month.split("-").map(Number)
  const monthStart = new Date(year, m - 1, 1).getTime() - DAY
  const monthEnd = new Date(year, m, 1).getTime() + DAY

  let cursor = Math.max(monthStart, earliest)
  if (cursor >= monthEnd) return [] // month is entirely in the past

  const out: { start: string; end: string }[] = []
  while (cursor < monthEnd) {
    const end = Math.min(cursor + MAX_WINDOW_DAYS * DAY, monthEnd)
    out.push({
      start: new Date(cursor).toISOString(),
      end: new Date(end).toISOString(),
    })
    cursor = end + 1000
  }
  return out
}

/**
 * Stand-in availability so the UI can be worked on before a token exists.
 * Dev only — in production a missing token falls through to `unconfigured`.
 */
function mockAvailability(month: string): Availability {
  console.warn("[calendly] CALENDLY_TOKEN not set — serving mock availability (dev only)")

  const [year, m] = month.split("-").map(Number)
  const slots: Slot[] = []

  for (let d = 1; d <= new Date(year, m, 0).getDate(); d++) {
    const date = new Date(year, m - 1, d)
    const weekend = date.getDay() === 0 || date.getDay() === 6
    if (weekend || new Date(year, m - 1, d, 23, 59).getTime() < Date.now()) continue

    // 9:00–16:30 on the half hour, with some holes so the grid isn't uniform.
    for (let half = 0; half < 16; half++) {
      if ((d + half) % 5 === 0) continue
      slots.push({
        start: new Date(
          year,
          m - 1,
          d,
          9 + Math.floor(half / 2),
          (half % 2) * 30
        ).toISOString(),
        schedulingUrl: "https://calendly.com/",
      })
    }
  }

  return {
    configured: true,
    month,
    owner: { name: "Rishaan Jain", avatarUrl: null },
    name: "15 min chat",
    duration: 15,
    location: "zoom",
    schedulingUrl: "https://calendly.com/",
    slots,
  }
}

export async function getAvailability(month = currentMonth()): Promise<Availability> {
  if (!process.env.CALENDLY_TOKEN) {
    return process.env.NODE_ENV === "development"
      ? mockAvailability(month)
      : unconfigured(month)
  }

  // Optional — only the name and avatar come from here, and it needs users:read.
  // Still attempted so the avatar appears on its own if that scope is added later.
  const me = await calendly<{ resource: User }>("/users/me")

  const userUri = me?.resource.uri ?? userUriFromToken()
  if (!userUri) return unconfigured(month)

  const types = await calendly<{ collection: EventType[] }>(
    `/event_types?user=${encodeURIComponent(userUri)}&active=true&count=100`
  )
  if (!types?.collection?.length) return unconfigured(month)

  const slug = process.env.CALENDLY_EVENT_SLUG
  const eventType =
    (slug && types.collection.find(t => t.slug === slug)) || types.collection[0]

  const pages = await Promise.all(
    windows(month).map(({ start, end }) =>
      calendly<{
        collection: { status: string; start_time: string; scheduling_url: string }[]
      }>(
        `/event_type_available_times?event_type=${encodeURIComponent(eventType.uri)}` +
          `&start_time=${encodeURIComponent(start)}&end_time=${encodeURIComponent(end)}`
      )
    )
  )

  const slots = pages
    .flatMap(page => page?.collection ?? [])
    .filter(s => s.status === "available")
    .map(s => ({ start: s.start_time, schedulingUrl: s.scheduling_url }))
    .sort((a, b) => a.start.localeCompare(b.start))

  return {
    configured: true,
    month,
    owner: {
      name: me?.resource.name ?? null,
      avatarUrl: me?.resource.avatar_url ?? null,
    },
    name: eventType.name,
    duration: eventType.duration,
    location: locationLabel(eventType.locations),
    schedulingUrl: eventType.scheduling_url,
    slots,
  }
}
