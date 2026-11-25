import { createServer } from 'http'
import { readFile } from 'fs/promises'
import { extname, join, normalize } from 'path'

const dir = process.argv[2] || 'dist'
const port = Number(process.argv[3] || 8080)
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain', '.woff2': 'font/woff2' }

createServer(async (req, res) => {
  try {
    let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname))
    if (p === '/' || p === '\\') p = '/index.html'
    let file = join(dir, p)
    if (!file.startsWith(dir)) throw new Error('path')
    let body
    try { body = await readFile(file) } catch { body = await readFile(join(dir, 'index.html')); res.setHeader('content-type', 'text/html') }
    res.setHeader('content-type', types[extname(file)] || 'application/octet-stream')
    res.end(body)
  } catch {
    res.statusCode = 404
    res.end('not found')
  }
}).listen(port, '127.0.0.1', () => console.log(`serve ${dir} on http://127.0.0.1:${port}`))
