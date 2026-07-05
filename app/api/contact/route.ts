import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { firstName, lastName, email, phone, reason, message, website } = body;

  // Honeypot: real users never see or fill this field.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof reason !== "string" ||
    typeof message !== "string" ||
    !firstName.trim() ||
    !lastName.trim() ||
    !message.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json({ error: "Missing or invalid fields." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL_USER,
      pass: process.env.ZOHO_EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL_USER,
      to: process.env.ZOHO_EMAIL_USER,
      replyTo: email,
      subject: `New contact form message: ${reason}`,
      text: [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Phone: ${phone || "N/A"}`,
        `Reason: ${reason}`,
        "",
        message,
      ].join("\n"),
      html: [
        `<p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
        `<p><strong>Phone:</strong> ${escapeHtml(phone || "N/A")}</p>`,
        `<p><strong>Reason:</strong> ${escapeHtml(reason)}</p>`,
        `<p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
      ].join(""),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
