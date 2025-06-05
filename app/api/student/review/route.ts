import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { submission_id, rating, comment, user_email } = await request.json()

    // Verify the submission belongs to the user
    const submission = await sql`
      SELECT * FROM submissions 
      WHERE id = ${submission_id} AND user_email = ${user_email}
    `

    if (submission.length === 0) {
      return NextResponse.json({ error: "Submission not found or unauthorized" }, { status: 404 })
    }

    // Insert review
    await sql`
      INSERT INTO reviews (submission_id, rating, comment, user_id, created_at)
      VALUES (${submission_id}, ${rating}, ${comment}, ${user_email}, NOW())
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error submitting review:", error)
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }
}
