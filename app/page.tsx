import ProjectsGrid from "@/components/ProjectsGrid"
import Link from "next/link"
import DonateButton from "@/components/DonateButton"
import { GridPattern } from "@/components/ui/grid-pattern"
import VisitorCounter from "@/components/VisitorCounter"
import SshCallout from "@/components/SshCallout"
import HeroGradient from "@/components/HeroGradient"
import ContributionGrid from "@/components/ContributionGrid"
import Stack from "@/components/Stack"
import FadeIn from "@/components/FadeIn"
import RotatingSubtitle from "@/components/RotatingSubtitle"
import Greeting from "@/components/Greeting"
import AboutText from "@/components/AboutText"
import { getAllSections } from "@/lib/content/store"

export const revalidate = 30

export default async function Home() {
  const content = await getAllSections()

  return (
    <>
      <div className="relative min-h-screen bg-white dark:bg-black overflow-hidden flex justify-center">
        <GridPattern
          width={40}
          height={40}
          className="absolute inset-0 h-full w-full fill-transparent stroke-gray-200/30 dark:stroke-gray-800/30 [mask-image:radial-gradient(ellipse_at_top,white_20%,transparent_70%)]"
        />

        <HeroGradient />

        <main className="relative z-10 w-full max-w-3xl flex flex-col pt-16 sm:pt-20 px-5 sm:px-8 mx-auto">

          {/* Social links */}
          <nav className="mb-3 flex items-center gap-5 font-[family-name:var(--font-geist-sans)] text-xs text-black dark:text-white animate-pop-in delay-1">
            <a href="https://x.com/rishaan_j" target="_blank" className="nav-link">x/twitter</a>
            <a href="https://www.linkedin.com/in/rishaan-jain-517b80275/" target="_blank" className="nav-link">linkedin</a>
            <a href="https://github.com/RishaanJ" target="_blank" className="nav-link">github</a>
            <Link href="/design" className="nav-link">design</Link>
            <a href="mailto:rishaanjain188@gmail.com" className="nav-link ml-auto text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors">rishaanjain188@gmail.com</a>
          </nav>

          <div className="animate-pop-in delay-2">
            <Greeting text={content.greeting} />
          </div>
          <div className="mt-0.5 animate-pop-in delay-3">
            <RotatingSubtitle lines={content.subtitle} />
          </div>

          <div className="mt-6 animate-pop-in delay-4">
            <SshCallout />
          </div>

          {/* contribution grid */}
          <FadeIn className="mt-12 overflow-x-auto">
            <ContributionGrid />
          </FadeIn>

          {/* stack */}
          <FadeIn className="mt-12" delay={0.05}>
            <h2 className="font-[family-name:var(--font-geist-sans)] text-2xl font-semibold tracking-[-0.05em] text-black dark:text-white leading-[1.1] mb-5">
              stack
            </h2>
            <Stack stack={content.stack} />
            <div className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] dark:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            </div>
          </FadeIn>

          {/* about me */}
          <FadeIn className="mt-12" delay={0.05}>
            <h2 className="font-[family-name:var(--font-geist-sans)] text-2xl font-semibold tracking-[-0.05em] text-black dark:text-white leading-[1.1]">
              about
            </h2>
            <AboutText text={content.about} />
          </FadeIn>

          {/* projects */}
          <FadeIn className="mt-12">
            <h2 className="font-[family-name:var(--font-geist-sans)] text-2xl font-semibold tracking-[-0.05em] text-black dark:text-white leading-[1.1] mb-5">
              projects
            </h2>
            <ProjectsGrid projects={content.projects} />
          </FadeIn>

          {/* visitor counter */}
          <FadeIn className="mt-12">
            <VisitorCounter />
          </FadeIn>

          {/* support */}
          <FadeIn className="mt-8 mb-16">
            <div className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-4">
              <div className="flex flex-col gap-0.5">
                <p className="font-[family-name:var(--font-geist-sans)] text-xs font-medium text-black dark:text-white">
                  feed rishaan
                </p>
                <p className="font-[family-name:var(--font-geist-sans)] text-xs text-gray-400 dark:text-gray-600">
                  pls
                </p>
              </div>
              <DonateButton />
            </div>
          </FadeIn>

        </main>
      </div>
    </>
  )
}
