import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:3001/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
      '/user': {
        target: 'http://localhost:3001/user',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/user/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    manifest: true,
    rollupOptions: {
      input: {
        server: './server/server.js',
        client: './index.html',
      },
    },
  },
});
