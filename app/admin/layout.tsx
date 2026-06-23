import type { ReactNode } from "react"

export const metadata = {
  title: "admin",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-[family-name:var(--font-geist-sans)]">
      {children}
    </div>
  )
}
