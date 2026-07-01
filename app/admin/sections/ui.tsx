"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import type { SectionKey, SiteContent } from "@/lib/content/types"

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-600">
      {children}
    </label>
  )
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 ${props.className ?? ""}`}
    />
  )
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 ${props.className ?? ""}`}
    />
  )
}

export function Button({
  children,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" | "outline" }) {
  const base = "rounded-md text-sm font-medium px-3 py-1.5 transition-colors disabled:opacity-50"
  const styles: Record<string, string> = {
    primary: "bg-black text-white dark:bg-white dark:text-black",
    ghost: "text-gray-500 hover:text-black dark:hover:text-white",
    danger: "text-red-500 hover:text-red-600",
    outline: "border border-dashed border-gray-300 dark:border-gray-700 text-gray-500 hover:text-black dark:hover:text-white hover:border-gray-500 dark:hover:border-gray-500",
  }
  return (
    <button {...props} className={`${base} ${styles[variant]} ${props.className ?? ""}`}>
      {children}
    </button>
  )
}

export type SaveState = "idle" | "saving" | "saved" | "error"

export function useSaver<K extends SectionKey>(section: K) {
  const [state, setState] = useState<SaveState>("idle")
  const [error, setError] = useState<string>("")

  async function save(value: SiteContent[K]): Promise<boolean> {
    setState("saving")
    setError("")
    try {
      const res = await fetch(`/api/admin/content/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const issueMsg = data?.issues?.[0]
          ? `${data.issues[0].path?.join(".") || "field"}: ${data.issues[0].message}`
          : undefined
        setError(issueMsg ?? data?.error ?? "Save failed")
        setState("error")
        return false
      }
      setState("saved")
      setTimeout(() => setState("idle"), 2000)
      return true
    } catch {
      setError("Network error")
      setState("error")
      return false
    }
  }

  return { state, error, save }
}

export function SaveBar({
  state,
  error,
  onSave,
  dirty,
}: {
  state: SaveState
  error: string
  onSave: () => void
  dirty: boolean
}) {
  return (
    <div className="flex items-center gap-3 pt-4 mt-6 border-t border-gray-100 dark:border-gray-900">
      <Button onClick={onSave} disabled={!dirty || state === "saving"}>
        {state === "saving" ? "saving…" : state === "saved" ? "saved ✓" : "save"}
      </Button>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {dirty && state !== "saved" && (
        <p className="text-xs text-gray-400">unsaved changes</p>
      )}
    </div>
  )
}

export function Row({
  children,
  flashing = false,
  rowRef,
}: {
  children: ReactNode
  flashing?: boolean
  rowRef?: (el: HTMLDivElement | null) => void
}) {
  return (
    <div
      ref={rowRef}
      className={`rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4 flex flex-col gap-3 ${flashing ? "animate-flash-new" : ""}`}
    >
      {children}
    </div>
  )
}

/**
 * Tracks a "newly added" item and:
 * - highlights it with a flash animation
 * - scrolls it into view
 *
 * Call `markPendingFlash()` BEFORE/AS you setState that grows the list,
 * then wire `flashIndex` into your row rendering and `setRef(i, el)` into refs.
 */
export function useAddFlash(listLength: number) {
  const [flashIndex, setFlashIndex] = useState<number | null>(null)
  const pendingRef = useRef<number | null>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (pendingRef.current === null) return
    const idx = pendingRef.current
    pendingRef.current = null
    setFlashIndex(idx)
    // wait for the new row to mount before scrolling
    requestAnimationFrame(() => {
      rowRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" })
    })
    const id = setTimeout(() => setFlashIndex(null), 1600)
    return () => clearTimeout(id)
  }, [listLength])

  function markPendingFlash(nextIndex: number) {
    pendingRef.current = nextIndex
  }

  function setRef(i: number) {
    return (el: HTMLDivElement | null) => {
      rowRefs.current[i] = el
    }
  }

  return { flashIndex, markPendingFlash, setRef }
}

/**
 * Small thumbnail preview for a URL or local path. Renders the image if it
 * loads, a subtle placeholder otherwise.
 */
export function ImagePreview({ src, alt, size = 56 }: { src: string; alt?: string; size?: number }) {
  const [errored, setErrored] = useState(false)
  useEffect(() => {
    setErrored(false)
  }, [src])
  const empty = !src || src.trim() === "" || src.trim() === "/"
  return (
    <div
      className="shrink-0 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 overflow-hidden flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {empty || errored ? (
        <span className="text-[10px] text-gray-400 dark:text-gray-600">no img</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? ""}
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  )
}
