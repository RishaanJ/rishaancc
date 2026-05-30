const stack = [
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
]

export default function Stack() {
  return (
    <div className="flex flex-col gap-4">
      {stack.map(({ category, items }) => (
        <div key={category} className="flex items-start gap-6">
          <span className="font-[family-name:var(--font-geist-sans)] text-xs text-gray-400 dark:text-gray-600 w-16 shrink-0 pt-[7px]">
            {category}
          </span>
          <div className="flex flex-wrap gap-2">
            {items.map(({ name, slug, color }) => (
              <div
                key={name}
                className="group flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-1.5 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:scale-[1.06] cursor-default"
              >
                <img
                  src={`https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`}
                  alt={name}
                  width={14}
                  height={14}
                  className="grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 dark:invert-[0.15]"
                />
                <span className="font-[family-name:var(--font-geist-sans)] text-xs text-gray-400 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
