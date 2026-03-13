import { Outlet, Link, useLocation } from 'react-router-dom'

export default function Layout() {
  const { pathname } = useLocation()
  const isContractPage = pathname !== '/'

  return (
    <div className="min-h-screen flex flex-col bg-surface">

      {/* Österreich-Rot Akzentstreifen */}
      <div className="h-1 bg-brand-red w-full flex-shrink-0" />

      {/* Header */}
      <header className="bg-white border-b border-line shadow-sm flex-shrink-0">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center leading-none">
            <span className="text-xl font-bold text-brand-dark tracking-tight">
              vertrag-erstellen
            </span>
            <span className="text-xl font-bold text-brand-red tracking-tight">.at</span>
          </Link>

          <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-brand-dark
                           bg-brand-light border border-brand-mid/20 px-3 py-1 rounded-full">
            <span>🇦🇹</span>
            Österreichisches Recht
          </span>
        </div>
      </header>

      {/* Disclaimer auf Vertragsseiten */}
      {isContractPage && (
        <div className="bg-brand-light border-b border-brand-mid/20 flex-shrink-0">
          <div className="max-w-3xl mx-auto px-4 py-2 flex items-center gap-2 text-xs text-brand-dark">
            <svg className="w-3.5 h-3.5 flex-shrink-0 text-brand-red" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            <span>
              <strong>Hinweis:</strong> Diese Vorlage ist ein unverbindliches Muster und ersetzt keine Rechtsberatung.
            </span>
          </div>
        </div>
      )}

      {/* Hauptinhalt */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white mt-16">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center mb-2">
                <span className="font-bold text-white">vertrag-erstellen</span>
                <span className="font-bold text-brand-red">.at</span>
              </div>
              <p className="text-xs text-blue-200 mb-4">
                Ein Projekt gebaut, deployt und
              </p>
              <a
                href="https://evrobo.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="evrobo-btn-dark"
              >
                <svg width="28" height="28" viewBox="0 0 100 100" flexShrink="0">
                  <polygon points="50,2 93,27 93,73 50,98 7,73 7,27" fill="#8A9BB5" opacity="0.7"/>
                  <polygon points="50,8 88,30 88,70 50,92 12,70 12,30" fill="#7B8FA8"/>
                  <polygon points="50,92 12,70 12,55 50,77 88,55 88,70" fill="#1B3A5C"/>
                  <path d="M38,35 L58,35 L58,42 L46,42 L46,46 L56,46 L56,53 L46,53 L46,57 L58,57 L58,64 L38,64 Z" fill="white" opacity="0.9"/>
                  <path d="M52,44 L65,50 L52,56 Z" fill="white" opacity="0.85"/>
                </svg>
                <span className="evrobo-btn-dark__label">
                  <span className="evrobo-btn-dark__top">Powered by</span>
                  <span className="evrobo-btn-dark__brand">EVROBO</span>
                </span>
              </a>
            </div>

            <nav className="flex items-center divide-x divide-blue-700 text-xs text-blue-300">
              <Link to="/datenschutz" className="hover:text-white transition-colors pr-3">Datenschutz</Link>
              <span className="pl-3 text-blue-400">© 2026</span>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
