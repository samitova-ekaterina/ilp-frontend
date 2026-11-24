import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    // In development the browser talks to one address, as on the hosting platform: /api goes to the local server.
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});
