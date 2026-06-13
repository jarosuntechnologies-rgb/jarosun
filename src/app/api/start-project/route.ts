import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, company, projectType, budget, timeline, description } = await request.json();

    if (!name || !email || !projectType || !budget || !timeline || !description) {
      return NextResponse.json(
        { error: "Required fields are missing: name, email, projectType, budget, timeline, and description are required." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const contactEmail = process.env.CONTACT_EMAIL || "jarosuntechnologies@gmail.com";
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

    let googleSheetsLogged = false;
    let googleSheetsError = null;

    // 1. Log to Google Sheets via Google Apps Script Web App if URL is defined
    if (googleScriptUrl) {
      try {
        const response = await fetch(googleScriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            company: company || "",
            projectType,
            budget,
            timeline,
            description,
          }),
        });
        
        if (response.ok) {
          const resData = await response.json();
          if (resData.success) {
            googleSheetsLogged = true;
          } else {
            googleSheetsError = resData.error || "Google Apps Script returned failed status";
          }
        } else {
          googleSheetsError = `Status: ${response.status}`;
        }
      } catch (err: any) {
        console.error("Failed to log to Google Sheets:", err);
        googleSheetsError = err.message || err;
      }
    }

    // 2. Send email via Nodemailer
    // If SMTP credentials are not configured, simulate successful submission
    if (!smtpUser || !smtpPassword) {
      console.log("\n==================================================");
      console.log("PROJECT REQUIREMENTS FORM SUBMISSION (SIMULATED)");
      console.log(`To: ${contactEmail}`);
      console.log(`Client: ${name} (${email})`);
      if (company) console.log(`Company: ${company}`);
      console.log(`Project Type: ${projectType}`);
      console.log(`Budget Range: ${budget}`);
      console.log(`Timeline: ${timeline}`);
      console.log(`Description:\n${description}`);
      console.log(`Google Sheets Logged: ${googleSheetsLogged ? "YES" : "NO"}`);
      if (googleSheetsError) console.log(`Google Sheets Error: ${googleSheetsError}`);
      console.log("==================================================\n");
      console.log("Tip: Set SMTP_USER and SMTP_PASSWORD in your environment variables to send actual emails.");

      return NextResponse.json({
        success: true,
        message: "Requirements received (Simulated).",
        simulated: true,
        googleSheetsLogged,
      });
    }

    // Configure nodemailer transport
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`, // Must be smtpUser for Gmail authentication
      replyTo: email,
      to: contactEmail,
      subject: `[Start Project] New Requirements Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nProject Type: ${projectType}\nBudget Range: ${budget}\nTimeline: ${timeline}\n\nDescription:\n${description}\n\nGoogle Sheets Saved: ${googleSheetsLogged ? "Yes" : "No"}`,
      html: `
        <div style="font-family: sans-serif; padding: 25px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="border-bottom: 2px solid #c00000; padding-bottom: 10px; color: #c00000; margin-top: 0;">New Project Requirements</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; width: 35%;">Client Name:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Email Address:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Company Name:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${company || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Project Type:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${projectType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Budget Range:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${budget}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Timeline:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${timeline}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Google Sheets Save:</td>
              <td style="padding: 8px 0; color: ${googleSheetsLogged ? "green" : "orange"};">${googleSheetsLogged ? "Success" : "Skipped or Failed"}</td>
            </tr>
          </table>

          <div style="margin-top: 25px;">
            <h3 style="color: #555; margin-bottom: 10px;">Project Description & Requirements:</h3>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; white-space: pre-wrap; border-left: 4px solid #c00000; font-size: 14px; line-height: 1.6;">${description}</div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Requirements submitted successfully.",
      googleSheetsLogged,
    });
  } catch (error: any) {
    console.error("Error submitting project requirements:", error);
    return NextResponse.json(
      { error: "Failed to submit project requirements. Please try again later." },
      { status: 500 }
    );
  }
}
