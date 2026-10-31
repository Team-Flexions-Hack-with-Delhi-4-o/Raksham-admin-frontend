import { useRef, useState } from 'react'
import { ChevronDown, Funnel } from 'lucide-react'
import { useDismiss } from '../../hooks/useDismiss'
import { STATUS, TYPES } from './resourceConfig'

function CheckGroup({ legend, options, selected, onToggle }) {
  return (
    <fieldset className="mb-4">
      <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{legend}</legend>
      <div className="space-y-1.5">
        {options.map(({ value, label }) => (
          <label key={value} className="flex cursor-pointer items-center gap-2.5">
            <input type="checkbox" checked={selected.includes(value)} onChange={() => onToggle(value)} className="size-4 accent-brand" />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function ResourceFilters({ categoryOptions, jurisdictionOptions, state, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useDismiss(ref, open, () => setOpen(false))
  const active = state.types.length + state.categories.length + state.statuses.length + (state.jurisdiction ? 1 : 0)

  const toggle = (key, list) => (v) => onChange({ [key]: list.includes(v) ? list.filter((x) => x !== v) : [...list, v] })

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-full min-h-12 w-full items-center justify-between gap-3 rounded-xl bg-white px-5 shadow-[0_1px_2px_rgb(0_0_0/0.06)]"
      >
        <span className="flex items-center gap-2.5">
          <Funnel size={18} strokeWidth={1.7} />
          Filters
          {active > 0 && <span className="grid size-5 place-items-center rounded-full bg-brand text-xs font-bold">{active}</span>}
        </span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <div role="dialog" aria-label="Filters" className="absolute right-0 z-30 mt-2 max-h-[70vh] w-72 overflow-y-auto rounded-2xl bg-white p-4 shadow-pop">
          <CheckGroup
            legend="Resource type"
            options={Object.entries(TYPES).map(([value, label]) => ({ value, label }))}
            selected={state.types}
            onToggle={toggle('type', state.types)}
          />
          <CheckGroup
            legend="Category"
            options={categoryOptions.map((c) => ({ value: c, label: c }))}
            selected={state.categories}
            onToggle={toggle('category', state.categories)}
          />
          <CheckGroup
            legend="Availability"
            options={Object.entries(STATUS).map(([value, s]) => ({ value, label: s.label }))}
            selected={state.statuses}
            onToggle={toggle('status', state.statuses)}
          />
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">Jurisdiction</span>
            <select
              value={state.jurisdiction}
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
            onClick={() => onChange({ type: [], category: [], status: [], jurisdiction: '' })}
            className="mt-4 text-sm font-semibold underline disabled:text-muted disabled:no-underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}

export default ResourceFilters
