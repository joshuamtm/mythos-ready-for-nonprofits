import { TIERS } from '../data/tiers.js'

export default function TierPicker({ tier, setTier, compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold whitespace-nowrap">Your tier:</span>
        <div className="flex gap-2 flex-wrap">
          {TIERS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTier(t.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border-2 transition ${
                tier === t.id ? 'border-mtm-primary bg-mtm-cream font-semibold' : 'border-gray-200 bg-white hover:border-mtm-softBlue'
              }`}
              title={t.range}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-[10px] font-bold flex-shrink-0" style={{ background: t.color }}>{t.badge}</span>
              <span className="text-mtm-navy">{t.label}</span>
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-500 italic hidden md:inline">Switches translations + scoring sitewide</span>
      </div>
    )
  }
  return (
    <div className="bg-white rounded-lg shadow-card p-6 mb-6 no-print">
      <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Your organization tier</p>
      <div className="grid md:grid-cols-3 gap-3">
        {TIERS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTier(t.id)}
            className={`text-left p-4 rounded-lg border-2 transition ${
              tier === t.id ? 'border-mtm-primary bg-mtm-cream' : 'border-gray-200 bg-white hover:border-mtm-softBlue'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold" style={{ background: t.color }}>{t.badge}</span>
              <span className="font-semibold text-mtm-navy">{t.label}</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{t.range}</p>
            <p className="text-xs text-gray-500 italic mt-2">{t.examples}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
