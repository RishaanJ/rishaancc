"use client"

import { motion, useReducedMotion } from "framer-motion"

export default function GodanReveal({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
