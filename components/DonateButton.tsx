import { ArrowRightIcon } from "@radix-ui/react-icons"

export default function DonateButton() {
  return (
    <a
      href="https://ko-fi.com/rishaanjain"
      target="_blank"
      rel="noopener noreferrer"
      className="font-[family-name:var(--font-geist-sans)] text-xs font-medium bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full hover:opacity-80 transition-opacity shrink-0 flex items-center gap-1"
    >
      give money <ArrowRightIcon className="w-3 h-3" />
    </a>
  )
}
