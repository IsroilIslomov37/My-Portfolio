/*
 * Отправка сообщения из формы в Telegram.
 *
 * Логика намеренно вынесена отдельно от транспорта: её вызывают и serverless-
 * функция на Vercel (api/contact.js), и dev-middleware в vite.config.js.
 * Токен читается из окружения СЕРВЕРА и никогда не попадает в клиентский бандл.
 */

const LIMITS = {
  name: 100,
  email: 150,
  subject: 150,
  message: 3000,
};

const clean = (value, limit) => String(value ?? '').trim().slice(0, limit);

export function validateContactPayload(body) {
  const payload = {
    name: clean(body?.name, LIMITS.name),
    email: clean(body?.email, LIMITS.email),
    subject: clean(body?.subject, LIMITS.subject),
    message: clean(body?.message, LIMITS.message),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return { valid: false, error: 'missing_fields' };
  }
  // Не полноценная валидация адреса — только отсечение явного мусора
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return { valid: false, error: 'invalid_email' };
  }

  return { valid: true, payload };
}

export async function sendContactMessage(payload, env = process.env) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { ok: false, status: 500, error: 'not_configured' };
  }

  // Обычный текст без parse_mode: содержимое формы не интерпретируется
  // как разметка, поэтому экранировать нечего.
  const text = [
    'Новое сообщение с портфолио',
    '',
    `Имя: ${payload.name}`,
    `Email: ${payload.email}`,
    `Тема: ${payload.subject || '—'}`,
    '',
    'Сообщение:',
    payload.message,
  ].join('\n');

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      // description Telegram-а может содержать детали конфигурации — в ответ
      // клиенту он не уходит, только в лог сервера.
      console.error('Telegram API error:', data?.description ?? response.status);
      return { ok: false, status: 502, error: 'telegram_error' };
    }

    return { ok: true, status: 200 };
  } catch (error) {
    console.error('Telegram request failed:', error);
    return { ok: false, status: 502, error: 'network_error' };
  }
}
