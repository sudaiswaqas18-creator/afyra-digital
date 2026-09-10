import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Two build modes:
//  - `vite build --mode client` -> bundles the React SPA into public/static/
//  - `vite build`               -> bundles the Hono worker into dist/
export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      base: '/static/',
      plugins: [react()],
      publicDir: false,
      build: {
        outDir: 'public/static',
        emptyOutDir: false,
        rollupOptions: {
          input: './src/client/main.tsx',
          output: {
            entryFileNames: 'client.js',
            chunkFileNames: 'client-[name].js',
            assetFileNames: 'client.[ext]'
          }
        }
      }
    }
  }

  return {
    plugins: [
      build(),
      devServer({
        adapter,
        entry: 'src/index.tsx'
      })
    ]
  }
})
