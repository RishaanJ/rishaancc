"use client"

import { GridPattern } from "@/components/ui/grid-pattern"
import HeroGradient from "@/components/HeroGradient"
import FadeIn from "@/components/FadeIn"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { useState, useEffect } from "react"
import type { DesignContent, DesignContentItem, DesignSurprise } from "@/lib/content/types"

const garamond = "var(--font-apple-garamond, 'Garamond', 'EB Garamond', Georgia, serif)"

function getYouTubeId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export default function DesignClient({ content }: { content: DesignContent }) {
  const { surprises, items, aesthetics, beliefs, fonts } = content
  const [surprise, setSurprise] = useState<DesignSurprise | null>(null)
  const [shuffled, setShuffled] = useState<DesignContentItem[]>(items)
  useEffect(() => {
    setShuffled([...items].sort(() => Math.random() - 0.5))
  }, [items])

  function openSurprise() {
    if (surprises.length === 0) return
    const pick = surprises[Math.floor(Math.random() * surprises.length)]
    setSurprise(pick)
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-black overflow-hidden flex justify-center">
      <GridPattern
        width={40}
        height={40}
        className="absolute inset-0 h-full w-full fill-transparent stroke-gray-200/30 dark:stroke-gray-800/30 [mask-image:radial-gradient(ellipse_at_top,white_20%,transparent_70%)]"
      />
      <HeroGradient />

      <main className="relative z-10 w-full max-w-3xl flex flex-col pt-16 sm:pt-20 px-5 sm:px-8 mx-auto">

        {/* Nav */}
        <nav className="mb-3 flex items-center gap-5 font-[family-name:var(--font-geist-sans)] text-xs text-black dark:text-white animate-pop-in delay-1">
          <Link href="/" className="nav-link flex items-center gap-1.5"><ArrowLeftIcon className="w-3 h-3" /> home</Link>
          <a href="https://www.figma.com/@rishaan" target="_blank" className="nav-link text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors">figma</a>
        </nav>

        {/* Hero */}
        <div className="animate-pop-in delay-2 mt-8 mb-16">
          <h1
            className="text-6xl sm:text-7xl font-semibold tracking-[-0.05em] text-black dark:text-white leading-[0.95]"
            style={{ fontFamily: garamond, fontStyle: "italic" }}
          >
            design is<br />a feeling.
          </h1>
          <p className="mt-6 text-base text-gray-500 dark:text-gray-400 max-w-md leading-relaxed font-[family-name:var(--font-geist-sans)]">
            whenever i see good UI it makes me feel a certain way.
            hard to explain. like i feel a warmth in my chest
          </p>
        </div>

        {/* Beliefs — kinetic stacked text */}
        <FadeIn delay={0.05}>
          <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-900">
            {beliefs.map((b, i) => (
              <motion.div
                key={b.text}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-start justify-between py-5 cursor-default gap-8"
              >
                <div className="flex flex-col gap-1.5">
                  <span className="text-xl sm:text-2xl font-semibold tracking-[-0.04em] text-black dark:text-white group-hover:translate-x-1 transition-transform duration-300 font-[family-name:var(--font-geist-sans)]">
                    {b.text}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-600 leading-relaxed font-[family-name:var(--font-geist-sans)] max-w-sm">
                    {b.desc}
                  </span>
                </div>
                <span className="text-[10px] font-[family-name:var(--font-geist-sans)] text-gray-300 dark:text-gray-700 tabular-nums pt-1.5 flex-shrink-0">
                  0{i + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Styles I love */}
        <FadeIn className="mt-20" delay={0.08}>
          <p
            className="text-3xl font-semibold tracking-[-0.04em] text-black dark:text-white mb-8 leading-tight"
            style={{ fontFamily: garamond, fontStyle: "italic" }}
          >
            styles i love
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-900">
            {aesthetics.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white dark:bg-black p-5 flex flex-col gap-2 hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors group cursor-default"
              >
                <span className="font-[family-name:var(--font-geist-sans)] text-[10px] text-gray-300 dark:text-gray-700 tracking-wider uppercase">
                  {a.tag}
                </span>
                <span className="font-[family-name:var(--font-geist-sans)] text-sm font-medium text-black dark:text-white tracking-[-0.02em] leading-snug">
                  {a.label}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Fonts */}
        <FadeIn className="mt-20 mb-24" delay={0.1}>
          <p className="text-[11px] tracking-[0.15em] uppercase text-gray-400 dark:text-gray-600 mb-8 font-[family-name:var(--font-geist-sans)]">
            favorite fonts
          </p>
          <div className="flex flex-col gap-10">
            {fonts.map((f, i) => (
              <motion.div
                key={f.name + f.italic + i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-baseline justify-between gap-4 group cursor-default"
              >
                <span className="font-[family-name:var(--font-geist-sans)] text-[11px] text-gray-400 dark:text-gray-600 w-28 flex-shrink-0 pt-1">
                  {f.name}{f.italic ? " italic" : ""}
                </span>
                <span
                  className="text-4xl sm:text-5xl text-black dark:text-white tracking-[-0.03em] leading-none flex-1 text-right group-hover:opacity-70 transition-opacity"
                  style={{ fontFamily: f.family, fontStyle: f.italic ? "italic" : "normal" }}
                >
                  {f.name}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Content bento */}
        {shuffled.length > 0 && (
          <FadeIn className="mt-20" delay={0.12}>
            <p className="text-[11px] tracking-[0.15em] uppercase text-gray-400 dark:text-gray-600 mb-8 font-[family-name:var(--font-geist-sans)]">
              assorted pieces of content i like
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 auto-rows-[180px] gap-2">
              {shuffled.map((item, i) => {
                const itemDelay = Math.min(i, 14) * 0.05
                if (item.type === "video") {
                  const id = getYouTubeId(item.url)
                  if (!id) return null
                  return (
                    <motion.a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: itemDelay, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                        alt="video thumbnail"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${id}/mqdefault.jpg` }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-4 h-4 text-black ml-0.5" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M5 3.5l8 4.5-8 4.5V3.5z" />
                          </svg>
                        </div>
                      </div>
                    </motion.a>
                  )
                }

                if (item.type === "site") {
                  return (
                    <motion.a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: itemDelay, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 flex flex-col justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="text-[10px] font-[family-name:var(--font-geist-sans)] text-gray-400 dark:text-gray-600 tracking-wider uppercase">
                        {(() => { try { return new URL(item.url).hostname.replace("www.", "") } catch { return "" } })()}
                      </span>
                      <div className="flex flex-col gap-1">
                        <span className="font-[family-name:var(--font-geist-sans)] text-sm font-medium text-black dark:text-white tracking-[-0.02em] leading-snug">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="text-xs text-gray-400 dark:text-gray-600 font-[family-name:var(--font-geist-sans)] leading-relaxed">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </motion.a>
                  )
                }

                if (item.type === "image") {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: itemDelay, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={item.alt ?? ""}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </motion.div>
                  )
                }

                if (item.type === "channel") {
                  return (
                    <motion.a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: itemDelay, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-white dark:ring-black shadow-md group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="font-[family-name:var(--font-geist-sans)] text-xs font-medium text-black dark:text-white tracking-[-0.02em]">
                        {item.name}
                      </span>
                    </motion.a>
                  )
                }

                return null
              })}
            </div>
          </FadeIn>
        )}

        {/* Easter egg — hidden dot */}
        <div className="mb-24 flex justify-center">
          <button
            onClick={openSurprise}
            className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-500 cursor-pointer"
            aria-label="surprise"
          />
        </div>

      </main>

      {/* Surprise overlay */}
      <AnimatePresence>
        {surprise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center cursor-pointer px-8"
            onClick={() => setSurprise(null)}
          >
            <motion.p
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl font-semibold text-white tracking-[-0.04em] leading-[1.05] text-center whitespace-pre-line"
              style={{ fontFamily: garamond, fontStyle: "italic" }}
            >
              {surprise.text}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 text-sm text-white/40 font-[family-name:var(--font-geist-sans)] text-center"
            >
              {surprise.sub}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-10 text-[11px] text-white/20 font-[family-name:var(--font-geist-sans)] tracking-widest uppercase"
            >
              click anywhere to close
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
