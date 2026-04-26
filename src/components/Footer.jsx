import { useState } from 'react'

const GLOSSARY = [
  { term: 'Mythos', def: 'Anthropic\'s Claude Mythos preview (April 2026) — the AI model that triggered the working group\'s briefing by autonomously discovering thousands of zero-day vulnerabilities. The name has stuck as shorthand for the capability, not just the model.' },
  { term: 'VulnOps', def: 'Vulnerability Operations — a dedicated function for continuous discovery and remediation of software flaws, modeled on DevOps. The document\'s aspiration; mostly unrealistic for nonprofits below the Cyber Poverty Line.' },
  { term: 'MFA / phishing-resistant MFA', def: 'Multi-Factor Authentication — a second verification step beyond a password (text code, app prompt, security key). "Phishing-resistant" means hardware keys (FIDO2) or platform authenticators that can\'t be tricked by a fake login page; standard MFA via SMS or app notification can be phished.' },
  { term: 'EDR', def: 'Endpoint Detection and Response — security software on laptops/servers that watches for suspicious behavior and can isolate the machine automatically. Modern alternative to antivirus.' },
  { term: 'Segmentation', def: 'Network design that limits how far an attacker can move once they\'re inside. Flat networks (everything talks to everything) let one breach become a full compromise; segmented networks contain the damage.' },
  { term: 'Egress filtering', def: 'Firewall rules that control what your network can talk to OUTSIDE itself. Per the document, egress filtering blocked every public log4j exploit when implemented properly.' },
  { term: 'ISAC', def: 'Information Sharing and Analysis Center — sector-specific groups (NH-ISAC for health, REN-ISAC for higher ed) that share threat intelligence among members. Pricing varies; some are free for qualifying members.' },
  { term: 'MSP', def: 'Managed Service Provider — the outsourced IT firm most small and mid-size nonprofits use. Patches, monitoring, and incident response are usually their job, governed by an SLA.' },
  { term: 'SOC', def: 'Security Operations Center — the team or service that monitors for and responds to incidents 24/7. May be in-house at large orgs or part of an MSP/MSSP service.' },
  { term: 'SLA', def: 'Service Level Agreement — written commitments from your MSP or vendor on response time, uptime, and patch deployment cadence. Your strongest lever for getting urgent work prioritized.' },
  { term: 'TPRM', def: 'Third-Party Risk Management — the discipline of evaluating and monitoring vendors and software suppliers for security risk. Increasingly central as supply-chain attacks grow.' },
  { term: 'Cooling-off / security gate', def: 'A required pause and review between writing code and shipping it to production, where a human (or AI) checks for security flaws before the code goes live. The opposite of "merge straight to main."' },
  { term: 'Cyber Poverty Line', def: 'Wendy Nather\'s term for the threshold below which an organization cannot effectively defend itself against modern cyber threats, regardless of intent. Defined by limited budget, limited staff, and limited leverage with vendors.' },
  { term: 'Zero-day', def: 'A software flaw the vendor doesn\'t yet know about, so no patch exists. AI tools have collapsed the cost of finding zero-days, which is the heart of the working group\'s concern.' },
]

export default function Footer() {
  const [glossaryOpen, setGlossaryOpen] = useState(false)
  return (
    <footer className="bg-mtm-cream py-8 mt-16 no-print">
      <div className="max-w-container mx-auto px-6">
        <div className="text-center">
          <img src="/assets/mtm-logo.png" alt="Meet the Moment" className="h-10 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-2">An MTM working tool · Meet the Moment</p>
        </div>

        <div className="bg-white rounded-lg shadow-card p-5 my-6 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-mtm-accent font-semibold mb-2">From the path</p>
          <p className="text-sm text-gray-800 leading-relaxed">
            Joshua Peskay and Kim Snyder built this at Meet the Moment because we work daily with nonprofit IT leaders who don't have a CISO, don't have a SOC, and don't have a security team — but who do have communities counting on them to get this right. We're sharing what we wish someone had translated for us when we first read the briefing. We're not above the work; we're a few steps ahead in the same jungle. If a passage feels wrong or a translation lands poorly, tell us — the most useful version of this tool is the one calibrated by the people using it. <a href="mailto:joshua@mtm.now" className="text-mtm-primary underline">joshua@mtm.now</a>
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-6">
          <button onClick={() => setGlossaryOpen(!glossaryOpen)} className="w-full text-left bg-white rounded-lg shadow-card p-4 hover:bg-gray-50 transition flex justify-between items-center">
            <span className="font-semibold text-mtm-navy">Glossary — terms used in this briefing</span>
            <span className="text-mtm-primary text-xl">{glossaryOpen ? '−' : '+'}</span>
          </button>
          {glossaryOpen && (
            <div className="bg-white rounded-b-lg shadow-card -mt-2 p-5 border-t border-gray-100 text-sm text-gray-700">
              <dl className="space-y-3">
                {GLOSSARY.map((g) => (
                  <div key={g.term}>
                    <dt className="font-semibold text-mtm-navy">{g.term}</dt>
                    <dd className="leading-relaxed">{g.def}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Translates the CSA / SANS / [un]prompted / OWASP <a href="https://labs.cloudsecurityalliance.org/mythos-ciso/" target="_blank" rel="noopener noreferrer" className="text-mtm-primary underline"><em>"AI Vulnerability Storm: Building a Mythos-ready Security Program"</em></a> briefing (April 18, 2026 v0.95) for nonprofits operating below the Cyber Poverty Line.
            Source document is CC BY-NC 4.0 licensed. Translations and tier-aware guidance are MTM's interpretation.
            This is an internal working tool; not legal, technology, or business advice.
          </p>
          <p className="text-xs text-gray-500 mt-4">
            <a href="https://mtm.now" className="text-mtm-primary hover:underline">mtm.now</a> · Drafted with help from Vishali, an AI assistant
          </p>
        </div>
      </div>
    </footer>
  )
}
