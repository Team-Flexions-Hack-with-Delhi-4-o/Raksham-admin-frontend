import { useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { useDismiss } from '../../hooks/useDismiss'

function SelectMenu({ options, value, onChange, prefix = '', ariaLabel }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useDismiss(ref, open, () => setOpen(false))
  const current = options.find((o) => o.value === value)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 whitespace-nowrap rounded-xl bg-white px-4 py-2.5 shadow-[0_1px_2px_rgb(0_0_0/0.06)]"
      >
        {prefix}
        {current?.label}
        <ChevronDown size={16} />
      </button>
      {open && (
        <ul role="listbox" className="absolute right-0 z-30 mt-2 w-48 rounded-2xl bg-white p-2 shadow-pop">
          {options.map((o) => (
            <li key={o.value} role="option" aria-selected={o.value === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(o.value)
                  setOpen(false)
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-canvas"
              >
                {o.label}
                {o.value === value && <Check size={16} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SelectMenu
