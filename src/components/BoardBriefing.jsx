import { useState, useMemo } from 'react'
import { QUESTIONS, ANSWER_OPTIONS, scoreToProfile } from '../data/questions.js'
import { ACTIONS } from '../data/actions.js'
import { TIERS, getTier } from '../data/tiers.js'

const SECTORS = [
  { id: 'unspecified', label: 'No sector specified', context: '' },
  { id: 'human_services', label: 'Human Services', context: 'food assistance, housing, workforce, family services, immigrant services' },
  { id: 'health', label: 'Healthcare & Community Health', context: 'FQHCs, community clinics, mental health, hospice, public health' },
  { id: 'arts_culture', label: 'Arts & Culture', context: 'museums, theater, music, dance, libraries, historical societies' },
  { id: 'education_workforce', label: 'Education & Workforce Development', context: 'K-12, higher ed, after-school, adult ed, job training' },
  { id: 'environment', label: 'Environment & Animal Welfare', context: 'conservation, climate, wildlife, animal rescue' },
  { id: 'civic_advocacy', label: 'Civic, Advocacy & Legal', context: 'policy, civil rights, legal aid, voter engagement, social justice' },
  { id: 'faith_based', label: 'Faith-based / Religious', context: 'congregations, religious networks, faith-rooted social services' },
  { id: 'grantmaking', label: 'Foundation / Grantmaking', context: 'private foundations, community foundations, giving circles' },
  { id: 'capacity_building', label: 'Capacity Building / Intermediary', context: 'sector support, training providers, networks of nonprofits' },
  { id: 'international', label: 'International / Global Development', context: 'humanitarian aid, global health, international advocacy' },
  { id: 'other', label: 'Other / Multiple sectors', context: '' },
]

const sectorSpecificStakes = (sectorId) => {
  switch (sectorId) {
    case 'human_services':
      return 'The data we hold is on people in real material vulnerability — clients of food assistance, families in housing transitions, undocumented community members, survivors of violence. The "reasonable defensive effort" standard hits hardest when the data is most sensitive.'
    case 'health':
      return 'We handle protected health information under HIPAA. Patient trust and regulatory exposure are inseparable. AI-accelerated discovery of vulnerabilities in EHR-adjacent systems and connected medical devices changes our risk model materially.'
    case 'arts_culture':
      return 'Donor and member privacy matters more than payment-card security in our context. A donor list breach erodes the trust that makes our work possible. Cultural institutions also carry archival and intellectual-property exposure that AI-accelerated attackers can monetize.'
    case 'education_workforce':
      return 'Student records (FERPA), participant employment data, and outcomes data tied to government contracts create overlapping compliance exposure. Many of the people our programs serve are at the most vulnerable point in their economic trajectory.'
    case 'environment':
      return 'Activist staff and partner organizations face elevated targeting from state and corporate actors. AI-accelerated reconnaissance and credential abuse change the calculus on who needs phishing-resistant authentication and segregated infrastructure.'
    case 'civic_advocacy':
      return 'We work with people who face elevated risk from disclosure: domestic violence survivors, undocumented community members, civil rights plaintiffs, voters in contested jurisdictions. Our threat model includes adversaries with resources, not just opportunists.'
    case 'faith_based':
      return 'Pastoral records, member directories, and giving data carry a trust dimension beyond compliance. Many of our communities include people whose immigration status, sexuality, or family circumstances must remain private.'
    case 'grantmaking':
      return 'We sit in a network of grantee organizations that often operate below the Cyber Poverty Line. Our role in the ecosystem is partly to model and partly to fund the security capacity that the sector needs.'
    case 'capacity_building':
      return 'Our risk model includes the trust placed in us by client organizations. A breach in our systems is also a breach in our clients\' trust that working with us is safe.'
    case 'international':
      return 'Field operations, partner organizations in restrictive environments, and beneficiary data create a threat model that includes state actors, not just opportunists. Communications security and data residency are first-order concerns.'
    default:
      return ''
  }
}

export default function BoardBriefing({ tier, setTier, answers }) {
  const [sectorId, setSectorId] = useState('unspecified')
  const [briefer, setBriefer] = useState('')
  const tierObj = getTier(tier)
  const sector = SECTORS.find((s) => s.id === sectorId) || SECTORS[0]

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

  const noOrPartialQs = QUESTIONS.filter((q) => answers[q.id] === 'no' || answers[q.id] === 'partial')
  const recommendedActionIds = new Set()
  noOrPartialQs.forEach((q) => q.relatedActions.forEach((id) => recommendedActionIds.add(id)))
  const topActions = ACTIONS.filter((a) => recommendedActionIds.has(a.id)).slice(0, 5)

  const briefingText = generateBriefing({ sector, tier, tierObj, score, topActions, briefer, hasAnswers: Object.keys(answers).length > 0 })

  const copyToClipboard = () => {
    navigator.clipboard.writeText(briefingText)
  }

  const downloadMarkdown = () => {
    const blob = new Blob([briefingText], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const slug = sector.id === 'unspecified' ? 'briefing' : sector.id.replace(/_/g, '-')
    a.download = `mythos-ready-${slug}-${tier}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-card p-6 no-print">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
          <h2 className="text-2xl font-bold text-mtm-navy">Board Briefing Generator</h2>
          <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-mtm-cream text-mtm-navy font-semibold whitespace-nowrap">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full text-white text-[9px] font-bold" style={{ background: tierObj.color }}>{tierObj.badge}</span>
            Sized for: {tierObj.label}
          </span>
        </div>
        <p className="text-gray-700 mb-4">
          Templated talking points in plain English. Sector and tier shape the framing; nothing about your organization is sent anywhere — this all renders in your browser. Edit, paste into a Word doc, and brief the board.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">Sector (optional)</label>
            <select value={sectorId} onChange={(e) => setSectorId(e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm">
              {SECTORS.map((s) => <option key={s.id} value={s.id}>{s.label}{s.context ? ` — ${s.context}` : ''}</option>)}
            </select>
            <p className="text-xs text-gray-500 italic mt-1">Picking a sector adds context about the data and stakes specific to your kind of work. Skip it if it doesn't apply or you'd rather keep the briefing generic.</p>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">Tier</label>
            <select value={tier} onChange={(e) => setTier(e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm">
              {TIERS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
            <p className="text-xs text-gray-500 italic mt-1">Sized to your organization's reality, not a CISO's expectations.</p>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">Briefer name (optional)</label>
            <input value={briefer} onChange={(e) => setBriefer(e.target.value)} placeholder="The person presenting to the board" className="w-full p-2 border border-gray-300 rounded text-sm" />
            <p className="text-xs text-gray-500 italic mt-1">Name lives only in your browser. Used to fill the "Briefer" line on the memo.</p>
          </div>
        </div>

        <div className="mt-5 flex gap-3 flex-wrap">
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

function generateBriefing({ sector, tier, tierObj, score, topActions, briefer, hasAnswers }) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const sectorPhrase = sector.id === 'unspecified' ? 'our nonprofit' : `our ${sector.label.toLowerCase()} nonprofit`
  const profileLine = hasAnswers
    ? `Our self-assessment lands at "${score.profile.label}" (${score.score} of ${score.total} possible).`
    : `Self-assessment not yet completed. Recommend running the 10-question diagnostic before this briefing is finalized.`

  const topActionsBlock = topActions.length
    ? topActions.map((a, i) => `${i + 1}. **${a.title}** — ${a.nonprofitTimeline[tier].note}`).join('\n')
    : '*Run the self-assessment to populate this section with action recommendations specific to your gaps.*'

  const sectorStakes = sectorSpecificStakes(sector.id)
  const sectorBlock = sectorStakes
    ? `\n## What's distinctive about our risk\n\n${sectorStakes}\n\n---\n`
    : ''

  return `# Board Briefing — Mythos-readiness for ${sectorPhrase}

**Date:** ${date}
**Briefer:** ${briefer || '[Briefer name]'}
**Audience:** Board of Directors
**Source:** "AI Vulnerability Storm: Building a Mythos-ready Security Program" — CSA / SANS / [un]prompted / OWASP, April 12, 2026 (v1.0 May 1, 2026) — https://labs.cloudsecurityalliance.org/mythos-ciso/

---

## Executive Summary

The cybersecurity threat environment changed materially in April 2026. Anthropic released Claude Mythos, an AI model that autonomously discovers thousands of zero-day vulnerabilities at $50 per run. A 50-CISO working group — including the former Director of CISA, the CISO of Google, and Bruce Schneier — published a joint briefing concluding that **time-to-exploit has collapsed from 2.3 years to under 24 hours.** Their named historical analog is Y2K.

This briefing translates the working group's recommendations for ${sectorPhrase} (${tierObj.label}) and proposes a defensible, realistic response.

---

## What changed

The capability — AI finding novel vulnerabilities and generating exploits — was emerging through 2025. Mythos accelerated it. Three things now hold:

1. **The cost floor for offense dropped.** Capabilities that previously required nation-state resources are accessible at consumer pricing.
2. **The window between disclosure and weaponization is hours, not months.** Quarterly patch cycles cannot keep up.
3. **The asymmetry is permanent.** AI tools accelerate offense more than defense, at least for the next 12-24 months.

Important caveat from the v1.0 paper: this is a leading indicator, not a damage measure. Most actual breaches today still come from credential abuse, phishing, and supply chain compromise — not zero-day exploitation. The basics still pay disproportionate dividends.

---

## What this means for ${sectorPhrase}

We are a **${tierObj.label}**. ${tierObj.realityNote}

${profileLine}
${sectorBlock}

## What we are doing

Five priority actions, sized for our capacity:

${topActionsBlock}

---

## What we are *not* doing (and why)

The original 11-action plan from the working group assumes a CISO with budget and a security team. ${tier === 'large' ? 'Our organization has the staffing to execute most of it on the aggressive timeline. Where we deviate, it is a sequencing decision, not a scope cut.' : tier === 'medium' ? 'Our organization cannot execute the 90-day plan as written. We have selected the 5 actions with the highest leverage for our tier and rescaled the timeline.' : 'Our organization operates below the Cyber Poverty Line, which the document explicitly acknowledges as out of scope. Our defense is layered: tightened MSP relationships, sector ISAC participation, the basics done well, and a documented "reasonable defensive effort" position.'}

We are explicitly **not** standing up a Vulnerability Operations function (Action 11). That is unrealistic at our scale and would consume capacity we need for the basics. We will revisit if the threat landscape sustains the current acceleration past 12 months.

---

## What we ask of the board

1. **Awareness.** Acknowledge that the threat landscape changed in a way that affects our risk model and may require capacity decisions in the next 6-12 months.
2. **A documented "reasonable defensive effort" position** for liability and insurance purposes, reviewed annually.
3. **Approval to revisit the risk register** in our next regular board meeting with updated heat map, and to make this a quarterly cadence rather than annual.
4. ${tier !== 'small' ? 'Capacity authorization for one additional priority — to be decided based on gap analysis (likely AI agent adoption, hardening, or external attack-surface monitoring).' : 'Authorization to deepen our MSP relationship and confirm continuity of monitoring and patching SLAs.'}
5. **Insurance carrier conversation.** Authorization to update our cyber liability carrier on AI-accelerated threat landscape and confirm coverage adequacy. Most carriers are quietly tightening AI-related exclusions; we want clarity now, not after a claim.

## What we are explicitly NOT asking for

We considered and chose not to recommend the following, to be transparent with the board about scope:

- **A new dedicated security hire.** Our tier and budget don't support it; we're choosing to leverage MSP and vCISO relationships instead.
- **A full Vulnerability Operations function** (the document's 12-month aspiration). Unrealistic at our scale and would consume capacity we need for the basics.
- **Wholesale AI-tool ban.** AI tools are already in use across the org. A ban is unenforceable and would push use into the shadows where governance can't reach. We're choosing managed adoption with clear guardrails.

---

## Source materials

- CSA / SANS / [un]prompted / OWASP, *"The AI Vulnerability Storm: Building a Mythos-ready Security Program,"* April 12, 2026 (v1.0, May 1, 2026; CC BY-NC 4.0) — https://labs.cloudsecurityalliance.org/mythos-ciso/
- Anthropic, *Claude Mythos Preview* and *Project Glasswing,* April 7, 2026
- Wendy Nather, *"The Cyber Poverty Line"* (referenced in the working group document)
- This briefing was generated using the Mythos-ready for Nonprofits translator at Meet the Moment.

---
`
}
