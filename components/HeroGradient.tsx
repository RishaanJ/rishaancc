"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function HeroGradient() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  const gradient = !mounted || !isDark
    ? "radial-gradient(circle at 60% 40%, #e84804ff 0%, #ff0000ff 25%, #f97316 45%, #fbbf24 60%, transparent 75%)"
    : "radial-gradient(circle at 60% 40%, #1e1b4b 0%, #3730a3 30%, #4f46e5 50%, transparent 72%)"

  const opacity = !mounted || !isDark ? 0.8 : 0.35

  return (
    <motion.div
      className="pointer-events-none absolute -top-20 -right-20 md:-top-30 md:-right-30 h-[250px] w-[250px] md:h-[450px] md:w-[450px]"
      style={{
        background: gradient,
        filter: "blur(50px)",
        transition: "background 0.6s ease",
      }}
      animate={{
        opacity: [opacity, opacity * 0.75, opacity * 0.9, opacity * 0.6, opacity],
        scale: [1, 1.08, 0.96, 1.04, 1],
        x: [0, 30, -20, 18, 0],
        y: [0, -25, 20, -10, 0],
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    />
  )
}
