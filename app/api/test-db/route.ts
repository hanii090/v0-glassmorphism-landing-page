import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // Test database connection
    const result = await sql`SELECT NOW() as current_time`

    // Check if submissions table exists
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'submissions'
      )
    `

    return NextResponse.json({
      success: true,
      connection: "Database connected successfully",
      currentTime: result[0].current_time,
      tableExists: tableCheck[0].exists,
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        error: "Database connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
