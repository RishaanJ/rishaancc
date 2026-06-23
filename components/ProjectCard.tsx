'use client'

import { motion } from "framer-motion"
import { GlobeIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import { track } from "@vercel/analytics"

export default function ProjectCard({
  title,
  description,
  image,
  gradient,
  mockup,
  url,
  github,
}: {
  title: string
  description: string
  image?: string
  gradient?: string
  mockup?: React.ReactNode
  url?: string
  github?: string
}) {
  return (
    <motion.div
      className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col bg-white dark:bg-black cursor-default"
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
    >
      {/* Image / preview */}
      <div
        className="w-full aspect-[16/9] overflow-hidden"
        style={{ background: mockup ? undefined : (gradient ?? "linear-gradient(135deg, #e5e7eb, #f3f4f6)") }}
      >
        {mockup ? mockup : image ? (
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top"
            whileHover={{ scale: 1.04, transition: { duration: 0.4, ease: "easeOut" } }}
          />
        ) : null}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-[family-name:var(--font-geist-sans)] font-semibold text-lg tracking-[-0.04em] text-black dark:text-white leading-tight">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-600 mt-0.5 shrink-0">
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("project_click", { project: title, link: "github" })}
                className="hover:text-black dark:hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <GitHubLogoIcon className="w-4 h-4" />
              </motion.a>
            )}
            {url && (
              <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("project_click", { project: title, link: "url" })}
                className="hover:text-black dark:hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <GlobeIcon className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>
        <p className="font-[family-name:var(--font-geist-sans)] text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
