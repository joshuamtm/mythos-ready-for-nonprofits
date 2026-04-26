import { useState, useMemo } from 'react'
import { QUESTIONS, ANSWER_OPTIONS, scoreToProfile } from '../data/questions.js'
import { ACTIONS } from '../data/actions.js'
import { TIERS, getTier } from '../data/tiers.js'

const PRESET_CLIENTS = [
  { id: 'custom', label: 'Custom org name', defaultName: '', defaultTier: 'medium' },
  { id: 'bronxworks', label: 'BronxWorks', defaultName: 'BronxWorks', defaultTier: 'large' },
  { id: 'glwd', label: "God's Love We Deliver", defaultName: "God's Love We Deliver", defaultTier: 'large' },
  { id: 'ceo', label: 'Center for Employment Opportunities', defaultName: 'Center for Employment Opportunities', defaultTier: 'large' },
  { id: 'helpusa', label: 'HELP USA', defaultName: 'HELP USA', defaultTier: 'large' },
  { id: 'ucs', label: 'Union of Concerned Scientists', defaultName: 'Union of Concerned Scientists', defaultTier: 'large' },
]

export default function BoardBriefing({ tier, setTier, answers }) {
  const [orgName, setOrgName] = useState('your organization')
  const [preset, setPreset] = useState('custom')
  const [briefer, setBriefer] = useState('')
  const tierObj = getTier(tier)

  const handlePreset = (id) => {
    setPreset(id)
    const p = PRESET_CLIENTS.find((c) => c.id === id)
    if (p && p.id !== 'custom') {
      setOrgName(p.defaultName)
      setTier(p.defaultTier)
    }
  }

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
    return { score: s, total, profile: scoreToProfile(s, total) }
  }, [answers])

  const noOrPartialQs = QUESTIONS.filter((q) => answers[q.id] === 'no' || answers[q.id] === 'partial')
  const recommendedActionIds = new Set()
  noOrPartialQs.forEach((q) => q.relatedActions.forEach((id) => recommendedActionIds.add(id)))
  const topActions = ACTIONS.filter((a) => recommendedActionIds.has(a.id)).slice(0, 5)

  const briefingText = generateBriefing({ orgName, tier, tierObj, score, topActions, briefer, hasAnswers: Object.keys(answers).length > 0 })

  const copyToClipboard = () => {
    navigator.clipboard.writeText(briefingText)
  }

  const downloadMarkdown = () => {
    const blob = new Blob([briefingText], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mythos-ready-briefing-${orgName.toLowerCase().replace(/\s+/g, '-')}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-card p-6 no-print">
        <h2 className="text-2xl font-bold text-mtm-navy mb-2">Board Briefing Generator</h2>
        <p className="text-gray-700 mb-4">
          Templated talking points in MTM voice, customized to organization name, tier, and your self-assessment results. Edit, paste into a Word doc, and brief the board.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">Preset</label>
            <select value={preset} onChange={(e) => handlePreset(e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm">
              {PRESET_CLIENTS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">Organization name</label>
            <input value={orgName} onChange={(e) => setOrgName(e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">Tier</label>
            <select value={tier} onChange={(e) => setTier(e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm">
              {TIERS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">Briefer (optional)</label>
            <input value={briefer} onChange={(e) => setBriefer(e.target.value)} placeholder="e.g., Joshua Peskay, MTM" className="w-full p-2 border border-gray-300 rounded text-sm" />
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button onClick={copyToClipboard} className="px-4 py-2 bg-mtm-primary text-white rounded font-medium hover:bg-mtm-navy transition text-sm">Copy to clipboard</button>
          <button onClick={downloadMarkdown} className="px-4 py-2 bg-white border-2 border-mtm-primary text-mtm-primary rounded font-medium hover:bg-mtm-cream transition text-sm">Download Markdown</button>
          <button onClick={() => window.print()} className="px-4 py-2 bg-white border-2 border-mtm-primary text-mtm-primary rounded font-medium hover:bg-mtm-cream transition text-sm">Print / Save PDF</button>
        </div>

        {!Object.keys(answers).length && (
          <p className="mt-4 text-sm text-mtm-accent italic">Tip: Fill out the Self-Assessment first to populate the gap section with real data.</p>
        )}
      </section>

      <section className="bg-white rounded-lg shadow-card p-8 print-area">
        <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">{briefingText}</pre>
      </section>
    </div>
  )
}

function generateBriefing({ orgName, tier, tierObj, score, topActions, briefer, hasAnswers }) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const profileLine = hasAnswers
    ? `${orgName} self-assessed at "${score.profile.label}" (${score.score} of ${score.total} possible).`
    : `Self-assessment not yet completed. Recommend running the 10-question diagnostic before this briefing is finalized.`

  const topActionsBlock = topActions.length
    ? topActions.map((a, i) => `${i + 1}. **${a.title}** — ${a.nonprofitTimeline[tier].note}`).join('\n')
    : '*Run the self-assessment to populate this section with action recommendations specific to your gaps.*'

  return `# Board Briefing — Mythos-readiness for ${orgName}

**Date:** ${date}
**Briefer:** ${briefer || '[Briefer name]'}
**Audience:** Board of Directors, ${orgName}
**Source:** "AI Vulnerability Storm: Building a Mythos-ready Security Program" (CSA / SANS / [un]prompted / OWASP, April 18, 2026)

---

## Executive Summary

The cybersecurity threat environment changed materially in April 2026. Anthropic released Claude Mythos, an AI model that autonomously discovers thousands of zero-day vulnerabilities at $50 per run. A 50-CISO working group — including the former Director of CISA, the CISO of Google, and Bruce Schneier — published a joint briefing concluding that **time-to-exploit has collapsed from 2.3 years to under 24 hours.** Their named historical analog is Y2K.

This briefing translates the working group's recommendations for ${orgName} (${tierObj.label}) and proposes a defensible, realistic response.

---

## What changed

The capability — AI finding novel vulnerabilities and generating exploits — was emerging through 2025. Mythos accelerated it. Three things now hold:

1. **The cost floor for offense dropped.** Capabilities that previously required nation-state resources are accessible at consumer pricing.
2. **The window between disclosure and weaponization is hours, not months.** Quarterly patch cycles cannot keep up.
3. **The asymmetry is permanent.** AI tools accelerate offense more than defense, at least for the next 12-24 months.

---

## What this means for ${orgName}

${orgName} is a **${tierObj.label}**. ${tierObj.realityNote}

${profileLine}

---

## What we are doing

Five priority actions, sized for ${orgName}'s capacity:

${topActionsBlock}

---

## What we are *not* doing (and why)

The original 11-action plan from the working group assumes a CISO with budget and a security team. ${orgName} ${tier === 'large' ? 'has the staffing to execute most of it on the aggressive timeline. Where we deviate, it is a sequencing decision, not a scope cut.' : tier === 'medium' ? 'cannot execute the 90-day plan as written. We have selected the 5 actions with the highest leverage for our tier and rescaled the timeline.' : 'operates below the Cyber Poverty Line, which the document explicitly acknowledges as out of scope. Our defense is layered: tightened MSP relationships, sector ISAC participation, the basics done well, and a documented "reasonable defensive effort" position.'}

We are explicitly **not** standing up a Vulnerability Operations function (Action 11). That is unrealistic at our scale and would consume capacity we need for the basics. We will revisit if the threat landscape sustains the current acceleration past 12 months.

---

## What we ask of the board

1. **Awareness.** Acknowledge that the threat landscape changed in a way that affects our risk model and may require capacity decisions in the next 6-12 months.
2. **A documented "reasonable defensive effort" position** for liability and insurance purposes, reviewed annually.
3. **Approval to revisit the risk register** in our next regular board meeting with updated heat map.
4. ${tier !== 'small' ? 'Capacity authorization for one additional priority — to be decided based on gap analysis (likely AI agent adoption, hardening, or external attack-surface monitoring).' : 'Authorization to deepen our MSP relationship and confirm continuity of monitoring and patching SLAs.'}

---

## Source materials

- CSA / SANS / [un]prompted / OWASP, *"The AI Vulnerability Storm: Building a Mythos-ready Security Program,"* April 18, 2026 (CC BY-NC 4.0)
- Anthropic, *Claude Mythos Preview* and *Project Glasswing,* April 7, 2026
- Wendy Nather, *"The Cyber Poverty Line"* (referenced in the working group document)
- This briefing was generated using the MTM Mythos-ready translator and customized for ${orgName}.

---

*Drafted with help from Vishali, an AI assistant, at the direction of ${briefer || 'the briefer'}. Any errors are the briefer's responsibility.*
`
}
