"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon, Monitor } from "lucide-react"

const options = [
  { value: "light", icon: Sun },
  { value: "dark", icon: Moon },
  { value: "system", icon: Monitor },
]

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const switchTheme = (value: string, e: React.MouseEvent) => {
    if (value === theme) return

    const x = e.clientX
    const y = e.clientY

    const isDark = value === "dark" || (value === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

    if (!document.startViewTransition) {
      setTheme(value)
      return
    }

    document.documentElement.style.setProperty("--vt-x", `${x}px`)
    document.documentElement.style.setProperty("--vt-y", `${y}px`)
    document.documentElement.dataset.vtDark = isDark ? "1" : "0"

    document.startViewTransition(() => {
      setTheme(value)
    })
  }

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 flex items-center gap-1 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-1 shadow-sm">
      {options.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={(e) => switchTheme(value, e)}
          className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors ${
            theme === value
              ? "bg-black dark:bg-white text-white dark:text-black"
              : "text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          aria-label={value}
        >
          <Icon size={13} />
        </button>
      ))}
    </div>
  )
}
