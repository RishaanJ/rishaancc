export default function Home() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black overflow-hidden flex justify-center">
      {/* Gradient blob - top right */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-[450px] w-[450px] opacity-80"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, #e85d04 0%, #dc2626 25%, #f97316 45%, #fbbf24 60%, transparent 75%)",
          filter: "blur(50px)",
        }}
      />

      <main className="relative z-10 w-full max-w-xl flex flex-col pt-20 px-8">
        {/* Social links */}
        <nav className="mb-3 flex gap-5 font-[family-name:var(--font-geist-sans)] text-xs text-black dark:text-white">
          <a href="#" className="hover:opacity-60 transition-opacity">x/twitter</a>
          <a href="#" className="hover:opacity-60 transition-opacity">linkedin</a>
          <a href="#" className="hover:opacity-60 transition-opacity">github</a>
        </nav>

        <h1 className="font-[family-name:var(--font-geist-sans)] text-4xl font-semibold tracking-[-0.05em] text-black dark:text-white leading-[1.1]">
          hey, i&apos;m rishaan
        </h1>
        <p
          className="text-[1.75rem] tracking-[-0.03em] text-black dark:text-white mt-0.5 leading-[1.2]"
          style={{
            fontFamily:
              "'Apple Garamond Light', 'Apple Garamond', 'Garamond', 'EB Garamond', Georgia, serif",
            fontStyle: "italic",
          }}
        >
          developer and builder based in San Fransisco
        </p>
      </main>
    </div>
  );
}
