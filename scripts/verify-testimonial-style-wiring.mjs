import { existsSync, readFileSync } from 'node:fs'

const cssPath = new URL('../src/client/styles/testimonials-v76.css', import.meta.url)
const componentPath = new URL('../src/client/components/TestimonialsSection.tsx', import.meta.url)
const shellPath = new URL('../src/index.tsx', import.meta.url)

const errors = []
if (!existsSync(cssPath)) errors.push('Missing src/client/styles/testimonials-v76.css')
if (!existsSync(componentPath)) errors.push('Missing TestimonialsSection.tsx')
if (!existsSync(shellPath)) errors.push('Missing src/index.tsx')

if (!errors.length) {
  const css = readFileSync(cssPath, 'utf8')
  const component = readFileSync(componentPath, 'utf8')
  const shell = readFileSync(shellPath, 'utf8')
  if (!component.includes("import '../styles/testimonials-v76.css'")) errors.push('TestimonialsSection.tsx does not import testimonials-v76.css')
  if (!shell.includes('/static/client.css')) errors.push('Production Hono shell does not reference /static/client.css')
  if (css.length < 12000 || !css.includes('.aft-section--home') || !css.includes('.aft-social-card')) errors.push('testimonial CSS source is missing/incomplete')
}

if (errors.length) {
  console.error('[Afyra testimonial style wiring] FAILED')
  errors.forEach((error) => console.error('-', error))
  process.exit(1)
}
console.log('[Afyra testimonial style wiring] OK — source stylesheet, React import and production shell linkage are present.')
