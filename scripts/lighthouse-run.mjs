import { spawn } from 'child_process'
import { existsSync, mkdtempSync, readdirSync, writeFileSync } from 'fs'
import { tmpdir, homedir } from 'os'
import { join } from 'path'
import lighthouse from 'lighthouse'

const url = process.argv[2] || 'http://127.0.0.1:8080/'

function findChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH
  const root = join(homedir(), '.cache', 'ms-playwright')
  const builds = readdirSync(root).filter((d) => d.startsWith('chromium-')).sort().reverse()
  for (const d of builds) {
    const p = join(root, d, 'chrome-linux64', 'chrome')
    if (existsSync(p)) return p
  }
  throw new Error(`binaire Chromium introuvable dans ${root}`)
}

const chrome = findChrome()
console.log('Chromium:', chrome)
const proc = spawn(chrome, [
  '--headless',
  '--no-sandbox',
  '--disable-dev-shm-usage',
  '--disable-gpu',
  '--remote-debugging-port=0',
  `--user-data-dir=${mkdtempSync(join(tmpdir(), 'lh-chrome-'))}`,
  'about:blank'
], { stdio: ['ignore', 'ignore', 'pipe'] })

let stderr = ''
const port = await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error(`timeout — port CDP non détecté. stderr:\n${stderr}`)), 30000)
  proc.stderr.on('data', (d) => {
    stderr += d.toString()
    const m = stderr.match(/DevTools listening on ws:\/\/127\.0\.0\.1:(\d+)\//)
    if (m) {
      clearTimeout(timer)
      resolve(Number(m[1]))
    }
  })
  proc.on('exit', (c) => {
    clearTimeout(timer)
    reject(new Error(`chrome a quitté (code ${c}). stderr:\n${stderr}`))
  })
})
console.log('Port CDP:', port)

let code = 1
try {
  const runnerResult = await lighthouse(url, {
    port,
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    budgetPath: 'lighthouse-budget.json',
    output: 'json',
    logLevel: 'error'
  })
  if (!runnerResult) throw new Error('aucun résultat retourné')
  const { lhr, report } = runnerResult
  writeFileSync('lh-report.json', report)
  for (const [id, cat] of Object.entries(lhr.categories)) {
    console.log(`${id}: ${Math.round(cat.score * 100)}/100`)
  }
  const budget = lhr.audits.budget
  if (budget && budget.score !== null && budget.score < 1) {
    console.log('FAIL budgets lighthouse (lighthouse-budget.json):')
    console.log(JSON.stringify(budget.details ?? budget).slice(0, 3000))
  } else {
    console.log('OK budgets lighthouse (lighthouse-budget.json)')
    code = 0
  }
} catch (err) {
  console.error('Lighthouse a échoué:', err.message)
} finally {
  proc.kill('SIGKILL')
}
process.exit(code)
