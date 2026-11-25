import sharp from 'sharp'
import { readFileSync } from 'fs'

const logo = readFileSync('public/assets/logo-contour-rouge.svg', 'utf8')
  .replaceAll('currentColor', '#ffffff')
  .replace(/<svg /, '<svg preserveAspectRatio="xMidYMid meet" ')

const W = 1200, H = 630
const logoW = Math.round(H * 0.62)
const overlay = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${logoW}" height="${H}">${logo.replace(/<\?xml[^>]*\?>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}</svg>`
)

await sharp({ create: { width: W, height: H, channels: 3, background: '#db0000' } })
  .composite([{ input: overlay, gravity: 'center' }])
  .png({ compressionLevel: 9 })
  .toFile('public/assets/og-image.png')
console.log('og-image.png généré (1200x630, fond #db0000 + logo blanc)')
