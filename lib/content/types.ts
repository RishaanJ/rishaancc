export type Project = {
  title: string
  description: string
  image: string
  url?: string
}

export type StackItem = {
  name: string
  slug: string
  color: string
}

export type StackCategory = {
  category: string
  items: StackItem[]
}

export type DesignSurprise = {
  text: string
  sub: string
}

export type DesignContentItem =
  | { type: "video"; url: string }
  | { type: "site"; url: string; label: string; description?: string }
  | { type: "image"; src: string; alt?: string }
  | { type: "channel"; url: string; name: string; image: string }

export type DesignAesthetic = {
  label: string
  tag: string
}

export type DesignBelief = {
  text: string
  desc: string
}

export type DesignFont = {
  name: string
  family: string
  italic: boolean
}

export type DesignContent = {
  surprises: DesignSurprise[]
  items: DesignContentItem[]
  aesthetics: DesignAesthetic[]
  beliefs: DesignBelief[]
  fonts: DesignFont[]
}

export type SiteContent = {
  projects: Project[]
  about: string
  subtitle: string[]
  greeting: string
  stack: StackCategory[]
  design: DesignContent
}

export type SectionKey = keyof SiteContent
