import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { doorsData } from "@/lib/doors-data";

export async function POST(request) {
  try {
    const body = await request.json();
    const { door, name, email, message, extra } = body;

    // Basic validation
    if (!door || !name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const doorConfig = doorsData[door];
    if (!doorConfig) {
      return NextResponse.json(
        { error: "Invalid form." },
        { status: 400 }
      );
    }

    // Very light email sanity check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const extraLine = doorConfig.extraField && extra
      ? `${doorConfig.extraField.label}: ${extra}\n`
      : "";

    const extraRowHtml =
      doorConfig.extraField && extra
        ? `
          <tr>
            <td style="padding: 14px 0; border-bottom: 1px solid #f0e9dd;">
              <p style="margin: 0 0 4px; font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase; color: #d9186a; font-weight: 700;">${doorConfig.extraField.label}</p>
              <p style="margin: 0; font-family: Arial, sans-serif; font-size: 15px; color: #191919;">${extra}</p>
            </td>
          </tr>`
        : "";

    const emailHtml = `
      <div style="background-color: #f4f0e8; padding: 32px 16px; font-family: Arial, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; margin: 0 auto; background-color: #fffbf2; border-radius: 12px; overflow: hidden; border: 1px solid #f0e9dd;">

          <tr>
            <td style="background-color: #191919; padding: 24px 32px;">
              <p style="margin: 0; font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #ff96d8; font-weight: 700;">${doorConfig.eyebrow}</p>
              <h1 style="margin: 6px 0 0; font-family: Georgia, 'Times New Roman', serif; font-weight: 400; font-size: 22px; color: #fffbf2;">New inquiry from ${name}</h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 28px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 0 0 14px; border-bottom: 1px solid #f0e9dd;">
                    <p style="margin: 0 0 4px; font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase; color: #d9186a; font-weight: 700;">Name</p>
                    <p style="margin: 0; font-family: Arial, sans-serif; font-size: 15px; color: #191919;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f0e9dd;">
                    <p style="margin: 0 0 4px; font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase; color: #d9186a; font-weight: 700;">Email</p>
                    <p style="margin: 0; font-family: Arial, sans-serif; font-size: 15px;"><a href="mailto:${email}" style="color: #191919; text-decoration: none;">${email}</a></p>
                  </td>
                </tr>
                ${extraRowHtml}
                <tr>
                  <td style="padding: 14px 0 0;">
                    <p style="margin: 0 0 6px; font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase; color: #d9186a; font-weight: 700;">Message</p>
                    <p style="margin: 0; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #191919; white-space: pre-line;">${String(message).replace(/</g, "&lt;")}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 20px 32px 28px;">
              <a href="mailto:${email}" style="display: inline-block; padding: 12px 28px; background-color: #ff96d8; border-radius: 6px; font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff; text-decoration: none;">Reply to ${name} →</a>
            </td>
          </tr>

          <tr>
            <td style="padding: 16px 32px; background-color: #f4f0e8;">
              <p style="margin: 0; font-family: Arial, sans-serif; font-size: 11px; color: #8b8985;">Sent from the ${doorConfig.eyebrow} form on your website.</p>
            </td>
          </tr>

        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
      to: doorConfig.email,
      replyTo: email,
      subject: `New ${doorConfig.eyebrow} inquiry — ${name}`,
      text:
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        extraLine +
        `\nMessage:\n${message}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a bit." },
      { status: 500 }
    );
  }
}