import { useState, useMemo } from 'react'
import { ACTIONS, SEVERITY_RANK } from '../data/actions.js'
import { TIERS, getTier } from '../data/tiers.js'
import { SEVERITY_COLORS, SEVERITY_LABELS } from '../data/risks.js'

const APPLICABILITY_RANK = { core: 0, deferred: 1, not_applicable: 2 }

export default function PriorityActions({ tier }) {
  const [view, setView] = useState('original')
  const tierObj = getTier(tier)

  const sorted = useMemo(
    () => [...ACTIONS].sort((a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity]),
    []
  )

  const enriched = useMemo(
    () =>
      sorted.map((action) => {
        const tierData = action.nonprofitTimeline[tier]
        const applicability = tierData.applicability || 'core'
        return { ...action, tierData, applicability }
      }),
    [sorted, tier]
  )

  // In tier view, hide not_applicable and sort deferred to the bottom.
  // In original view, show all 11 in severity order to preserve fidelity to source paper.
  const displayed =
    view === 'tier'
      ? enriched
          .filter((a) => a.applicability !== 'not_applicable')
          .sort(
            (a, b) =>
              APPLICABILITY_RANK[a.applicability] - APPLICABILITY_RANK[b.applicability] ||
              SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity]
          )
      : enriched

  const counts = useMemo(() => {
    const c = { core: 0, deferred: 0, not_applicable: 0 }
    enriched.forEach((a) => {
      c[a.applicability] += 1
    })
    return c
  }, [enriched])

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
          <h2 className="text-2xl font-bold text-mtm-navy">Priority Actions</h2>
          <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-mtm-cream text-mtm-navy font-semibold whitespace-nowrap">
            <span
              className="inline-flex items-center justify-center w-4 h-4 rounded-full text-white text-[9px] font-bold"
              style={{ background: tierObj.color }}
            >
              {tierObj.badge}
            </span>
            Timeline rescaled for: {tierObj.label}
          </span>
        </div>
        <p className="text-gray-700 mb-4">
          The document's 11-action plan. The original timetable assumes a CISO with budget and a security team. The "Your tier" view rescales each action to what's actually realistic for your size — and removes or defers actions that aren't yet on your plate.
        </p>
        <div className="inline-flex rounded-lg overflow-hidden border-2 border-mtm-primary">
          <button
            onClick={() => setView('original')}
            className={`px-4 py-2 text-sm font-medium transition ${
              view === 'original' ? 'bg-mtm-primary text-white' : 'bg-white text-mtm-primary'
            }`}
          >
            Original (CISO timeline)
          </button>
          <button
            onClick={() => setView('tier')}
            className={`px-4 py-2 text-sm font-medium transition ${
              view === 'tier' ? 'bg-mtm-primary text-white' : 'bg-white text-mtm-primary'
            }`}
          >
            Your tier · {tierObj.label}
          </button>
        </div>

        {view === 'tier' && (
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-mtm-navy/10 text-mtm-navy font-semibold">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-mtm-navy"></span>
              {counts.core} core action{counts.core === 1 ? '' : 's'}
            </span>
            {counts.deferred > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-semibold">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                {counts.deferred} deferred for your tier
              </span>
            )}
            {counts.not_applicable > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-semibold">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                {counts.not_applicable} not yet applicable (hidden)
              </span>
            )}
          </div>
        )}
      </section>

      <div className="space-y-4">
        {displayed.map((action) => {
          const colors = SEVERITY_COLORS[action.severity]
          const tierData = action.tierData
          const start = view === 'original' ? action.originalStart : tierData.start
          const horizon = view === 'original' ? action.originalHorizon : tierData.horizon
          const isDeferred = view === 'tier' && action.applicability === 'deferred'

          return (
            <article
              key={action.id}
              className={`bg-white rounded-lg shadow-card p-6 border-l-4 transition ${
                isDeferred ? 'opacity-75' : ''
              }`}
              style={{ borderColor: colors.border }}
            >
              <div className="flex items-start gap-4 mb-3">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-mtm-navy text-white font-bold">
                  {action.id}
                </span>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-mtm-navy">{action.title}</h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded font-bold"
                      style={{ background: colors.bg, color: colors.text }}
                    >
                      {SEVERITY_LABELS[action.severity].toUpperCase()}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                      {action.category}
                    </span>
                    {isDeferred && (
                      <span className="text-xs px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-900">
                        DEFERRED FOR {tierObj.label.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mt-2">{action.description}</p>
                  {action.tools && (
                    <p className="text-xs text-gray-500 italic mt-2">
                      <strong>Tools:</strong> {action.tools}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
                <TimelineCell label="Start" value={start} />
                <TimelineCell label="Horizon" value={horizon} />
                {view === 'tier' && tierData.note ? (
                  <div className="bg-mtm-cream rounded p-3">
                    <p className="text-xs uppercase tracking-widest text-mtm-accent font-semibold mb-1">
                      Note for {tierObj.label}
                    </p>
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
