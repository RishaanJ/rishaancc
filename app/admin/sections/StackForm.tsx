"use client"

import { useState } from "react"
import type { StackCategory } from "@/lib/content/types"
import { Button, FieldLabel, Row, SaveBar, TextInput, useAddFlash, useSaver } from "./ui"

export default function StackForm({
  value,
  onSaved,
}: {
  value: StackCategory[]
  onSaved: (v: StackCategory[]) => void
}) {
  const [cats, setCats] = useState<StackCategory[]>(value)
  const [dirty, setDirty] = useState(false)
  const { state, error, save } = useSaver("stack")
  const { flashIndex, markPendingFlash, setRef } = useAddFlash(cats.length)

  function updateCat(i: number, patch: Partial<StackCategory>) {
    setCats((a) => a.map((c, idx) => (idx === i ? { ...c, ...patch } : c)))
    setDirty(true)
  }
  function removeCat(i: number) {
    setCats((a) => a.filter((_, idx) => idx !== i))
    setDirty(true)
  }
  function addCat() {
    markPendingFlash(cats.length)
    setCats((a) => [...a, { category: "New", items: [] }])
    setDirty(true)
  }
  function addItem(ci: number) {
    setCats((a) =>
      a.map((c, idx) =>
        idx === ci ? { ...c, items: [...c.items, { name: "", slug: "", color: "#888888" }] } : c,
      ),
    )
    setDirty(true)
  }
  function updateItem(ci: number, ii: number, patch: Partial<StackCategory["items"][number]>) {
    setCats((a) =>
      a.map((c, idx) =>
        idx === ci
          ? {
              ...c,
              items: c.items.map((it, jdx) => (jdx === ii ? { ...it, ...patch } : it)),
            }
          : c,
      ),
    )
    setDirty(true)
  }
  function removeItem(ci: number, ii: number) {
    setCats((a) =>
      a.map((c, idx) =>
        idx === ci ? { ...c, items: c.items.filter((_, jdx) => jdx !== ii) } : c,
      ),
    )
    setDirty(true)
  }

  async function onSave() {
    if (await save(cats)) {
      onSaved(cats)
      setDirty(false)
    }
  }

  return (
    <section className="flex flex-col gap-4">
      <header>
        <h2 className="text-lg font-semibold tracking-[-0.03em]">stack</h2>
      </header>

      <div className="flex flex-col gap-3">
        {cats.map((c, ci) => (
          <Row key={ci} flashing={flashIndex === ci} rowRef={setRef(ci)}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <FieldLabel>category</FieldLabel>
                <TextInput
                  value={c.category}
                  maxLength={40}
                  onChange={(e) => updateCat(ci, { category: e.target.value })}
                />
              </div>
              <Button variant="danger" onClick={() => removeCat(ci)}>remove cat</Button>
            </div>

            <div className="flex flex-col gap-2">
              {c.items.map((it, ii) => (
                <div key={ii} className="grid grid-cols-[1fr_1fr_110px_auto] gap-2 items-end">
                  <div className="flex flex-col gap-1">
                    <FieldLabel>name</FieldLabel>
                    <TextInput value={it.name} maxLength={40} onChange={(e) => updateItem(ci, ii, { name: e.target.value })} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <FieldLabel>slug (simpleicons)</FieldLabel>
                    <TextInput value={it.slug} maxLength={40} onChange={(e) => updateItem(ci, ii, { slug: e.target.value.toLowerCase() })} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <FieldLabel>color #rrggbb</FieldLabel>
                    <TextInput value={it.color} maxLength={7} onChange={(e) => updateItem(ci, ii, { color: e.target.value })} />
                  </div>
                  <Button variant="danger" onClick={() => removeItem(ci, ii)}>×</Button>
                </div>
              ))}
              <Button variant="outline" onClick={() => addItem(ci)} className="w-full py-1.5">
                + add item
              </Button>
            </div>
          </Row>
        ))}
      </div>

      <Button variant="outline" onClick={addCat} className="w-full py-2.5">
        + add category
      </Button>

      <SaveBar state={state} error={error} onSave={onSave} dirty={dirty} />
    </section>
  )
}
