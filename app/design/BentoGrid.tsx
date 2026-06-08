"use client"

import { motion } from "framer-motion"
import { GlobeIcon } from "@radix-ui/react-icons"

type BentoItem = {
  title: string
  description: string
  tags: string[]
  url?: string
  span?: "wide" | "tall" | "normal"
  preview: React.ReactNode
}

const items: BentoItem[] = [
  {
    title: "Sona",
    description: "AI radiology assistant — clean, clinical UI that gets out of the way so doctors can focus on the scan.",
    tags: ["Figma", "Product"],
    url: undefined,
    span: "wide",
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-900/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 opacity-70">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 dark:bg-blue-400/20 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-600 dark:text-blue-400">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <div className="flex flex-col gap-1.5 w-28">
            <div className="h-1.5 rounded-full bg-blue-400/40 w-full" />
            <div className="h-1.5 rounded-full bg-blue-400/30 w-4/5" />
            <div className="h-1.5 rounded-full bg-blue-400/20 w-3/5" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Heatmap",
    description: "macOS menubar app — minimal tray UI, dense data, zero clutter.",
    tags: ["SwiftUI", "macOS"],
    url: "https://heatmap.rishaan.cc",
    span: "normal",
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/40 dark:to-amber-900/30 flex items-center justify-center">
        <div className="grid grid-cols-7 gap-1 opacity-80">
          {Array.from({ length: 35 }).map((_, i) => {
            const intensity = Math.random()
            const opacity = intensity > 0.7 ? "opacity-90" : intensity > 0.4 ? "opacity-50" : "opacity-20"
            return (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm bg-orange-500 ${opacity}`}
              />
            )
          })}
        </div>
      </div>
    ),
  },
  {
    title: "rishaan.cc",
    description: "This site — personal portfolio with bento layout, stock ticker, and SSH callout.",
    tags: ["Next.js", "Tailwind"],
    url: "https://rishaan.cc",
    span: "normal",
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/60 dark:to-gray-800/40 flex items-center justify-center">
        <div className="flex flex-col gap-2 w-32 opacity-70">
          <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-600" />
          <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-2 w-4/5 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-1 flex gap-1">
            <div className="h-6 w-6 rounded-md bg-gray-300 dark:bg-gray-600" />
            <div className="h-6 w-6 rounded-md bg-gray-300 dark:bg-gray-600" />
            <div className="h-6 w-6 rounded-md bg-gray-300 dark:bg-gray-600" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Hire page",
    description: "Stock market themed contact form — turns hiring into placing a market order.",
    tags: ["Concept", "UI"],
    url: "/hire",
    span: "normal",
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/30 flex items-center justify-center">
        <div className="flex flex-col gap-2 w-28 opacity-70">
          <div className="text-[10px] font-mono text-green-600 dark:text-green-400">NASDAQ: RISH</div>
          <div className="h-5 w-24 rounded-md bg-green-300/50 dark:bg-green-700/40" />
          <div className="grid grid-cols-2 gap-1 mt-1">
            <div className="h-5 rounded bg-gray-800 dark:bg-white" />
            <div className="h-5 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-5 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-5 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="h-6 w-full rounded-lg bg-green-500/70" />
        </div>
      </div>
    ),
  },
  {
    title: "type & space",
    description: "Ongoing exploration of typographic systems — tracking, weight, and negative space as design elements.",
    tags: ["Typography", "Exploration"],
    span: "wide",
    preview: (
      <div className="w-full h-full bg-white dark:bg-black flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-start gap-0 px-6 opacity-60">
          <span className="font-[family-name:var(--font-geist-sans)] text-5xl font-semibold tracking-[-0.08em] text-black dark:text-white leading-none">Aa</span>
          <span className="font-[family-name:var(--font-geist-sans)] text-2xl font-light tracking-[0.15em] text-gray-400 dark:text-gray-600 leading-none mt-1">Aa</span>
          <span className="font-[family-name:var(--font-geist-mono)] text-sm tracking-[-0.02em] text-gray-300 dark:text-gray-700 mt-2">Aa Bb Cc Dd Ee Ff</span>
        </div>
      </div>
    ),
  },
  {
    title: "motion study",
    description: "A collection of micro-interactions and transition patterns for web interfaces.",
    tags: ["Framer Motion", "Interaction"],
    span: "normal",
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-950/40 dark:to-purple-900/30 flex items-center justify-center">
        <motion.div
          className="w-10 h-10 rounded-xl bg-violet-500/60 dark:bg-violet-400/40"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 8, -8, 0],
            borderRadius: ["12px", "24px", "12px"],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    ),
  },
]

function BentoCard({ item, index }: { item: BentoItem; index: number }) {
  return (
    <motion.div
      className={`rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col bg-white dark:bg-black ${
        item.span === "wide" ? "sm:col-span-2" : ""
      }`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
    >
      {/* Preview */}
      <div className="w-full aspect-[16/9] overflow-hidden">
        {item.preview}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-[family-name:var(--font-geist-sans)] font-semibold text-sm tracking-[-0.03em] text-black dark:text-white leading-tight">
            {item.title}
          </h3>
          {item.url && (
            <motion.a
              href={item.url}
              target={item.url.startsWith("http") ? "_blank" : undefined}
              rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors shrink-0 mt-0.5"
              whileHover={{ scale: 1.2 }}
            >
              <GlobeIcon className="w-3.5 h-3.5" />
            </motion.a>
          )}
        </div>
        <p className="font-[family-name:var(--font-geist-sans)] text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-0.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="font-[family-name:var(--font-geist-mono)] text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <BentoCard key={item.title} item={item} index={i} />
      ))}
    </div>
  )
}
