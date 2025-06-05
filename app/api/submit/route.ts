import { NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // Parse form data
    const formData = await request.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const title = formData.get("title") as string
    const subject = formData.get("subject") as string
    const description = formData.get("description") as string
    const deadline = formData.get("deadline") as string
    const category = formData.get("category") as string

    // Get files
    const file = formData.get("file") as File
    const paymentProof = formData.get("paymentProof") as File

    // Generate a unique submission ID
    const submissionId = `SUB-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`

    // Store submission in database (simulated here)
    // In a real implementation, you would store this in your database
    console.log("Submission received:", {
      submissionId,
      name,
      email,
      title,
      subject,
      description,
      deadline,
      category,
      fileSize: file ? file.size : 0,
      paymentProofSize: paymentProof ? paymentProof.size : 0,
    })

    // Send confirmation email
    await sendConfirmationEmail({
      to: email,
      name,
      submissionId,
      title,
      subject,
      deadline: new Date(deadline).toLocaleString(),
      category,
    })

    // Send notification to admin
    await sendAdminNotification({
      submissionId,
      name,
      email,
      title,
      subject,
      deadline: new Date(deadline).toLocaleString(),
    })

    return NextResponse.json({
      success: true,
      message: "Submission received successfully",
      submissionId,
    })
  } catch (error) {
    console.error("Error processing submission:", error)
    return NextResponse.json({ success: false, message: "Failed to process submission" }, { status: 500 })
  }
}

// Function to send confirmation email to user
async function sendConfirmationEmail({
  to,
  name,
  submissionId,
  title,
  subject,
  deadline,
  category,
}: {
  to: string
  name: string
  submissionId: string
  title: string
  subject: string
  deadline: string
  category: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Submitly <notifications@submitly.com>",
      to: [to],
      subject: `Assignment Submission Confirmation - ${submissionId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background: linear-gradient(to right, #f97316, #facc15); padding: 2px; border-radius: 8px;">
            <div style="background-color: #1e293b; padding: 20px; border-radius: 6px;">
              <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #f97316; margin: 0;">Submitly</h1>
                <p style="color: #94a3b8; margin-top: 5px;">Assignment Submission Confirmation</p>
              </div>
              
              <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #fff; margin-top: 0;">Hello ${name},</h2>
                <p style="color: #cbd5e1; line-height: 1.5;">
                  Thank you for submitting your assignment. We've received your request and are processing it.
                </p>
                <p style="color: #cbd5e1; line-height: 1.5;">
                  You will receive email updates as your assignment progresses through our system.
                </p>
              </div>
              
              <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #f97316; margin-top: 0;">Assignment Details</h3>
                <table style="width: 100%; color: #cbd5e1; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;"><strong>Submission ID:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;">${submissionId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;"><strong>Title:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;">${title}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;"><strong>Subject:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;">${subject}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;"><strong>Category:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;">${category}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;"><strong>Deadline:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;">${deadline}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;"><strong>Status:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;">
                      <span style="background-color: #854d0e; color: #fef08a; padding: 3px 8px; border-radius: 12px; font-size: 12px;">Pending</span>
                    </td>
                  </tr>
                </table>
              </div>
              
              <div style="background-color: #0f172a; padding: 20px; border-radius: 8px;">
                <h3 style="color: #f97316; margin-top: 0;">What's Next?</h3>
                <ol style="color: #cbd5e1; padding-left: 20px; line-height: 1.6;">
                  <li>Our team will verify your payment (usually within 30 minutes)</li>
                  <li>Once verified, we'll assign an expert to your assignment</li>
                  <li>You'll receive an email when work begins</li>
                  <li>You'll get progress updates throughout the process</li>
                  <li>The completed assignment will be delivered before your deadline</li>
                </ol>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #334155;">
                <p style="color: #94a3b8; font-size: 14px;">
                  If you have any questions, please contact our support team at
                  <a href="mailto:support@submitly.com" style="color: #f97316; text-decoration: none;"> support@submitly.com</a>
                </p>
                <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
                  © 2024 Submitly. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Error sending confirmation email:", error)
    }

    return { success: !error }
  } catch (error) {
    console.error("Failed to send confirmation email:", error)
    return { success: false }
  }
}

// Function to send notification to admin
async function sendAdminNotification({
  submissionId,
  name,
  email,
  title,
  subject,
  deadline,
}: {
  submissionId: string
  name: string
  email: string
  title: string
  subject: string
  deadline: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Submitly System <notifications@submitly.com>",
      to: ["admin@submitly.com"],
      subject: `New Assignment Submission - ${submissionId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background: linear-gradient(to right, #3b82f6, #8b5cf6); padding: 2px; border-radius: 8px;">
            <div style="background-color: #1e293b; padding: 20px; border-radius: 6px;">
              <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #3b82f6; margin: 0;">Submitly Admin</h1>
                <p style="color: #94a3b8; margin-top: 5px;">New Assignment Submission</p>
              </div>
              
              <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #fff; margin-top: 0;">New Submission Alert</h2>
                <p style="color: #cbd5e1; line-height: 1.5;">
                  A new assignment has been submitted and requires verification.
                </p>
              </div>
              
              <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #3b82f6; margin-top: 0;">Submission Details</h3>
                <table style="width: 100%; color: #cbd5e1; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;"><strong>Submission ID:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;">${submissionId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;"><strong>Student Name:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;"><strong>Title:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;">${title}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;"><strong>Subject:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;">${subject}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;"><strong>Deadline:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #334155;">${deadline}</td>
                  </tr>
                </table>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://admin.submitly.com/submissions/${submissionId}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                  View Submission Details
                </a>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #334155;">
                <p style="color: #64748b; font-size: 12px;">
                  © 2024 Submitly. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Error sending admin notification:", error)
    }

    return { success: !error }
  } catch (error) {
    console.error("Failed to send admin notification:", error)
    return { success: false }
  }
}
