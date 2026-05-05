export default function Header({ tab, setTab }) {
  const tabs = [
    { id: 'intro', label: 'Overview' },
    { id: 'risks', label: 'Risk Register' },
    { id: 'actions', label: 'Priority Actions' },
    { id: 'assess', label: 'Self-Assessment' },
    { id: 'briefing', label: 'Board Briefing' },
  ]
  return (
    <header className="bg-mtm-navy text-white no-print">
      <div className="max-w-container mx-auto px-6 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img src="/assets/mtm-logo.png" alt="Meet the Moment" className="h-14 w-14 bg-white rounded p-1" />
            <div>
              <p className="text-xs uppercase tracking-widest text-mtm-softBlue">Meet the Moment</p>
              <h1 className="text-2xl font-bold leading-tight">Mythos-ready for Nonprofits</h1>
              <p className="text-sm text-mtm-softBlue">An MTM working tool · Internal preview · Not yet for public release</p>
            </div>
          </div>
          {__LAST_UPDATED_DISPLAY__ && (
            <div
              className="bg-white/10 border border-white/20 rounded px-4 py-2 text-right"
              title={__LAST_UPDATED_ISO__ || ''}
            >
              <div className="text-[11px] uppercase tracking-widest text-mtm-softBlue">Last updated</div>
              <div className="text-base font-semibold leading-tight">{__LAST_UPDATED_DISPLAY__}</div>
            </div>
          )}
        </div>
        <nav className="mt-5 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded text-sm font-medium transition ${
                tab === t.id
                  ? 'bg-mtm-primary text-white shadow-card'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
