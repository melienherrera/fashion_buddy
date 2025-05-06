import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// CORS middleware (must be before proxy)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Or your Vercel frontend URL for more security
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Proxy middleware
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://langflow-manual-install.onrender.com',
    changeOrigin: true,
    pathRewrite: { '^/api': '/api' }, // Adjust as needed
    secure: false,
  })
);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});