export default function Impressum() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 prose prose-sm">
      <h1 className="text-2xl font-bold text-brand-dark mb-6">Impressum</h1>

      <section className="card space-y-3 text-sm text-gray-700">
        <h2 className="font-semibold text-brand-dark">Angaben gemäß § 5 ECG</h2>
        <p>
          <strong>EVROBO GmbH</strong><br />
          [Straße und Hausnummer]<br />
          [PLZ Ort], Österreich
        </p>
        <p>
          E-Mail: <a href="mailto:office@evrobo.dev" className="text-brand-mid">office@evrobo.dev</a><br />
          Web: <a href="https://evrobo.dev" className="text-brand-mid" target="_blank" rel="noopener noreferrer">evrobo.dev</a>
        </p>
        <p>
          Unternehmensgegenstand: Softwareentwicklung und Automatisierung<br />
          UID-Nummer: [ATU-Nummer eintragen]<br />
          Firmenbuchnummer: [FN eintragen]<br />
          Firmenbuchgericht: [Handelsgericht eintragen]
        </p>
        <p>
          Mitglied der WKO, Fachgruppe: Unternehmensberatung und Informationstechnologie
        </p>

        <h2 className="font-semibold text-brand-dark pt-2">Haftungsausschluss</h2>
        <p>
          Die auf vertrag-erstellen.at bereitgestellten Vertragsvorlagen dienen als unverbindliche
          Muster und ersetzen keine individuelle Rechtsberatung. Für die Richtigkeit, Vollständigkeit
          und Aktualität der Vorlagen wird keine Haftung übernommen. Bei rechtlich relevanten
          Fragen empfehlen wir die Konsultation eines Rechtsanwalts.
        </p>

        <h2 className="font-semibold text-brand-dark pt-2">EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
          <a href="https://ec.europa.eu/consumers/odr" className="text-brand-mid" target="_blank" rel="noopener noreferrer">
            ec.europa.eu/consumers/odr
          </a>
        </p>
      </section>
    </div>
  )
}
