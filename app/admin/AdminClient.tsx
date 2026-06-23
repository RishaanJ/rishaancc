"use client"

import { useState } from "react"
import type { SiteContent, SectionKey } from "@/lib/content/types"
import ProjectsForm from "./sections/ProjectsForm"
import AboutForm from "./sections/AboutForm"
import SubtitleForm from "./sections/SubtitleForm"
import GreetingForm from "./sections/GreetingForm"
import StackForm from "./sections/StackForm"
import DesignForm from "./sections/DesignForm"

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "projects", label: "projects" },
  { key: "about", label: "about" },
  { key: "subtitle", label: "subtitle" },
  { key: "greeting", label: "greeting" },
  { key: "stack", label: "stack" },
  { key: "design", label: "design" },
]

export default function AdminClient({ initial }: { initial: SiteContent }) {
  const [active, setActive] = useState<SectionKey>("projects")
  const [content, setContent] = useState(initial)

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  function update<K extends SectionKey>(key: K, value: SiteContent[K]) {
    setContent((c) => ({ ...c, [key]: value }))
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.04em]">admin</h1>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            edit the live site. changes appear within ~30s.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="text-xs text-gray-500 hover:text-black dark:hover:text-white">view site →</a>
          <button onClick={logout} className="text-xs text-gray-500 hover:text-black dark:hover:text-white">log out</button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-6">
        <nav className="flex sm:flex-col gap-1 overflow-x-auto">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`text-left text-sm px-3 py-1.5 rounded-md transition-colors ${
                active === s.key
                  ? "bg-gray-100 dark:bg-gray-900 text-black dark:text-white"
                  : "text-gray-500 hover:text-black dark:hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div>
          {active === "projects" && (
            <ProjectsForm value={content.projects} onSaved={(v) => update("projects", v)} />
          )}
          {active === "about" && (
            <AboutForm value={content.about} onSaved={(v) => update("about", v)} />
          )}
          {active === "subtitle" && (
            <SubtitleForm value={content.subtitle} onSaved={(v) => update("subtitle", v)} />
          )}
          {active === "greeting" && (
            <GreetingForm value={content.greeting} onSaved={(v) => update("greeting", v)} />
          )}
          {active === "stack" && (
            <StackForm value={content.stack} onSaved={(v) => update("stack", v)} />
          )}
          {active === "design" && (
            <DesignForm value={content.design} onSaved={(v) => update("design", v)} />
          )}
        </div>
      </div>
    </div>
  )
}
