import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { sendContactMessage, validateContactPayload } from './server/telegram.js';

/**
 * В деве тот же эндпоинт, что и в проде (/api/contact), только реализованный
 * middleware-ом вместо serverless-функции. Переменные читаются здесь, на
 * стороне сборщика: без префикса VITE_ они не попадают в клиентский бандл.
 */
const contactApiPlugin = (env) => ({
  name: 'contact-api-dev',
  configureServer(server) {
    server.middlewares.use('/api/contact', async (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ ok: false, error: 'method_not_allowed' }));
      }

      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);

      let body = null;
      try {
        body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      } catch {
        body = null;
      }

      const { valid, payload, error } = validateContactPayload(body);
      res.setHeader('Content-Type', 'application/json');

      if (!valid) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ ok: false, error }));
      }

      const result = await sendContactMessage(payload, env);
      res.statusCode = result.status;
      return res.end(JSON.stringify({ ok: result.ok, error: result.error }));
    });
  },
});

export default defineConfig(({ mode }) => {
  // Пустой префикс — загружаем и переменные без VITE_, они нужны только здесь.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), contactApiPlugin(env)],
  };
});
