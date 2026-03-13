import { useRef, useEffect, useCallback } from 'react'
import SignaturePad from 'signature_pad'

export default function SignatureCanvas({ onSigned, onClear }) {
  const canvasRef = useRef(null)
  const padRef = useRef(null)

  // Resize canvas to match display resolution
  function resizeCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ratio = Math.max(window.devicePixelRatio || 1, 1)
    const width = canvas.offsetWidth
    canvas.width = width * ratio
    canvas.height = 140 * ratio
    canvas.getContext('2d').scale(ratio, ratio)
    padRef.current?.clear()
    onClear?.()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    padRef.current = new SignaturePad(canvas, {
      penColor: '#1C3A5E',
      backgroundColor: 'rgba(0,0,0,0)',
    })

    padRef.current.addEventListener('endStroke', () => {
      if (!padRef.current.isEmpty()) {
        onSigned?.(padRef.current.toDataURL('image/png'))
      }
    })

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  const handleClear = useCallback(() => {
    padRef.current?.clear()
    onClear?.()
  }, [onClear])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        style={{ height: '140px', width: '100%', touchAction: 'none' }}
        className="border border-line rounded-lg bg-white w-full cursor-crosshair"
      />
      <button
        type="button"
        onClick={handleClear}
        className="absolute top-2 right-2 text-xs text-gray-400 hover:text-brand-dark transition-colors px-2 py-0.5 rounded border border-line bg-white"
      >
        Löschen
      </button>
      <p className="text-xs text-gray-400 mt-1">Hier unterschreiben</p>
    </div>
  )
}
