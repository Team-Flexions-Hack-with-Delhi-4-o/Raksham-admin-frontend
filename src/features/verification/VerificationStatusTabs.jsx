import { TABS } from './statusConfig'

function VerificationStatusTabs({ value, counts, onChange }) {
  return (
    <div className="-mx-1 overflow-x-auto border-b border-line px-1">
      <div role="tablist" aria-label="Verification status" className="flex min-w-max gap-8">
        {TABS.map((t) => {
          const active = t.value === value
          return (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(t.value)}
              className={`-mb-px flex items-center gap-2.5 whitespace-nowrap border-b-[3px] px-1 pb-3 pt-2 text-[15px] ${
                active ? 'border-brand font-semibold text-ink' : 'border-transparent text-[#333] hover:text-ink'
              }`}
            >
              {t.label}
              <span className={active ? 'font-semibold' : 'text-muted'}>{counts[t.value] ?? 0}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default VerificationStatusTabs
