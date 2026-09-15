"use client"

import { useEffect, useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import Cal, { getCalApi } from "@calcom/embed-react"
import { track } from "@vercel/analytics"

const NAMESPACE = "15min"
const CAL_LINK = "rishaanjain/15min"
const BRAND = "#FC6F5E"

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
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-black min-h-[560px]">
      {mounted && (
        <Cal
          namespace={NAMESPACE}
          calLink={CAL_LINK}
          style={{ width: "100%", height: "100%", overflow: "auto" }}
          config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true", theme }}
        />
      )}
    </div>
  )
}
