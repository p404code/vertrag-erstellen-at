import { useRef, useState } from 'react'
import ConsentDialog from './ConsentDialog'

export default function ScanUpload({ onScanResult, onManual }) {
  const [showConsent, setShowConsent] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  function handleScanClick() {
    setShowConsent(true)
  }

  function handleConsentAccept() {
    setShowConsent(false)
    fileInputRef.current?.click()
  }

  function handleConsentDecline() {
    setShowConsent(false)
    onManual()
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    setScanning(true)
    setError(null)

    try {
      const base64 = await fileToBase64(file)
      const mediaType = file.type || 'image/jpeg'

      const scanUrl = import.meta.env.VITE_SCAN_WEBHOOK_URL || '/api/scan-zulassungsschein'
      const res = await fetch(scanUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64, mediaType }),
      })

      if (!res.ok) throw new Error('Scan fehlgeschlagen')
      const data = await res.json()

      if (data.error) throw new Error(data.error)
      onScanResult(data)
    } catch (err) {
      setError(err.message || 'Scan fehlgeschlagen. Bitte manuell ausfüllen.')
    } finally {
      setScanning(false)
      // Reset input so same file can be re-selected
      e.target.value = ''
    }
  }

  return (
    <>
      {showConsent && (
        <ConsentDialog
          onAccept={handleConsentAccept}
          onDecline={handleConsentDecline}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      <div className="space-y-3">
        <button
          onClick={handleScanClick}
          disabled={scanning}
          className="btn-primary w-full flex items-center justify-center gap-2 text-base disabled:opacity-60"
        >
          {scanning ? (
            <>
              <Spinner />
              KI liest Zulassungsschein…
            </>
          ) : (
            <>
              <span className="text-xl">📷</span>
              Zulassungsschein fotografieren
            </>
          )}
        </button>

        <button
          onClick={onManual}
          disabled={scanning}
          className="btn-secondary w-full text-base"
        >
          Manuell ausfüllen
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
            {error}
            <button
              onClick={onManual}
              className="block mt-2 text-red-600 underline font-medium"
            >
              Weiter zum manuellen Formular
            </button>
          </div>
        )}
      </div>
    </>
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

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      // Remove data URL prefix (e.g. "data:image/jpeg;base64,")
      const base64 = reader.result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
