import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { Resend } from "resend"

const sql = neon(process.env.DATABASE_URL!)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Status update email template
const statusUpdateTemplate = (name: string, subject: string, status: string, submissionId: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Assignment Status Update - Submitly</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #0f172a; color: #e2e8f0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3b82f6, #f97316); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
    .header h1 { color: white; margin: 0; font-size: 28px; font-weight: bold; }
    .content { background-color: #1e293b; padding: 30px; border-radius: 0 0 12px 12px; }
    .status-box { background-color: #334155; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; text-align: center; }
    .status-icon { font-size: 48px; margin-bottom: 10px; }
    .status-text { font-size: 24px; font-weight: bold; margin: 0; }
    .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
    .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🎓 Submitly</div>
      <h1>Status Update</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>Your assignment status has been updated!</p>
      
      <div class="status-box">
        <div class="status-icon">
          ${status === "delivered" ? "✅" : status === "processing" ? "🔄" : status === "rejected" ? "❌" : "⏳"}
        </div>
        <p class="status-text">${status.charAt(0).toUpperCase() + status.slice(1)}</p>
      </div>

      <p><strong>Assignment:</strong> ${subject}</p>
      <p><strong>Submission ID:</strong> ${submissionId}</p>

      ${
        status === "delivered"
          ? `
      <p style="background-color: #065f46; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
        <strong>🎉 Great news!</strong> Your assignment has been completed and is ready for download. 
        Please log in to your student dashboard to access your completed work.
      </p>
      `
          : status === "processing"
            ? `
      <p style="background-color: #1e40af; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
        <strong>🔄 In Progress:</strong> Our experts are actively working on your assignment. 
        You'll be notified once it's completed.
      </p>
      `
            : status === "rejected"
              ? `
      <p style="background-color: #991b1b; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626;">
        <strong>❌ Assignment Rejected:</strong> Please contact our support team for more information 
        about your submission.
      </p>
      `
              : `
      <p style="background-color: #a16207; padding: 15px; border-radius: 8px; border-left: 4px solid #eab308;">
        <strong>⏳ Pending Review:</strong> Your assignment is in our review queue and will be 
        processed shortly.
      </p>
      `
      }

      <p>Thank you for choosing Submitly!</p>
      <p>Best regards,<br><strong>The Submitly Team</strong></p>
    </div>
    <div class="footer">
      <p>© 2024 Submitly. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { status } = await request.json()

    if (!status || !id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const validStatuses = ["pending", "processing", "delivered", "rejected"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    // Update submission status
    const result = await sql`
      UPDATE submissions 
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING name, email, subject
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    const { name, email, subject } = result[0]

    // Send status update email
    if (resend) {
      try {
        await resend.emails.send({
          from: "Submitly Updates <updates@submitly.com>",
          to: [email],
          subject: `Assignment ${status.charAt(0).toUpperCase() + status.slice(1)} - ${subject}`,
          html: statusUpdateTemplate(name, subject, status, id),
        })
        console.log(`✅ Status update email sent to ${email}`)
      } catch (emailError) {
        console.error("❌ Error sending status update email:", emailError)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Status updated successfully",
    })
  } catch (error) {
    console.error("Error updating status:", error)
    return NextResponse.json(
      {
        error: "Failed to update status",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
