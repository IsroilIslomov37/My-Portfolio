import { sendContactMessage, validateContactPayload } from '../server/telegram.js';

/**
 * Serverless-функция Vercel: POST /api/contact.
 * Токен бота живёт в переменных окружения проекта на Vercel
 * (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID) и не публикуется в бандле.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body;
  const { valid, payload, error } = validateContactPayload(body);

  if (!valid) {
    return res.status(400).json({ ok: false, error });
  }

  const result = await sendContactMessage(payload);
  return res.status(result.status).json({ ok: result.ok, error: result.error });
}

const safeParse = (raw) => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};
