export default function Footer() {
  return (
    <footer className="bg-mtm-cream py-8 mt-16 no-print">
      <div className="max-w-container mx-auto px-6 text-center">
        <img src="/assets/mtm-logo.png" alt="Meet the Moment" className="h-10 mx-auto mb-3" />
        <p className="text-sm text-gray-600 mb-2">An MTM working tool · Meet the Moment</p>
        <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Translates the CSA / SANS / [un]prompted / OWASP <em>"AI Vulnerability Storm: Building a Mythos-ready Security Program"</em> briefing (April 18, 2026 v0.95) for nonprofits operating below the Cyber Poverty Line.
          Source document is CC BY-NC 4.0 licensed. Translations and tier-aware guidance are MTM's interpretation.
          This is an internal working tool; not legal, technology, or business advice.
        </p>
        <p className="text-xs text-gray-500 mt-4">
          <a href="https://mtm.now" className="text-mtm-primary hover:underline">mtm.now</a> · Drafted with help from Vishali, an AI assistant
        </p>
      </div>
    </footer>
  )
}
