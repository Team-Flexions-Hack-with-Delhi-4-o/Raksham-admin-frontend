import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { SOURCE_OPTIONS } from './mockData'

function SourcesChecked({ values, onChange, disabled }) {
  const [open, setOpen] = useState(true)
  const toggle = (s) => onChange(values.includes(s) ? values.filter((x) => x !== s) : [...values, s])

  return (
    <section>
      <h3 className="text-lg font-semibold">Sources checked</h3>
      <p className="mb-3 mt-1 text-muted">Select all that apply.</p>
      <div className="flex items-start justify-between gap-3 rounded-xl border border-line px-4 py-3">
        {open ? (
          <div className="space-y-2.5">
            {SOURCE_OPTIONS.map((s) => (
              <label key={s} className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={values.includes(s)}
                  disabled={disabled}
                  onChange={() => toggle(s)}
                  className="size-5 accent-brand"
                />
                {s}
              </label>
            ))}
          </div>
        ) : (
          <p className="text-muted">{values.length} selected</p>
        )}
        <button
          type="button"
          aria-label={open ? 'Collapse sources' : 'Expand sources'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-1 hover:bg-canvas"
        >
          <ChevronDown size={20} className={open ? '' : '-rotate-90'} />
        </button>
      </div>
    </section>
  )
}

export default SourcesChecked
