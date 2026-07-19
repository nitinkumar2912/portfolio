import { NextResponse } from "next/server";
import { Resend } from "resend";
import { personal } from "@/data/portfolio";
import { sendTelegramNotification } from "@/lib/telegram";

const resend = new Resend(process.env.RESEND_API_KEY);

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
  try {
    const body = await request.json();

    const { name, email, message } = body;

    if (
      !isNonEmptyString(name) ||
      !isNonEmptyString(email) ||
      !isNonEmptyString(message)
    ) {
      return NextResponse.json(
        { error: "Please fill in all fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    const escapedName = escapeHtml(trimmedName);
    const escapedEmail = escapeHtml(trimmedEmail);
    const escapedMessage = escapeHtml(trimmedMessage);

    const toEmail = process.env.CONTACT_EMAIL || personal.email;

    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ||
      "Portfolio Contact <contact@nitinkumar.website>";

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: trimmedEmail,
      subject: `📩 New Portfolio Message from ${trimmedName}`,
      text: `
New Portfolio Message

Name: ${trimmedName}

Email: ${trimmedEmail}

Message:

${trimmedMessage}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px;">
          <h2>📩 New Portfolio Message</h2>

          <p><strong>Name:</strong> ${escapedName}</p>

          <p>
            <strong>Email:</strong>
            <a href="mailto:${escapedEmail}">
              ${escapedEmail}
            </a>
          </p>

          <hr>

          <p><strong>Message:</strong></p>

          <p style="white-space:pre-wrap;">
            ${escapedMessage}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    // Send Telegram notification
    await sendTelegramNotification({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}