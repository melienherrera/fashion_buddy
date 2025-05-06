import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// for Vercel deployment
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return createProxyMiddleware({
    target: 'https://langflow-manual-install.onrender.com',
    changeOrigin: true,
    pathRewrite: { '^/api/proxy': '/api' },
    secure: false,
  })(req, res);
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});