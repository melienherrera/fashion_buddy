const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());
app.options('*', cors());

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://127.0.0.1:7860',
    changeOrigin: true,
    secure: false,
  })
);

app.listen(5001, () => {
  console.log('Proxy server running on http://localhost:5001');
});