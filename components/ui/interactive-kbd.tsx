"use client"

import { useEffect, useState, useCallback } from "react"

interface KeyState {
  meta: boolean
  k: boolean
}

export function InteractiveKbd() {
  const [pressed, setPressed] = useState<KeyState>({
    meta: false,
    k: false,
  })

  const allPressed = pressed.meta && pressed.k
  const anyPressed = pressed.meta || pressed.k

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Meta" || e.key === "Control") {
      setPressed((prev) => ({ ...prev, meta: true }))
    }
    if (e.key === "k" || e.key === "K") {
      setPressed((prev) => ({ ...prev, k: true }))
    }
  }, [])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === "Meta" || e.key === "Control") {
      setPressed((prev) => ({ ...prev, meta: false }))
    }
    if (e.key === "k" || e.key === "K") {
      setPressed((prev) => ({ ...prev, k: false }))
    }
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])
  

  return (
    <div className="relative inline-flex items-center justify-center p-12">
      {/* Gradient glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-500 ease-out"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(232,93,4,0.15) 0%, rgba(249,115,22,0.1) 40%, transparent 70%)",
          filter: "blur(20px)",
          opacity: anyPressed ? (allPressed ? 1 : 0.6) : 0,
          transform: `scale(${allPressed ? 1.4 : 1.2})`,
        }}
      />

      {/* Keys */}
      <div className="relative flex items-center gap-3">
        <Key label="CMD" isPressed={pressed.meta} />
        <PlusSign />
        <Key label="K" isPressed={pressed.k} />
      </div>
    </div>
  )
}

function PlusSign() {
  return <span className="text-zinc-500 text-sm font-light select-none">+</span>
}

function Key({ label, isPressed }: { label: string; isPressed: boolean }) {
  return (
    <div
      className={`
        relative flex items-center justify-center
        px-4 py-2.5 min-w-[56px]
        rounded-md
        text-[11px] font-medium tracking-widest uppercase
        select-none
        transition-all duration-100 ease-out
        ${
          isPressed
            ? "bg-zinc-100 text-orange-500 translate-y-[3px] shadow-none border border-zinc-300"
            : "bg-white text-zinc-700 border border-zinc-200 shadow-[0_3px_0_0_#e4e4e7,0_4px_8px_rgba(0,0,0,0.05)]"
        }
      `}
    >
      <span className="relative z-10">{label}</span>
    </div>
  )
}