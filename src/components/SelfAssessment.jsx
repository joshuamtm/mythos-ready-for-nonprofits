import { useMemo, useEffect } from 'react'
import { QUESTIONS, ANSWER_OPTIONS, scoreToProfile } from '../data/questions.js'
import { ACTIONS } from '../data/actions.js'

const STORAGE_KEY = 'mythos-ready:self-assessment'

export default function SelfAssessment({ tier, answers, setAnswers, setTab }) {
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
    }
  }, [answers])
  const score = useMemo(() => {
    let s = 0
    let total = 0
    QUESTIONS.forEach((q) => {
      const a = answers[q.id]
      if (!a) return
      const opt = ANSWER_OPTIONS.find((o) => o.value === a)
      if (opt && opt.score !== null) {
        s += opt.score
        total += 2
      }
    })
    return { score: s, total, profile: scoreToProfile(s, total, tier) }
  }, [answers, tier])

  const recommendedActions = useMemo(() => {
    const noOrPartialQs = QUESTIONS.filter((q) => answers[q.id] === 'no' || answers[q.id] === 'partial')
    const actionIds = new Set()
    noOrPartialQs.forEach((q) => q.relatedActions.forEach((id) => actionIds.add(id)))
    return ACTIONS.filter((a) => actionIds.has(a.id)).slice(0, 5)
  }, [answers])

  const setAnswer = (qid, value) => setAnswers({ ...answers, [qid]: value })
  const reset = () => {
    setAnswers({})
    localStorage.removeItem(STORAGE_KEY)
  }
  const completed = Object.keys(answers).length

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-2xl font-bold text-mtm-navy mb-2">Self-Assessment</h2>
        <p className="text-gray-700 mb-2">
          The 10 questions the document poses to CISOs, adapted for any nonprofit IT or executive leader. Honest answers are more useful than aspirational ones. Some questions (notably #5 on code release gates) won't apply if your organization doesn't ship custom software — mark those <em>N/A</em>.
        </p>
        <p className="text-sm text-gray-600 italic mb-4">
          The questions are the same for every tier — they're universal diagnostics. <strong>Scoring is calibrated to your tier</strong>: a small nonprofit and a large nonprofit answering identically will get different "Mythos-aware" thresholds, because the realistic ceiling differs. Pick your tier above before reviewing your profile. Your answers save automatically in your browser.
        </p>
      </section>

      <section className="bg-mtm-cream rounded-lg p-5 border-l-4 border-mtm-accent">
        <h3 className="text-base font-bold text-mtm-navy mb-1">Start here if you're brand new to this</h3>
        <p className="text-sm text-gray-800 leading-relaxed">
          If most of your honest answers are <strong>"no,"</strong> that's fine. It's the most common starting point for small and mid-size nonprofits. "No" doesn't mean you're failing — it means you have an opportunity. The recommended actions section below will surface the specific places to start, sized for your tier. You don't need to do all of them. Pick one this quarter.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="text-sm text-gray-600">
            <strong>{completed}/{QUESTIONS.length}</strong> answered
          </div>
          {completed > 0 && (
            <button onClick={reset} className="text-sm text-mtm-primary hover:underline">Reset answers</button>
          )}
        </div>
      </section>

      <div className="space-y-4">
        {QUESTIONS.map((q) => (
          <article key={q.id} className="bg-white rounded-lg shadow-card p-5">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-mtm-cream text-mtm-navy font-bold text-sm">{q.id}</span>
              <div className="flex-grow">
                <h3 className="font-semibold text-mtm-navy mb-1 leading-snug">{q.question}</h3>
                <p className="text-xs text-gray-600 italic mb-3">{q.context}</p>
                <div className="flex gap-2 flex-wrap">
                  {ANSWER_OPTIONS.map((opt) => {
                    const selected = answers[q.id] === opt.value
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setAnswer(q.id, opt.value)}
                        className={`px-3 py-1.5 rounded text-sm font-medium border-2 transition ${
                          selected ? 'text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                        style={selected ? { background: opt.color, borderColor: opt.color } : { borderColor: opt.color }}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {completed > 0 && (
        <section className="bg-white rounded-lg shadow-card p-6 border-l-4" style={{ borderColor: score.profile.color }}>
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Your profile</p>
          <h3 className="text-2xl font-bold mt-1" style={{ color: score.profile.color }}>{score.profile.label}</h3>
          <p className="text-sm text-gray-600 mt-1">Score: {score.score} / {score.total} possible (from {completed} answered question{completed > 1 ? 's' : ''})</p>
          <p className="text-gray-800 leading-relaxed mt-3">{score.profile.summary}</p>

          {recommendedActions.length > 0 && (
            <div className="mt-5 pt-5 border-t border-gray-200">
              <p className="text-xs uppercase tracking-widest text-mtm-accent font-semibold mb-3">Recommended priority actions based on your gaps</p>
              <ol className="space-y-2 text-sm">
                {recommendedActions.map((a) => (
                  <li key={a.id} className="flex gap-3">
                    <span className="font-bold text-mtm-primary">#{a.id}</span>
                    <span className="text-gray-800">{a.title}</span>
                  </li>
                ))}
              </ol>
              <button
                onClick={() => setTab('briefing')}
                className="mt-4 px-4 py-2 bg-mtm-primary text-white rounded font-medium hover:bg-mtm-navy transition text-sm"
              >
                Generate board briefing →
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
