import { NextResponse } from "next/server";


import { personal } from "@/data/portfolio";

const resendEndpoint = "https://api.resend.com/emails";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Message delivery is not enabled yet. Please contact me by email or book a quick chat." },
      { status: 500 },
    );
  }
console.log(process.env.RESEND_API_KEY);
  const body = (await request.json().catch(() => null)) as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
  } | null;

  const name = body?.name;
  const email = body?.email;
  const message = body?.message;

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
    return NextResponse.json({ error: "Please fill in name, email, and message." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();
  const escapedName = escapeHtml(trimmedName);
  const escapedEmail = escapeHtml(trimmedEmail);
  const escapedMessage = escapeHtml(trimmedMessage);
  const toEmail = process.env.CONTACT_EMAIL ?? personal.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: trimmedEmail,
      subject: `New portfolio message from ${trimmedName}`,
      text: [
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        "",
        "Message:",
        trimmedMessage,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2>New portfolio message</h2>
          <p><strong>Name:</strong> ${escapedName}</p>
          <p><strong>Email:</strong> ${escapedEmail}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapedMessage}</p>
        </div>
      `,
    }),
  }).catch(() => null);

  if (!response) {
    return NextResponse.json({ error: "Email provider is unreachable right now. Please try again later." }, { status: 502 });
  }

  if (!response.ok) {
const providerError = await response.json().catch(() => null);

  console.log("Resend Error:", providerError);

    return NextResponse.json(
      { error: providerError?.message ?? "Message could not be sent right now. Check your email service settings." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
