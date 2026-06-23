"use client"

import { useState } from "react"
import { SaveBar, TextInput, useSaver } from "./ui"

export default function GreetingForm({
  value,
  onSaved,
}: {
  value: string
  onSaved: (v: string) => void
}) {
  const [text, setText] = useState(value)
  const [dirty, setDirty] = useState(false)
  const { state, error, save } = useSaver("greeting")

  async function onSave() {
    if (await save(text)) {
      onSaved(text)
      setDirty(false)
    }
  }

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold tracking-[-0.03em]">greeting</h2>
      <TextInput
        value={text}
        maxLength={120}
        onChange={(e) => {
          setText(e.target.value)
          setDirty(true)
        }}
      />
      <SaveBar state={state} error={error} onSave={onSave} dirty={dirty} />
    </section>
  )
}
