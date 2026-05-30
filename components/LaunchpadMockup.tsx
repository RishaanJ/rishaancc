export default function LaunchpadMockup() {
  return (
    <div className="relative w-full h-full bg-[#0f0f0f] flex flex-col">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#1a1a1a] border-b border-white/5 shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <div className="w-2 h-2 rounded-full bg-[#28c840]" />
        <div className="mx-auto w-32 h-3.5 rounded-sm bg-white/10" />
      </div>

      {/* App layout */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Sidebar */}
        <div className="w-10 bg-[#141414] border-r border-white/5 flex flex-col items-center gap-3 py-3 shrink-0">
          <div className="w-5 h-5 rounded bg-white/20" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-5 h-5 rounded bg-white/8" />
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 flex flex-col gap-2 min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="h-3 w-24 rounded bg-white/15" />
            <div className="h-5 w-14 rounded-full bg-white/10" />
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-1.5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-md p-2 flex flex-col gap-1">
                <div className="h-2 w-8 rounded bg-white/15" />
                <div className="h-4 w-12 rounded bg-white/20" />
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="flex-1 bg-white/5 rounded-md p-2 flex flex-col gap-1.5">
            <div className="flex gap-2 pb-1 border-b border-white/5">
              {[40, 25, 20].map((w, i) => (
                <div key={i} className={`h-2 rounded bg-white/20`} style={{ width: `${w}%` }} />
              ))}
            </div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="w-3 h-3 rounded-full bg-white/10 shrink-0" />
                <div className="h-2 rounded bg-white/10" style={{ width: `${[55,40,60,45][i]}%` }} />
                <div className="h-2 rounded bg-white/8 ml-auto" style={{ width: "20%" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coming Soon badge */}
      <div className="absolute top-8 right-2">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 text-[9px] font-[family-name:var(--font-geist-sans)] font-medium px-2 py-0.5 rounded-full uppercase tracking-widest">
          coming soon
        </div>
      </div>
    </div>
  )
}
