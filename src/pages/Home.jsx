import { Link } from 'react-router-dom'

const CONTRACT_TYPES = [
  {
    to: '/kfz-kaufvertrag',
    icon: <IconCar />,
    title: 'KFZ Kaufvertrag',
    description: 'Zulassungsschein scannen – KI liest alle Fahrzeugdaten automatisch aus.',
    badge: 'Jetzt kostenlos',
    available: true,
  },
  {
    to: '#',
    icon: <IconHouse />,
    title: 'Mietvertrag',
    description: 'Für die Vermietung von Wohnungen und Häusern nach österreichischem Mietrecht.',
    badge: 'Demnächst',
    available: false,
  },
  {
    to: '#',
    icon: <IconBriefcase />,
    title: 'Arbeitsvertrag',
    description: 'Für Dienstnehmer in österreichischen Unternehmen, ASVG-konform.',
    badge: 'Demnächst',
    available: false,
  },
  {
    to: '#',
    icon: <IconLetter />,
    title: 'Kündigung',
    description: 'Kündigung von Dienstverhältnissen, Mietverträgen und Abonnements.',
    badge: 'Demnächst',
    available: false,
  },
]

const PROCESS_STEPS = [
  { icon: <IconStepCamera />, label: 'Zulassungsschein', sub: 'fotografieren' },
  { icon: <IconStepAI />,     label: 'KI liest',          sub: 'alle Daten aus' },
  { icon: <IconStepSign />,   label: 'Unterschreiben',    sub: '& PDF fertig' },
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
              Zulassungsschein fotografieren, KI liest alle Fahrzeugdaten aus,
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

      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Vertragstypen */}
        <div className="space-y-3 mb-10">
          {CONTRACT_TYPES.map(({ to, icon, title, description, badge, available }) => {
            const content = (
              <div className={[
                'bg-white border rounded-lg p-5 flex items-start gap-4 transition-all duration-150',
                available
                  ? 'border-l-4 border-l-brand-red border-line hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
                  : 'border-line opacity-50 cursor-not-allowed',
              ].join(' ')}>
                <div className={[
                  'flex-shrink-0 w-12 h-12 rounded-md flex items-center justify-center',
                  available ? 'bg-brand-light text-brand-dark' : 'bg-gray-100 text-gray-400',
                ].join(' ')}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-semibold text-brand-dark">{title}</h2>
                    <span className={available ? 'badge-available' : 'badge-soon'}>
                      {badge}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                </div>
                {available && (
                  <svg className="w-5 h-5 text-brand-red flex-shrink-0 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            )

            return available ? (
              <Link key={title} to={to}>{content}</Link>
            ) : (
              <div key={title}>{content}</div>
            )
          })}
        </div>

        {/* Vorher / Nachher */}
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
                  'KI füllt alles automatisch aus',
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

// --- Process Step Icons ---
function IconStepCamera() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  )
}

function IconStepAI() {
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

// --- Contract Type Icons ---
function IconCar() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  )
}

function IconHouse() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  )
}

function IconBriefcase() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  )
}

function IconLetter() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}
