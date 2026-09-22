import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { GridPattern } from "@/components/ui/grid-pattern"
import FadeIn from "@/components/FadeIn"

const SUPPORT_EMAIL = "rishaanjain188@gmail.com"

export const metadata: Metadata = {
  title: "godan — privacy",
  description: "The privacy policy for godan, a reader for iPhone.",
}

const SECTIONS = [
  {
    heading: "what godan collects",
    body: [
      "nothing. there is no account to make, no sign-in, no analytics, no advertising and no third-party services of any kind. godan does not send your information anywhere, because there is nowhere for it to send it — i don't run a server for this app.",
    ],
  },
  {
    heading: "your books",
    body: [
      "the files you add stay on your iPhone, in godan's own storage. they aren't uploaded, copied or read by anyone but you.",
    ],
  },
  {
    heading: "your reading history",
    body: [
      "your place in each book, the speed you read at, and the counts on the stats screen — words read, time spent, your pace, your streak — are all kept on your phone and are only visible to you.",
    ],
  },
  {
    heading: "backups",
    body: [
      "if you back your iPhone up to iCloud or to a computer, godan's data can be included in that backup along with everything else on the phone. those backups are handled by Apple under Apple's privacy policy, not by me.",
    ],
  },
  {
    heading: "children",
    body: [
      "godan collects no information from anyone, of any age.",
    ],
  },
  {
    heading: "deleting your data",
    body: [
      "delete the app and everything goes with it — your books, your progress and your stats. there's no copy anywhere else for me to remove.",
    ],
  },
  {
    heading: "changes",
    body: [
      "if this ever changes, i'll update this page and change the date at the top. if the change is a meaningful one, the app will say so too.",
    ],
  },
]

export default function GodanPrivacyPage() {
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
          <Link href="/godan" className="nav-link flex items-center gap-1.5">
            <ArrowLeftIcon className="w-3 h-3" /> godan
          </Link>
        </nav>

        {/* Hero */}
        <div className="animate-pop-in delay-2 mt-8">
          <p className="text-[11px] tracking-[0.15em] uppercase text-gray-400 dark:text-gray-600 mb-4">
            last updated 18 september 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.05em] text-black dark:text-white leading-[1.05]">
            privacy
          </h1>
          <p className="mt-5 text-base text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
            godan keeps to itself. your books and everything you do with them
            stay on your phone, and i never see any of it.
          </p>
        </div>

        {/* Sections */}
        <FadeIn className="mt-16" delay={0.05}>
          <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-900">
            {SECTIONS.map(({ heading, body }) => (
              <section key={heading} className="py-6 flex flex-col gap-2">
                <h2 className="text-sm font-medium text-black dark:text-white tracking-[-0.02em]">
                  {heading}
                </h2>
                {body.map((p) => (
                  <p
                    key={p}
                    className="text-xs text-gray-400 dark:text-gray-600 leading-relaxed max-w-md"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </FadeIn>

        {/* Contact */}
        <FadeIn className="mt-10 mb-24" delay={0.05}>
          <p className="text-xs text-gray-400 dark:text-gray-600 leading-relaxed max-w-md">
            questions about any of this? email{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=godan%20privacy`}
              className="nav-link text-black dark:text-white"
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </FadeIn>

      </main>
    </div>
  )
}
