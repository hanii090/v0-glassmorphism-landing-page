import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { Resend } from "resend"

const sql = neon(process.env.DATABASE_URL!)
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const title = formData.get("title") as string
    const subject = formData.get("subject") as string
    const description = formData.get("description") as string
    const deadline = formData.get("deadline") as string
    const category = formData.get("category") as string
    const file = formData.get("file") as File
    const paymentProof = formData.get("paymentProof") as File

    // Validate required fields
    if (!name || !email || !title || !subject || !description || !deadline || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Insert submission into database
    const result = await sql`
      INSERT INTO submissions (
        title, subject, description, deadline, status, 
        user_email, user_name, user_phone, category, created_at
      ) VALUES (
        ${title}, ${subject}, ${description}, ${deadline}, 'pending',
        ${email}, ${name}, ${phone}, ${category}, NOW()
      ) RETURNING id
    `

    const submissionId = result[0].id

    // Send confirmation email to student
    await resend.emails.send({
      from: "Submitly <noreply@submitly.com>",
      to: [email],
      subject: "Assignment Submission Confirmed - Submitly",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Submission Confirmed!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your assignment has been received</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Hi ${name},</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Thank you for submitting your assignment! We've received your submission and our team is reviewing it now.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Assignment Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Submission ID:</td>
                  <td style="padding: 8px 0; color: #333;">#${submissionId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Title:</td>
                  <td style="padding: 8px 0; color: #333;">${title}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Subject:</td>
                  <td style="padding: 8px 0; color: #333;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Category:</td>
                  <td style="padding: 8px 0; color: #333;">${category}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Deadline:</td>
                  <td style="padding: 8px 0; color: #333;">${new Date(deadline).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Status:</td>
                  <td style="padding: 8px 0;">
                    <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                      PENDING REVIEW
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            
            <div style="background: #e0f2fe; border-left: 4px solid #0288d1; padding: 15px; margin: 20px 0;">
              <h4 style="color: #0277bd; margin: 0 0 10px 0;">What happens next?</h4>
              <ul style="color: #0277bd; margin: 0; padding-left: 20px;">
                <li>Our team will verify your payment within 30 minutes</li>
                <li>Once verified, work will begin immediately</li>
                <li>You'll receive email updates as your assignment progresses</li>
                <li>Completed work will be delivered before your deadline</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://submitly.com/student/dashboard" 
                 style="background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Track Your Assignment
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              If you have any questions, feel free to reply to this email or contact our support team.
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              Best regards,<br>
              The Submitly Team
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
            <p>© 2024 Submitly. All rights reserved.</p>
            <p>This email was sent to ${email}</p>
          </div>
        </div>
      `,
    })

    // Send notification email to admin
    await resend.emails.send({
      from: "Submitly <noreply@submitly.com>",
      to: ["admin@submitly.com"],
      subject: `New Assignment Submission - ${title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">New Assignment Submission</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Submission Details:</h3>
            <p><strong>ID:</strong> #${submissionId}</p>
            <p><strong>Student:</strong> ${name} (${email})</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Deadline:</strong> ${new Date(deadline).toLocaleDateString()}</p>
            <p><strong>Description:</strong> ${description}</p>
          </div>
          
          <p>Please review and process this submission in the admin dashboard.</p>
          
          <a href="https://submitly.com/admin/dashboard" 
             style="background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            View in Admin Dashboard
          </a>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      submissionId,
      message: "Assignment submitted successfully! Check your email for confirmation.",
    })
  } catch (error) {
    console.error("Submission error:", error)
    return NextResponse.json({ error: "Failed to submit assignment" }, { status: 500 })
  }
}
