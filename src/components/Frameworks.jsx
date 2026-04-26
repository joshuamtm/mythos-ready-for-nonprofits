import { FRAMEWORK_PREFIXES, FRAMEWORK_CODES } from '../data/frameworks.js'

export default function Frameworks() {
  const grouped = FRAMEWORK_CODES.reduce((acc, c) => {
    acc[c.framework] = acc[c.framework] || []
    acc[c.framework].push(c)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-2xl font-bold text-mtm-navy mb-2">Framework Crosswalk</h2>
        <p className="text-gray-700">
          The 13 risks in the register map to four frameworks: OWASP LLM Top 10 2025, OWASP Agentic Top 10 2026, MITRE ATLAS, and NIST CSF 2.0.
          This page is a reference legend — useful when explaining the register to compliance, audit, or risk teams who think in framework codes.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-card p-6">
        <h3 className="text-lg font-bold text-mtm-navy mb-4">Prefix legend</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {FRAMEWORK_PREFIXES.map((p) => (
            <div key={p.prefix} className="border-l-4 pl-4 py-2" style={{ borderColor: p.color }}>
              <p className="font-mono text-sm font-bold text-mtm-navy">{p.prefix}</p>
              <p className="text-sm text-gray-700">{p.name}</p>
              <p className="text-xs text-gray-500 italic">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {Object.entries(grouped).map(([framework, codes]) => (
        <section key={framework} className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-bold text-mtm-navy mb-3">{framework}</h3>
          <div className="grid md:grid-cols-2 gap-2">
            {codes.map((c) => (
              <div key={c.code} className="flex gap-3 text-sm py-1">
                <span className="font-mono font-bold text-mtm-primary flex-shrink-0 w-32">{c.code}</span>
                <span className="text-gray-700">{c.name}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
