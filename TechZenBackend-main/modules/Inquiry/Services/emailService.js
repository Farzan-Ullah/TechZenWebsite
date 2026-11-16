import nodemailer from "nodemailer";

/**
 * Configure Nodemailer transport using environment variables.
 * Supports SMTP (Host, Port, User, Pass) or Gmail Service (EMAIL_USER, EMAIL_PASS / App Password).
 */
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const service = process.env.SMTP_SERVICE; // optional, e.g. "gmail"

  if (!user || !pass) {
    return null;
  }

  if (service) {
    return nodemailer.createTransport({
      service,
      auth: { user, pass }
    });
  }

  if (host) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });
  }

  // Fallback to Gmail if user looks like gmail address
  if (user.includes("@gmail.com")) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass }
    });
  }

  return null;
}

/**
 * Send an email notification for a new Software Development Outsourcing Partnership Enquiry.
 */
export async function sendOutsourcingNotification(inquiry) {
  const recipient = process.env.NOTIFICATION_EMAIL || "techzen432@gmail.com";
  const transporter = createTransporter();

  if (!transporter) {
    console.info(
      "[TechZen Notification] SMTP credentials not fully configured in environment variables (SMTP_HOST/SMTP_USER/SMTP_PASS or EMAIL_USER/EMAIL_PASS). Enquiry safely stored in MongoDB."
    );
    return {
      sent: false,
      reason: "SMTP_NOT_CONFIGURED"
    };
  }

  const sender = process.env.SMTP_FROM || process.env.SMTP_USER || process.env.EMAIL_USER;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b1120; color: #f8fafc; padding: 24px; margin: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #0ea5e9, #3b82f6, #6366f1); padding: 24px; text-align: center; }
          .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
          .header p { margin: 6px 0 0; color: rgba(255,255,255,0.9); font-size: 13px; }
          .content { padding: 24px; }
          .field-row { margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid #1e293b; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; font-weight: 600; margin-bottom: 4px; }
          .value { font-size: 14px; color: #f1f5f9; line-height: 1.5; font-weight: 500; }
          .tag { display: inline-block; background: rgba(14, 165, 233, 0.15); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.3); padding: 3px 8px; border-radius: 6px; font-size: 12px; margin-right: 4px; margin-bottom: 4px; }
          .message-box { background: #1e293b; border-left: 3px solid #38bdf8; padding: 14px; border-radius: 8px; margin-top: 8px; font-size: 13.5px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; }
          .footer { background: #070d19; padding: 16px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #1e293b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>TechZen Technology Outsourcing</h1>
            <p>New Partnership Enquiry Received</p>
          </div>
          <div class="content">
            <div class="field-row">
              <div class="label">Primary Contact</div>
              <div class="value"><strong>${inquiry.name}</strong> (<a href="mailto:${inquiry.email}" style="color: #38bdf8;">${inquiry.email}</a>)</div>
            </div>

            <div class="field-row">
              <div class="label">Company & Country</div>
              <div class="value">${inquiry.company} &bull; ${inquiry.country || "Not specified"} ${inquiry.website ? `(<a href="${inquiry.website}" target="_blank" style="color: #38bdf8;">${inquiry.website}</a>)` : ""}</div>
            </div>

            <div class="field-row">
              <div class="label">Phone / WhatsApp</div>
              <div class="value">${inquiry.phone || "Not provided"}</div>
            </div>

            <div class="field-row">
              <div class="label">Partnership Type</div>
              <div class="value"><span class="tag">${inquiry.partnershipType || "Project Outsourcing"}</span></div>
            </div>

            <div class="field-row">
              <div class="label">Required Services</div>
              <div class="value">
                ${(inquiry.requiredServices && inquiry.requiredServices.length > 0)
                  ? inquiry.requiredServices.map(s => `<span class="tag">${s}</span>`).join(" ")
                  : "General Technology Outsourcing"}
              </div>
            </div>

            <div class="field-row">
              <div class="label">Estimated Budget & Preferred Engagement</div>
              <div class="value">Budget: <strong>${inquiry.budget || "Not Decided"}</strong> &bull; Model: <strong>${inquiry.preferredEngagement || "Not Decided"}</strong></div>
            </div>

            <div class="field-row" style="border-bottom: none;">
              <div class="label">Project or Requirement Description</div>
              <div class="message-box">${inquiry.message}</div>
            </div>
          </div>
          <div class="footer">
            Submitted via TechZen Software Development Outsourcing Landing Page &bull; ${new Date().toUTCString()}
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const result = await transporter.sendMail({
      from: `"TechZen Inquiries" <${sender}>`,
      to: recipient,
      replyTo: inquiry.email,
      subject: `🚀 [Partnership Enquiry] ${inquiry.company} (${inquiry.country}) - ${inquiry.partnershipType}`,
      text: `New Outsourcing Enquiry from ${inquiry.name} (${inquiry.company}, ${inquiry.country}):\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone}\nType: ${inquiry.partnershipType}\nBudget: ${inquiry.budget}\nServices: ${(inquiry.requiredServices || []).join(", ")}\n\nProject Description:\n${inquiry.message}`,
      html: htmlContent
    });

    console.info("✅ [TechZen Notification] Outsourcing enquiry email sent successfully to", recipient);
    return { sent: true, messageId: result.messageId };
  } catch (err) {
    console.error("❌ [TechZen Notification] Failed to send email notification:", err.message);
    return { sent: false, error: err.message };
  }
}
