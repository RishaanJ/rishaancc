"use client"

import { useEffect, useMemo, useState, useSyncExternalStore } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowTopRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  GlobeIcon,
  VideoIcon,
} from "@radix-ui/react-icons"
import { track } from "@vercel/analytics"

interface Slot {
  start: string
  schedulingUrl: string
}

interface Availability {
  configured: boolean
  month: string
  owner: { name: string | null; avatarUrl: string | null }
  name: string | null
  duration: number | null
  location: string | null
  schedulingUrl: string | null
  slots: Slot[]
}

const EMAIL = "rishaanjain188@gmail.com"
const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

const CARD =
  "rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-black"

// Local date -> "YYYY-MM-DD" (avoids the UTC off-by-one from toISOString)
function dayKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`
}

function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
}

function shiftMonth(month: string, by: number) {
  const [year, m] = month.split("-").map(Number)
  return monthKey(new Date(year, m - 1 + by, 1))
}

/** Sunday-first cells. Padding before/after the month is null, rendered as gaps. */
function monthCells(month: string): (Date | null)[] {
  const [year, m] = month.split("-").map(Number)
  const leading = new Date(year, m - 1, 1).getDay()
  const days = new Date(year, m, 0).getDate()

  const cells: (Date | null)[] = Array.from({ length: leading }, () => null)
  for (let d = 1; d <= days; d++) cells.push(new Date(year, m - 1, d))
  while (cells.length % 7) cells.push(null)

  return cells
}

function formatTime(iso: string, hour12: boolean) {
  return new Date(iso)
    .toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", hour12 })
    .toLowerCase()
    .replace(/\s+/g, "")
}

function monthLabel(month: string) {
  const [year, m] = month.split("-").map(Number)
  return {
    name: new Date(year, m - 1, 1)
      .toLocaleDateString(undefined, { month: "long" })
      .toLowerCase(),
    year,
  }
}

/** The timezone can't change mid-session, so there's nothing to subscribe to. */
function subscribeNever() {
  return () => {}
}

/** "America/Los_Angeles" — whatever the visitor's browser reports. */
function timezoneName() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export default function BookCall() {
  // Cached per month so navigating back and forth doesn't refetch.
  const [months, setMonths] = useState<Record<string, Availability>>({})
  const [view, setView] = useState(() => monthKey(new Date()))
  const [pickedDay, setPickedDay] = useState<string | null>(null)
  const [hour12, setHour12] = useState(true)
  const [failed, setFailed] = useState(false)

  // Client-only value: the server has no idea where the visitor is, so it
  // renders empty and fills in after hydration.
  const timezone = useSyncExternalStore(subscribeNever, timezoneName, () => "")

  const loaded = months[view]
  // The event details don't change between months, so any loaded month can fill
  // the meta panel while a newly navigated month is still in flight.
  const meta = loaded ?? Object.values(months)[0]
  const loading = !loaded

  useEffect(() => {
    if (months[view]) return
    let active = true

    fetch(`/api/calendly?month=${view}`)
      .then(res => (res.ok ? res.json() : null))
      .then((data: Availability | null) => {
        if (!active) return
        if (data) setMonths(prev => ({ ...prev, [view]: data }))
        else setFailed(true)
      })
      .catch(() => {
        if (active) setFailed(true)
      })

    return () => {
      active = false
    }
  }, [view, months])

  const slotsByDay = useMemo(() => {
    const map = new Map<string, Slot[]>()
    for (const slot of loaded?.slots ?? []) {
      const key = dayKey(new Date(slot.start))
      const day = map.get(key)
      if (day) day.push(slot)
      else map.set(key, [slot])
    }
    return map
  }, [loaded])

  const cells = useMemo(() => monthCells(view), [view])
  const today = dayKey(new Date())
  const thisMonth = monthKey(new Date())

  // Derived rather than stored, so changing month can't strand the selection on
  // a day that no longer exists.
  const selectedDay =
    pickedDay && slotsByDay.has(pickedDay)
      ? pickedDay
      : [...slotsByDay.keys()].sort()[0] ?? null

  const daySlots = selectedDay ? slotsByDay.get(selectedDay) ?? [] : []

  if (!meta) return failed ? <Fallback /> : <Skeleton />

  if (!meta.configured) return <Fallback schedulingUrl={meta.schedulingUrl} />

  const { name, year } = monthLabel(view)
  const selectedDate = selectedDay ? new Date(`${selectedDay}T00:00:00`) : null

  return (
    <div className={CARD}>
      <div className="flex flex-col lg:flex-row">
        {/* Meta */}
        <div className="lg:w-48 shrink-0 p-5 flex flex-col gap-3 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            {meta.owner.avatarUrl && (
              // 24px avatar from Calendly's CDN — next/image would mean adding
              // their host to remotePatterns for no real win.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={meta.owner.avatarUrl}
                alt=""
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <p className="font-[family-name:var(--font-geist-sans)] text-xs text-gray-400 dark:text-gray-600">
              {meta.owner.name?.toLowerCase() ?? "rishaan jain"}
            </p>
          </div>

          <h3 className="font-[family-name:var(--font-geist-sans)] text-lg font-semibold tracking-[-0.04em] text-black dark:text-white leading-tight">
            {meta.name?.toLowerCase() ?? "book a call"}
          </h3>

          <div className="flex flex-col gap-2 font-[family-name:var(--font-geist-sans)] text-xs text-gray-500 dark:text-gray-400">
            {meta.duration && (
              <Meta icon={<ClockIcon />}>{meta.duration}m</Meta>
            )}
            {meta.location && (
              <Meta icon={<VideoIcon />}>{meta.location}</Meta>
            )}
            {timezone && <Meta icon={<GlobeIcon />}>{timezone}</Meta>}
          </div>
        </div>

        {/* Calendar */}
        <div
          className={`flex-1 p-5 min-w-0 transition-opacity ${
            loading ? "opacity-40" : ""
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="font-[family-name:var(--font-geist-sans)] text-sm tracking-[-0.02em]">
              <span className="font-semibold text-black dark:text-white">{name}</span>{" "}
              <span className="text-gray-400 dark:text-gray-600">{year}</span>
            </p>
            <div className="flex items-center gap-1">
              <NavButton
                label="previous month"
                disabled={view <= thisMonth}
                onClick={() => setView(shiftMonth(view, -1))}
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </NavButton>
              <NavButton
                label="next month"
                onClick={() => setView(shiftMonth(view, 1))}
              >
                <ChevronRightIcon className="w-4 h-4" />
              </NavButton>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAYS.map(d => (
              <div
                key={d}
                className="font-[family-name:var(--font-geist-sans)] text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-600 text-center py-1"
              >
                {d.slice(0, 3)}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((date, i) => {
              if (!date) return <div key={i} />

              const key = dayKey(date)
              const open = slotsByDay.has(key)
              const active = key === selectedDay

              return (
                <button
                  key={i}
                  disabled={!open}
                  onClick={() => setPickedDay(key)}
                  aria-pressed={active}
                  aria-label={date.toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                  className={`relative aspect-square rounded-lg font-[family-name:var(--font-geist-sans)] text-xs font-medium transition-colors ${
                    active
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : open
                        ? "bg-gray-100 dark:bg-gray-900 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                        : "text-gray-300 dark:text-gray-700 cursor-default"
                  }`}
                >
                  {date.getDate()}
                  {key === today && (
                    <span
                      className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                        active ? "bg-white dark:bg-black" : "bg-orange-500"
                      }`}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Times */}
        <div
          className={`lg:w-44 shrink-0 p-5 flex flex-col gap-3 border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-800 transition-opacity ${
            loading ? "opacity-40" : ""
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="font-[family-name:var(--font-geist-sans)] text-sm tracking-[-0.02em] truncate">
              {selectedDate ? (
                <>
                  <span className="font-semibold text-black dark:text-white">
                    {selectedDate
                      .toLocaleDateString(undefined, { weekday: "short" })
                      .toLowerCase()}
                  </span>{" "}
                  <span className="text-gray-400 dark:text-gray-600">
                    {selectedDate.getDate()}
                  </span>
                </>
              ) : (
                <span className="text-gray-400 dark:text-gray-600">no openings</span>
              )}
            </p>

            <div className="flex items-center rounded-lg bg-gray-100 dark:bg-gray-900 p-0.5 shrink-0">
              {[true, false].map(is12 => (
                <button
                  key={String(is12)}
                  onClick={() => setHour12(is12)}
                  aria-pressed={hour12 === is12}
                  className={`font-[family-name:var(--font-geist-sans)] rounded-md px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
                    hour12 === is12
                      ? "bg-white dark:bg-black text-black dark:text-white"
                      : "text-gray-400 dark:text-gray-600"
                  }`}
                >
                  {is12 ? "12h" : "24h"}
                </button>
              ))}
            </div>
          </div>

          {/* Nested scrolling only on desktop — on mobile the slots wrap into a
              grid instead, so the page scrolls normally. */}
          <div className="lg:max-h-[268px] lg:overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDay ?? "empty"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-1 gap-2"
              >
                {daySlots.length ? (
                  daySlots.map(slot => (
                    <a
                      key={slot.start}
                      href={slot.schedulingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("book_call", { slot: slot.start })}
                      className="font-[family-name:var(--font-geist-sans)] text-center rounded-lg border border-gray-200 dark:border-gray-800 py-2 text-xs font-medium text-black dark:text-white transition-colors hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-black dark:hover:border-white"
                    >
                      {formatTime(slot.start, hour12)}
                    </a>
                  ))
                ) : (
                  <p className="col-span-full font-[family-name:var(--font-geist-sans)] text-xs text-gray-400 dark:text-gray-600 leading-relaxed">
                    {loading
                      ? "checking availability…"
                      : `nothing open in ${name}`}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex items-center justify-end">
        {meta.schedulingUrl && (
          <a
            href={meta.schedulingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group font-[family-name:var(--font-geist-sans)] flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors"
          >
            full calendar
            <ArrowTopRightIcon className="w-3 h-3 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
          </a>
        )}
      </div>
    </div>
  )
}

function Meta({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2">
      <span className="text-gray-400 dark:text-gray-600 shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5">
        {icon}
      </span>
      <span className="truncate">{children}</span>
    </span>
  )
}

function NavButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="rounded-lg p-1 text-gray-400 dark:text-gray-600 transition-colors hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 dark:disabled:hover:text-gray-600"
    >
      {children}
    </button>
  )
}

function Skeleton() {
  return (
    <div className={`${CARD} animate-pulse`}>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-48 shrink-0 p-5 flex flex-col gap-3 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800">
          <div className="h-6 w-24 rounded-full bg-gray-100 dark:bg-gray-900" />
          <div className="h-4 w-32 rounded bg-gray-100 dark:bg-gray-900" />
          <div className="h-3 w-20 rounded bg-gray-100 dark:bg-gray-900" />
          <div className="h-3 w-28 rounded bg-gray-100 dark:bg-gray-900" />
        </div>
        <div className="flex-1 p-5">
          <div className="h-4 w-28 rounded bg-gray-100 dark:bg-gray-900 mb-5" />
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-900"
              />
            ))}
          </div>
        </div>
        <div className="lg:w-44 shrink-0 p-5 flex flex-col gap-2 border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-800">
          <div className="h-4 w-16 rounded bg-gray-100 dark:bg-gray-900 mb-1" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 rounded-lg bg-gray-100 dark:bg-gray-900" />
          ))}
        </div>
      </div>
      <div className="h-[41px] border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950" />
    </div>
  )
}

/** No token configured, or Calendly is unreachable — degrade to a link out. */
function Fallback({ schedulingUrl }: { schedulingUrl?: string | null }) {
  const href = schedulingUrl ?? `mailto:${EMAIL}`

  return (
    <div className={`${CARD} flex items-center justify-between gap-4 px-5 py-4`}>
      <div className="flex flex-col gap-0.5">
        <p className="font-[family-name:var(--font-geist-sans)] text-xs font-medium text-black dark:text-white">
          book a call
        </p>
        <p className="font-[family-name:var(--font-geist-sans)] text-xs text-gray-400 dark:text-gray-600">
          grab a time that works for you
        </p>
      </div>

      <motion.a
        href={href}
        target={schedulingUrl ? "_blank" : undefined}
        rel="noopener noreferrer"
        onClick={() => track("book_call", { slot: "fallback" })}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="font-[family-name:var(--font-geist-sans)] shrink-0 rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-medium px-4 py-2.5 transition-opacity hover:opacity-80"
      >
        {schedulingUrl ? "pick a time ↗" : "email me →"}
      </motion.a>
    </div>
  )
}
