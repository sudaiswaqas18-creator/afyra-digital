import { existsSync, readFileSync, statSync } from 'node:fs'

const file = new URL('../public/static/client.css', import.meta.url)
const requiredSelectors = [
  '.aft-section--home',
  '.aft-home-card',
  '.aft-marquee-card',
  '.aft-metric__grid',
  '.aft-website-card',
  '.aft-social-card'
]

if (!existsSync(file)) {
  console.error('[Afyra testimonial CSS check] public/static/client.css was not generated.')
  process.exit(1)
}

const css = readFileSync(file, 'utf8')
const missing = requiredSelectors.filter((selector) => !css.includes(selector))
if (statSync(file).size < 12000 || missing.length) {
  console.error('[Afyra testimonial CSS check] Compiled CSS is incomplete.')
  if (missing.length) console.error('Missing selectors:', missing.join(', '))
  console.error('Generated size:', statSync(file).size, 'bytes')
  process.exit(1)
}

console.log(`[Afyra testimonial CSS check] OK — client.css is ${statSync(file).size} bytes and contains all testimonial layout selectors.`)
