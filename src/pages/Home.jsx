import { Link } from 'react-router-dom'

const PROCESS_STEPS = [
  { icon: <IconStepCamera />, label: 'Zulassungsschein', sub: 'fotografieren' },
  { icon: <IconStepOCR />,    label: 'OCR liest',        sub: 'alle Daten aus' },
  { icon: <IconStepSign />,   label: 'Unterschreiben',   sub: '& PDF fertig' },
]

export default function Home() {
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
              Kein Papier. Kein Abtippen.<br />
              KFZ Kaufvertrag in 2 Minuten.
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

          <Link to="/kfz-kaufvertrag" className="btn-primary inline-flex items-center gap-2">
            Jetzt kostenlos erstellen
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">

        {/* ── KFZ-Card ── */}
        <Link to="/kfz-kaufvertrag">
          <div className="bg-white border-l-4 border-l-brand-red border border-line rounded-lg p-5 flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 cursor-pointer">
            <div className="flex-shrink-0 w-12 h-12 rounded-md flex items-center justify-center bg-brand-light text-brand-dark">
              <IconCar />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-semibold text-brand-dark">KFZ Kaufvertrag</h2>
                <span className="badge-available">Jetzt kostenlos</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Zulassungsschein scannen – OCR liest alle Fahrzeugdaten automatisch aus.
              </p>
            </div>
            <svg className="w-5 h-5 text-brand-red flex-shrink-0 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* ── Vertrag-Preview ── */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
            So sieht Ihr fertiger Vertrag aus
          </p>
          <Link to="/kfz-kaufvertrag" className="block group">
            <div className="bg-white border border-line rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">

              {/* Papier-Header */}
              <div className="flex items-start justify-between mb-4 pb-3 border-b border-line">
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-red mb-0.5">Österreich · ABGB</p>
                  <p className="text-base font-bold text-brand-dark">KFZ Kaufvertrag</p>
                </div>
                <span className="badge-available text-[10px] flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Fertig
                </span>
              </div>

              {/* Datenzeilen */}
              <div className="space-y-2 mb-5 text-xs text-gray-600">
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="text-gray-400 uppercase tracking-wide text-[9px]">Fahrzeug</span><p className="font-medium text-brand-dark">VW Golf 1.4 TSI</p></div>
                  <div><span className="text-gray-400 uppercase tracking-wide text-[9px]">Kennzeichen</span><p className="font-medium text-brand-dark">W-123AB</p></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="text-gray-400 uppercase tracking-wide text-[9px]">Kaufpreis</span><p className="font-medium text-brand-dark">EUR 8.500,–</p></div>
                  <div><span className="text-gray-400 uppercase tracking-wide text-[9px]">Übergabe</span><p className="font-medium text-brand-dark">15.03.2026 · Wien</p></div>
                </div>
                <div><span className="text-gray-400 uppercase tracking-wide text-[9px]">Gewährleistung</span><p className="font-medium text-brand-dark">Ausgeschlossen (§ 929 ABGB)</p></div>
              </div>

              {/* Unterschriften */}
              <div className="border-t border-line pt-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-wide text-gray-400 mb-2">Unterschrift Verkäufer/in</p>
                    <svg viewBox="0 0 120 40" className="w-full h-8 text-brand-dark">
                      <path d="M10,30 C20,10 30,35 45,20 C55,10 60,28 75,22 C85,18 95,28 110,25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <div className="border-t border-gray-300 mt-1" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wide text-gray-400 mb-2">Unterschrift Käufer/in</p>
                    <svg viewBox="0 0 120 40" className="w-full h-8 text-brand-dark">
                      <path d="M8,28 C15,15 25,32 38,18 C48,8 55,30 70,24 C80,20 90,30 112,22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <div className="border-t border-gray-300 mt-1" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-brand-mid mt-2 text-center group-hover:text-brand-dark transition-colors">
              → Jetzt eigenen Vertrag erstellen
            </p>
          </Link>
        </div>

        {/* ── Vorher / Nachher ── */}
        <div className="border-t border-line pt-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
            Der Unterschied
          </p>
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

      </div>
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

function IconCar() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  )
}
