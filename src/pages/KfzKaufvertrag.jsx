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

const PROCESS_STEPS = [
  { icon: <IconStepCamera />, label: 'Zulassungsschein', sub: 'fotografieren' },
  { icon: <IconStepOCR />,    label: 'OCR liest',        sub: 'alle Daten aus' },
  { icon: <IconStepSign />,   label: 'Unterschreiben',   sub: '& PDF fertig' },
]

export default function KfzKaufvertrag() {
  const [step, setStep] = useState(0)
  const [startChoice, setStartChoice] = useState(null)
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

  function scrollToGenerator() {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>

      {/* ── Hero ── */}
      <div className="bg-white border-b border-line">
        <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-brand-red mb-3">
            Kostenloser Vertrags-Generator · Österreichisches Recht
          </p>

          <div className="border-l-4 border-brand-red pl-4 mb-7">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark leading-tight mb-3">
              KFZ Kaufvertrag kostenlos erstellen
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
              Zulassungsschein fotografieren, alle Fahrzeugdaten werden automatisch erkannt,
              digital unterschreiben – PDF sofort fertig.{' '}
              <span className="font-semibold text-brand-dark">Kostenlos. Für Österreich.</span>
            </p>
          </div>

          {/* 3-Schritt-Prozess */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 mb-8">
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-0">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-light rounded-full p-2.5 flex-shrink-0 text-brand-dark">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-dark leading-tight">{s.label}</p>
                    <p className="text-xs text-gray-500">{s.sub}</p>
                  </div>
                </div>
                {i < PROCESS_STEPS.length - 1 && (
                  <svg className="hidden sm:block w-4 h-4 text-brand-red mx-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <button onClick={scrollToGenerator} className="btn-primary inline-flex items-center gap-2">
            Jetzt kostenlos erstellen
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── So funktioniert's ── */}
      <section id="so-funktionierts" className="max-w-3xl mx-auto px-4 py-10">
        <div className="border-b border-line pb-10">
          <h2 className="text-xl font-bold text-brand-dark mb-4">
            So funktioniert's – KFZ Kaufvertrag als PDF erstellen
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-line rounded-lg p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Früher</p>
              <ul className="space-y-2.5">
                {[
                  'FIN mühsam ablesen & abtippen',
                  'Formular per Hand ausfüllen',
                  'Ausdrucken & unterschreiben',
                  'Kopie machen & aufbewahren',
                ].map(t => (
                  <li key={t} className="flex items-start gap-2 text-sm text-gray-400">
                    <svg className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="line-through">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-light border border-brand-mid/20 rounded-lg p-4">
              <p className="text-xs font-semibold text-brand-dark uppercase tracking-wider mb-3">Mit vertrag-erstellen.at</p>
              <ul className="space-y-2.5">
                {[
                  'Einfach fotografieren',
                  'Automatisch ausgefüllt',
                  'Digital unterschreiben',
                  'PDF sofort am Handy',
                ].map(t => (
                  <li key={t} className="flex items-start gap-2 text-sm text-brand-dark font-medium">
                    <svg className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Generator ── */}
      <div id="generator" className="max-w-3xl mx-auto px-4 pb-8">

        {/* Seitentitel */}
        <div className="border-l-4 border-brand-red pl-4 mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-brand-red mb-1">
            Vertrags-Generator
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">
            KFZ Kaufvertrag erstellen
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Kostenlos · Für österreichisches Recht · PDF in 2 Minuten
          </p>
        </div>

        {/* Schritt-Indikator (nur bei Schritten 1–3) */}
        {step >= 1 && (
          <StepIndicator current={step} steps={STEPS} />
        )}

        {/* ── SCHRITT 0: Start ── */}
        {step === 0 && (
          <>
            {startChoice === 'scan' ? (
              <div className="card">
                <ScanUpload
                  onScanResult={handleScanResult}
                  onManual={() => setStep(1)}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Scan-Tile */}
                <button
                  onClick={() => setStartChoice('scan')}
                  className="text-left bg-white border-2 border-brand-red rounded-lg p-6 hover:shadow-md transition-all duration-150 active:scale-[0.99] cursor-pointer"
                >
                  <div className="bg-brand-light rounded-full w-12 h-12 flex items-center justify-center text-brand-dark mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-brand-dark">Zulassungsschein scannen</p>
                    <span className="badge-available">⚡ Empfohlen</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    KI liest alle Fahrzeugdaten automatisch aus – du prüfst kurz und weiter.
                  </p>
                </button>

                {/* Manuell-Tile */}
                <button
                  onClick={() => setStep(1)}
                  className="text-left bg-white border border-line rounded-lg p-6 hover:shadow-md hover:border-brand-dark/30 transition-all duration-150 active:scale-[0.99] cursor-pointer"
                >
                  <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center text-gray-400 mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                    </svg>
                  </div>
                  <p className="font-semibold text-brand-dark mb-2">Manuell ausfüllen</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Alle Felder selbst eingeben.
                  </p>
                </button>
              </div>
            )}
          </>
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
      </div>

      {/* ── SEO Content + FAQ + Impressum + Datenschutz ── */}
      <SeoContent />
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

function AccordionSection({ id, title, children }) {
  return (
    <details id={id} className="bg-white border border-line rounded-md group">
      <summary className="font-semibold cursor-pointer list-none flex justify-between items-center px-5 py-4 text-brand-dark">
        {title}
        <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-5 pb-5 pt-2 border-t border-line text-sm text-gray-700 space-y-4">
        {children}
      </div>
    </details>
  )
}

function SeoContent() {
  const FAQ_ITEMS = [
    {
      q: 'Was muss in einen KFZ-Kaufvertrag?',
      a: 'Ein gültiger KFZ-Kaufvertrag in Österreich muss Namen und Adressen beider Vertragsparteien, eine genaue Fahrzeugbeschreibung (Marke, Modell, Kennzeichen, Fahrgestellnummer), den vereinbarten Kaufpreis, die Zahlungsart, das Übergabedatum sowie Angaben zur Gewährleistung und bekannten Mängeln enthalten.'
    },
    {
      q: 'Braucht man einen Notar beim Autoverkauf?',
      a: 'Nein. Ein KFZ-Kaufvertrag in Österreich muss nicht notariell beglaubigt werden. Ein schriftlicher Vertrag zwischen Verkäufer und Käufer ist vollkommen ausreichend. Wir empfehlen, zwei Exemplare zu erstellen – je eines für jede Vertragspartei.'
    },
    {
      q: 'Was bedeutet Gewährleistungsausschluss?',
      a: 'Beim Privatverkauf zwischen Privatpersonen kann die Gewährleistung gemäß § 929 ABGB vertraglich ausgeschlossen werden. Das bedeutet: Der Käufer akzeptiert das Fahrzeug im bestehenden Zustand. Achtung: Der Ausschluss greift nicht, wenn der Verkäufer Mängel arglistig verschwiegen hat.'
    },
    {
      q: 'Ist der Kaufvertrag rechtsgültig?',
      a: 'Ja. Ein schriftlicher Kaufvertrag zwischen Privatpersonen ist in Österreich rechtsgültig und bindend. Unser Generator erstellt einen Vertrag nach österreichischem Recht (ABGB), der alle wesentlichen Vertragsbestandteile enthält. Für komplexe Sachverhalte empfehlen wir zusätzlich eine Rechtsberatung.'
    },
    {
      q: 'Muss ich das Auto abmelden?',
      a: 'Der Käufer ist für die Ummeldung des Fahrzeugs zuständig. Die Ummeldung muss innerhalb von einem Monat bei der zuständigen Zulassungsstelle erfolgen. Der Verkäufer sollte sich eine Bestätigung der Ummeldung geben lassen oder das Fahrzeug selbst vorab abmelden.'
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">

      {/* Schema.org FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQ_ITEMS.map(({ q, a }) => ({
              "@type": "Question",
              "name": q,
              "acceptedAnswer": { "@type": "Answer", "text": a }
            }))
          })
        }}
      />

      {/* ── SEO Textblock ── */}
      <article id="ratgeber" className="border-t border-line pt-8">
        <h2 className="text-xl font-bold text-brand-dark mb-4">
          KFZ Kaufvertrag in Österreich – alles was Sie wissen müssen
        </h2>

        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            Wer in Österreich ein gebrauchtes Auto privat kauft oder verkauft, braucht einen schriftlichen
            KFZ-Kaufvertrag. Auch wenn mündliche Vereinbarungen grundsätzlich gültig sind, schützt ein
            sorgfältig ausgefüllter Kaufvertrag beide Seiten vor späteren Streitigkeiten. Mit unserem
            kostenlosen Generator erstellen Sie in wenigen Minuten einen vollständigen Auto-Kaufvertrag
            nach österreichischem Recht – als PDF, direkt am Handy.
          </p>

          <h3 className="font-semibold text-brand-dark pt-2">Was muss in einen KFZ-Kaufvertrag in Österreich?</h3>
          <p>
            Ein rechtsgültiger Kaufvertrag für ein Auto sollte alle wesentlichen Informationen zum Fahrzeug
            und zu beiden Vertragsparteien enthalten. Dazu gehören: Name und Adresse von Verkäufer und Käufer,
            eine genaue Fahrzeugbeschreibung mit Marke, Modell, Fahrgestellnummer (FIN) und amtlichem Kennzeichen,
            der vereinbarte Kaufpreis, die Zahlungsart sowie das Übergabedatum. Ebenfalls wichtig ist eine
            Regelung zur Gewährleistung und die Angabe bekannter Mängel.
          </p>

          <h3 className="font-semibold text-brand-dark pt-2">Gewährleistung vs. Garantie beim Autokauf</h3>
          <p>
            Im österreichischen Recht ist die Gewährleistung (§§ 922 ff ABGB) von der Garantie zu unterscheiden.
            Die Gewährleistung ist gesetzlich geregelt und gilt automatisch – der Verkäufer haftet für Mängel,
            die zum Zeitpunkt der Übergabe bereits bestanden haben. Beim Privatverkauf zwischen Privatpersonen
            kann die Gewährleistung gemäß § 929 ABGB jedoch wirksam ausgeschlossen werden. Ein solcher
            Gewährleistungsausschluss ist nur dann unwirksam, wenn der Verkäufer Mängel arglistig verschwiegen hat.
          </p>

          <h3 className="font-semibold text-brand-dark pt-2">Kaufvertrag Auto Vorlage – worauf achten?</h3>
          <p>
            Eine gute Kaufvertrag-Vorlage für Österreich berücksichtigt die Besonderheiten des ABGB und enthält
            vorformulierte Klauseln zu Gewährleistungsausschluss, Eigentumsübertragung und Mängeloffenlegung.
            Unser kostenloser Auto-Kaufvertrag-PDF-Generator füllt alle relevanten Felder automatisch aus –
            Sie können den Zulassungsschein einfach abfotografieren, und die Fahrzeugdaten werden per
            automatischer Texterkennung übernommen. So vermeiden Sie Tippfehler bei der Fahrgestellnummer
            und sparen sich das mühsame Abtippen.
          </p>

          <h3 className="font-semibold text-brand-dark pt-2">Nach dem Kauf: Ummeldung und Versicherung</h3>
          <p>
            Nach dem Autokauf muss das Fahrzeug vom Käufer bei der zuständigen Zulassungsstelle umgemeldet werden.
            Die bestehende KFZ-Haftpflichtversicherung des Verkäufers erlischt mit dem Eigentümerwechsel – der
            Käufer muss vor der Ummeldung eine eigene Versicherung abschließen. Auch eventuelle NoVA-Pflichten
            sollten vorab geklärt werden.
          </p>
        </div>
      </article>

      {/* ── FAQ ── */}
      <section id="faq">
        <h2 className="text-xl font-bold text-brand-dark mb-4">Häufige Fragen</h2>
        <div className="space-y-2">
          {FAQ_ITEMS.map(({ q, a }) => (
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
      </section>

      {/* ── Impressum (Accordion) ── */}
      <AccordionSection id="impressum" title="Impressum">
        <div>
          <h3 className="font-semibold text-brand-dark mb-2">Angaben gemäß § 5 ECG</h3>
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
        </div>

        <div>
          <h3 className="font-semibold text-brand-dark mb-2">Haftungsausschluss</h3>
          <p>
            Die auf vertrag-erstellen.at bereitgestellten Vertragsvorlagen sind unverbindliche Muster
            und ersetzen keine individuelle Rechtsberatung. Für die Richtigkeit und Vollständigkeit
            der Vorlagen wird keine Haftung übernommen. Bei rechtlich relevanten Fragen empfehlen
            wir die Konsultation eines Rechtsanwalts.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-brand-dark mb-2">EU-Streitschlichtung</h3>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{' '}
            <a href="https://ec.europa.eu/consumers/odr" className="text-brand-mid" target="_blank" rel="noopener noreferrer">
              ec.europa.eu/consumers/odr
            </a>
          </p>
        </div>
      </AccordionSection>

      {/* ── Datenschutz (Accordion) ── */}
      <AccordionSection id="datenschutz" title="Datenschutzerklärung">
        <div>
          <h3 className="font-semibold text-brand-dark mb-2">1. Verantwortlicher</h3>
          <p>
            EVROBO Ltd., Georg-Washington-Straße 13, 1000 Sofia, Bulgarien<br />
            Kontakt: <a href="mailto:office@evrobo.dev" className="text-brand-mid">office@evrobo.dev</a>
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-brand-dark mb-2">2. Datenverarbeitung</h3>
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
        </div>

        <div>
          <h3 className="font-semibold text-brand-dark mb-2">3. Hosting</h3>
          <p>
            Diese Website wird über einen externen Hosting-Anbieter bereitgestellt.
            Beim Aufruf werden technische Zugriffsdaten (IP-Adresse, Datum/Uhrzeit) protokolliert.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-brand-dark mb-2">4. Ihre Rechte</h3>
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
        </div>

        <p className="text-xs text-gray-400 pt-2">Stand: März 2026</p>
      </AccordionSection>
    </div>
  )
}

// --- Icons ---
function IconStepCamera() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  )
}

function IconStepOCR() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  )
}

function IconStepSign() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  )
}
