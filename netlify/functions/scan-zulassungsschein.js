import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Du bist ein Spezialist für das Lesen österreichischer Zulassungsscheine (Kraftfahrzeugzulassung).
Extrahiere alle relevanten Daten aus dem Foto und gib sie als JSON zurück.

Gib NUR gültiges JSON zurück, ohne Markdown-Codeblöcke, ohne Erklärungen.

Felder (leere Strings wenn nicht lesbar):
{
  "kennzeichen": "",
  "erstzulassung": "",
  "marke": "",
  "modell": "",
  "typ": "",
  "fin": "",
  "leistungKw": "",
  "hubraum": "",
  "kraftstoff": "",
  "farbe": "",
  "gewichtLeer": "",
  "gewichtGesamt": "",
  "sitzplaetze": "",
  "co2": "",
  "zulassungsbesitzer": "",
  "adresse": ""
}`

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const body = JSON.parse(event.body)
    const { imageBase64, mediaType } = body

    if (!imageBase64) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'imageBase64 fehlt' }),
      }
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType || 'image/jpeg',
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: 'Extrahiere alle Daten aus diesem österreichischen Zulassungsschein.',
            },
          ],
        },
      ],
    })

    const text = response.content[0].text.trim()
    const data = JSON.parse(text)

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  } catch (err) {
    console.error('scan-zulassungsschein error:', err)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Scan fehlgeschlagen. Bitte manuell ausfüllen.' }),
    }
  }
}
