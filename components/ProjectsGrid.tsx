'use client'

import { useState } from "react"
import ProjectCard from "@/components/ProjectCard"
import type { Project } from "@/lib/content/types"

const INITIAL_COUNT = 4

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false)

  const visible = expanded ? projects : projects.slice(0, INITIAL_COUNT)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visible.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
      {projects.length > INITIAL_COUNT && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-5 mx-auto block font-[family-name:var(--font-geist-sans)] text-xs text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors"
        >
          {expanded ? "view less" : "view more"}
        </button>
      )}
    </>
  )
}
