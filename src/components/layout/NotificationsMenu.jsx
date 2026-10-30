import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useDismiss } from '../../hooks/useDismiss'
import { NOTIFICATIONS } from '../../features/dashboard/mockData'

function NotificationsMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useDismiss(ref, open, () => setOpen(false))

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Notifications, 3 unread"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative grid size-10 place-items-center rounded-full hover:bg-white"
      >
        <Bell size={22} strokeWidth={1.6} />
        <span className="absolute right-2 top-2 size-2 rounded-full bg-brand" />
      </button>
      {open && (
        <div className="absolute right-0 z-30 mt-2 w-72 rounded-2xl bg-white p-2 shadow-pop">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Sample notifications
          </p>
          <ul>
            {NOTIFICATIONS.map((n) => (
              <li key={n.id}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-canvas"
                >
                  <span className="block font-medium">{n.title}</span>
                  <span className="block text-xs text-muted">{n.time}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default NotificationsMenu
