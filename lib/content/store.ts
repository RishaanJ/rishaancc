import { redis } from "@/lib/redis"
import { defaultContent } from "./defaults"
import type { SectionKey, SiteContent } from "./types"

const key = (section: SectionKey) => `content:${section}`

export async function getSection<K extends SectionKey>(
  section: K,
): Promise<SiteContent[K]> {
  const value = await redis.get<SiteContent[K]>(key(section))
  return value ?? (defaultContent[section] as SiteContent[K])
}

export async function getAllSections(): Promise<SiteContent> {
  const sections: SectionKey[] = [
    "projects",
    "about",
    "subtitle",
    "greeting",
    "stack",
    "design",
  ]
  const values = await Promise.all(sections.map((s) => redis.get(key(s))))
  const result: Partial<SiteContent> = {}
  sections.forEach((s, i) => {
    const v = values[i]
    ;(result as Record<string, unknown>)[s] = v ?? defaultContent[s]
  })
  return result as SiteContent
}

export async function setSection<K extends SectionKey>(
  section: K,
  value: SiteContent[K],
): Promise<void> {
  await redis.set(key(section), JSON.stringify(value))
}
