export default function Datenschutz() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-dark mb-6">Datenschutzerklärung</h1>

      <div className="card space-y-5 text-sm text-gray-700">
        <section>
          <h2 className="font-semibold text-brand-dark mb-2">1. Verantwortlicher</h2>
          <p>
            EVROBO GmbH, [Adresse], Österreich.<br />
            Kontakt: <a href="mailto:office@evrobo.dev" className="text-brand-mid">office@evrobo.dev</a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-brand-dark mb-2">2. Welche Daten wir verarbeiten</h2>
          <p>
            Zur Nutzung des Vertrags-Generators sind <strong>keine Registrierung und kein Login</strong> erforderlich.
            Alle Formulardaten (Fahrzeugdaten, Personendaten) werden ausschließlich lokal in Ihrem Browser
            verarbeitet und nach der PDF-Erstellung nicht gespeichert.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-brand-dark mb-2">3. KI-gestützte Zulassungsschein-Erkennung</h2>
          <p className="mb-2">
            Wenn Sie die optionale Foto-Scan-Funktion nutzen, wird das von Ihnen aufgenommene Foto des
            Zulassungsscheins zur Texterkennung an die <strong>Anthropic API</strong> übertragen.
          </p>
          <ul className="list-disc ml-4 space-y-1">
            <li>Das Bild wird <strong>ausschließlich für die einmalige Texterkennung</strong> verwendet.</li>
            <li>Es erfolgt <strong>keine dauerhafte Speicherung</strong> des Bildes durch uns.</li>
            <li>Das Bild wird <strong>nicht für das Training von KI-Modellen</strong> verwendet (gemäß Anthropic API-Nutzungsbedingungen für Unternehmenskunden).</li>
            <li>Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
          </ul>
          <p className="mt-2">
            Drittanbieter: Anthropic, PBC, 548 Market St, San Francisco, CA 94104, USA.
            Datenschutzrichtlinie: <a href="https://www.anthropic.com/privacy" className="text-brand-mid" target="_blank" rel="noopener noreferrer">anthropic.com/privacy</a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-brand-dark mb-2">4. PDF-Generierung</h2>
          <p>
            Die eingegebenen Vertragsdaten werden zur PDF-Erstellung an unseren Server übertragen
            und danach <strong>sofort gelöscht</strong>. Es erfolgt keine dauerhafte Speicherung.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-brand-dark mb-2">5. Hosting & Infrastruktur</h2>
          <p>
            Diese Website wird über <strong>Netlify, Inc.</strong> (44 Montgomery Street, Suite 300,
            San Francisco, CA 94104, USA) gehostet. Beim Aufruf werden Standard-Serverlogdaten
            (IP-Adresse, Datum/Uhrzeit, aufgerufene URL) verarbeitet.
            Datenschutzrichtlinie: <a href="https://www.netlify.com/privacy/" className="text-brand-mid" target="_blank" rel="noopener noreferrer">netlify.com/privacy</a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-brand-dark mb-2">6. Cookies</h2>
          <p>
            Diese Website verwendet <strong>keine Tracking-Cookies</strong> und keine
            Analyse-Tools (z.B. Google Analytics). Es werden nur technisch notwendige
            Browser-Funktionen genutzt.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-brand-dark mb-2">7. Ihre Rechte (DSGVO)</h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit sowie das Recht auf Widerspruch. Da wir keine personenbezogenen Daten
            dauerhaft speichern, sind diese Rechte technisch bereits durch das System gewährleistet.
          </p>
          <p className="mt-2">
            Für Anfragen: <a href="mailto:office@evrobo.dev" className="text-brand-mid">office@evrobo.dev</a>
          </p>
          <p className="mt-2">
            Sie haben das Recht, Beschwerde bei der österreichischen Datenschutzbehörde einzulegen:{' '}
            <a href="https://www.dsb.gv.at" className="text-brand-mid" target="_blank" rel="noopener noreferrer">dsb.gv.at</a>
          </p>
        </section>

        <p className="text-xs text-gray-400 pt-2">Stand: März 2026</p>
      </div>
    </div>
  )
}
