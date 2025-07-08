import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración para desarrollo local
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  }
}); 