import { readdirSync, statSync, readFileSync } from 'fs'
import { join } from 'path'
import { gzipSync } from 'zlib'

const dist = 'dist'
const files = readdirSync(join(dist, 'assets')).map((f) => join(dist, 'assets', f))
const gz = (b) => gzipSync(b, { level: 9 }).length
let js = 0, css = 0, other = 0, total = 0
for (const f of files) {
  const b = readFileSync(f)
  const g = gz(b)
  total += statSync(f).size
  if (f.endsWith('.js')) js += g
  else if (f.endsWith('.css')) css += g
  else other += g
}
const html = gz(readFileSync(join(dist, 'index.html')))
const limits = { js: 100 * 1024, css: 45 * 1024, html: 4 * 1024, total: 512 * 1024 }
const rows = [
  ['JS gzip', js, limits.js],
  ['CSS gzip', css, limits.css],
  ['HTML gzip', html, limits.html],
  ['dist total (brut)', total, limits.total]
]
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]))
const fontExt = ['.woff2', '.woff', '.ttf', '.otf', '.eot']
const fonts = walk(dist).filter((f) => fontExt.some((ext) => f.endsWith(ext)))
let fail = 0
if (fonts.length) {
  fail++
  console.log(`FAIL 0 fichier police dans dist (RWEB_0076) : ${fonts.join(', ')}`)
} else {
  console.log('OK  0 fichier police dans dist (RWEB_0076 — police inlinée en data URI)')
}
for (const [name, val, max] of rows) {
  const ok = val <= max
  if (!ok) fail++
  console.log(`${ok ? 'OK ' : 'FAIL'} ${name}: ${(val / 1024).toFixed(1)} Ko gzip/brut (limite ${(max / 1024).toFixed(0)} Ko)`)
}
console.log(fail ? `BUDGET DÉPASSÉ (${fail})` : 'Budget OK')
process.exit(fail ? 1 : 0)
