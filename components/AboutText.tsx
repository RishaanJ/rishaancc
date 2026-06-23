import { Fragment } from "react"

export default function AboutText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <p className="font-[family-name:var(--font-geist-sans)] text-sm tracking-[-3%] mt-4 font-normal text-gray-700 dark:text-gray-300 leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span key={i} className="shimmer-text font-medium">
              {part.slice(2, -2)}
            </span>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </p>
  )
}
