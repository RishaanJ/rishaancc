"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ContributionCell({
  title,
  lightClass,
  darkClass,
  colIndex,
  rowIndex,
  totalCols = 53,
}: {
  title: string
  lightClass: string
  darkClass: string
  colIndex: number
  rowIndex: number
  totalCols?: number
}) {
  const [hovered, setHovered] = useState(false)

  const showBelow = rowIndex < 3
  const nearRight = colIndex >= totalCols - 4
  const nearLeft = colIndex < 4

  // Horizontal alignment: pin to right edge for last cols, left edge for first cols, else center
  const hAlign = nearRight
    ? "right-0 translate-x-0"
    : nearLeft
    ? "left-0 translate-x-0"
    : "left-1/2 -translate-x-1/2"

  // Arrow horizontal position mirrors the cell center relative to the tooltip anchor
  const arrowAlign = nearRight ? "right-0.5" : nearLeft ? "left-0.5" : "left-1/2 -translate-x-1/2"

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <motion.div
        className={`w-[10px] h-[10px] rounded-[2px] cursor-default ${lightClass} ${darkClass}`}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: (colIndex * 7 + rowIndex) * 0.003,
          duration: 0.25,
          ease: "easeOut",
        }}
      />
      <AnimatePresence>
        {hovered && title && !title.includes(": 0") && (
          <motion.div
            initial={{ opacity: 0, y: showBelow ? -4 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className={`pointer-events-none absolute ${showBelow ? "top-4" : "bottom-4"} ${hAlign} z-50 whitespace-nowrap rounded-md bg-black dark:bg-white px-2 py-1 font-[family-name:var(--font-geist-sans)] text-[10px] text-white dark:text-black shadow-md`}
          >
            {title}
            <div className={`absolute ${arrowAlign} w-0 h-0 border-x-4 border-x-transparent ${showBelow ? "-top-1.5 border-b-4 border-b-black dark:border-b-white" : "-bottom-1.5 border-t-4 border-t-black dark:border-t-white"}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
