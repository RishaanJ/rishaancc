import { SmoothCursor } from "@/components/ui/smooth-cursor"
import ProjectCard from "@/components/ProjectCard"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
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
          className="pointer-events-none absolute -top-30 -right-30 h-[450px] w-[450px] opacity-80"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, #e85d04 0%, #dc2626 25%, #f97316 45%, #fbbf24 60%, transparent 75%)",
            filter: "blur(50px)",
          }}
        />

        <main className="relative z-10 w-full max-w-xl flex flex-col pt-20 px-8 mx-auto">
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

          <div className="mt-12">
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
          <div className="mt-12">
            <h2 className="font-[family-name:var(--font-geist-sans)] text-2xl font-semibold tracking-[-0.05em] text-black dark:text-white leading-[1.1]">
              about
            </h2>
            <p className="font-[family-name:var(--font-geist-sans)] text-sm tracking-[-3%] mt-4 font-normal">
              I’m a student developer who likes building things on the {italicSpan("internet")}. Most of what I work on is software, AI, and random ideas that turn into projects.
              I spend a lot of time experimenting with new tech, building apps, and going to hackathons. Lately I’ve been really interested in AI, fintech, and tools that solve {italicSpan("real problems")}. A lot of my projects start as random ideas that I just get curious about and decide to build. I like figuring things out as I go and seeing how far an idea can turn into something {italicSpan("real.")}
            </p>
          </div>

          {/* Bento grid 
          <div className="mt-12">
            <BentoGrid className="auto-rows-[12rem] grid-cols-3">
              {bentoItems.map((item) => (
                <BentoCard key={item.name} {...item} />
              ))}
            </BentoGrid>
          </div>
          */}

        </main>
      </div>
    </>
  );
}
