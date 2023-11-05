/// <reference types="vitest">
/// <reference types="vite/client">

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  },
  test:{
    globals:true,
    environment: 'jsdom',
    css:true,
    setupFiles: "./tests/setup.ts"
  }
})
