import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Contact form email template for admin
const contactFormAdminTemplate = (name: string, email: string, subject: string, message: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; color: #334155; }
    .container { max-width: 700px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3b82f6, #f97316); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
    .header h1 { color: white; margin: 0; font-size: 28px; font-weight: bold; }
    .content { background-color: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
    .info-item { background-color: #f1f5f9; padding: 15px; border-radius: 8px; }
    .info-label { font-weight: bold; color: #475569; margin-bottom: 5px; }
    .info-value { color: #1e293b; word-break: break-word; }
    .message-box { background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0; }
    .priority { background-color: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 New Contact Form Submission</h1>
    </div>
    <div class="content">
      <h2>Contact Details</h2>
      
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Name</div>
          <div class="info-value">${name}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Email</div>
          <div class="info-value">${email}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Subject</div>
          <div class="info-value">${subject}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Submitted</div>
          <div class="info-value">${new Date().toLocaleString()}</div>
        </div>
      </div>

      <div class="message-box">
        <div class="info-label">Message</div>
        <div class="info-value" style="white-space: pre-wrap; line-height: 1.6;">${message}</div>
      </div>

      <div class="priority">
        <strong>📞 Action Required:</strong> Please respond to this inquiry within 24 hours for optimal customer service.
      </div>

      <p><strong>Reply Instructions:</strong></p>
      <ul>
        <li>Reply directly to this email to respond to the customer</li>
        <li>Use the customer's email: <strong>${email}</strong></li>
        <li>Reference their inquiry subject: <strong>${subject}</strong></li>
      </ul>
    </div>
    <div class="footer">
      <p>© 2024 Submitly Contact System</p>
      <p>This message was sent via the Submitly contact form</p>
    </div>
  </div>
</body>
</html>
`

// Auto-reply email template for customer
const contactFormAutoReplyTemplate = (name: string, subject: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Submitly</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #0f172a; color: #e2e8f0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3b82f6, #f97316); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
    .header h1 { color: white; margin: 0; font-size: 28px; font-weight: bold; }
    .content { background-color: #1e293b; padding: 30px; border-radius: 0 0 12px 12px; }
    .highlight { background-color: #334155; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #f97316, #eab308); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 15px 0; }
    .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
    .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🎓 Submitly</div>
      <h1>Thank You for Contacting Us!</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>Thank you for reaching out to Submitly! We've received your message and our team will get back to you as soon as possible.</p>
      
      <div class="highlight">
        <h3 style="margin-top: 0; color: #3b82f6;">📋 Your Inquiry</h3>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Response Time:</strong> Within 24 hours</p>
      </div>

      <h3>What happens next?</h3>
      <ul style="color: #cbd5e1; line-height: 1.6;">
        <li>📧 Our support team reviews your message</li>
        <li>🔍 We research the best solution for your inquiry</li>
        <li>📞 You'll receive a personalized response within 24 hours</li>
        <li>✅ We'll follow up to ensure your issue is resolved</li>
      </ul>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://submitly.study/submit" class="cta-button">Submit an Assignment</a>
      </div>

      <p style="background-color: #065f46; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
        <strong>💡 Need Immediate Help?</strong> For urgent assignment submissions, please use our main submission form or reply to this email with "URGENT" in the subject line.
      </p>

      <p>Best regards,<br><strong>The Submitly Support Team</strong></p>
    </div>
    <div class="footer">
      <p>© 2024 Submitly. All rights reserved.</p>
      <p>This is an automated confirmation email.</p>
    </div>
  </div>
</body>
</html>
`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters long" }, { status: 400 })
    }

    if (!resend) {
      console.warn("⚠️ Resend API key not configured - contact form submission logged but not emailed")
      return NextResponse.json({
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
      })
    }

    // Send notification email to admin
    try {
      await resend.emails.send({
        from: "Submitly Contact <contact@submitly.com>",
        to: ["admin@submitly.com"],
        replyTo: email,
        subject: `📧 Contact Form: ${subject} - ${name}`,
        html: contactFormAdminTemplate(name, email, subject, message),
      })
      console.log("✅ Contact form notification sent to admin")
    } catch (emailError) {
      console.error("❌ Error sending admin notification:", emailError)
    }

    // Send auto-reply confirmation to customer
    try {
      await resend.emails.send({
        from: "Submitly Support <support@submitly.com>",
        to: [email],
        subject: "Thank You for Contacting Submitly - We'll Respond Soon!",
        html: contactFormAutoReplyTemplate(name, subject),
      })
      console.log("✅ Auto-reply confirmation sent to customer")
    } catch (emailError) {
      console.error("❌ Error sending customer auto-reply:", emailError)
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours.",
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      {
        error: "Failed to send message. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
