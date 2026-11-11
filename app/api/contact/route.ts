import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Nodemailer needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

/*
 * Required environment variables (set them in Vercel → Project → Settings → Environment Variables):
 *   SMTP_HOST      e.g. smtpout.secureserver.net  (GoDaddy Professional Email)
 *   SMTP_PORT      e.g. 465
 *   SMTP_USER      e.g. support@everydaycyberai.in
 *   SMTP_PASS      password of the mailbox above
 *   SUPPORT_EMAIL  inbox that receives new requests (defaults to SMTP_USER)
 */

const MAX_LEN = { name: 100, email: 200, mobile: 20, serviceType: 60, message: 5000 };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot field: real users never fill it, bots usually do.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX_LEN.name);
  const email = clean(body.email, MAX_LEN.email);
  const mobile = clean(body.mobile, MAX_LEN.mobile);
  const serviceType = clean(body.serviceType, MAX_LEN.serviceType) || "IT Support";
  const message = clean(body.message, MAX_LEN.message);

  if (!name || !email || !mobile || !message) {
    return NextResponse.json({ ok: false, error: "Please fill all required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }
  // Block header injection through the name field.
  if (/[\r\n]/.test(name) || /[\r\n]/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP environment variables are not configured.");
    return NextResponse.json({ ok: false, error: "Email service is not configured." }, { status: 500 });
  }
  const supportEmail = process.env.SUPPORT_EMAIL || SMTP_USER;
  const port = Number(SMTP_PORT || 465);

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    mobile: escapeHtml(mobile),
    serviceType: escapeHtml(serviceType),
    message: escapeHtml(message).replace(/\n/g, "<br>"),
  };
  const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  // 1. Notification to the support inbox.
  const adminHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px">
      <h2 style="color:#0891b2;margin-bottom:4px">New Support Request</h2>
      <p style="color:#666;margin-top:0">Submitted on ${submittedAt} (IST)</p>
      <table cellpadding="8" style="border-collapse:collapse;width:100%">
        <tr><td style="background:#f3f4f6;width:140px"><b>Name</b></td><td>${safe.name}</td></tr>
        <tr><td style="background:#f3f4f6"><b>Email</b></td><td><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
        <tr><td style="background:#f3f4f6"><b>Mobile</b></td><td>${safe.mobile}</td></tr>
        <tr><td style="background:#f3f4f6"><b>Service Type</b></td><td>${safe.serviceType}</td></tr>
        <tr><td style="background:#f3f4f6;vertical-align:top"><b>Problem</b></td><td>${safe.message}</td></tr>
      </table>
      <p style="color:#666;font-size:13px">Reply to this email to respond directly to the customer.</p>
    </div>`;

  // 2. Automatic thank-you email to the customer.
  const userHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px">
      <h2 style="color:#0891b2">Thank you for contacting Everyday Cyber AI</h2>
      <p>Hi ${safe.name},</p>
      <p>We have received your support request and our team will get back to you shortly.</p>
      <table cellpadding="8" style="border-collapse:collapse;width:100%;margin:16px 0">
        <tr><td style="background:#f3f4f6;width:140px"><b>Service Type</b></td><td>${safe.serviceType}</td></tr>
        <tr><td style="background:#f3f4f6;vertical-align:top"><b>Your Message</b></td><td>${safe.message}</td></tr>
      </table>
      <p>For urgent help, message us on WhatsApp: <a href="https://wa.me/918454031225">+91 84540 31225</a></p>
      <p>Regards,<br><b>Everyday Cyber AI Support</b><br>
        <a href="https://everydaycyberai.in">everydaycyberai.in</a> | ${escapeHtml(supportEmail)}</p>
      <p style="color:#999;font-size:12px">This is an automated confirmation. You can reply to this email if you need to add more details.</p>
    </div>`;

  try {
    await transporter.sendMail({
      from: `"Everyday Cyber AI Website" <${SMTP_USER}>`,
      to: supportEmail,
      replyTo: `"${name}" <${email}>`,
      subject: `New Support Request: ${serviceType} - ${name}`,
      html: adminHtml,
    });
  } catch (err) {
    console.error("Contact form: failed to send support notification:", err);
    return NextResponse.json({ ok: false, error: "Could not send your request." }, { status: 502 });
  }

  // The thank-you mail should never fail the request once support has been notified.
  try {
    await transporter.sendMail({
      from: `"Everyday Cyber AI Support" <${SMTP_USER}>`,
      to: email,
      replyTo: supportEmail,
      subject: "We have received your support request - Everyday Cyber AI",
      html: userHtml,
    });
  } catch (err) {
    console.warn("Contact form: failed to send thank-you email:", err);
  }

  return NextResponse.json({ ok: true });
}
