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

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-black dark:text-white">{label}</h3>
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
  const { flashIndex, markPendingFlash, setRef } = useAddFlash(surprises.length)
  function up(i: number, p: Partial<DesignSurprise>) {
    setSurprises(surprises.map((s, idx) => (idx === i ? { ...s, ...p } : s)))
  }
  function add() {
    markPendingFlash(surprises.length)
    setSurprises([...surprises, { text: "", sub: "" }])
  }
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader label="easter egg surprises" />
      {surprises.map((s, i) => (
        <Row key={i} flashing={flashIndex === i} rowRef={setRef(i)}>
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
      <Button variant="outline" onClick={add} className="w-full py-2">+ add surprise</Button>
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
  const { flashIndex, markPendingFlash, setRef } = useAddFlash(beliefs.length)
  function up(i: number, p: Partial<DesignBelief>) {
    setBeliefs(beliefs.map((b, idx) => (idx === i ? { ...b, ...p } : b)))
  }
  function add() {
    markPendingFlash(beliefs.length)
    setBeliefs([...beliefs, { text: "", desc: "" }])
  }
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader label="design beliefs" />
      {beliefs.map((b, i) => (
        <Row key={i} flashing={flashIndex === i} rowRef={setRef(i)}>
          <FieldLabel>statement</FieldLabel>
          <TextInput value={b.text} maxLength={200} onChange={(e) => up(i, { text: e.target.value })} />
          <FieldLabel>description</FieldLabel>
          <TextArea rows={2} value={b.desc} maxLength={400} onChange={(e) => up(i, { desc: e.target.value })} />
          <Button variant="danger" onClick={() => setBeliefs(beliefs.filter((_, idx) => idx !== i))}>remove</Button>
        </Row>
      ))}
      <Button variant="outline" onClick={add} className="w-full py-2">+ add belief</Button>
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
  const { flashIndex, markPendingFlash, setRef } = useAddFlash(aesthetics.length)
  function up(i: number, p: Partial<DesignAesthetic>) {
    setAesthetics(aesthetics.map((a, idx) => (idx === i ? { ...a, ...p } : a)))
  }
  function add() {
    markPendingFlash(aesthetics.length)
    setAesthetics([...aesthetics, { label: "", tag: "" }])
  }
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader label="aesthetics i love" />
      {aesthetics.map((a, i) => (
        <div
          key={i}
          ref={setRef(i)}
          className={`grid grid-cols-[1fr_1fr_auto] gap-2 items-end rounded-md p-1 ${flashIndex === i ? "animate-flash-new" : ""}`}
        >
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
      <Button variant="outline" onClick={add} className="w-full py-2">+ add aesthetic</Button>
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
  const { flashIndex, markPendingFlash, setRef } = useAddFlash(fonts.length)
  function up(i: number, p: Partial<DesignFont>) {
    setFonts(fonts.map((f, idx) => (idx === i ? { ...f, ...p } : f)))
  }
  function add() {
    markPendingFlash(fonts.length)
    setFonts([...fonts, { name: "", family: "", italic: false }])
  }
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader label="favorite fonts" />
      {fonts.map((f, i) => (
        <Row key={i} flashing={flashIndex === i} rowRef={setRef(i)}>
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
          {f.family && (
            <div
              className="text-2xl text-black dark:text-white pt-1"
              style={{ fontFamily: f.family, fontStyle: f.italic ? "italic" : "normal" }}
            >
              {f.name || "Aa"}
            </div>
          )}
        </Row>
      ))}
      <Button variant="outline" onClick={add} className="w-full py-2">+ add font</Button>
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
  const { flashIndex, markPendingFlash, setRef } = useAddFlash(items.length)
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
  function add() {
    markPendingFlash(items.length)
    setItems([...items, { type: "video", url: "" }])
  }
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader label="content bento items" />
      {items.map((it, i) => (
        <Row key={i} flashing={flashIndex === i} rowRef={setRef(i)}>
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
            <div className="flex items-start gap-3">
              <ImagePreview src={videoThumb(it.url)} size={72} />
              <div className="flex-1 flex flex-col gap-1">
                <FieldLabel>youtube url</FieldLabel>
                <TextInput value={it.url} maxLength={500} onChange={(e) => up(i, { url: e.target.value })} />
              </div>
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
            <div className="flex items-start gap-3">
              <ImagePreview src={it.src} size={72} alt={it.alt} />
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <FieldLabel>src (path or url)</FieldLabel>
                  <TextInput value={it.src} maxLength={500} onChange={(e) => up(i, { src: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1">
                  <FieldLabel>alt (optional)</FieldLabel>
                  <TextInput value={it.alt ?? ""} maxLength={120} onChange={(e) => up(i, { alt: e.target.value })} />
                </div>
              </div>
            </div>
          )}
          {it.type === "channel" && (
            <div className="flex items-start gap-3">
              <ImagePreview src={it.image} size={72} alt={it.name} />
              <div className="flex-1 flex flex-col gap-2">
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
              </div>
            </div>
          )}
        </Row>
      ))}
      <Button variant="outline" onClick={add} className="w-full py-2">+ add item</Button>
    </div>
  )
}

function videoThumb(url: string): string {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/)
  return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : ""
}
