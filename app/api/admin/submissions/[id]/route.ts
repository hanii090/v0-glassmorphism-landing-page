import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { Resend } from "resend"

const sql = neon(process.env.DATABASE_URL!)
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()
    const submissionId = params.id

    // Update submission status
    const result = await sql`
      UPDATE submissions 
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${submissionId}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    const submission = result[0]

    // Send status update email to student
    const statusMessages = {
      pending: {
        subject: "Assignment Under Review",
        title: "Your Assignment is Being Reviewed",
        message:
          "Our team is currently reviewing your assignment submission and payment. You will receive an update once the review is complete.",
        color: "#fbbf24",
        bgColor: "#fef3c7",
      },
      processing: {
        subject: "Assignment Work Started",
        title: "Work Has Begun on Your Assignment",
        message:
          "Great news! Our expert team has started working on your assignment. You can expect regular updates as we progress.",
        color: "#3b82f6",
        bgColor: "#dbeafe",
      },
      delivered: {
        subject: "Assignment Completed and Delivered",
        title: "Your Assignment is Ready!",
        message:
          "Excellent! Your assignment has been completed and is ready for download. Please check your student dashboard to access your files.",
        color: "#10b981",
        bgColor: "#d1fae5",
      },
      rejected: {
        subject: "Assignment Submission Issue",
        title: "Action Required for Your Submission",
        message:
          "There was an issue with your submission that needs to be addressed. Please contact our support team for assistance.",
        color: "#ef4444",
        bgColor: "#fee2e2",
      },
    }

    const statusInfo = statusMessages[status as keyof typeof statusMessages]

    if (statusInfo) {
      await resend.emails.send({
        from: "Submitly <noreply@submitly.com>",
        to: [submission.user_email],
        subject: `${statusInfo.subject} - Submitly`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">${statusInfo.title}</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Assignment #${submissionId}</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-top: 0;">Hi ${submission.user_name},</h2>
              
              <div style="background: ${statusInfo.bgColor}; border-left: 4px solid ${statusInfo.color}; padding: 15px; margin: 20px 0;">
                <p style="color: ${statusInfo.color}; margin: 0; font-weight: bold;">
                  Status Update: ${status.toUpperCase()}
                </p>
              </div>
              
              <p style="color: #666; line-height: 1.6;">
                ${statusInfo.message}
              </p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Assignment Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Title:</td>
                    <td style="padding: 8px 0; color: #333;">${submission.title}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Subject:</td>
                    <td style="padding: 8px 0; color: #333;">${submission.subject}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Deadline:</td>
                    <td style="padding: 8px 0; color: #333;">${new Date(submission.deadline).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Updated:</td>
                    <td style="padding: 8px 0; color: #333;">${new Date().toLocaleDateString()}</td>
                  </tr>
                </table>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://submitly.com/student/dashboard" 
                   style="background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  View Dashboard
                </a>
              </div>
              
              <p style="color: #666; line-height: 1.6;">
                If you have any questions about this update, feel free to reply to this email.
              </p>
              
              <p style="color: #666; line-height: 1.6;">
                Best regards,<br>
                The Submitly Team
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
              <p>© 2024 Submitly. All rights reserved.</p>
            </div>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true, submission })
  } catch (error) {
    console.error("Status update error:", error)
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 })
  }
}
