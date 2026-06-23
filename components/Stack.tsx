import { defaultContent } from "@/lib/content/defaults"
import type { StackCategory } from "@/lib/content/types"

export default function Stack({ stack = defaultContent.stack }: { stack?: StackCategory[] }) {
  return (
    <div className="flex flex-col gap-4">
      {stack.map(({ category, items }) => (
        <div key={category} className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-6">
          <span className="font-[family-name:var(--font-geist-sans)] text-xs text-gray-400 dark:text-gray-600 w-16 shrink-0 sm:pt-[7px]">
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
