import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/todo': {
        target: 'http://backend:8080',
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist'
  }
})