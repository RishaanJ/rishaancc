import { z } from "zod"

const localOrHttpUrl = z
  .string()
  .min(1)
  .max(500)
  .refine(
    (v) => {
      if (v.startsWith("/")) return /^\/[a-zA-Z0-9._/\-?=&%#]+$/.test(v)
      try {
        const u = new URL(v)
        return u.protocol === "http:" || u.protocol === "https:"
      } catch {
        return false
      }
    },
    { message: "Must be a local path (/foo) or http(s) URL" },
  )

const httpUrl = z
  .string()
  .url()
  .max(500)
  .refine((v) => v.startsWith("http://") || v.startsWith("https://"), {
    message: "Must be http(s)",
  })

export const projectSchema = z.object({
  title: z.string().min(1).max(80),
  description: z.string().min(1).max(500),
  image: localOrHttpUrl,
  url: httpUrl.optional().or(z.literal("").transform(() => undefined)),
})

export const projectsSchema = z.array(projectSchema).max(50)

export const aboutSchema = z.string().min(1).max(2000)

export const subtitleSchema = z.array(z.string().min(1).max(200)).min(1).max(20)

export const greetingSchema = z.string().min(1).max(120)

export const stackItemSchema = z.object({
  name: z.string().min(1).max(40),
  slug: z
    .string()
    .min(1)
    .max(40)
    .regex(/^[a-z0-9_-]+$/, "Lowercase slug only"),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be #RRGGBB"),
})

export const stackSchema = z
  .array(
    z.object({
      category: z.string().min(1).max(40),
      items: z.array(stackItemSchema).max(30),
    }),
  )
  .max(20)

export const designContentItemSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("video"), url: httpUrl }),
  z.object({
    type: z.literal("site"),
    url: httpUrl,
    label: z.string().min(1).max(80),
    description: z.string().max(200).optional(),
  }),
  z.object({
    type: z.literal("image"),
    src: localOrHttpUrl,
    alt: z.string().max(120).optional(),
  }),
  z.object({
    type: z.literal("channel"),
    url: httpUrl,
    name: z.string().min(1).max(80),
    image: httpUrl,
  }),
])

export const designSchema = z.object({
  surprises: z
    .array(
      z.object({
        text: z.string().min(1).max(200),
        sub: z.string().min(1).max(200),
      }),
    )
    .max(20),
  items: z.array(designContentItemSchema).max(100),
  aesthetics: z
    .array(
      z.object({
        label: z.string().min(1).max(60),
        tag: z.string().min(1).max(40),
      }),
    )
    .max(30),
  beliefs: z
    .array(
      z.object({
        text: z.string().min(1).max(200),
        desc: z.string().min(1).max(400),
      }),
    )
    .max(20),
  fonts: z
    .array(
      z.object({
        name: z.string().min(1).max(60),
        family: z.string().min(1).max(200),
        italic: z.boolean(),
      }),
    )
    .max(20),
})

export const sectionSchemas = {
  projects: projectsSchema,
  about: aboutSchema,
  subtitle: subtitleSchema,
  greeting: greetingSchema,
  stack: stackSchema,
  design: designSchema,
} as const

export type SectionSchemas = typeof sectionSchemas
