export async function sendTelegramNotification({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log("Telegram is not configured.");
    return;
  }

  const text = `
📩 NEW PORTFOLIO MESSAGE

👤 Name:
${name}

📧 Email:
${email}

💬 Message:
${message}
`;

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    }
  );

  if (!response.ok) {
    console.error("Telegram Error:", await response.text());
  }
}