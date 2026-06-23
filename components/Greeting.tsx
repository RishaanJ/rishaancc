"use client"

import { useEffect } from "react"
import { defaultContent } from "@/lib/content/defaults"

export default function Greeting({ text = defaultContent.greeting }: { text?: string }) {
  useEffect(() => {
    if (!localStorage.getItem("rish_visited")) {
      localStorage.setItem("rish_visited", "1")
    }
  }, [])

  return (
    <>
      <h1 className="font-[family-name:var(--font-geist-sans)] text-3xl sm:text-4xl font-semibold tracking-[-0.05em] text-black dark:text-white leading-[1.1]">
        {text}
      </h1>
    </>
  )
}
