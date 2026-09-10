import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * Vite config for Vercel SPA deployment.
 * Builds a standard single-page application from index.html.
 * Public assets (CSS, images) are copied from public/ to dist/.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
