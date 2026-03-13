import { Link } from 'react-router-dom'

const CONTRACT_TYPES = [
  {
    to: '/kfz-kaufvertrag',
    icon: <IconCar />,
    title: 'KFZ Kaufvertrag',
    description: 'Für den Kauf oder Verkauf eines Fahrzeugs in Österreich. Zulassungsschein per Foto einlesen – fertig.',
    badge: 'Verfügbar',
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

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Hero */}
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-brand-red mb-3">
          Kostenloser Vertrags-Generator
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark leading-tight mb-4">
          Österreichische Verträge<br />schnell &amp; rechtssicher erstellen
        </h1>
        <p className="text-base text-gray-600 max-w-xl">
          KI-gestützte Vorlagen für österreichisches Recht – mobil, kostenlos und ohne Registrierung.
          PDF-Download in unter 2 Minuten.
        </p>
      </div>

      {/* Vertragstypen */}
      <div className="space-y-3 mb-10">
        {CONTRACT_TYPES.map(({ to, icon, title, description, badge, available }) => {
          const content = (
            <div className={[
              'bg-white border rounded-lg p-5 flex items-start gap-4 transition-all duration-150',
              available
                ? 'border-l-4 border-l-brand-red border-line hover:shadow-sm cursor-pointer'
                : 'border-line opacity-60 cursor-not-allowed',
            ].join(' ')}>
              <div className={[
                'flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center',
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

      {/* Trust-Signale */}
      <div className="border-t border-line pt-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
          Vertrauen &amp; Sicherheit
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            'DSGVO-konform',
            'Keine Registrierung',
            'Kein Datenspeicher',
            '100 % kostenlos',
            'Für österreichisches Recht',
          ].map(label => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-line px-3 py-1.5 rounded-md">
              <svg className="w-3.5 h-3.5 text-brand-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {label}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}

// --- SVG Icons ---
function IconCar() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  )
}

function IconHouse() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  )
}

function IconBriefcase() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  )
}

function IconLetter() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}
