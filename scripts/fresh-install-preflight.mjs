import { existsSync, readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const requiredPackages = [
  'react', 'react-dom', 'react-router-dom', 'gsap', 'hono',
  'vite', '@vitejs/plugin-react', '@hono/vite-dev-server', '@hono/vite-build'
]
const requiredFiles = [
  'src/index.tsx',
  'src/client/main.tsx',
  'src/client/App.tsx',
  'public/static/style.css',
  'public/static/sections.css',
  'public/static/home-hero-reference-dock-v27.css',
  'public/static/home-hero-reference-dock-v33.css',
  'public/static/service-pages.css',
  'public/static/premium-pages.css',
  'public/static/site-runtime.css',
  'public/static/img/logo-mark.png'
]

const declared = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) }
const missingDeclarations = requiredPackages.filter((name) => !declared[name])
const missingFiles = requiredFiles.filter((file) => !existsSync(new URL(`../${file}`, import.meta.url)))
const missingInstalled = requiredPackages.filter((name) => !existsSync(new URL(`../node_modules/${name}/package.json`, import.meta.url)))

if (missingDeclarations.length || missingFiles.length || missingInstalled.length) {
  console.error('[Afyra setup check] Fresh-install preflight failed.')
  if (missingDeclarations.length) console.error('Missing package.json dependencies:', missingDeclarations.join(', '))
  if (missingFiles.length) console.error('Missing project files:', missingFiles.join(', '))
  if (missingInstalled.length) console.error('Missing installed packages:', missingInstalled.join(', '), '\nRun npm install and try again.')
  process.exit(1)
}

console.log('[Afyra setup check] Dependencies and required client/static files are present.')
