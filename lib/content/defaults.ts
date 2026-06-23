import type { SiteContent } from "./types"

const garamond = "var(--font-apple-garamond, 'Garamond', 'EB Garamond', Georgia, serif)"

export const defaultContent: SiteContent = {
  projects: [
    {
      title: "Sona",
      description:
        "AI-powered radiology assistant that helps doctors analyze medical imaging faster and more accurately.",
      image: "/sona8.png",
    },
    {
      title: "Heatmap",
      description:
        "macOS activity tracker that visualizes your focus as a year-long heatmap. GitHub commit graph, for your life.",
      image: "/heatmap.png",
      url: "https://heatmap.rishaan.cc",
    },
  ],
  about:
    "I'm a student developer who likes **building things on the internet**. Most of what I work on is software, AI, and random ideas that turn into projects. I spend a lot of time experimenting with new tech, building apps, and going to hackathons. Lately I've been really **interested in AI, fintech, and tools that solve real problems**. A lot of my projects start as random ideas that I just get curious about and decide to build. I like figuring things out as I go and seeing how far an idea can turn into something **real**.",
  subtitle: [
    "developer and builder based in San Francisco",
    "turning ideas into URLs since 2021",
    "pre-revenue. aggressively building.",
    "shipping things nobody asked for",
    "building in public. breaking in private.",
  ],
  greeting: "hey, i'm rishaan",
  stack: [
    {
      category: "Languages",
      items: [
        { name: "TypeScript", slug: "typescript", color: "#3178C6" },
        { name: "JavaScript", slug: "javascript", color: "#F7DF1E" },
        { name: "Python", slug: "python", color: "#3776AB" },
        { name: "Java", slug: "openjdk", color: "#ED8B00" },
      ],
    },
    {
      category: "Frontend",
      items: [
        { name: "Next.js", slug: "nextdotjs", color: "#000000" },
        { name: "React", slug: "react", color: "#61DAFB" },
        { name: "Tailwind", slug: "tailwindcss", color: "#06B6D4" },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", slug: "nodedotjs", color: "#339933" },
        { name: "Express", slug: "express", color: "#888888" },
        { name: "Flask", slug: "flask", color: "#888888" },
        { name: "Vercel", slug: "vercel", color: "#888888" },
      ],
    },
    {
      category: "AI / ML",
      items: [
        { name: "PyTorch", slug: "pytorch", color: "#EE4C2C" },
        { name: "TensorFlow", slug: "tensorflow", color: "#FF6F00" },
        { name: "OpenCV", slug: "opencv", color: "#5C3EE8" },
      ],
    },
    {
      category: "Infra",
      items: [
        { name: "Ubuntu", slug: "ubuntu", color: "#E95420" },
        { name: "nginx", slug: "nginx", color: "#009639" },
        { name: "Bash", slug: "gnubash", color: "#4EAA25" },
      ],
    },
  ],
  design: {
    surprises: [
      { text: "you noticed.", sub: "that's the whole thing, really." },
      { text: "white space\nis not\nempty space.", sub: "it's breathing room." },
      {
        text: "the best\ninteraction\nis none.",
        sub: "if you can remove the step, remove the step.",
      },
      { text: "every font\nhas a feeling.", sub: "choose accordingly." },
      { text: "pixel-perfect\nis a myth.", sub: "feel-perfect is the goal." },
    ],
    items: [
      { type: "video", url: "https://youtu.be/fixLzaNyKAY?si=I1dAgDk8Waq1OIO4" },
      { type: "video", url: "https://www.youtube.com/watch?v=2RxDQwPmvtA" },
      {
        type: "site",
        url: "https://siddz.com/",
        label: "Siddharth Meena's Portfolio",
        description: "It just feels so right and good",
      },
      {
        type: "site",
        url: "https://sladetechnologies.com/systems/st-1",
        label: "Slade Technologies",
        description: "aboslute beaut of a website",
      },
      {
        type: "channel",
        url: "https://www.youtube.com/@mateoaaron",
        name: "Mateo Aaron",
        image:
          "https://yt3.googleusercontent.com/gKuiYQNZhPFMDNjcmLwRmLk-YZFcvqH_BZeYienwBqxAGhMsxIRkM6lStE97umCf2GDOFv1MBQ=s160-c-k-c0x00ffffff-no-rj",
      },
      {
        type: "channel",
        url: "https://www.youtube.com/@kurzgesagt",
        name: "Kurzgesagt – In a Nutshell",
        image:
          "https://yt3.googleusercontent.com/ytc/AIdro_n1Ribd7LwdP_qKtqWL3ZDfIgv9M1d6g78VwpHGXVR2Ir4=s160-c-k-c0x00ffffff-no-rj",
      },
      { type: "video", url: "https://www.youtube.com/watch?v=q1SWw7i9LQc" },
      { type: "video", url: "https://www.youtube.com/watch?v=XO5KrFb9yhM" },
      { type: "video", url: "https://www.youtube.com/watch?v=lDy9uzdIVK0" },
      { type: "video", url: "https://youtu.be/BLl3xREFEsY?si=F0txvmi2uXP4__rN" },
      { type: "video", url: "https://youtu.be/QYAnJ_QyCQg?si=mi_d5GFYbe6jcCMO" },
      { type: "video", url: "https://youtu.be/V_Z8XoPVDBg?si=fl-xco-czTTm6mRN" },
      { type: "video", url: "https://youtu.be/IqXpzcfdtn4?si=YqZq6pjCLwBEoDhU" },
      { type: "video", url: "https://youtu.be/5KVDDfAkRgc?si=oDN8X7iwObW_InUV" },
    ],
    aesthetics: [
      { label: "frutiger aero", tag: "2004–2013" },
      { label: "modern minimalist", tag: "evergreen" },
      { label: "ai startup", tag: "2025–2026" },
      { label: "windows 7", tag: "aero glass" },
      { label: "cinematic", tag: "stillness" },
      { label: "camcorder / grain / grunge", tag: "texture" },
    ],
    beliefs: [
      {
        text: "good design makes you feel something.",
        desc: "not just look good. when it's right, you feel it",
      },
      {
        text: "design with fluidity.",
        desc: "nothing should feel rigid or forced. elements breathe, transitions are natural, nothing snaps. it flows like wata",
      },
      {
        text: "design should flow.",
        desc: "the eye should FLOW through a layout.",
      },
      {
        text: "earn every pixel.",
        desc: "if you can remove something and nothing is lost, remove it. space is not emptiness.",
      },
    ],
    fonts: [
      { name: "Geist", family: "var(--font-geist-sans)", italic: false },
      {
        name: "SF Pro",
        family: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
        italic: false,
      },
      {
        name: "SF Rounded",
        family:
          "'SF Pro Rounded', 'SF Pro Text', -apple-system, system-ui, sans-serif",
        italic: false,
      },
      { name: "Apple Garamond", family: garamond, italic: false },
      { name: "Apple Garamond", family: garamond, italic: true },
    ],
  },
}
