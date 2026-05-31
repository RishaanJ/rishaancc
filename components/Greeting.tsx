"use client"

import { useEffect, useState } from "react"

export default function Greeting() {
  const [returning, setReturning] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem("rish_visited")
    if (hasVisited) setReturning(true)
    else localStorage.setItem("rish_visited", "1")
  }, [])

  return (
    <>
      <h1 className="font-[family-name:var(--font-geist-sans)] text-3xl sm:text-4xl font-semibold tracking-[-0.05em] text-black dark:text-white leading-[1.1]">
        hey, i&apos;m rishaan
      </h1>
    </>
  )
}
