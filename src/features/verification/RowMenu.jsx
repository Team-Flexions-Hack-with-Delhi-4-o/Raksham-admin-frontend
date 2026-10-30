import { useRef, useState } from 'react'
import { MoreVertical } from 'lucide-react'
import { useDismiss } from '../../hooks/useDismiss'

function RowMenu({ label, items, dropUp }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useDismiss(ref, open, () => setOpen(false))

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="grid size-9 place-items-center rounded-full hover:bg-canvas"
      >
        <MoreVertical size={20} />
      </button>
      {open && (
        <ul
          role="menu"
          className={`absolute right-0 z-30 w-48 rounded-2xl bg-white p-2 text-left shadow-pop ${dropUp ? 'bottom-full mb-1' : 'top-full mt-1'}`}
        >
          {items.map(({ label: text, onSelect, disabled }) => (
            <li key={text} role="none">
              <button
                type="button"
                role="menuitem"
                disabled={disabled}
                onClick={() => {
                  setOpen(false)
                  onSelect()
                }}
                className="block w-full rounded-lg px-3 py-2 text-left hover:bg-canvas disabled:text-muted disabled:hover:bg-transparent"
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RowMenu
