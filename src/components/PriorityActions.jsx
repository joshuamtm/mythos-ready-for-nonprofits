import { useState, useMemo } from 'react'
import { ACTIONS, SEVERITY_RANK } from '../data/actions.js'
import { TIERS, getTier } from '../data/tiers.js'
import { SEVERITY_COLORS, SEVERITY_LABELS } from '../data/risks.js'

export default function PriorityActions({ tier }) {
  const [view, setView] = useState('original')
  const tierObj = getTier(tier)

  const sorted = useMemo(() => [...ACTIONS].sort((a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity]), [])

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-2xl font-bold text-mtm-navy mb-2">Priority Actions</h2>
        <p className="text-gray-700 mb-4">
          The document’s 11-action plan. The original timetable assumes a CISO with budget and a security team. The "Your tier" view rescales each action to what’s actually realistic for your size.
        </p>
        <div className="inline-flex rounded-lg overflow-hidden border-2 border-mtm-primary">
          <button
            onClick={() => setView('original')}
            className={`px-4 py-2 text-sm font-medium transition ${view === 'original' ? 'bg-mtm-primary text-white' : 'bg-white text-mtm-primary'}`}
          >
            Original (CISO timeline)
          </button>
          <button
            onClick={() => setView('tier')}
            className={`px-4 py-2 text-sm font-medium transition ${view === 'tier' ? 'bg-mtm-primary text-white' : 'bg-white text-mtm-primary'}`}
          >
            Your tier · {tierObj.label}
          </button>
        </div>
      </section>

      <div className="space-y-4">
        {sorted.map((action) => {
          const colors = SEVERITY_COLORS[action.severity]
          const tierData = action.nonprofitTimeline[tier]
          const start = view === 'original' ? action.originalStart : tierData.start
          const horizon = view === 'original' ? action.originalHorizon : tierData.horizon
          return (
            <article key={action.id} className="bg-white rounded-lg shadow-card p-6 border-l-4" style={{ borderColor: colors.border }}>
              <div className="flex items-start gap-4 mb-3">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-mtm-navy text-white font-bold">{action.id}</span>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-mtm-navy">{action.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded font-bold" style={{ background: colors.bg, color: colors.text }}>{SEVERITY_LABELS[action.severity].toUpperCase()}</span>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">{action.category}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mt-2">{action.description}</p>
                  {action.tools && (
                    <p className="text-xs text-gray-500 italic mt-2"><strong>Tools:</strong> {action.tools}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
                <TimelineCell label="Start" value={start} />
                <TimelineCell label="Horizon" value={horizon} />
                {view === 'tier' && tierData.note ? (
                  <div className="bg-mtm-cream rounded p-3">
                    <p className="text-xs uppercase tracking-widest text-mtm-accent font-semibold mb-1">Note for {tierObj.label}</p>
                    <p className="text-xs text-gray-800 leading-relaxed">{tierData.note}</p>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function TimelineCell({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{label}</p>
      <p className="text-sm font-semibold text-mtm-navy mt-1">{value}</p>
    </div>
  )
}
