import { getSection } from "@/lib/content/store"
import DesignClient from "./DesignClient"

export const revalidate = 30

export default async function DesignPage() {
  const design = await getSection("design")
  return <DesignClient content={design} />
}
