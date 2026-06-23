import { getAllSections } from "@/lib/content/store"
import AdminClient from "./AdminClient"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const content = await getAllSections()
  return <AdminClient initial={content} />
}
