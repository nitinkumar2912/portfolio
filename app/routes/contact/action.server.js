import { json } from '~/utils/server-runtime.server';
import { MAX_EMAIL_LENGTH, MAX_MESSAGE_LENGTH, MAX_NAME_LENGTH } from './constants';

const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

export async function action({ request }) {
  const formData = await request.formData();
  const isBot = String(formData.get('company') || '');
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const errors = {};

  // Return without sending if a bot trips the honeypot
  if (isBot) return json({ success: true });

  // Handle input validation on the server
  if (!name) {
    errors.name = 'Please enter your name.';
  }

  if (name.length > MAX_NAME_LENGTH) {
    errors.name = `Name must be shorter than ${MAX_NAME_LENGTH} characters.`;
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!message) {
    errors.message = 'Please enter a message.';
  }

  if (email.length > MAX_EMAIL_LENGTH) {
    errors.email = `Email address must be shorter than ${MAX_EMAIL_LENGTH} characters.`;
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be shorter than ${MAX_MESSAGE_LENGTH} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chatId } = process.env;
  if (!token || !chatId) {
    return json(
      { errors: { general: 'Messages are temporarily unavailable. Please email me directly.' } },
      { status: 503 }
    );
  }

  const telegramMessage = [
    '📩 NEW PORTFOLIO MESSAGE',
    '',
    '👤 Name:',
    name,
    '',
    '📧 Email:',
    email || 'Not provided',
    '',
    '💬 Message:',
    message,
  ].join('\n');

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: telegramMessage }),
    });
    const result = await response.json();

    if (!response.ok || !result.ok) {
      return json(
        { errors: { general: 'The message could not be sent. Please try again later.' } },
        { status: 502 }
      );
    }
  } catch {
    return json(
      { errors: { general: 'The message could not be sent. Please try again later.' } },
      { status: 502 }
    );
  }

  return json({ success: true });
}
