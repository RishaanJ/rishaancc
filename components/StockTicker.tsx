"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ComposedChart, Bar, Line, XAxis, ResponsiveContainer, Cell } from "recharts"

// Deterministic fake candlestick data
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
  // recharts trick: bar starts at low, body is |c-o|, wick uses line
  base: d.l,
  bodyBase: Math.min(d.o, d.c),
  bodyHeight: Math.abs(d.c - d.o) || 0.5,
  up: d.c >= d.o,
  label: `W${i + 1}`,
}))

const PRICE = "68.42"
const CHANGE = "+4.18"
const PCT = "+6.5%"

const ratings = [
  { label: "Strong Buy", count: 8, color: "#22c55e" },
  { label: "Buy", count: 4, color: "#86efac" },
  { label: "Hold", count: 1, color: "#94a3b8" },
]

export default function StockTicker() {
  const [open, setOpen] = useState(false)
  const [price, setPrice] = useState(parseFloat(PRICE))

  // Subtle price wobble
  useEffect(() => {
    const id = setInterval(() => {
      setPrice(p => parseFloat((p + (Math.random() - 0.46) * 0.08).toFixed(2)))
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-4 w-[220px] shadow-sm"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-[family-name:var(--font-geist-sans)] text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest">NYSE: RISH</p>
                <p className="font-[family-name:var(--font-geist-sans)] font-semibold text-xl text-black dark:text-white tabular-nums">${price.toFixed(2)}</p>
                <p className="font-[family-name:var(--font-geist-sans)] text-xs text-green-500">{CHANGE} ({PCT}) today</p>
              </div>
              <span className="text-[10px] font-[family-name:var(--font-geist-sans)] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-full font-medium">HIRE</span>
            </div>

            {/* Chart */}
            <div className="h-[70px] -mx-1 mb-3">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} barCategoryGap="20%">
                  <XAxis dataKey="label" hide />
                  {/* Wick line */}
                  <Line type="monotone" dataKey="h" dot={false} stroke="transparent" />
                  {/* Low base (invisible spacer) */}
                  <Bar dataKey="base" stackId="c" fill="transparent" stroke="none" />
                  {/* Candle body */}
                  <Bar dataKey="bodyHeight" stackId="c" radius={[1,1,1,1]}>
                    {data.map((d, i) => (
                      <Cell key={i} fill={d.up ? "#22c55e" : "#ef4444"} />
                    ))}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Analyst ratings */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
              <p className="font-[family-name:var(--font-geist-sans)] text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2">Analyst Ratings</p>
              {ratings.map(r => (
                <div key={r.label} className="flex items-center gap-2 mb-1">
                  <div className="w-full bg-gray-100 dark:bg-gray-900 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(r.count / 13) * 100}%`, background: r.color }}
                    />
                  </div>
                  <span className="font-[family-name:var(--font-geist-sans)] text-[10px] text-gray-400 dark:text-gray-600 whitespace-nowrap w-16 text-right">{r.label}</span>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <p className="font-[family-name:var(--font-geist-sans)] text-[9px] text-gray-300 dark:text-gray-800 mt-2">
              *not real financial advice. probably.
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
        <span className="font-[family-name:var(--font-geist-sans)] text-xs text-green-500 tabular-nums">{PCT}</span>
      </motion.button>
    </div>
  )
}
