import ProjectCard from "@/components/ProjectCard"
import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import DonateButton from "@/components/DonateButton"
import { GridPattern } from "@/components/ui/grid-pattern"
import VisitorCounter from "@/components/VisitorCounter"
import SshCallout from "@/components/SshCallout"
import HeroGradient from "@/components/HeroGradient"
import ContributionGrid from "@/components/ContributionGrid"
import LaunchpadMockup from "@/components/LaunchpadMockup"
import Stack from "@/components/Stack"
import FadeIn from "@/components/FadeIn"
import { Marquee } from "@/components/ui/marquee"
import RotatingSubtitle from "@/components/RotatingSubtitle"
import Greeting from "@/components/Greeting"

const row1 = ["typescript","javascript","python","openjdk","nextdotjs","react","tailwindcss","nodedotjs","express"]
const row2 = ["flask","vercel","pytorch","tensorflow","opencv","ubuntu","nginx","gnubash","git","github"]

export default function Home() {
  const projects = [
    {
      title: "Sona",
      description: "AI-powered radiology assistant that helps doctors analyze medical imaging faster and more accurately.",
      image: "/sona8.png",
    },
    {
      title: "Heatmap",
      description: "macOS activity tracker that visualizes your focus as a year-long heatmap. GitHub commit graph, for your life.",
      image: "/heatmap.png",
      url: "https://heatmap.rishaan.cc",
    },
  ]

  const em = (text: string) => (
    <span className="shimmer-text font-medium">{text}</span>
  )

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
            <Greeting />
          </div>
          <div className="mt-0.5 animate-pop-in delay-3">
            <RotatingSubtitle />
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
            <Stack />
            <div className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] dark:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            </div>
          </FadeIn>

          {/* about me */}
          <FadeIn className="mt-12" delay={0.05}>
            <h2 className="font-[family-name:var(--font-geist-sans)] text-2xl font-semibold tracking-[-0.05em] text-black dark:text-white leading-[1.1]">
              about
            </h2>
            <p className="font-[family-name:var(--font-geist-sans)] text-sm tracking-[-3%] mt-4 font-normal text-gray-700 dark:text-gray-300 leading-relaxed">
              I&apos;m a student developer who likes {em("building things on the internet")}. Most of what I work on is software, AI, and random ideas that turn into projects. I spend a lot of time experimenting with new tech, building apps, and going to hackathons. Lately I&apos;ve been really {em("interested in AI, fintech, and tools that solve real problems")}. A lot of my projects start as random ideas that I just get curious about and decide to build. I like figuring things out as I go and seeing how far an idea can turn into something {em("real")}.
            </p>
          </FadeIn>

          {/* projects */}
          <FadeIn className="mt-12">
            <h2 className="font-[family-name:var(--font-geist-sans)] text-2xl font-semibold tracking-[-0.05em] text-black dark:text-white leading-[1.1] mb-5">
              projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
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
