import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { Resend } from "resend"

const sql = neon(process.env.DATABASE_URL!)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Email update template
const emailUpdateTemplate = (name: string, subject: string, status: string, notes?: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Assignment Update - Submitly</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #0f172a; color: #e2e8f0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3b82f6, #f97316); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
    .header h1 { color: white; margin: 0; font-size: 28px; font-weight: bold; }
    .content { background-color: #1e293b; padding: 30px; border-radius: 0 0 12px 12px; }
    .status-box { background-color: #334155; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
    .notes-box { background-color: #0f172a; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #f97316, #eab308); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 15px 0; }
    .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
    .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🎓 Submitly</div>
      <h1>📋 Assignment Update</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>We have an update regarding your ${subject} assignment submission.</p>
      
      <div class="status-box">
        <h3 style="margin-top: 0; color: #3b82f6;">📊 Current Status</h3>
        <p style="font-size: 18px; font-weight: bold; margin: 0;">
          ${status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
        </p>
      </div>

      ${
        notes
          ? `
      <div class="notes-box">
        <h3 style="margin-top: 0; color: #f97316;">💬 Additional Notes</h3>
        <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${notes}</p>
      </div>
      `
          : ""
      }

      <h3>What's Next?</h3>
      <ul style="color: #cbd5e1; line-height: 1.8;">
        ${
          status === "pending"
            ? `
        <li>📋 Your assignment is in our review queue</li>
        <li>👨‍💻 Our experts will begin working on it soon</li>
        <li>📧 You'll receive updates as we progress</li>
        `
            : status === "in-progress"
              ? `
        <li>🔄 Our experts are actively working on your assignment</li>
        <li>📝 Quality checks are being performed</li>
        <li>✅ You'll be notified once it's completed</li>
        `
              : `
        <li>🎉 Your assignment has been completed</li>
        <li>📧 Check your email for the completed work</li>
        <li>🔄 Free revisions available if needed</li>
        `
        }
      </ul>

      <div style="text-align: center; margin: 30px 0;">
        <a href="mailto:support@submitly.com" class="cta-button">📧 Contact Support</a>
      </div>

      <p style="background-color: #1e40af; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
        <strong>💡 Questions?</strong> Feel free to reply to this email or contact our support team anytime.
      </p>

      <p>Thank you for choosing Submitly!</p>

      <p>Best regards,<br><strong>The Submitly Team</strong></p>
    </div>
    <div class="footer">
      <p>© 2024 Submitly. All rights reserved.</p>
      <p>This is an automated update from your assignment dashboard.</p>
    </div>
  </div>
</body>
</html>
`

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()
    const { type, notes } = body

    if (!id) {
      return NextResponse.json({ error: "Missing submission ID" }, { status: 400 })
    }

    // Get submission details
    const result = await sql`
      SELECT name, email, subject, status
      FROM submissions 
      WHERE id = ${id}
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    const { name, email, subject, status } = result[0]

    // Send email update
    if (resend) {
      try {
        await resend.emails.send({
          from: "Submitly Updates <updates@submitly.com>",
          to: [email],
          subject: `Assignment Update: ${subject} - ${status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}`,
          html: emailUpdateTemplate(name, subject, status, notes),
        })
        console.log(`✅ Email update sent to ${email}`)
      } catch (emailError) {
        console.error("❌ Error sending email update:", emailError)
        return NextResponse.json(
          {
            error: "Failed to send email update",
          },
          { status: 500 },
        )
      }
    } else {
      console.warn("⚠️ Resend API key not configured - skipping email update")
      return NextResponse.json(
        {
          error: "Email service not configured",
        },
        { status: 500 },
      )
    }

    // Update admin notes if provided
    if (notes) {
      await sql`
        UPDATE submissions 
        SET admin_notes = ${notes}, updated_at = NOW()
        WHERE id = ${id}
      `
    }

    return NextResponse.json({
      success: true,
      message: "Email update sent successfully",
    })
  } catch (error) {
    console.error("Error sending email update:", error)
    return NextResponse.json(
      {
        error: "Failed to send email update",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
