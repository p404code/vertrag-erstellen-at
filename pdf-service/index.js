const express = require('express')
const cors = require('cors')
const puppeteer = require('puppeteer')
const Handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001
const PDF_API_SECRET = process.env.PDF_API_SECRET

// Allowed origins
const ALLOWED_ORIGINS = [
  'https://vertrag-erstellen.at',
  'https://www.vertrag-erstellen.at',
  'https://vertrag-erstellen-at.netlify.app',
  'https://vertrag.hydrafleet.at',
  'http://localhost:5173',
  'http://localhost:8888',
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}))

app.use(express.json({ limit: '2mb' }))

// Auth middleware
function requireAuth(req, res, next) {
  if (!PDF_API_SECRET) return next() // dev mode: no secret required
  const auth = req.headers.authorization || ''
  if (auth !== `Bearer ${PDF_API_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }))

// PDF generation
app.post('/generate-pdf', requireAuth, async (req, res) => {
  let browser = null
  try {
    const data = req.body

    // Load and compile template
    const templatePath = path.join(__dirname, 'templates', 'kfz-contract.html')
    const templateSource = fs.readFileSync(templatePath, 'utf-8')
    const template = Handlebars.compile(templateSource)
    const html = template(data)

    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })

    const pdfData = await page.pdf({
      format: 'A4',
      margin: { top: '12mm', right: '12mm', bottom: '12mm', left: '12mm' },
      printBackground: true,
    })

    await browser.close()

    // Puppeteer returns Uint8Array – convert to Buffer for Express
    const pdf = Buffer.from(pdfData)

    const filename = `KFZ-Kaufvertrag-${data.kennzeichen || 'Fahrzeug'}.pdf`
      .replace(/[^a-zA-Z0-9\-_.]/g, '_')

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': pdf.length,
    })
    res.send(pdf)
  } catch (err) {
    if (browser) await browser.close().catch(() => {})
    console.error('PDF generation error:', err)
    res.status(500).json({ error: 'PDF-Generierung fehlgeschlagen' })
  }
})

app.listen(PORT, () => {
  console.log(`PDF-Service läuft auf Port ${PORT}`)
})
