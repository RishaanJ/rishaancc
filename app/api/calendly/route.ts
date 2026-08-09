import { NextRequest, NextResponse } from "next/server"
import { getAvailability, currentMonth } from "@/lib/calendly"

export const revalidate = 300

const MONTH = /^\d{4}-(0[1-9]|1[0-2])$/

export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("month")
  const month = requested && MONTH.test(requested) ? requested : currentMonth()

  const availability = await getAvailability(month)

  return NextResponse.json(availability, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  })
}
