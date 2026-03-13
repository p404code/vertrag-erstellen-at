import { useState } from 'react'
import ScanUpload from '../components/ScanUpload'
import SignatureCanvas from '../components/SignatureCanvas'

const STEPS = [
  { label: 'Fahrzeug & Verkäufer', short: '1' },
  { label: 'Käufer & Details',     short: '2' },
  { label: 'PDF',                  short: '3' },
]

const INITIAL_FORM = {
  kennzeichen: '',
  marke: '',
  modell: '',
  fin: '',
  erstzulassung: '',
  kraftstoff: '',
  farbe: '',
  leistungKw: '',
  kilometerstand: '',
  verkaefer_name: '',
  verkaefer_adresse: '',
  verkaefer_geburtsdatum: '',
  kaeufer_vorname: '',
  kaeufer_nachname: '',
  kaeufer_adresse: '',
  kaeufer_geburtsdatum: '',
  kaufpreis: '',
  zahlungsart: 'Barzahlung',
  verkaefer_signature: '',
  kaeufer_signature: '',
  uebergabedatum: '',
  ort: '',
  datum: new Date().toLocaleDateString('de-AT'),
  gewährleistung_ausgeschlossen: true,
  bekannte_maengel: '',
}

export default function KfzKaufvertrag() {
  const [step, setStep] = useState(0)   // 0 = Start, 1–4 = Wizard
  const [form, setForm] = useState(INITIAL_FORM)
  const [generating, setGenerating] = useState(false)
  const [pdfError, setPdfError] = useState(null)

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function handleScanResult(data) {
    setForm(f => ({
      ...f,
      kennzeichen:      data.kennzeichen      || f.kennzeichen,
      marke:            data.marke            || f.marke,
      modell:           data.modell           || f.modell,
      fin:              data.fin              || f.fin,
      erstzulassung:    data.erstzulassung    || f.erstzulassung,
      kraftstoff:       data.kraftstoff       || f.kraftstoff,
      farbe:            data.farbe            || f.farbe,
      leistungKw:       data.leistungKw       || f.leistungKw,
      verkaefer_name:    data.besitzer_name    || f.verkaefer_name,
      verkaefer_adresse: data.besitzer_adresse || f.verkaefer_adresse,
    }))
    setStep(1)
  }

  async function generatePdf() {
    setGenerating(true)
    setPdfError(null)
    try {
      const pdfUrl    = import.meta.env.VITE_PDF_SERVICE_URL || 'http://localhost:3001'
      const secret    = import.meta.env.VITE_PDF_API_SECRET  || ''
      const res = await fetch(`${pdfUrl}/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
        },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('PDF-Generierung fehlgeschlagen')
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const filename = `KFZ-Kaufvertrag-${form.kennzeichen || 'Fahrzeug'}.pdf`
      if (navigator.canShare?.({ files: [new File([blob], filename, { type: 'application/pdf' })] })) {
        await navigator.share({ files: [new File([blob], filename, { type: 'application/pdf' })], title: 'KFZ Kaufvertrag' })
      } else {
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
      }
      URL.revokeObjectURL(url)
    } catch (err) {
      setPdfError(err.message)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      {/* Seitentitel */}
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-brand-red mb-2">
          Vertrags-Generator
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark">
          KFZ Kaufvertrag erstellen
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Kostenlos · Für österreichisches Recht · PDF in 2 Minuten
        </p>
      </div>

      {/* Schritt-Indikator (nur bei Schritten 1–4) */}
      {step >= 1 && (
        <StepIndicator current={step} steps={STEPS} />
      )}

      {/* ── SCHRITT 0: Start ── */}
      {step === 0 && (
        <div className="card">
          <p className="section-heading">Wie möchten Sie beginnen?</p>
          <p className="text-sm text-gray-600 mb-5">
            Fotografieren Sie den Zulassungsschein – die KI liest die Fahrzeugdaten automatisch aus
            und füllt das Formular vor.
          </p>
          <ScanUpload
            onScanResult={handleScanResult}
            onManual={() => setStep(1)}
          />
        </div>
      )}

      {/* ── SCHRITT 1: Fahrzeugdaten ── */}
      {step === 1 && (
        <div className="card space-y-4">
          <p className="section-heading">Fahrzeugdaten</p>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Kennzeichen"   value={form.kennzeichen}   onChange={v => set('kennzeichen', v)}   placeholder="W-12345X" />
            <Field label="Erstzulassung" value={form.erstzulassung} onChange={v => set('erstzulassung', v)} placeholder="MM/JJJJ" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Marke"      value={form.marke}   onChange={v => set('marke', v)}   placeholder="VW" />
            <Field label="Modell/Typ" value={form.modell}  onChange={v => set('modell', v)}  placeholder="Golf" />
          </div>
          <Field label="Fahrgestellnummer (FIN / VIN)" value={form.fin} onChange={v => set('fin', v)} placeholder="WVW..." />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Kraftstoff"    value={form.kraftstoff} onChange={v => set('kraftstoff', v)} placeholder="Benzin" />
            <Field label="Farbe"         value={form.farbe}      onChange={v => set('farbe', v)}      placeholder="Silber" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Leistung (kW)"  value={form.leistungKw}     onChange={v => set('leistungKw', v)}     placeholder="85" inputMode="numeric" />
            <Field label="Kilometerstand" value={form.kilometerstand} onChange={v => set('kilometerstand', v)} placeholder="85000" inputMode="numeric" />
          </div>
          <div className="border-t border-line pt-4 space-y-3">
            <p className="section-heading">Verkäufer / Zulassungsbesitzer</p>
            <Field label="Name / Firmenname" value={form.verkaefer_name} onChange={v => set('verkaefer_name', v)} placeholder="Max Mustermann oder Musterfirma GmbH" />
            <Field label="Adresse (Straße, PLZ Ort)" value={form.verkaefer_adresse} onChange={v => set('verkaefer_adresse', v)} placeholder="Grillgasse 51/201, 1110 Wien" />
            <Field label="Geburtsdatum (bei Privatperson, optional bei Firma)" value={form.verkaefer_geburtsdatum} onChange={v => set('verkaefer_geburtsdatum', v)} placeholder="TT.MM.JJJJ" />
          </div>

          <StepNav onBack={() => setStep(0)} onNext={() => setStep(2)} />
        </div>
      )}

      {/* ── SCHRITT 2: Käufer & Details ── */}
      {step === 2 && (
        <div className="card space-y-5">
          <div>
            <p className="section-heading">Käufer/in</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Field label="Vorname"  value={form.kaeufer_vorname}  onChange={v => set('kaeufer_vorname', v)} />
              <Field label="Nachname" value={form.kaeufer_nachname} onChange={v => set('kaeufer_nachname', v)} />
            </div>
            <Field label="Adresse (Straße, PLZ Ort)" value={form.kaeufer_adresse}      onChange={v => set('kaeufer_adresse', v)}      className="mb-3" />
            <Field label="Geburtsdatum"              value={form.kaeufer_geburtsdatum} onChange={v => set('kaeufer_geburtsdatum', v)} placeholder="TT.MM.JJJJ" />
          </div>

          <div className="border-t border-line pt-4 space-y-4">
            <p className="section-heading">Kaufpreis &amp; Zahlung</p>

            <Field label="Kaufpreis (EUR)" value={form.kaufpreis} onChange={v => set('kaufpreis', v)} placeholder="5000" inputMode="numeric" />

            <div>
              <label className="label">Zahlungsart</label>
              <select
                value={form.zahlungsart}
                onChange={e => set('zahlungsart', e.target.value)}
                className="input-field"
              >
                <option>Barzahlung</option>
                <option>Überweisung</option>
                <option>Barzahlung bei Übergabe</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Übergabedatum" value={form.uebergabedatum} onChange={v => set('uebergabedatum', v)} placeholder="TT.MM.JJJJ" />
              <Field label="Ort"           value={form.ort}            onChange={v => set('ort', v)}            placeholder="Wien" />
            </div>

            <div className="border-t border-line pt-4">
              <p className="text-xs font-semibold tracking-widest uppercase text-brand-dark mb-3">
                Gewährleistung
              </p>
              <label className="flex items-start gap-3 cursor-pointer p-3 bg-brand-light border border-brand-mid/20 rounded-md">
                <input
                  type="checkbox"
                  checked={form.gewährleistung_ausgeschlossen}
                  onChange={e => set('gewährleistung_ausgeschlossen', e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-brand-dark flex-shrink-0"
                />
                <span className="text-sm text-brand-dark">
                  <strong>Gewährleistung ausschließen</strong>
                  <span className="block text-xs text-gray-500 mt-0.5 font-normal">
                    Empfohlen bei Privatverkäufen – gemäß § 929 ABGB zulässig
                  </span>
                </span>
              </label>
            </div>

            <div>
              <label className="label">Bekannte Mängel (optional)</label>
              <textarea
                value={form.bekannte_maengel}
                onChange={e => set('bekannte_maengel', e.target.value)}
                placeholder="z.B. Kratzer an der Heckstoßstange, Klimaanlage defekt…"
                rows={3}
                className="input-field resize-none"
              />
            </div>
          </div>

          <StepNav onBack={() => setStep(1)} onNext={() => setStep(3)} />
        </div>
      )}

      {/* ── SCHRITT 3: PDF ── */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="card">
            <p className="section-heading">Zusammenfassung</p>

            <div className="divide-y divide-border text-sm mb-5">
              <SummaryRow label="Fahrzeug"      value={`${form.marke} ${form.modell}`.trim() || '–'} />
              <SummaryRow label="Kennzeichen"   value={form.kennzeichen    || '–'} />
              <SummaryRow label="Kaufpreis"     value={form.kaufpreis ? `EUR ${form.kaufpreis},–` : '–'} />
              <SummaryRow label="Übergabe"      value={form.uebergabedatum || '–'} />
              <SummaryRow label="Gewährleistung" value={form.gewährleistung_ausgeschlossen ? 'Ausgeschlossen (§ 929 ABGB)' : 'Gesetzlich'} />
            </div>

            <div className="border-t border-line pt-4 space-y-5">
              <p className="section-heading">Unterschriften</p>
              <div>
                <label className="label">Unterschrift Verkäufer/in</label>
                <SignatureCanvas
                  onSigned={b64 => set('verkaefer_signature', b64)}
                  onClear={() => set('verkaefer_signature', '')}
                />
              </div>
              <div>
                <label className="label">Unterschrift Käufer/in</label>
                <SignatureCanvas
                  onSigned={b64 => set('kaeufer_signature', b64)}
                  onClear={() => set('kaeufer_signature', '')}
                />
              </div>
            </div>

            {pdfError && (
              <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3 text-sm text-red-700 mb-4">
                {pdfError}
              </div>
            )}

            <button
              onClick={generatePdf}
              disabled={generating}
              className="btn-primary w-full flex items-center justify-center gap-2 text-base disabled:opacity-60"
            >
              {generating ? (
                <>
                  <Spinner />
                  PDF wird erstellt…
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  PDF erstellen &amp; herunterladen
                </>
              )}
            </button>
          </div>

          <button
            onClick={() => setStep(2)}
            className="text-sm text-gray-500 w-full text-center py-2 hover:text-brand-dark transition-colors"
          >
            ← Zurück zum Bearbeiten
          </button>
        </div>
      )}

      {/* SEO-Inhalt nur auf Start-Seite */}
      {step === 0 && <SeoContent />}
    </div>
  )
}

// ----- Sub-Komponenten -----

function StepIndicator({ current, steps }) {
  return (
    <div className="flex items-center mb-6 overflow-x-auto pb-2">
      {steps.map((s, i) => {
        const num      = i + 1
        const done     = current > num
        const active   = current === num

        return (
          <div key={s.label} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center">
              <div className={[
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all',
                done   ? 'bg-brand-red border-brand-red text-white'      : '',
                active ? 'bg-brand-dark border-brand-dark text-white'    : '',
                !done && !active ? 'bg-white border-line text-gray-400' : '',
              ].join(' ')}>
                {done ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : num}
              </div>
              <span className={[
                'text-xs mt-1 font-medium whitespace-nowrap',
                active ? 'text-brand-dark' : 'text-gray-400',
              ].join(' ')}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={[
                'h-0.5 w-8 sm:w-12 mx-1 mb-5 flex-shrink-0',
                current > num ? 'bg-brand-red' : 'bg-border',
              ].join(' ')} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function Field({ label, value, onChange, placeholder, inputMode, className }) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="input-field"
      />
    </div>
  )
}

function StepNav({ onBack, onNext }) {
  return (
    <div className="flex gap-3 pt-2 border-t border-line">
      <button onClick={onBack} className="btn-secondary flex-1">← Zurück</button>
      <button onClick={onNext} className="btn-primary flex-1">Weiter →</button>
    </div>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between py-2.5">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-brand-dark text-right">{value}</span>
    </div>
  )
}

function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  )
}

function SeoContent() {
  return (
    <div className="mt-12 space-y-8 text-sm text-gray-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "Was muss ein KFZ Kaufvertrag in Österreich beinhalten?", "acceptedAnswer": { "@type": "Answer", "text": "Ein gültiger KFZ Kaufvertrag in Österreich sollte Namen und Adressen beider Parteien, Fahrzeugbeschreibung (Kennzeichen, FIN, Marke, Modell), Kaufpreis, Zahlungsart, Übergabedatum sowie Angaben zur Gewährleistung und bekannte Mängel enthalten." } },
              { "@type": "Question", "name": "Kann ich beim Privatverkauf die Gewährleistung ausschließen?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Beim Privatverkauf zwischen Privatpersonen kann die Gewährleistung gemäß § 929 ABGB vertraglich ausgeschlossen werden – solange keine Mängel arglistig verschwiegen werden." } },
              { "@type": "Question", "name": "Wer muss das Fahrzeug ab- und ummelden?", "acceptedAnswer": { "@type": "Answer", "text": "In Österreich ist der Käufer für die Ummeldung des Fahrzeuges zuständig. Die Ummeldung muss innerhalb von 3 Monaten nach dem Kauf bei der Zulassungsstelle erfolgen." } },
              { "@type": "Question", "name": "Brauche ich beim Autoverkauf einen Notar?", "acceptedAnswer": { "@type": "Answer", "text": "Nein. Ein KFZ Kaufvertrag in Österreich muss nicht notariell beglaubigt werden. Ein schriftlicher Vertrag zwischen Verkäufer und Käufer ist ausreichend." } },
              { "@type": "Question", "name": "Was passiert mit der Versicherung beim Autoverkauf?", "acceptedAnswer": { "@type": "Answer", "text": "Mit der Eigentumsübertragung erlischt die Haftpflichtversicherung des Verkäufers. Der Käufer muss das Fahrzeug unverzüglich selbst versichern." } },
            ]
          })
        }}
      />

      <div className="border-t border-line pt-8">
        <h2 className="text-lg font-bold text-brand-dark mb-3">
          KFZ Kaufvertrag in Österreich – Was Sie wissen müssen
        </h2>
        <p className="mb-3">
          Ein sorgfältig ausgefüllter KFZ Kaufvertrag schützt sowohl Verkäufer als auch Käufer vor
          rechtlichen Streitigkeiten. In Österreich ist kein Notar erforderlich – ein schriftlicher
          Vertrag zwischen den Parteien genügt.
        </p>
        <p>
          Mit unserem kostenlosen Generator erstellen Sie in wenigen Minuten einen rechtssicheren
          KFZ Kaufvertrag nach österreichischem Recht (ABGB). Einfach Zulassungsschein fotografieren,
          fehlende Daten ergänzen und das PDF herunterladen.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-brand-dark mb-2">Gewährleistung beim Privatverkauf</h3>
        <p className="mb-2">
          Im österreichischen Privatverkauf kann die Gewährleistung gemäß <strong>§ 929 ABGB</strong>{' '}
          wirksam ausgeschlossen werden. Das bedeutet: Der Käufer akzeptiert das Fahrzeug im
          bestehenden Zustand und kann nachträglich keine Mängelrüge geltend machen –
          <em> außer der Verkäufer hat Mängel arglistig verschwiegen</em>.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-brand-dark mb-4">Häufig gestellte Fragen</h3>
        <div className="space-y-2">
          {[
            { q: 'Was muss ein KFZ Kaufvertrag in Österreich beinhalten?', a: 'Namen und Adressen beider Parteien, Fahrzeugbeschreibung (Kennzeichen, FIN, Marke, Modell), Kaufpreis, Zahlungsart, Übergabedatum sowie Angaben zur Gewährleistung und bekannte Mängel.' },
            { q: 'Kann ich beim Privatverkauf die Gewährleistung ausschließen?', a: 'Ja – beim Privatverkauf zwischen Privatpersonen ist der Gewährleistungsausschluss gemäß § 929 ABGB zulässig. Mängel dürfen jedoch nicht arglistig verschwiegen werden.' },
            { q: 'Wer meldet das Fahrzeug um?', a: 'Der Käufer ist für die Ummeldung zuständig. Diese muss innerhalb von 3 Monaten bei der Zulassungsstelle erfolgen.' },
            { q: 'Brauche ich einen Notar?', a: 'Nein. Ein schriftlicher Privatvertrag ist in Österreich ausreichend. Erstellen Sie zwei Exemplare – je eines für Verkäufer und Käufer.' },
            { q: 'Was passiert mit der Versicherung?', a: 'Mit dem Eigentumsübergang erlischt die Versicherung des Verkäufers. Der Käufer muss das Fahrzeug sofort selbst versichern.' },
          ].map(({ q, a }) => (
            <details key={q} className="bg-white border border-line rounded-md">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center px-4 py-3 text-sm text-brand-dark">
                {q}
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-4 pb-4 pt-1 text-gray-600 text-sm border-t border-line">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
