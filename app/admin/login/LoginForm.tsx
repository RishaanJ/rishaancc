"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function LoginForm() {
  const params = useSearchParams()
  const initialError = params.get("error") === "invalid_link" ? "That link is invalid or expired." : ""
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle")
  const [error, setError] = useState(initialError)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("submitting")
    setError("")
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data?.error ?? "Login failed")
        setStatus("idle")
        return
      }
      setStatus("sent")
    } catch {
      setError("Network error")
      setStatus("idle")
    }
  }

  if (status === "sent") {
    return (
      <div className="w-full max-w-sm flex flex-col items-center text-center gap-3">
        <h1 className="text-2xl font-semibold tracking-[-0.04em]">check your email</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          a sign-in link was sent. it expires in 10 minutes and works only once.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.04em]">admin</h1>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          password, then magic link
        </p>
      </div>

      <input
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="password"
        className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-600"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting" || !password}
        className="rounded-md bg-black text-white dark:bg-white dark:text-black text-sm font-medium py-2 px-4 disabled:opacity-50"
      >
        {status === "submitting" ? "sending link…" : "send sign-in link"}
      </button>
    </form>
  )
}
