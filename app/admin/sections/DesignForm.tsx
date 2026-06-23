"use client"

import { useState } from "react"
import type {
  DesignAesthetic,
  DesignBelief,
  DesignContent,
  DesignContentItem,
  DesignFont,
  DesignSurprise,
} from "@/lib/content/types"
import { Button, FieldLabel, Row, SaveBar, TextArea, TextInput, useSaver } from "./ui"

export default function DesignForm({
  value,
  onSaved,
}: {
  value: DesignContent
  onSaved: (v: DesignContent) => void
}) {
  const [data, setData] = useState<DesignContent>(value)
  const [dirty, setDirty] = useState(false)
  const { state, error, save } = useSaver("design")

  function patch(p: Partial<DesignContent>) {
    setData((d) => ({ ...d, ...p }))
    setDirty(true)
  }

  async function onSave() {
    if (await save(data)) {
      onSaved(data)
      setDirty(false)
    }
  }

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold tracking-[-0.03em]">design page</h2>

      <SurpriseSection surprises={data.surprises} setSurprises={(s) => patch({ surprises: s })} />
      <BeliefsSection beliefs={data.beliefs} setBeliefs={(b) => patch({ beliefs: b })} />
      <AestheticsSection aesthetics={data.aesthetics} setAesthetics={(a) => patch({ aesthetics: a })} />
      <FontsSection fonts={data.fonts} setFonts={(f) => patch({ fonts: f })} />
      <ItemsSection items={data.items} setItems={(i) => patch({ items: i })} />

      <SaveBar state={state} error={error} onSave={onSave} dirty={dirty} />
    </section>
  )
}

function SectionHeader({ label, onAdd }: { label: string; onAdd?: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-black dark:text-white">{label}</h3>
      {onAdd && <Button variant="ghost" onClick={onAdd}>+ add</Button>}
    </div>
  )
}

function SurpriseSection({
  surprises,
  setSurprises,
}: {
  surprises: DesignSurprise[]
  setSurprises: (v: DesignSurprise[]) => void
}) {
  function up(i: number, p: Partial<DesignSurprise>) {
    setSurprises(surprises.map((s, idx) => (idx === i ? { ...s, ...p } : s)))
  }
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader label="easter egg surprises" onAdd={() => setSurprises([...surprises, { text: "", sub: "" }])} />
      {surprises.map((s, i) => (
        <Row key={i}>
          <div className="flex flex-col gap-2">
            <FieldLabel>text (use \n for line breaks)</FieldLabel>
            <TextArea
              rows={2}
              value={s.text}
              maxLength={200}
              onChange={(e) => up(i, { text: e.target.value })}
            />
            <FieldLabel>sub</FieldLabel>
            <TextInput value={s.sub} maxLength={200} onChange={(e) => up(i, { sub: e.target.value })} />
          </div>
          <Button variant="danger" onClick={() => setSurprises(surprises.filter((_, idx) => idx !== i))}>remove</Button>
        </Row>
      ))}
    </div>
  )
}

function BeliefsSection({
  beliefs,
  setBeliefs,
}: {
  beliefs: DesignBelief[]
  setBeliefs: (v: DesignBelief[]) => void
}) {
  function up(i: number, p: Partial<DesignBelief>) {
    setBeliefs(beliefs.map((b, idx) => (idx === i ? { ...b, ...p } : b)))
  }
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader label="design beliefs" onAdd={() => setBeliefs([...beliefs, { text: "", desc: "" }])} />
      {beliefs.map((b, i) => (
        <Row key={i}>
          <FieldLabel>statement</FieldLabel>
          <TextInput value={b.text} maxLength={200} onChange={(e) => up(i, { text: e.target.value })} />
          <FieldLabel>description</FieldLabel>
          <TextArea rows={2} value={b.desc} maxLength={400} onChange={(e) => up(i, { desc: e.target.value })} />
          <Button variant="danger" onClick={() => setBeliefs(beliefs.filter((_, idx) => idx !== i))}>remove</Button>
        </Row>
      ))}
    </div>
  )
}

function AestheticsSection({
  aesthetics,
  setAesthetics,
}: {
  aesthetics: DesignAesthetic[]
  setAesthetics: (v: DesignAesthetic[]) => void
}) {
  function up(i: number, p: Partial<DesignAesthetic>) {
    setAesthetics(aesthetics.map((a, idx) => (idx === i ? { ...a, ...p } : a)))
  }
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader label="aesthetics i love" onAdd={() => setAesthetics([...aesthetics, { label: "", tag: "" }])} />
      {aesthetics.map((a, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
          <div className="flex flex-col gap-1">
            <FieldLabel>label</FieldLabel>
            <TextInput value={a.label} maxLength={60} onChange={(e) => up(i, { label: e.target.value })} />
          </div>
          <div className="flex flex-col gap-1">
            <FieldLabel>tag</FieldLabel>
            <TextInput value={a.tag} maxLength={40} onChange={(e) => up(i, { tag: e.target.value })} />
          </div>
          <Button variant="danger" onClick={() => setAesthetics(aesthetics.filter((_, idx) => idx !== i))}>×</Button>
        </div>
      ))}
    </div>
  )
}

function FontsSection({
  fonts,
  setFonts,
}: {
  fonts: DesignFont[]
  setFonts: (v: DesignFont[]) => void
}) {
  function up(i: number, p: Partial<DesignFont>) {
    setFonts(fonts.map((f, idx) => (idx === i ? { ...f, ...p } : f)))
  }
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader
        label="favorite fonts"
        onAdd={() => setFonts([...fonts, { name: "", family: "", italic: false }])}
      />
      {fonts.map((f, i) => (
        <Row key={i}>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto_auto] gap-2 items-end">
            <div className="flex flex-col gap-1">
              <FieldLabel>name</FieldLabel>
              <TextInput value={f.name} maxLength={60} onChange={(e) => up(i, { name: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1">
              <FieldLabel>css font-family</FieldLabel>
              <TextInput value={f.family} maxLength={200} onChange={(e) => up(i, { family: e.target.value })} />
            </div>
            <label className="flex items-center gap-1 text-xs">
              <input
                type="checkbox"
                checked={f.italic}
                onChange={(e) => up(i, { italic: e.target.checked })}
              />
              italic
            </label>
            <Button variant="danger" onClick={() => setFonts(fonts.filter((_, idx) => idx !== i))}>×</Button>
          </div>
        </Row>
      ))}
    </div>
  )
}

function ItemsSection({
  items,
  setItems,
}: {
  items: DesignContentItem[]
  setItems: (v: DesignContentItem[]) => void
}) {
  function up(i: number, patch: Partial<DesignContentItem>) {
    setItems(items.map((it, idx) => (idx === i ? ({ ...it, ...patch } as DesignContentItem) : it)))
  }
  function changeType(i: number, type: DesignContentItem["type"]) {
    let next: DesignContentItem
    switch (type) {
      case "video":
        next = { type: "video", url: "" }
        break
      case "site":
        next = { type: "site", url: "", label: "" }
        break
      case "image":
        next = { type: "image", src: "" }
        break
      case "channel":
        next = { type: "channel", url: "", name: "", image: "" }
        break
    }
    setItems(items.map((it, idx) => (idx === i ? next : it)))
  }
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader
        label="content bento items"
        onAdd={() => setItems([...items, { type: "video", url: "" }])}
      />
      {items.map((it, i) => (
        <Row key={i}>
          <div className="flex items-center gap-3">
            <select
              value={it.type}
              onChange={(e) => changeType(i, e.target.value as DesignContentItem["type"])}
              className="px-2 py-1.5 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-sm"
            >
              <option value="video">video</option>
              <option value="site">site</option>
              <option value="image">image</option>
              <option value="channel">channel</option>
            </select>
            <Button variant="danger" className="ml-auto" onClick={() => setItems(items.filter((_, idx) => idx !== i))}>
              remove
            </Button>
          </div>

          {it.type === "video" && (
            <div className="flex flex-col gap-1">
              <FieldLabel>youtube url</FieldLabel>
              <TextInput value={it.url} maxLength={500} onChange={(e) => up(i, { url: e.target.value })} />
            </div>
          )}
          {it.type === "site" && (
            <>
              <div className="flex flex-col gap-1">
                <FieldLabel>url</FieldLabel>
                <TextInput value={it.url} maxLength={500} onChange={(e) => up(i, { url: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1">
                <FieldLabel>label</FieldLabel>
                <TextInput value={it.label} maxLength={80} onChange={(e) => up(i, { label: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1">
                <FieldLabel>description (optional)</FieldLabel>
                <TextInput value={it.description ?? ""} maxLength={200} onChange={(e) => up(i, { description: e.target.value })} />
              </div>
            </>
          )}
          {it.type === "image" && (
            <>
              <div className="flex flex-col gap-1">
                <FieldLabel>src (path or url)</FieldLabel>
                <TextInput value={it.src} maxLength={500} onChange={(e) => up(i, { src: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1">
                <FieldLabel>alt (optional)</FieldLabel>
                <TextInput value={it.alt ?? ""} maxLength={120} onChange={(e) => up(i, { alt: e.target.value })} />
              </div>
            </>
          )}
          {it.type === "channel" && (
            <>
              <div className="flex flex-col gap-1">
                <FieldLabel>url</FieldLabel>
                <TextInput value={it.url} maxLength={500} onChange={(e) => up(i, { url: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1">
                <FieldLabel>name</FieldLabel>
                <TextInput value={it.name} maxLength={80} onChange={(e) => up(i, { name: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1">
                <FieldLabel>image url</FieldLabel>
                <TextInput value={it.image} maxLength={500} onChange={(e) => up(i, { image: e.target.value })} />
              </div>
            </>
          )}
        </Row>
      ))}
    </div>
  )
}
