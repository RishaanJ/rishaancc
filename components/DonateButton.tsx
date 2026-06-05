"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRightIcon } from "@radix-ui/react-icons"

export default function DonateButton() {
  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setShow(true)}
        className="font-[family-name:var(--font-geist-sans)] text-xs font-medium bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full hover:opacity-80 transition-opacity shrink-0 flex items-center gap-1"
      >
        give money <ArrowRightIcon className="w-3 h-3" />
      </button>

      <AnimatePresence>
        {show && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setShow(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-full right-0 mb-2 z-50 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 shadow-sm w-48 text-center"
            >
              <a
                href="https://ko-fi.com/rishaanjain"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-geist-sans)] text-sm font-medium text-black dark:text-white hover:opacity-70 transition-opacity"
              >
                ko-fi ☕
              </a>
              <p className="font-[family-name:var(--font-geist-sans)] text-xs text-gray-400 dark:text-gray-600 mt-0.5">support my work</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
