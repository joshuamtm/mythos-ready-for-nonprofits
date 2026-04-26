import { TIERS } from '../data/tiers.js'

export default function Intro({ tier, setTab }) {
  const currentTier = TIERS.find((t) => t.id === tier)
  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow-card p-8">
        <div className="border-l-4 border-mtm-primary pl-6 py-2 mb-6">
          <p className="text-sm uppercase tracking-widest text-mtm-primary font-semibold">In plain English</p>
          <h2 className="text-3xl font-bold text-mtm-navy mt-1">Cybersecurity got faster in April 2026 — and the same tools nonprofits can use to defend themselves got better.</h2>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Until recently, when someone discovered a flaw in software you use — your email, your office network, your donor database — attackers sometimes needed <strong>as long as two years</strong> to figure out how to exploit it. That window gave software companies time to patch and gave your IT team time to apply those patches.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Today that window is <strong>hours</strong>. AI tools — the same kind that write code or summarize email — can now find software flaws and produce working attacks at consumer-pricing speed. The capability isn't theoretical; it's already in use. <strong>Bear in mind that those same AI tools</strong> are also the most accessible defensive resource nonprofits have ever had. The opportunity and the threat are the same shape.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          A working group of 50+ Chief Information Security Officers — the people who run security at Google, the former U.S. national cyber director, Bruce Schneier, the former CISO of CISA — wrote a 29-page playbook in April 2026 explaining what every organization should do about it. It's called <a href="https://labs.cloudsecurityalliance.org/mythos-ciso/" target="_blank" rel="noopener noreferrer" className="text-mtm-primary underline font-semibold">"The AI Vulnerability Storm: Building a Mythos-ready Security Program"</a> and it's published openly by the Cloud Security Alliance. <strong>They wrote it for organizations that have a security team and a budget.</strong>
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Most nonprofits don't have either of those things. This site translates that playbook for nonprofits at three sizes — small, medium, and large — without diluting the substance. Pick your tier on any page, walk through the 13 risks and 11 actions in language that fits your reality, and generate a board briefing in plain English. <a href="https://labs.cloudsecurityalliance.org/mythos-ciso/" target="_blank" rel="noopener noreferrer" className="text-mtm-primary underline">Read the original briefing here.</a>
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-card p-8">
        <div className="border-l-4 border-mtm-accent pl-6 py-2 mb-6">
          <p className="text-sm uppercase tracking-widest text-mtm-accent font-semibold">The technical shift</p>
          <h2 className="text-2xl font-bold text-mtm-navy mt-1">From 2.3 years to under 24 hours.</h2>
        </div>
        <p className="text-base text-gray-700 leading-relaxed mb-3">
          The CSA / SANS / [un]prompted / OWASP working group — including Jen Easterly, Bruce Schneier, Heather Adkins, Phil Venables, Bob Lord, and Rob Joyce — published <em>"The AI Vulnerability Storm: Building a Mythos-ready Security Program"</em> on April 18, 2026.
        </p>
        <p className="text-base text-gray-700 leading-relaxed mb-3">
          Their core finding: <strong>time-to-exploit collapsed</strong> from 2.3 years (2018) to under 24 hours (2026). Anthropic's Claude Mythos preview was the inflection signal — autonomously discovering thousands of zero-days in every major OS and browser, including a 27-year-old OpenBSD bug, at $50/run. The capability will proliferate. The defense gap is not technological; it is organizational.
        </p>
        <p className="text-base text-gray-700 leading-relaxed">
          They named the historical analog: <strong>Y2K</strong>. A systemic threat with a hard deadline that the industry met through coordinated, disciplined effort.
        </p>
      </section>

      <section className="bg-mtm-cream rounded-lg p-8 border-l-4 border-mtm-primary">
        <h3 className="text-2xl font-bold text-mtm-navy mb-3">The gap this tool exists to fill</h3>
        <p className="text-base text-gray-800 leading-relaxed mb-4">
          The document explicitly invokes the <a href="https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2023/m01/breaking-the-cycle-of-security-poverty.html" target="_blank" rel="noopener noreferrer" className="text-mtm-primary underline font-semibold">Cyber Poverty Line</a> — a term coined by Wendy Nather (now Head of Advisory CISOs at Cisco) for the line below which an organization cannot effectively defend itself, no matter how good its intentions are. The working group admits its prescriptions don't reach below that line. That's where most of MTM's clients live — small and mid-size nonprofits with limited IT capacity, MSP-managed infrastructure, and no dedicated security staff.
        </p>
        <p className="text-base text-gray-800 leading-relaxed mb-4">
          And the people whose data sits on those nonprofit systems often have the most to lose: clients of food assistance and housing services, undocumented community members, survivors of violence, donors who chose anonymity, patients whose health data is protected by HIPAA. The "reasonable defensive effort" standard hits hardest when the data is most sensitive. That stake is mostly absent from the original briefing; it's central here.
        </p>
        <p className="text-base text-gray-800 leading-relaxed">
          This site translates the document's 13-row risk register, 11 priority actions, and 10 self-assessment questions into <strong>tier-aware, realistic guidance</strong> for organizations operating at or below the Cyber Poverty Line — without diluting the technical substance.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-card p-8 border-l-4 border-mtm-accent">
        <h3 className="text-2xl font-bold text-mtm-navy mb-3">The empowerment side of this</h3>
        <p className="text-base text-gray-700 leading-relaxed mb-3">
          The same working group that documented the threat also wrote a section called <em>"Are We Outmoded?"</em> The answer they give: not even close. Their words, lightly edited:
        </p>
        <blockquote className="border-l-4 border-mtm-accent bg-mtm-cream p-5 my-4 italic text-gray-800 leading-relaxed">
          "Agents — coding agents in particular, though they're useful well beyond code, in GRC and incident response and far beyond their original use case — represent an opportunity for personal growth and a feeling of empowerment. Everyone on your team, including you, can become hands-on. <strong>Using a coding agent is now easier than using Excel.</strong> All you need to know is English."
        </blockquote>
        <p className="text-base text-gray-700 leading-relaxed">
          That's not minimization of the threat. The risk register is real, the timeline is real, the asymmetry is real. But the same tools that accelerated the offense are accessible to your IT lead, your operations director, your communications person — without a developer, without a SOC, without a CISO. The work this tool helps you do is half-defensive and half-empowering. Both halves matter.
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
          title="Source"
          subtitle="The original briefing"
          description="29 pages, CC BY-NC 4.0, hosted by Cloud Security Alliance. Always verify against source."
          href="https://labs.cloudsecurityalliance.org/mythos-ciso/"
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
