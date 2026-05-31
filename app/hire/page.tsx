"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckIcon } from "@radix-ui/react-icons"
import Link from "next/link"

const ORDER_TYPES = ["Full-time", "Internship", "Contract", "Collab"]

export default function HirePage() {
  const [orderType, setOrderType] = useState("Full-time")
  const [confirmed, setConfirmed] = useState(false)
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText("rishaanjain188@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center px-5 font-[family-name:var(--font-geist-sans)]">

      <AnimatePresence mode="wait">
        {!confirmed ? (
          <motion.div
            key="order"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm"
          >
            {/* Back */}
            <Link href="/" className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors mb-8">
              ← back to rishaan.cc
            </Link>

            {/* Header */}
            <div className="mb-6">
              <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-1">NASDAQ: RISH</p>
              <h1 className="text-3xl font-semibold tracking-[-0.05em] text-black dark:text-white">Place Order</h1>
              <p className="text-sm text-gray-400 dark:text-gray-600 mt-1">Rishaan Jain · 1 share available</p>
            </div>

            {/* Order card */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">

              {/* Order type */}
              <div className="p-5 border-b border-gray-100 dark:border-gray-800">
                <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-3">Order Type</p>
                <div className="grid grid-cols-2 gap-2">
                  {ORDER_TYPES.map(t => (
                    <button
                      key={t}
                      onClick={() => setOrderType(t)}
                      className={`py-2 rounded-lg text-xs font-medium transition-all ${
                        orderType === t
                          ? "bg-black dark:bg-white text-white dark:text-black"
                          : "bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order details */}
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex flex-col gap-3">
                <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest">Order Summary</p>
                {[
                  { label: "Ticker",     value: "$RISH" },
                  { label: "Quantity",   value: "1 engineer" },
                  { label: "Type",       value: orderType },
                  { label: "Ask Price",  value: "competitive" },
                  { label: "Available",  value: "immediately" },
                  { label: "Location",   value: "San Francisco, CA" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 dark:text-gray-600">{label}</span>
                    <span className="text-xs font-medium text-black dark:text-white">{value}</span>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="px-5 py-3 bg-gray-50 dark:bg-gray-950">
                <p className="text-[10px] text-gray-400 dark:text-gray-600">
                  Market orders execute at the best available rate. Past performance (GitHub) is not indicative of future results. Probably.
                </p>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              onClick={() => setConfirmed(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full bg-green-500 hover:bg-green-400 transition-colors text-white font-semibold py-3.5 rounded-xl text-sm font-[family-name:var(--font-geist-sans)]"
            >
              Buy 1 share of RISH →
            </motion.button>

            <p className="text-center text-[10px] text-gray-300 dark:text-gray-800 mt-3">
              *not real financial advice. or is it 👀
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm text-center"
          >
            {/* Success icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5"
            >
              <CheckIcon className="w-7 h-7 text-green-500" />
            </motion.div>

            <h2 className="text-2xl font-semibold tracking-[-0.05em] text-black dark:text-white mb-1">Order Placed</h2>
            <p className="text-sm text-gray-400 dark:text-gray-600 mb-8">
              Your {orderType.toLowerCase()} order for 1 share of $RISH has been submitted.
            </p>

            {/* Contact card */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 text-left mb-4">
              <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-4">Settlement Details</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 dark:text-gray-600">Email</span>
                  <button
                    onClick={copy}
                    className="flex items-center gap-1.5 text-xs font-medium text-black dark:text-white hover:opacity-60 transition-opacity"
                  >
                    {copied ? <CheckIcon className="w-3 h-3 text-green-500" /> : null}
                    {copied ? "copied!" : "rishaanjain188@gmail.com"}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 dark:text-gray-600">LinkedIn</span>
                  <a
                    href="https://www.linkedin.com/in/rishaan-jain-517b80275/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-black dark:text-white hover:opacity-60 transition-opacity"
                  >
                    rishaan-jain ↗
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 dark:text-gray-600">GitHub</span>
                  <a
                    href="https://github.com/RishaanJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-black dark:text-white hover:opacity-60 transition-opacity"
                  >
                    RishaanJ ↗
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 dark:text-gray-600">Settlement</span>
                  <span className="text-xs font-medium text-black dark:text-white">T+1 (reply within 24h)</span>
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="text-xs text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors"
            >
              ← back to rishaan.cc
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
