'use client'

import { motion } from "framer-motion"

export default function ProjectCard({
  image,
  title,
  tagline,
}: {
  image?: string
  title?: string
  tagline?: string
}) {

  const isLoading = !image || !title || !tagline

  if (isLoading) {
    return (
      <motion.div className="w-[75%] mt-4">
        <div className="animate-pulse flex items-center gap-4">

          {/* square image */}
          <div className="w-14 h-14 bg-neutral-200 rounded-lg flex-shrink-0" />

          <div className="flex flex-col w-full gap-2">
            {/* title */}
            <div className="w-1/2 h-4 bg-neutral-200 rounded-md" />

            {/* tagline */}
            <div className="w-2/3 h-3 bg-neutral-200 rounded-md" />
          </div>

        </div>
      </motion.div>
    )
  }

  return (
    <motion.div className="w-[75%] mt-4 flex items-center gap-4">
      
      {/*<img
        src={image}
        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
      />*/}
      <div className="w-10 h-10 bg-neutral-200 rounded-lg flex-shrink-0" />


      <div className="flex flex-col">
        <h3 className="font-medium font-[family-name:var(--font-geist-sans)] text-xl font-normal tracking-[-0.05em] ">{title}</h3>
        <p className="text-m tracking-[-3%]" style={{
          fontFamily:
            "'Apple Garamond Light', 'Apple Garamond', 'Garamond', 'EB Garamond', Georgia, serif",
          fontStyle: "italic",
        }}>{tagline}</p>
      </div>

    </motion.div>
  )
}