import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const submissionId = params.id
    const { status, email, name, title, subject } = await request.json()

    if (!submissionId || !status || !email || !name) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Update submission status in database (simulated here)
    // In a real implementation, you would update this in your database
    console.log(`Updating submission ${submissionId} status to ${status}`)

    // Send status update email to user
    await sendStatusUpdateEmail({
      to: email,
      name,
      submissionId,
      title,
      subject,
      status,
    })

    return NextResponse.json({
      success: true,
      message: `Submission status updated to ${status}`,
    })
  } catch (error) {
    console.error("Error updating submission status:", error)
    return NextResponse.json({ success: false, message: "Failed to update submission status" }, { status: 500 })
  }
}

// Function to send status update email to user
async function sendStatusUpdateEmail({
  to,
  name,
  submissionId,
  title,
  subject,
  status,
}: {
  to: string
  name: string
  submissionId: string
  title: string
  subject: string
  status: string
}) {
  // Define status-specific content
  const statusContent = {
    processing: {
      color: "#3b82f6",
      bgColor: "#1e40af",
      lightColor: "#93c5fd",
      title: "Your Assignment is Now Being Processed",
      message: "Great news! Our team has started working on your assignment. An expert has been assigned and is now actively working on your submission.",
      nextSteps: [
        "Our expert is researching and working on your assignment",\
        "You
