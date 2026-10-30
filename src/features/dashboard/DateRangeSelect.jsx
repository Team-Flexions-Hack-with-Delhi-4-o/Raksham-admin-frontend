import { useRef, useState } from 'react'
import { Calendar, Check, ChevronDown } from 'lucide-react'
import { useDismiss } from '../../hooks/useDismiss'
import { DATE_RANGES } from './mockData'

function DateRangeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useDismiss(ref, open, () => setOpen(false))
  const current = DATE_RANGES.find((r) => r.days === value)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 shadow-[0_1px_2px_rgb(0_0_0/0.06)]"
      >
        <Calendar size={18} strokeWidth={1.7} />
        <span className="whitespace-nowrap">{current.label}</span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <ul role="listbox" className="absolute right-0 z-30 mt-2 w-44 rounded-2xl bg-white p-2 shadow-pop">
          {DATE_RANGES.map((r) => (
            <li key={r.days} role="option" aria-selected={r.days === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(r.days)
                  setOpen(false)
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-canvas"
              >
                {r.label}
                {r.days === value && <Check size={16} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DateRangeSelect
