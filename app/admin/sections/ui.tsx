"use client"

import { useState, type ReactNode } from "react"
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
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  const base = "rounded-md text-sm font-medium px-3 py-1.5 transition-colors disabled:opacity-50"
  const styles: Record<string, string> = {
    primary: "bg-black text-white dark:bg-white dark:text-black",
    ghost: "text-gray-500 hover:text-black dark:hover:text-white",
    danger: "text-red-500 hover:text-red-600",
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

export function Row({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-3">
      {children}
    </div>
  )
}
