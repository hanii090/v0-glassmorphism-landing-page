import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { Resend } from "resend"

const sql = neon(process.env.DATABASE_URL!)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Assignment completion email template
const completionEmailTemplate = (name: string, subject: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Assignment is Ready – Submitly</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #0f172a; color: #e2e8f0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #10b981, #3b82f6); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
    .header h1 { color: white; margin: 0; font-size: 28px; font-weight: bold; }
    .content { background-color: #1e293b; padding: 30px; border-radius: 0 0 12px 12px; }
    .success-box { background-color: #065f46; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; text-align: center; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
    .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🎓 Submitly</div>
      <h1>🎉 Assignment Completed!</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      
      <div class="success-box">
        <h2 style="margin: 0; color: #10b981;">✅ Your ${subject} assignment is now completed!</h2>
        <p style="margin: 10px 0 0 0;">Please check your inbox or contact us if you need revisions.</p>
      </div>

      <p>Your assignment has been completed by our expert team and is ready for download. The solution includes:</p>

      <ul style="color: #cbd5e1; line-height: 1.8;">
        <li>📄 <strong>Complete Solution:</strong> Professionally written and formatted</li>
        <li>🔍 <strong>Plagiarism Report:</strong> 100% original content verification</li>
        <li>📚 <strong>References:</strong> Properly cited sources and bibliography</li>
        <li>✨ <strong>Quality Assurance:</strong> Reviewed and proofread</li>
      </ul>

      <div style="text-align: center; margin: 30px 0;">
        <a href="mailto:support@submitly.com" class="cta-button">📧 Contact Support</a>
      </div>

      <p style="background-color: #1e40af; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
        <strong>💡 Need Revisions?</strong> We offer free revisions within 7 days. Just reply to this email with your feedback.
      </p>

      <p>Thank you for choosing Submitly for your academic needs!</p>

      <p>Best regards,<br><strong>The Submitly Team</strong></p>
    </div>
    <div class="footer">
      <p>© 2024 Submitly. All rights reserved.</p>
      <p>Need help? Reply to this email or contact support@submitly.com</p>
    </div>
  </div>
</body>
</html>
`

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "Missing submission ID" }, { status: 400 })
    }

    // Update submission status to completed
    const result = await sql`
      UPDATE submissions 
      SET status = 'completed', updated_at = NOW()
      WHERE id = ${id}
      RETURNING name, email, subject
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    const { name, email, subject } = result[0]

    // Send completion email to student
    if (resend) {
      try {
        await resend.emails.send({
          from: "Submitly <noreply@submitly.com>",
          to: [email],
          subject: "Your Assignment is Ready – Submitly",
          html: completionEmailTemplate(name, subject),
        })
        console.log(`✅ Completion email sent to ${email}`)
      } catch (emailError) {
        console.error("❌ Error sending completion email:", emailError)
        return NextResponse.json(
          {
            error: "Assignment marked as completed but failed to send email notification",
          },
          { status: 500 },
        )
      }
    } else {
      console.warn("⚠️ Resend API key not configured - skipping completion email")
    }

    return NextResponse.json({
      success: true,
      message: "Assignment marked as completed and student notified via email",
      submission: result[0],
    })
  } catch (error) {
    console.error("Error completing assignment:", error)
    return NextResponse.json(
      {
        error: "Failed to complete assignment",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
