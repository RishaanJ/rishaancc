import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { GridPattern } from "@/components/ui/grid-pattern"
import FadeIn from "@/components/FadeIn"

const SUPPORT_EMAIL = "rishaanjain188@gmail.com"
const MAILTO = `mailto:${SUPPORT_EMAIL}?subject=godan%20support`

export const metadata: Metadata = {
  title: "godan — support",
  description:
    "Help and contact for godan, a reader for iPhone that shows a book one word at a time.",
}

// Screenshots are 1242×2688 App Store frames, resized and re-encoded. Width and
// height below are the real pixel dimensions so the browser reserves the space.
const PREVIEWS = [
  {
    src: "/godan-library.webp",
    alt: "The godan library, listing books like Atomic Habits and Thus Spoke Zarathustra with an add a book button.",
    caption: "your library",
  },
  {
    src: "/godan-reader.webp",
    alt: "The godan reader showing a single word in the middle of the screen above a speed dial set to 325 words per minute.",
    caption: "the reader",
  },
  {
    src: "/godan-stats.webp",
    alt: "The godan stats screen showing words read, time reading, effective pace and reading streaks.",
    caption: "what you've read",
  },
]

const QUESTIONS = [
  {
    q: "how do i add a book?",
    a: "open the library and tap add a book, then choose a file from your phone. it shows up in the list and stays there until you remove it.",
  },
  {
    q: "how do i change how fast it goes?",
    a: "the dial underneath the word. drag left to slow down, right to speed up. most people start around 300 words a minute and creep up from there — go faster than feels comfortable and you'll notice you've stopped taking anything in.",
  },
  {
    q: "one word at a time is too sparse for me.",
    a: "you can have it show a few words at a time instead. the setting sits at the bottom right of the reader, next to the play button.",
  },
  {
    q: "i lost my place in a book.",
    a: "you shouldn't have. godan remembers where you stopped in each book — open it again and press play. the page count under the reader tells you where you are.",
  },
  {
    q: "a book won't open, or the app closed on its own.",
    a: "that's a bug and i'd like to know about it. email me with the name of the book and what you were doing when it happened, and i'll take a look.",
  },
  {
    q: "what happens to my books and my reading history?",
    a: "they stay on your phone. nothing is uploaded and there's no account to make. delete the app and it all goes with it.",
  },
]

export default function GodanPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black overflow-hidden flex justify-center">
      <GridPattern
        width={40}
        height={40}
        className="absolute inset-0 h-full w-full fill-transparent stroke-gray-200/30 dark:stroke-gray-800/30 [mask-image:radial-gradient(ellipse_at_top,white_20%,transparent_70%)]"
      />

      <main className="relative z-10 w-full max-w-3xl flex flex-col pt-16 sm:pt-20 px-5 sm:px-8 mx-auto font-[family-name:var(--font-geist-sans)]">

        {/* Nav */}
        <nav className="mb-3 flex items-center gap-5 text-xs text-black dark:text-white animate-pop-in delay-1">
          <Link href="/" className="nav-link flex items-center gap-1.5">
            <ArrowLeftIcon className="w-3 h-3" /> home
          </Link>
          <a
            href={MAILTO}
            className="nav-link ml-auto text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors"
          >
            {SUPPORT_EMAIL}
          </a>
        </nav>

        {/* Hero */}
        <div className="animate-pop-in delay-2 mt-8">
          <p className="text-[11px] tracking-[0.15em] uppercase text-gray-400 dark:text-gray-600 mb-4">
            support
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.05em] text-black dark:text-white leading-[1.05]">
            godan
          </h1>
          <p className="mt-5 text-base text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
            a reader for iPhone that shows a book one word at a time, in the
            middle of the screen. this page is where to get help with it.
          </p>
        </div>

        {/* What it is */}
        <FadeIn className="mt-16" delay={0.05}>
          <div className="flex flex-col gap-4 max-w-md text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            <p>
              nothing on the screen moves except the word you&apos;re on, so your
              eyes don&apos;t have to travel. you set the pace and the book comes
              to you.
            </p>
            <p>
              it&apos;s meant for the gaps — a queue, a train, ten minutes before
              bed — where holding a paperback is awkward and a wall of small text
              is worse.
            </p>
          </div>
        </FadeIn>

        {/* Previews */}
        <FadeIn className="mt-16" delay={0.05}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-4 justify-items-center">
            {PREVIEWS.map(({ src, alt, caption }) => (
              <figure key={src} className="w-full max-w-[280px] sm:max-w-none">
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white">
                  <Image
                    src={src}
                    alt={alt}
                    width={739}
                    height={1600}
                    sizes="(min-width: 640px) 240px, 280px"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className="mt-3 text-[11px] text-gray-400 dark:text-gray-600 text-center">
                  {caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </FadeIn>

        {/* Common questions */}
        <FadeIn className="mt-20" delay={0.05}>
          <h2 className="text-2xl font-semibold tracking-[-0.05em] text-black dark:text-white leading-[1.1] mb-5">
            common questions
          </h2>
          <dl className="flex flex-col divide-y divide-gray-100 dark:divide-gray-900">
            {QUESTIONS.map(({ q, a }) => (
              <div key={q} className="py-5 flex flex-col gap-1.5">
                <dt className="text-sm font-medium text-black dark:text-white tracking-[-0.02em]">
                  {q}
                </dt>
                <dd className="text-xs text-gray-400 dark:text-gray-600 leading-relaxed max-w-md">
                  {a}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        {/* Contact */}
        <FadeIn className="mt-16" delay={0.05}>
          <h2 className="text-2xl font-semibold tracking-[-0.05em] text-black dark:text-white leading-[1.1] mb-5">
            still stuck
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
            email me. one person reads these — that&apos;s me — and you&apos;ll
            usually hear back within a day or two. it helps if you say which
            iPhone you&apos;re on and what you were doing when things went wrong.
          </p>
          <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-4">
            <div className="flex flex-col gap-0.5">
              <p className="text-xs font-medium text-black dark:text-white">
                godan support
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-600">
                {SUPPORT_EMAIL}
              </p>
            </div>
            <a
              href={MAILTO}
              className="shrink-0 rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-medium px-4 py-2 hover:opacity-80 transition-opacity"
            >
              write to me
            </a>
          </div>
        </FadeIn>

        {/* Footer */}
        <FadeIn className="mt-12 mb-24" delay={0.05}>
          <div className="flex items-center gap-5 text-xs text-gray-400 dark:text-gray-600">
            <Link
              href="/godan/privacy"
              className="nav-link hover:text-black dark:hover:text-white transition-colors"
            >
              privacy
            </Link>
            <Link
              href="/"
              className="nav-link hover:text-black dark:hover:text-white transition-colors"
            >
              rishaan.cc
            </Link>
          </div>
        </FadeIn>

      </main>
    </div>
  )
}
