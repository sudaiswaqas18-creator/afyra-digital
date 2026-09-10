import { readdir, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

await rm(new URL('../dist/', import.meta.url), { recursive: true, force: true })

// Vite's client output intentionally lives inside public/static so the worker
// can serve it. Remove every previous generated client chunk before rebuilding
// so stale hashed/minified aliases can never survive into a fresh production build.
const staticDir = new URL('../public/static/', import.meta.url)
try {
  const entries = await readdir(staticDir)
  await Promise.all(entries
    .filter((name) => /^client(?:[-.].*)?\.(?:js|css|map)$/.test(name))
    .map((name) => rm(new URL(name, staticDir), { force: true })))
} catch (error) {
  if (error && typeof error === 'object' && 'code' in error && error.code !== 'ENOENT') throw error
}

console.log('[Afyra clean] dist removed and stale client bundles cleared from public/static.')
