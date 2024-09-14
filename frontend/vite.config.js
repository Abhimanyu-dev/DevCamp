import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      "/ws": {
        target: "ws://localhost:5000",
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
})
