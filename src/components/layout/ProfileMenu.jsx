import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useDismiss } from '../../hooks/useDismiss'
import { CURRENT_ADMIN } from './navItems'

const ITEMS = [
  { label: 'View profile', to: '/profile' },
  { label: 'Settings', to: '/settings' },
  { label: 'Sign out', to: '/sign-out' },
]

function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useDismiss(ref, open, () => setOpen(false))

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 hover:bg-white"
      >
        <span className="grid size-10 place-items-center rounded-full bg-[#ededef] text-sm font-bold">
          {CURRENT_ADMIN.initials}
        </span>
        <span className="hidden whitespace-nowrap xl:inline">{CURRENT_ADMIN.name}</span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <ul role="menu" className="absolute right-0 z-30 mt-2 w-52 rounded-2xl bg-white p-2 shadow-pop">
          {ITEMS.map(({ label, to }) => (
            <li key={to} role="none">
              <Link
                role="menuitem"
                to={to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 hover:bg-canvas"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProfileMenu
