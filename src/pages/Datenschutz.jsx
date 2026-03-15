export default function Datenschutz() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-dark mb-6">Datenschutzerklärung</h1>

      <div className="card space-y-5 text-sm text-gray-700">
        <section>
          <h2 className="font-semibold text-brand-dark mb-2">1. Verantwortlicher</h2>
          <p>
            EVROBO Ltd., Georg-Washington-Straße 13, 1000 Sofia, Bulgarien<br />
            Kontakt: <a href="mailto:office@evrobo.dev" className="text-brand-mid">office@evrobo.dev</a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-brand-dark mb-2">2. Datenverarbeitung</h2>
          <p className="mb-2">
            Zur Nutzung dieses Dienstes sind <strong>keine Registrierung und kein Login</strong> erforderlich.
            Alle eingegebenen Formulardaten werden ausschließlich lokal in Ihrem Browser verarbeitet
            und nach der PDF-Erstellung nicht gespeichert.
          </p>
          <p>
            Bei Nutzung der optionalen Foto-Scan-Funktion wird das aufgenommene Bild zur automatischen
            Texterkennung (OCR) kurz an einen externen Dienst übermittelt und danach gelöscht.
            Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-brand-dark mb-2">3. Hosting</h2>
          <p>
            Diese Website wird über einen externen Hosting-Anbieter bereitgestellt.
            Beim Aufruf werden technische Zugriffsdaten (IP-Adresse, Datum/Uhrzeit) protokolliert.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-brand-dark mb-2">4. Ihre Rechte</h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten.
            Da keine personenbezogenen Daten dauerhaft gespeichert werden, sind diese Rechte
            technisch bereits durch das System gewährleistet.
          </p>
          <p className="mt-2">
            Anfragen:{' '}
            <a href="mailto:office@evrobo.dev" className="text-brand-mid">office@evrobo.dev</a>
            {' '}· Beschwerde:{' '}
            <a href="https://www.dsb.gv.at" className="text-brand-mid" target="_blank" rel="noopener noreferrer">dsb.gv.at</a>
          </p>
        </section>

        <p className="text-xs text-gray-400 pt-2">Stand: März 2026</p>
      </div>
    </div>
  )
}
