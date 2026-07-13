"use client"

import { useState } from "react"
import type { Project } from "@/lib/content/types"
import {
  Button,
  FieldLabel,
  ImagePreview,
  Row,
  SaveBar,
  TextArea,
  TextInput,
  useAddFlash,
  useSaver,
} from "./ui"

export default function ProjectsForm({
  value,
  onSaved,
}: {
  value: Project[]
  onSaved: (v: Project[]) => void
}) {
  const [items, setItems] = useState<Project[]>(value)
  const [dirty, setDirty] = useState(false)
  const { state, error, save } = useSaver("projects")
  const { flashIndex, markPendingFlash, setRef } = useAddFlash(items.length)

  function update(i: number, patch: Partial<Project>) {
    setItems((arr) => arr.map((p, idx) => (idx === i ? { ...p, ...patch } : p)))
    setDirty(true)
  }
  function move(i: number, dir: -1 | 1) {
    setItems((arr) => {
      const j = i + dir
      if (j < 0 || j >= arr.length) return arr
      const copy = [...arr]
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
      return copy
    })
    setDirty(true)
  }
  function remove(i: number) {
    setItems((arr) => arr.filter((_, idx) => idx !== i))
    setDirty(true)
  }
  function add() {
    markPendingFlash(items.length)
    setItems((arr) => [...arr, { title: "", description: "", image: "" }])
    setDirty(true)
  }

  async function onSave() {
    const cleaned = items.map((p) => ({
      ...p,
      url: p.url?.trim() ? p.url : undefined,
    }))
    if (await save(cleaned)) {
      setItems(cleaned)
      onSaved(cleaned)
      setDirty(false)
    }
  }

  return (
    <section className="flex flex-col gap-4">
      <header>
        <h2 className="text-lg font-semibold tracking-[-0.03em]">projects</h2>
      </header>

      <div className="flex flex-col gap-3">
        {items.map((p, i) => (
          <Row key={i} flashing={flashIndex === i} rowRef={setRef(i)}>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">#{i + 1}</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => move(i, -1)} disabled={i === 0}>↑</Button>
                <Button variant="ghost" onClick={() => move(i, 1)} disabled={i === items.length - 1}>↓</Button>
                <Button variant="danger" onClick={() => remove(i)}>remove</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <FieldLabel>title</FieldLabel>
                <TextInput value={p.title} maxLength={80} onChange={(e) => update(i, { title: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1">
                <FieldLabel>image (path or url)</FieldLabel>
                <div className="flex items-center gap-2">
                  <ImagePreview src={p.image} alt={p.title} size={56} />
                  <TextInput
                    value={p.image}
                    maxLength={500}
                    onChange={(e) => update(i, { image: e.target.value })}
                    placeholder="/foo.png or https://…"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <FieldLabel>description</FieldLabel>
              <TextArea value={p.description} maxLength={500} rows={2} onChange={(e) => update(i, { description: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1">
              <FieldLabel>url (optional)</FieldLabel>
              <TextInput value={p.url ?? ""} maxLength={500} onChange={(e) => update(i, { url: e.target.value })} placeholder="https://…" />
            </div>
          </Row>
        ))}
      </div>

      <Button variant="outline" onClick={add} className="w-full py-2.5">
        + add project
      </Button>

      <SaveBar state={state} error={error} onSave={onSave} dirty={dirty} />
    </section>
  )
}
