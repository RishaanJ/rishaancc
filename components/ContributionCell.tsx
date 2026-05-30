"use client"

import { motion } from "framer-motion"

export default function ContributionCell({
  title,
  lightClass,
  darkClass,
  colIndex,
  rowIndex,
}: {
  title: string
  lightClass: string
  darkClass: string
  colIndex: number
  rowIndex: number
}) {
  return (
    <motion.div
      title={title}
      className={`w-[10px] h-[10px] rounded-[2px] cursor-pointer ${lightClass} ${darkClass}`}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: (colIndex * 7 + rowIndex) * 0.003,
        duration: 0.25,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.7, transition: { duration: 0.12 } }}
    />
  )
}
