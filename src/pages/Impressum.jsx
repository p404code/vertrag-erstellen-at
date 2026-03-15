export default function Impressum() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-dark mb-6">Impressum</h1>

      <div className="card space-y-5 text-sm text-gray-700">
        <section>
          <h2 className="font-semibold text-brand-dark mb-2">Angaben gemäß § 5 ECG</h2>
          <p>
            <strong>EVROBO Ltd.</strong><br />
            Rechtsform: Gesellschaft mit beschränkter Haftung<br />
            Georg-Washington-Straße 13<br />
            1000 Sofia, Bulgarien
          </p>
          <p className="mt-2">
            E-Mail:{' '}
            <a href="mailto:office@evrobo.dev" className="text-brand-mid">office@evrobo.dev</a><br />
            Web:{' '}
            <a href="https://evrobo.dev" className="text-brand-mid" target="_blank" rel="noopener noreferrer">evrobo.dev</a>
          </p>
          <p className="mt-2">
            Unternehmensgegenstand: Softwareentwicklung und digitale Automatisierung
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-brand-dark mb-2">Haftungsausschluss</h2>
          <p>
            Die auf vertrag-erstellen.at bereitgestellten Vertragsvorlagen sind unverbindliche Muster
            und ersetzen keine individuelle Rechtsberatung. Für die Richtigkeit und Vollständigkeit
            der Vorlagen wird keine Haftung übernommen. Bei rechtlich relevanten Fragen empfehlen
            wir die Konsultation eines Rechtsanwalts.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-brand-dark mb-2">EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{' '}
            <a href="https://ec.europa.eu/consumers/odr" className="text-brand-mid" target="_blank" rel="noopener noreferrer">
              ec.europa.eu/consumers/odr
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
