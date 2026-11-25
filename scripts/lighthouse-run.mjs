import { writeFileSync } from 'fs'
import { chromium } from 'playwright'
import lighthouse from 'lighthouse'

const url = process.argv[2] || 'http://127.0.0.1:8080/'

const server = await chromium.launchServer({ args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'] })
const port = new URL(server.wsEndpoint()).port
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
  await server.close()
}
process.exit(code)
