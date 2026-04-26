import { TIERS } from '../data/tiers.js'

export default function Intro({ tier, setTab }) {
  const currentTier = TIERS.find((t) => t.id === tier)
  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow-card p-8">
        <div className="border-l-4 border-mtm-accent pl-6 py-2 mb-6">
          <p className="text-sm uppercase tracking-widest text-mtm-accent font-semibold">The shift</p>
          <h2 className="text-3xl font-bold text-mtm-navy mt-1">From 2.3 years to under 24 hours.</h2>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          The CSA / SANS / [un]prompted / OWASP working group — 50+ CISOs including Jen Easterly, Bruce Schneier, Heather Adkins, Phil Venables, Bob Lord, Rob Joyce — published <em>"The AI Vulnerability Storm: Building a Mythos-ready Security Program"</em> on April 18, 2026.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Their core finding: <strong>time-to-exploit collapsed</strong> from 2.3 years (2018) to under 24 hours (2026). Anthropic's Claude Mythos preview was the inflection signal — autonomously discovering thousands of zero-days in every major OS and browser, including a 27-year-old OpenBSD bug, at $50/run. The capability will proliferate. The defense gap is not technological; it is organizational.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          They named the historical analog: <strong>Y2K</strong>. A systemic threat with a hard deadline that the industry met through coordinated, disciplined effort.
        </p>
      </section>

      <section className="bg-mtm-cream rounded-lg p-8 border-l-4 border-mtm-primary">
        <h3 className="text-2xl font-bold text-mtm-navy mb-3">The gap this tool exists to fill</h3>
        <p className="text-base text-gray-800 leading-relaxed mb-4">
          The document explicitly invokes <strong>Wendy Nather's Cyber Poverty Line</strong> and admits its prescriptions don't reach below it. That's where most of MTM's clients live — small and mid-size nonprofits with limited IT capacity, MSP-managed infrastructure, and no dedicated security staff.
        </p>
        <p className="text-base text-gray-800 leading-relaxed">
          This site translates the document's 13-row risk register, 11 priority actions, and 10 self-assessment questions into <strong>tier-aware, realistic guidance</strong> for organizations operating at or below the Cyber Poverty Line — without diluting the technical substance.
        </p>
      </section>

      {currentTier && (
        <section className="bg-white rounded-lg shadow-card p-6 border-l-4" style={{ borderColor: currentTier.color }}>
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">For your tier</p>
          <h3 className="text-xl font-bold text-mtm-navy mb-2">{currentTier.label}</h3>
          <p className="text-gray-700 leading-relaxed">{currentTier.realityNote}</p>
        </section>
      )}

      <section className="grid md:grid-cols-3 gap-6">
        <NavCard
          title="Risk Register"
          subtitle="13 prioritized risks"
          description="The full register — Critical, High, Medium — each translated for your tier."
          onClick={() => setTab('risks')}
        />
        <NavCard
          title="Priority Actions"
          subtitle="11 actions, your timeline"
          description="The aggressive table from the document, rescaled to what's actually realistic for your size."
          onClick={() => setTab('actions')}
        />
        <NavCard
          title="Self-Assessment"
          subtitle="10 diagnostic questions"
          description="Where you stand. What to do next. Output flows into your board briefing."
          onClick={() => setTab('assess')}
        />
        <NavCard
          title="Board Briefing"
          subtitle="Generate a board memo"
          description="Templated talking points in MTM voice, customized to your org name and assessment results."
          onClick={() => setTab('briefing')}
        />
        <NavCard
          title="Frameworks"
          subtitle="Crosswalk reference"
          description="OWASP LLM 2025, OWASP Agentic 2026, MITRE ATLAS, NIST CSF 2.0 — the four frameworks the register maps to."
          onClick={() => setTab('frameworks')}
        />
        <NavCard
          title="Source"
          subtitle="The original briefing"
          description="29 pages, CC BY-NC 4.0, hosted by Cloud Security Alliance. Always verify against source."
          href="https://cloudsecurityalliance.org/"
        />
      </section>
    </div>
  )
}

function NavCard({ title, subtitle, description, onClick, href }) {
  const inner = (
    <>
      <p className="text-xs uppercase tracking-widest text-mtm-primary font-semibold">{subtitle}</p>
      <h4 className="text-lg font-bold text-mtm-navy mt-1 mb-2">{title}</h4>
      <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
    </>
  )
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg shadow-card p-6 hover:shadow-md transition cursor-pointer border-2 border-transparent hover:border-mtm-primary block">
        {inner}
      </a>
    )
  }
  return (
    <button onClick={onClick} className="bg-white rounded-lg shadow-card p-6 text-left hover:shadow-md transition border-2 border-transparent hover:border-mtm-primary">
      {inner}
    </button>
  )
}
