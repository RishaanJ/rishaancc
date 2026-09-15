"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import Cal, { getCalApi } from "@calcom/embed-react"
import { track } from "@vercel/analytics"

const NAMESPACE = "15min"
const CAL_LINK = "rishaanjain/15min"
const BRAND = "#FC6F5E"

/**
 * Cal only lays the booker out as three panels once its iframe is ~950px wide,
 * and the page column is ~700px. So it's rendered at full size and scaled down
 * to fit — the compact layout at the column's width, rather than the ~930px-tall
 * stacked one.
 */
const DESIGN_WIDTH = 1000
const DESIGN_HEIGHT = 580

/** Below this the shrunk text stops being readable, so Cal's own narrow layout wins. */
const MIN_SCALABLE_WIDTH = 560

/** Mounting can only happen once, so there's nothing to subscribe to. */
function subscribeNever() {
  return () => {}
}

export default function BookCall() {
  const { resolvedTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false
  )

  // Before hydration settles there's no way to know the visitor's theme, so the
  // embed is held back rather than mounted light and repainted dark.
  const theme = resolvedTheme === "dark" ? "dark" : "light"

  const box = useRef<HTMLDivElement>(null)
  // 0 means "don't scale" — narrow enough that Cal's own layout is the better one.
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const el = box.current
    if (!el) return

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width
      setScale(width >= MIN_SCALABLE_WIDTH ? Math.min(1, width / DESIGN_WIDTH) : 0)
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!mounted) return
    let active = true

    ;(async () => {
      const cal = await getCalApi({ namespace: NAMESPACE })
      if (!active) return

      cal("ui", {
        theme,
        cssVarsPerTheme: {
          light: { "cal-brand": BRAND },
          dark: { "cal-brand": BRAND },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      })

      cal("on", {
        action: "bookingSuccessfulV2",
        callback: () => track("book_call", { slot: "cal.com" }),
      })
    })()

    return () => {
      active = false
    }
  }, [mounted, theme])

  return (
    <div ref={box} className="w-full">
      <div
        className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-black"
        // Scaling leaves the pre-transform height behind, so the card has to be
        // told what the embed actually occupies once shrunk.
        style={scale ? { height: DESIGN_HEIGHT * scale } : undefined}
      >
        {mounted && (
          <div
            style={
              scale
                ? {
                    width: DESIGN_WIDTH,
                    height: DESIGN_HEIGHT,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }
                : undefined
            }
          >
            <Cal
              namespace={NAMESPACE}
              calLink={CAL_LINK}
              style={{ width: "100%", height: "100%" }}
              config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true", theme }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
