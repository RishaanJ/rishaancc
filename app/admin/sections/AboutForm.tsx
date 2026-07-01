"use client"

import { useState } from "react"
import AboutText from "@/components/AboutText"
import { FieldLabel, SaveBar, TextArea, useSaver } from "./ui"

export default function AboutForm({
  value,
  onSaved,
}: {
  value: string
  onSaved: (v: string) => void
}) {
  const [text, setText] = useState(value)
  const [dirty, setDirty] = useState(false)
  const { state, error, save } = useSaver("about")

  async function onSave() {
    if (await save(text)) {
      onSaved(text)
      setDirty(false)
    }
  }

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold tracking-[-0.03em]">about</h2>
      <FieldLabel>wrap emphasis in **double asterisks** (renders as shimmer text)</FieldLabel>
      <TextArea
        rows={8}
        value={text}
        maxLength={2000}
        onChange={(e) => {
          setText(e.target.value)
          setDirty(true)
        }}
      />
      <p className="text-[10px] text-gray-400">{text.length} / 2000</p>

      <div className="mt-2 flex flex-col gap-2">
        <FieldLabel>preview</FieldLabel>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4">
          <AboutText text={text || "(empty)"} />
        </div>
      </div>

      <SaveBar state={state} error={error} onSave={onSave} dirty={dirty} />
    </section>
  )
}
