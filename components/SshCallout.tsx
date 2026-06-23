"use client"

import { useState, useEffect, useRef } from "react"
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons"
import { track } from "@vercel/analytics"

const CMD = "ssh sup@sup.rishaan.cc"
const TYPE_SPEED = 65
const DELETE_SPEED = 35
const PAUSE_FULL = 2200
const PAUSE_EMPTY = 600

export default function SshCallout() {
  const [copied, setCopied] = useState(false)
  const [displayed, setDisplayed] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const stateRef = useRef<"typing" | "pausing" | "deleting" | "waiting">("typing")
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // cursor blink
    const blink = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    let index = 0

    const tick = () => {
      if (stateRef.current === "typing") {
        index++
        setDisplayed(CMD.slice(0, index))
        if (index === CMD.length) {
          stateRef.current = "pausing"
          timeoutRef.current = setTimeout(tick, PAUSE_FULL)
        } else {
          timeoutRef.current = setTimeout(tick, TYPE_SPEED)
        }
      } else if (stateRef.current === "pausing") {
        stateRef.current = "deleting"
        tick()
      } else if (stateRef.current === "deleting") {
        index--
        setDisplayed(CMD.slice(0, index))
        if (index === 0) {
          stateRef.current = "waiting"
          timeoutRef.current = setTimeout(tick, PAUSE_EMPTY)
        } else {
          timeoutRef.current = setTimeout(tick, DELETE_SPEED)
        }
      } else if (stateRef.current === "waiting") {
        stateRef.current = "typing"
        tick()
      }
    }

    timeoutRef.current = setTimeout(tick, 500)
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  const copy = () => {
    navigator.clipboard.writeText(CMD)
    setCopied(true)
    track("ssh_copy")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-[family-name:var(--font-geist-sans)] text-xs text-gray-400 dark:text-gray-600">
        or open in terminal
      </p>
      <button
        onClick={copy}
        className="group flex items-center justify-between gap-4 w-fit rounded-lg bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 px-4 py-2.5 cursor-pointer transition-opacity hover:opacity-70"
      >
        <span className="flex items-center gap-2 font-mono text-sm">
          <span className="text-neutral-400 dark:text-neutral-500 select-none">$</span>
          <span className="text-black dark:text-white min-w-0">{displayed}</span>
          <span
            className="select-none text-neutral-500 dark:text-neutral-400 transition-opacity"
            style={{ opacity: cursorVisible ? 1 : 0 }}
          >▌</span>
        </span>
        <span className="text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
          {copied
            ? <CheckIcon className="w-3.5 h-3.5 text-green-500" />
            : <CopyIcon className="w-3.5 h-3.5" />
          }
        </span>
      </button>
    </div>
  )
}
