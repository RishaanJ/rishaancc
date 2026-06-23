"use client"

import { useState } from "react"
import { Button, SaveBar, TextInput, useSaver } from "./ui"

export default function SubtitleForm({
  value,
  onSaved,
}: {
  value: string[]
  onSaved: (v: string[]) => void
}) {
  const [lines, setLines] = useState<string[]>(value)
  const [dirty, setDirty] = useState(false)
  const { state, error, save } = useSaver("subtitle")

  function update(i: number, v: string) {
    setLines((arr) => arr.map((l, idx) => (idx === i ? v : l)))
    setDirty(true)
  }
  function remove(i: number) {
    setLines((arr) => arr.filter((_, idx) => idx !== i))
    setDirty(true)
  }
  function add() {
    setLines((arr) => [...arr, ""])
    setDirty(true)
  }
  function move(i: number, dir: -1 | 1) {
    setLines((arr) => {
      const j = i + dir
      if (j < 0 || j >= arr.length) return arr
      const copy = [...arr]
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
      return copy
    })
    setDirty(true)
  }

  async function onSave() {
    const cleaned = lines.map((l) => l.trim()).filter(Boolean)
    if (await save(cleaned)) {
      setLines(cleaned)
      onSaved(cleaned)
      setDirty(false)
    }
  }

  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-[-0.03em]">rotating subtitle</h2>
        <Button variant="ghost" onClick={add}>+ add</Button>
      </header>

      <div className="flex flex-col gap-2">
        {lines.map((l, i) => (
          <div key={i} className="flex items-center gap-2">
            <TextInput value={l} maxLength={200} onChange={(e) => update(i, e.target.value)} />
            <Button variant="ghost" onClick={() => move(i, -1)} disabled={i === 0}>↑</Button>
            <Button variant="ghost" onClick={() => move(i, 1)} disabled={i === lines.length - 1}>↓</Button>
            <Button variant="danger" onClick={() => remove(i)}>×</Button>
          </div>
        ))}
      </div>

      <SaveBar state={state} error={error} onSave={onSave} dirty={dirty} />
    </section>
  )
}
