import { createProxyMiddleware } from 'http-proxy-middleware';

// for Vercel deployment
export default function handler(req, res) {
  return createProxyMiddleware({
    target: 'https://langflow-manual-install.onrender.com',
    changeOrigin: true,
    pathRewrite: { '^/api/proxy': '/api' },
    secure: false,
  })(req, res);
}