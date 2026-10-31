import { useRef, useState } from 'react'
import { Calendar, ChevronDown, Funnel } from 'lucide-react'
import { useDismiss } from '../../hooks/useDismiss'
import { formatDate } from '../verification/format'
import { ACTIVE_WITHIN_OPTIONS } from './userConfig'

const BUTTON = 'flex min-h-11 w-full items-center justify-between gap-3 whitespace-nowrap rounded-xl bg-white px-4 shadow-[0_1px_2px_rgb(0_0_0/0.06)]'
const DATE_INPUT = 'w-full rounded-lg border border-line px-3 py-2'

function Popover({ icon: Icon, label, badge, align = 'left', children }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useDismiss(ref, open, () => setOpen(false))
  return (
    <div ref={ref} className="relative">
      <button type="button" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen((v) => !v)} className={BUTTON}>
        <span className="flex items-center gap-2.5">
          <Icon size={18} strokeWidth={1.7} />
          {label}
          {badge > 0 && <span className="grid size-5 place-items-center rounded-full bg-brand text-xs font-bold">{badge}</span>}
        </span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <div role="dialog" aria-label={label} className={`absolute z-30 mt-2 w-72 rounded-2xl bg-white p-4 shadow-pop ${align === 'right' ? 'right-0' : 'left-0'}`}>
          {children}
        </div>
      )}
    </div>
  )
}

export function JoinedDateFilter({ from, to, onChange }) {
  const label = from || to ? `${from ? formatDate(from) : '…'} – ${to ? formatDate(to) : '…'}` : 'Joined date'
  return (
    <Popover icon={Calendar} label={label}>
      <label className="mb-3 block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">From</span>
        <input type="date" value={from} max={to || undefined} onChange={(e) => onChange({ from: e.target.value })} className={DATE_INPUT} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">To</span>
        <input type="date" value={to} min={from || undefined} onChange={(e) => onChange({ to: e.target.value })} className={DATE_INPUT} />
      </label>
      <button type="button" disabled={!from && !to} onClick={() => onChange({ from: '', to: '' })} className="mt-3 text-sm font-semibold underline disabled:text-muted disabled:no-underline">
        Clear dates
      </button>
    </Popover>
  )
}

export function AdvancedFilters({ active, onChange, count, onClearAll }) {
  return (
    <Popover icon={Funnel} label="Filters" badge={count} align="right">
      <fieldset>
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Last active</legend>
        <div className="space-y-1.5">
          {ACTIVE_WITHIN_OPTIONS.map((o) => (
            <label key={o.value} className="flex cursor-pointer items-center gap-2.5">
              <input type="radio" name="active-within" checked={active === o.value} onChange={() => onChange({ active: o.value })} className="size-4 accent-brand" />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>
      <button type="button" disabled={!count} onClick={onClearAll} className="mt-4 text-sm font-semibold underline disabled:text-muted disabled:no-underline">
        Clear all filters
      </button>
    </Popover>
  )
}
