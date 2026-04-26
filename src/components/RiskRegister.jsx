import { useState, useMemo } from 'react'
import { RISKS, SEVERITY_ORDER, SEVERITY_LABELS, SEVERITY_COLORS } from '../data/risks.js'
import { TIERS } from '../data/tiers.js'

export default function RiskRegister({ tier }) {
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(null)
  const tierObj = TIERS.find((t) => t.id === tier)
  const tierLabel = tierObj?.label

  const filtered = useMemo(() => {
    const sorted = [...RISKS].sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity])
    if (filter === 'all') return sorted
    return sorted.filter((r) => r.severity === filter)
  }, [filter])

  const counts = useMemo(() => ({
    all: RISKS.length,
    critical: RISKS.filter((r) => r.severity === 'critical').length,
    high: RISKS.filter((r) => r.severity === 'high').length,
    medium: RISKS.filter((r) => r.severity === 'medium').length,
  }), [])

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
          <h2 className="text-2xl font-bold text-mtm-navy">Risk Register</h2>
          <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-mtm-cream text-mtm-navy font-semibold whitespace-nowrap">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full text-white text-[9px] font-bold" style={{ background: TIERS.find((t) => t.id === tier)?.color }}>{TIERS.find((t) => t.id === tier)?.badge}</span>
            Showing translations for: {tierLabel}
          </span>
        </div>
        <p className="text-gray-700 mb-4">
          The 13 risks identified by the working group. Severity reflects time-to-exposure: Critical = immediate, High = within 45 days, Medium = degrades higher-priority controls.
          Click any row to see what it means for your tier.
        </p>
        <div className="flex gap-2 flex-wrap">
          {[
            { id: 'all', label: `All (${counts.all})`, color: '#6b7280' },
            { id: 'critical', label: `Critical (${counts.critical})`, color: SEVERITY_COLORS.critical.border },
            { id: 'high', label: `High (${counts.high})`, color: SEVERITY_COLORS.high.border },
            { id: 'medium', label: `Medium (${counts.medium})`, color: SEVERITY_COLORS.medium.border },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded text-sm font-medium border-2 transition ${
                filter === f.id ? 'text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              style={filter === f.id ? { background: f.color, borderColor: f.color } : { borderColor: f.color }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <div className="space-y-3">
        {filtered.map((risk) => {
          const colors = SEVERITY_COLORS[risk.severity]
          const isOpen = expanded === risk.id
          return (
            <article key={risk.id} className="bg-white rounded-lg shadow-card overflow-hidden border-l-4" style={{ borderColor: colors.border }}>
              <button
                onClick={() => setExpanded(isOpen ? null : risk.id)}
                className="w-full text-left p-5 hover:bg-gray-50 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <span className="inline-block px-2 py-1 rounded text-xs font-bold" style={{ background: colors.bg, color: colors.text }}>
                      #{risk.id} · {SEVERITY_LABELS[risk.severity].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-mtm-navy">{risk.title}</h3>
                    <p className="text-sm text-gray-600 italic">{risk.subtitle}</p>
                    <div className="flex gap-2 flex-wrap mt-2">
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">{risk.type}</span>
                      {risk.frameworks.map((f) => (
                        <span key={f} className="text-xs px-2 py-0.5 bg-mtm-cream text-mtm-navy rounded font-mono">{f}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-mtm-primary text-2xl flex-shrink-0">{isOpen ? '−' : '+'}</span>
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 border-t border-gray-100">
                  <div className="mt-4 mb-5">
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">From the document</p>
                    <p className="text-gray-700 leading-relaxed text-sm">{risk.description}</p>
                  </div>
                  <div className="bg-mtm-cream rounded p-4">
                    <p className="text-xs uppercase tracking-widest text-mtm-accent font-semibold mb-2">For your tier · {tierLabel}</p>
                    <p className="text-gray-800 leading-relaxed">{risk.nonprofitTranslation[tier]}</p>
                  </div>
                  {risk.mapsToActions.length > 0 && (
                    <p className="text-xs text-gray-500 mt-3">
                      Maps to Priority Action{risk.mapsToActions.length > 1 ? 's' : ''}: {risk.mapsToActions.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
