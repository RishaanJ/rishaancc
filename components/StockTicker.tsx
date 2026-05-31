"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ComposedChart, Bar, Line, XAxis, ResponsiveContainer, Cell } from "recharts"
import Link from "next/link"

const RAW = [
  { o: 42, h: 47, l: 40, c: 45 },
  { o: 45, h: 48, l: 43, c: 44 },
  { o: 44, h: 50, l: 43, c: 49 },
  { o: 49, h: 52, l: 46, c: 47 },
  { o: 47, h: 51, l: 45, c: 50 },
  { o: 50, h: 55, l: 49, c: 54 },
  { o: 54, h: 57, l: 51, c: 53 },
  { o: 53, h: 58, l: 52, c: 57 },
  { o: 57, h: 61, l: 55, c: 59 },
  { o: 59, h: 64, l: 57, c: 63 },
  { o: 63, h: 67, l: 60, c: 65 },
  { o: 65, h: 69, l: 62, c: 68 },
]

const data = RAW.map((d, i) => ({
  ...d,
  base: d.l,
  bodyBase: Math.min(d.o, d.c),
  bodyHeight: Math.abs(d.c - d.o) || 0.5,
  up: d.c >= d.o,
  label: `W${i + 1}`,
}))

const fundamentals = [
  { label: "Sector",        value: "Software / AI" },
  { label: "52W High",      value: "post-hackathon" },
  { label: "52W Low",       value: "finals week" },
  { label: "Stage",         value: "pre-revenue" },
  { label: "Open Source",   value: "yes" },
  { label: "For Hire",      value: "immediately" },
]

const analysts = [
  { firm: "Y Combinator",   rating: "Strong Buy",  note: "ships fast" },
  { firm: "Sequoia",        rating: "Buy",         note: "too many ideas" },
  { firm: "His Mom",        rating: "Strong Buy",  note: "very smart boy" },
]

export default function StockTicker() {
  const [open, setOpen] = useState(false)
  const [price, setPrice] = useState(68.42)

  useEffect(() => {
    const id = setInterval(() => {
      setPrice(p => parseFloat((p + (Math.random() - 0.46) * 0.08).toFixed(2)))
    }, 2200)
    return () => clearInterval(id)
  }, [])

  const change = (price - 68.42).toFixed(2)
  const pct = (((price - 68.42) / 68.42) * 100).toFixed(2)
  const up = price >= 68.42

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-4 w-[240px] shadow-sm"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-1">
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="font-[family-name:var(--font-geist-sans)] text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest">NASDAQ: RISH</p>
                  <span className="text-[9px] font-[family-name:var(--font-geist-sans)] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-full font-medium uppercase tracking-wide">hiring</span>
                </div>
                <p className="font-[family-name:var(--font-geist-sans)] font-semibold text-2xl text-black dark:text-white tabular-nums">${price.toFixed(2)}</p>
                <p className={`font-[family-name:var(--font-geist-sans)] text-xs ${up ? "text-green-500" : "text-red-500"}`}>
                  {up ? "+" : ""}{change} ({up ? "+" : ""}{pct}%) today
                </p>
              </div>
            </div>

            {/* Chart */}
            <div className="h-[60px] -mx-1 my-3">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} barCategoryGap="20%">
                  <XAxis dataKey="label" hide />
                  <Line type="monotone" dataKey="h" dot={false} stroke="transparent" />
                  <Bar dataKey="base" stackId="c" fill="transparent" stroke="none" />
                  <Bar dataKey="bodyHeight" stackId="c" radius={[1,1,1,1]}>
                    {data.map((d, i) => (
                      <Cell key={i} fill={d.up ? "#22c55e" : "#ef4444"} />
                    ))}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Fundamentals */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-3 mb-3">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {fundamentals.map(f => (
                  <div key={f.label}>
                    <p className="font-[family-name:var(--font-geist-sans)] text-[9px] text-gray-400 dark:text-gray-600 uppercase tracking-widest">{f.label}</p>
                    <p className="font-[family-name:var(--font-geist-sans)] text-[11px] text-black dark:text-white font-medium">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Analyst ratings */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
              <p className="font-[family-name:var(--font-geist-sans)] text-[9px] text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2">Analyst Ratings</p>
              {analysts.map(a => (
                <div key={a.firm} className="flex items-center justify-between mb-1.5">
                  <div>
                    <p className="font-[family-name:var(--font-geist-sans)] text-[10px] text-black dark:text-white font-medium">{a.firm}</p>
                    <p className="font-[family-name:var(--font-geist-sans)] text-[9px] text-gray-400 dark:text-gray-600">{a.note}</p>
                  </div>
                  <span className={`font-[family-name:var(--font-geist-sans)] text-[9px] font-medium px-1.5 py-0.5 rounded-full ${
                    a.rating === "Strong Buy"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                      : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  }`}>{a.rating}</span>
                </div>
              ))}
            </div>

            <Link href="/hire">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-3 w-full bg-green-500 hover:bg-green-400 transition-colors text-white font-semibold py-2.5 rounded-lg text-xs cursor-pointer font-[family-name:var(--font-geist-sans)]"
              >
                Buy 1 share of RISH →
              </motion.button>
            </Link>

            <p className="font-[family-name:var(--font-geist-sans)] text-[9px] text-gray-300 dark:text-gray-800 mt-2">
              *not real financial advice. or is it 👀
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pill */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-black px-3 py-1.5 shadow-sm cursor-pointer"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="font-[family-name:var(--font-geist-sans)] text-xs font-medium text-black dark:text-white">$RISH</span>
        <span className={`font-[family-name:var(--font-geist-sans)] text-xs tabular-nums ${up ? "text-green-500" : "text-red-500"}`}>
          {up ? "▲" : "▼"}{Math.abs(parseFloat(pct))}%
        </span>
      </motion.button>
    </div>
  )
}
