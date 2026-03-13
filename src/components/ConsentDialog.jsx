export default function ConsentDialog({ onAccept, onDecline }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white border border-line rounded-lg w-full max-w-md shadow-xl">

        {/* Header */}
        <div className="border-b-2 border-brand-red px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-brand-light flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-brand-dark text-base leading-tight">Datenschutz-Hinweis</h2>
            <p className="text-xs text-gray-500">Bitte vor dem Scan lesen</p>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-3 text-sm text-gray-700">
          <p>
            Das Foto Ihres Zulassungsscheins wird zur Texterkennung an die{' '}
            <strong>Anthropic Claude API</strong> übertragen.
          </p>

          <div className="space-y-2">
            {[
              'Das Bild wird nicht dauerhaft gespeichert.',
              'Keine Verwendung für KI-Training.',
              'Verarbeitung gemäß DSGVO Art. 6 Abs. 1 lit. a.',
            ].map(text => (
              <div key={text} className="flex items-start gap-2">
                <svg className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{text}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400">
            Details:{' '}
            <a href="/datenschutz" className="text-brand-mid underline" target="_blank" rel="noopener">
              Datenschutzerklärung
            </a>
          </p>
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex flex-col gap-2">
          <button onClick={onAccept} className="btn-primary w-full text-center">
            Einverstanden – Foto machen
          </button>
          <button
            onClick={onDecline}
            className="text-sm text-gray-500 py-2 text-center hover:text-brand-dark transition-colors"
          >
            Abbrechen – manuell ausfüllen
          </button>
        </div>
      </div>
    </div>
  )
}
