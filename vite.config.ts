import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      // This means any request starting with /api will be proxied
      '/api': {
        target: 'https://langflow-manual-install.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
    allowedHosts: [
      'localhost',
      '*.ngrok.dev', // This will allow all ngrok.dev subdomains
      'tryfashionbuddy.ngrok.dev' // This specifically allows your ngrok domain
    ],
  },
});
