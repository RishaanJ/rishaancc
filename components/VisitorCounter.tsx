"use client"

import { useEffect, useRef, useState } from "react"

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

function useCountUp(target: number | null, duration = 1000) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (target === null) return
    const start = performance.now()
    const from = 0

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(from + (target - from) * eased))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
      else setValue(target)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, duration])

  return value
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const displayed = useCountUp(count)

  useEffect(() => {
    fetch("/api/visitors", { method: "POST" })
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => {})
  }, [])

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-4 font-[family-name:var(--font-geist-sans)]">
      <p className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest">visitors</p>
      {count === null ? (
        <span className="text-gray-300 dark:text-gray-700 text-sm">—</span>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          you&apos;re the{" "}
          <span className="font-semibold text-black dark:text-white tabular-nums">
            {displayed.toLocaleString()}
          </span>
          <sup className="text-[0.65em]">{ordinal(count)}</sup>
          {" "}person here
        </p>
      )}
    </div>
  )
}
