"use client"

import { useEffect, useRef, useState } from "react"

const CHARS = "abcdefghijklmnopqrstuvwxyz!@#$%&*/?+=-_~^<>[]"

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

interface ScrambleTextProps {
  text: string
  className?: string
  duration?: number
  delay?: number
}

export function ScrambleText({ text, className, duration = 1200, delay = 0 }: ScrambleTextProps) {
  const [display, setDisplay] = useState("")
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const rawProgress = Math.min(elapsed / duration, 1)
      const progress = easeOut(rawProgress)
      const revealedCount = Math.floor(progress * text.length)

      const scrambled = text
        .split("")
        .map((char, i) => {
          if (char === " " || char === "'" || char === "," || char === ".") return char
          if (i < revealedCount) return char
          const distanceFromReveal = i - revealedCount
          if (distanceFromReveal < 2 && Math.random() > 0.4) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join("")

      setDisplay(scrambled)

      if (rawProgress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setDisplay(text)
      }
    }

    const timeout = setTimeout(() => {
      frameRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [text, duration, delay])

  return <span className={className}>{display}</span>
}
