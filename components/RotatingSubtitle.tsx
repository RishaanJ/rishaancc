"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const lines = [
  "developer and builder based in San Francisco",
  "turning ideas into URLs since 2021",
  "pre-revenue. aggressively building.",
  "shipping things nobody asked for",
  "building in public. breaking in private.",
]

export default function RotatingSubtitle() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % lines.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative" style={{ minHeight: "2.4rem" }}>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-[1.75rem] tracking-[-0.03em] text-black dark:text-white leading-[1.2]"
          style={{
            fontFamily: "'Apple Garamond Light', 'Apple Garamond', 'Garamond', 'EB Garamond', Georgia, serif",
            fontStyle: "italic",
          }}
        >
          {lines[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
