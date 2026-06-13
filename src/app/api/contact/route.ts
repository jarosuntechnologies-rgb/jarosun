import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const contactEmail = process.env.CONTACT_EMAIL || "jarosuntechnologies@gmail.com";

    // If SMTP credentials are not configured, simulate successful submission
    if (!smtpUser || !smtpPassword) {
      console.log("\n==================================================");
      console.log("CONTACT FORM SUBMISSION (SIMULATED)");
      console.log(`To: ${contactEmail}`);
      console.log(`From Name: ${name}`);
      console.log(`From Email: ${email}`);
      console.log(`Message:\n${message}`);
      console.log("==================================================\n");
      console.log("Tip: Set SMTP_USER and SMTP_PASSWORD in your environment variables to send actual emails.");

      return NextResponse.json({
        success: true,
        message: "Message received successfully (Simulated).",
        simulated: true,
      });
    }

    // Configure nodemailer transport
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`, // Must be smtpUser for Gmail, or SMTP will reject
      replyTo: email,
      to: contactEmail,
      subject: `Jarosun Studio Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">New Inquiry from Jarosun Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
