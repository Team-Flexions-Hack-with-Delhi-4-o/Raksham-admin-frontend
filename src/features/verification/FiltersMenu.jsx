import { useRef, useState } from 'react'
import { Funnel } from 'lucide-react'
import { useDismiss } from '../../hooks/useDismiss'

function FiltersMenu({ areaOptions, jurisdictionOptions, areas, jurisdiction, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useDismiss(ref, open, () => setOpen(false))
  const active = areas.length + (jurisdiction ? 1 : 0)

  const toggleArea = (a) =>
    onChange({ area: areas.includes(a) ? areas.filter((x) => x !== a) : [...areas, a] })

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-2.5 shadow-[0_1px_2px_rgb(0_0_0/0.06)]"
      >
        <Funnel size={18} strokeWidth={1.7} />
        Filters
        {active > 0 && <span className="grid size-5 place-items-center rounded-full bg-brand text-xs font-bold">{active}</span>}
      </button>
      {open && (
        <div role="dialog" aria-label="Filters" className="absolute right-0 z-30 mt-2 w-72 rounded-2xl bg-white p-4 shadow-pop">
          <fieldset>
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Practice area</legend>
            <div className="max-h-48 space-y-1.5 overflow-y-auto">
              {areaOptions.map((a) => (
                <label key={a} className="flex cursor-pointer items-center gap-2.5">
                  <input type="checkbox" checked={areas.includes(a)} onChange={() => toggleArea(a)} className="size-4 accent-brand" />
                  {a}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="mt-4 block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">Jurisdiction</span>
            <select
              value={jurisdiction}
              onChange={(e) => onChange({ jurisdiction: e.target.value })}
              className="w-full rounded-lg border border-line bg-white px-3 py-2"
            >
              <option value="">All jurisdictions</option>
              {jurisdictionOptions.map((j) => (
                <option key={j}>{j}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            disabled={!active}
            onClick={() => onChange({ area: [], jurisdiction: '' })}
            className="mt-4 text-sm font-semibold underline disabled:text-muted disabled:no-underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}

export default FiltersMenu
