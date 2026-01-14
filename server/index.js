import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const openaiApiKey = process.env.OPENAI_API_KEY;
const firefliesApiKey = process.env.FIREFLIES_API_KEY;

app.use(cors());

if (!openaiApiKey) {
  console.warn('[minutes-backend] OPENAI_API_KEY is not set. OpenAI proxy calls will fail.');
}

if (!firefliesApiKey) {
  console.warn('[minutes-backend] FIREFLIES_API_KEY is not set. Fireflies proxy calls will fail.');
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use(
  '/api/openai',
  createProxyMiddleware({
    target: 'https://api.openai.com',
    changeOrigin: true,
    secure: true,
    pathRewrite: (path) => path.replace(/^\/api\/openai/, ''),
    onProxyReq: (proxyReq) => {
      if (openaiApiKey) {
        proxyReq.setHeader('Authorization', `Bearer ${openaiApiKey}`);
      }
    },
  })
);

app.use(
  '/api/fireflies',
  createProxyMiddleware({
    target: 'https://api.fireflies.ai',
    changeOrigin: true,
    secure: true,
    pathRewrite: (path) => path.replace(/^\/api\/fireflies/, ''),
    onProxyReq: (proxyReq) => {
      if (firefliesApiKey) {
        proxyReq.setHeader('Authorization', `Bearer ${firefliesApiKey}`);
      }
    },
  })
);

app.listen(port, () => {
  console.log(`[minutes-backend] Proxy listening on port ${port}`);
});
