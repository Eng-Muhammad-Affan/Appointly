import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // Add this line
    },
  },
  server:{
    allowedHosts:["tapeless-gauntlet-blitz.ngrok-free.dev"]
  }
})
