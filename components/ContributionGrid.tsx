import ContributionCell from "./ContributionCell"

async function fetchLastCommit(): Promise<{ message: string; repo: string; url: string } | null> {
  try {
    const res = await fetch(
      "https://api.github.com/users/RishaanJ/events/public?per_page=30",
      { next: { revalidate: 300 } }
    )
    const events = await res.json()
    const push = events.find((e: any) => e.type === "PushEvent" && e.payload?.head)
    if (!push) return null

    const sha = push.payload.head
    const repo = push.repo.name

    const commitRes = await fetch(
      `https://api.github.com/repos/${repo}/commits/${sha}`,
      { next: { revalidate: 300 } }
    )
    if (!commitRes.ok) return null
    const commit = await commitRes.json()

    return {
      message: commit.commit.message.split("\n")[0].slice(0, 60),
      repo: repo.split("/")[1],
      url: `https://github.com/${repo}/commit/${sha}`,
    }
  } catch {
    return null
  }
}

interface Contribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

async function fetchContributions(): Promise<Contribution[]> {
  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/RishaanJ?y=last",
      { next: { revalidate: 3600 } }
    )
    const data = await res.json()
    return data.contributions as Contribution[]
  } catch {
    return []
  }
}

// Build a 53-week grid (columns) × 7 days (rows), Sunday-first
function buildGrid(contributions: Contribution[]) {
  const map: Record<string, Contribution> = {}
  for (const c of contributions) map[c.date] = c

  // Start from the Sunday on or before the first contribution date
  const today = new Date()
  const end = new Date(today)
  // go to the end of the current week (Saturday)
  end.setDate(end.getDate() + (6 - end.getDay()))

  const start = new Date(end)
  start.setDate(start.getDate() - 52 * 7 - end.getDay())

  const weeks: (Contribution | null)[][] = []
  const cur = new Date(start)

  while (cur <= end) {
    const week: (Contribution | null)[] = []
    for (let d = 0; d < 7; d++) {
      const dateStr = cur.toISOString().slice(0, 10)
      week.push(map[dateStr] ?? null)
      cur.setDate(cur.getDate() + 1)
    }
    weeks.push(week)
  }

  return weeks
}

const LEVEL_LIGHT = [
  "bg-neutral-100",        // 0 — empty
  "bg-orange-200",         // 1 — low
  "bg-orange-300",         // 2
  "bg-orange-400",         // 3
  "bg-orange-500",         // 4 — high
]

const LEVEL_DARK = [
  "dark:bg-neutral-900",
  "dark:bg-orange-900/60",
  "dark:bg-orange-700/70",
  "dark:bg-orange-500/80",
  "dark:bg-orange-400",
]

export default async function ContributionGrid() {
  const [contributions, lastCommit] = await Promise.all([fetchContributions(), fetchLastCommit()])
  const total = contributions.reduce((s, c) => s + c.count, 0)
  const weeks = buildGrid(contributions)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="font-[family-name:var(--font-geist-sans)] text-xs text-gray-400 dark:text-gray-600">
          {total} contributions in the last year
        </p>
        <a
          href="https://github.com/RishaanJ"
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-geist-sans)] text-xs text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors"
        >
          github ↗
        </a>
      </div>

      {lastCommit && (
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 animate-pulse" />
          <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-gray-400 dark:text-gray-600 truncate max-w-[420px]">
            {lastCommit.repo}: {lastCommit.message}
          </span>
        </div>
      )}

      <div className="flex gap-[3px] overflow-hidden">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <ContributionCell
                key={di}
                title={day ? `${day.date}: ${day.count} contributions` : ""}
                lightClass={LEVEL_LIGHT[day?.level ?? 0]}
                darkClass={LEVEL_DARK[day?.level ?? 0]}
                colIndex={wi}
                rowIndex={di}
                totalCols={weeks.length}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
