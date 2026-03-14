import { SmoothCursor } from "@/components/ui/smooth-cursor"
import ProjectCard from "@/components/ProjectCard"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import BentoPhotos from "@/components/ui/bentophotos"
import { InteractiveKbd } from "@/components/ui/interactive-kbd"
import {
  CodeIcon,
  GlobeIcon,
  RocketIcon,
  ImageIcon,
  LaptopIcon,
  CameraIcon,
} from "@radix-ui/react-icons"

const bentoItems = [
  {
    Icon: CodeIcon,
    name: "Code",
    description: "building things",
    href: "#",
    cta: "View",
    className: "col-span-2",
    background: <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900" />,
  },
  {
    Icon: CameraIcon,
    name: "Photography",
    description: "capturing moments",
    href: "#",
    cta: "View",
    className: "col-span-1",
    background: <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800" />,
  },
  {
    Icon: GlobeIcon,
    name: "Travel",
    description: "exploring the world",
    href: "#",
    cta: "View",
    className: "col-span-1",
    background: <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800" />,
  },
  {
    Icon: RocketIcon,
    name: "Projects",
    description: "shipping fast",
    href: "#",
    cta: "View",
    className: "col-span-2",
    background: <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900" />,
  },
  {
    Icon: LaptopIcon,
    name: "Setup",
    description: "my workspace",
    href: "#",
    cta: "View",
    className: "col-span-2",
    background: <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800" />,
  },
  {
    Icon: ImageIcon,
    name: "Design",
    description: "ui explorations",
    href: "#",
    cta: "View",
    className: "col-span-1",
    background: <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900" />,
  },
]

export default function Home() {
  const projects = [
    {
      title: "ssh sup.rishaan.cc",
      description: "my terminal website",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Sona",
      description: "ai powered radiology",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Launchpad",
      description: "all in one hackathon hosting platform",
      image: "https://via.placeholder.com/150",
    },
  ];
  const italicSpan = (text: string) => (
    <span
      className="text-lg"
      style={{
        fontFamily:
          "'Apple Garamond Light', 'Apple Garamond', 'Garamond', 'EB Garamond', Georgia, serif",
        fontStyle: "italic",
      }}
    >
      {text}
    </span>
  )
  return (
    <>
      <SmoothCursor />
      <div className="relative min-h-screen bg-white dark:bg-black overflow-hidden flex justify-center">
        {/* Gradient blob - top right */}
        <div
          className="pointer-events-none absolute -top-20 -right-20 md:-top-30 md:-right-30 h-[250px] w-[250px] md:h-[450px] md:w-[450px] opacity-80"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, #e85d04 0%, #dc2626 25%, #f97316 45%, #fbbf24 60%, transparent 75%)",
            filter: "blur(50px)",
          }}
        />

        <main className="relative z-10 w-full max-w-xl flex flex-col pt-20 px-8 mx-auto">
          {/* Social links */}
          <nav className="mb-3 flex gap-5 font-[family-name:var(--font-geist-sans)] text-xs text-black dark:text-white animate-pop-in delay-1">
            <a href="#" className="hover:opacity-60 transition-opacity">x/twitter</a>
            <a href="#" className="hover:opacity-60 transition-opacity">linkedin</a>
            <a href="#" className="hover:opacity-60 transition-opacity">github</a>
          </nav>

          <h1 className="font-[family-name:var(--font-geist-sans)] text-4xl font-semibold tracking-[-0.05em] text-black dark:text-white leading-[1.1] animate-pop-in delay-2">
            hey, i&apos;m rishaan
          </h1>
          <p
            className="text-[1.75rem] tracking-[-0.03em] text-black dark:text-white mt-0.5 leading-[1.2] animate-pop-in delay-3"

            style={{
              fontFamily:
                "'Apple Garamond Light', 'Apple Garamond', 'Garamond', 'EB Garamond', Georgia, serif",
              fontStyle: "italic",
            }}
          >
            developer and builder based in San Fransisco
          </p>

          <div className="mt-12 animate-pop-in delay-4">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                image={project.image}
                title={project.title}
                tagline={project.description}
              />
            ))}
          </div>

          {/* about me */}
          <div className="mt-12 animate-pop-in delay-5">
            <h2 className="font-[family-name:var(--font-geist-sans)] text-2xl font-semibold tracking-[-0.05em] text-black dark:text-white leading-[1.1]">
              about
            </h2>
            <p className="font-[family-name:var(--font-geist-sans)] text-sm tracking-[-3%] mt-4 font-normal">
              I’m a student developer who likes building things on the {italicSpan("internet")}. Most of what I work on is software, AI, and random ideas that turn into projects.
              I spend a lot of time experimenting with new tech, building apps, and going to hackathons. Lately I’ve been really interested in AI, fintech, and tools that solve {italicSpan("real problems")}. A lot of my projects start as random ideas that I just get curious about and decide to build. I like figuring things out as I go and seeing how far an idea can turn into something {italicSpan("real.")}
            </p>
          </div>


        </main>
      </div>
      <div className="grid grid-cols-4 gap-2 auto-rows-[200px] px-18">
        <div
          className="relative bg-neutral-200 dark:bg-neutral-800 rounded-2xl p-6 col-span-2 row-span-2 animate-pop-in overflow-hidden"
          style={{ animationDelay: "0s" }}
        >
          {/* Content 1 / add picture here */}
        </div>

        <div
          className="relative bg-neutral-200 dark:bg-neutral-800 rounded-2xl p-6 animate-pop-in overflow-hidden"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Content 2 / add picture here */}
        </div>

        <div
          className="relative bg-neutral-200 dark:bg-neutral-800 rounded-2xl p-6 row-span-2 animate-pop-in overflow-hidden"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Content 3 / add picture here */}
        </div>

        <div
          className="relative bg-neutral-200 dark:bg-neutral-800 rounded-2xl p-6 animate-pop-in overflow-hidden"
          style={{ animationDelay: "0.3s" }}
        >
          {/* Content 4 / add picture here */}
        </div>

        <div
          className="relative bg-neutral-200 dark:bg-neutral-800 rounded-2xl p-6 col-span-2 animate-pop-in overflow-hidden"
          style={{ animationDelay: "0.4s" }}
        >
          {/* Content 5 / add picture here */}
        </div>

        <div
          className="relative bg-neutral-200 dark:bg-neutral-800 rounded-2xl p-6 animate-pop-in overflow-hidden"
          style={{ animationDelay: "0.5s" }}
        >
          {/* Content 6 / add picture here */}
        </div>

        <div
          className="relative bg-neutral-200 dark:bg-neutral-800 rounded-2xl p-6 animate-pop-in overflow-hidden"
          style={{ animationDelay: "0.6s" }}
        >
          {/* Content 7 / add picture here */}
        </div>
      </div>
      <div className="w-full flex justify-center mt-12 mb-2 font-[family-name:var(--font-geist-sans)]">
        <div className="scale-75">
          <InteractiveKbd />
        </div>
      </div>
    </>
  );
}
