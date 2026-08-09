import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Own port so this site never shares an origin (and therefore a service
  // worker / cache) with another local project on the default 5173.
  server: {
    port: 5273,
    strictPort: true,
  },
  preview: {
    port: 5274,
    strictPort: true,
  },
})
