import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8081,
  },
  build: {
    outDir: 'build', // output directory for the production build
    manifest: true,
    rollupOptions: {
      input: {
        server: './server/server.js',
        client: './client/src/index.js',
      },
    },
  },
});
