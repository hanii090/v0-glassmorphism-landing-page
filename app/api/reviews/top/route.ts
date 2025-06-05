import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    // Get top 3 reviews (5-star ratings with reviews)
    const topReviews = await sql`
      SELECT 
        r.student_name,
        r.rating,
        r.review,
        r.created_at,
        s.subject
      FROM reviews r
      JOIN submissions s ON r.submission_id = s.id
      WHERE r.rating = 5 AND r.review IS NOT NULL AND r.review != ''
      ORDER BY r.created_at DESC
      LIMIT 3
    `

    return NextResponse.json(topReviews)
  } catch (error) {
    console.error("Error fetching top reviews:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch reviews",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
