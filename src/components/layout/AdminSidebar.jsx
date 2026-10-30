import { Link, NavLink } from 'react-router-dom'
import { LogOut, X } from 'lucide-react'
import { CURRENT_ADMIN, NAV_ITEMS } from './navItems'

function AdminSidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        id="admin-sidebar"
        aria-label="Admin navigation"
        className={`fixed inset-y-0 left-0 z-40 flex w-[270px] flex-col bg-sidebar text-white transition-transform duration-200 lg:sticky lg:top-3 lg:z-auto lg:m-3 lg:h-[calc(100vh-24px)] lg:w-[250px] lg:shrink-0 lg:translate-x-0 lg:rounded-[20px] ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 px-5 pb-5 pt-6">
          <img src="/favicon.png" alt="" className="h-11 w-auto" />
          <div className="leading-tight">
            <p className="text-2xl font-bold">Raksham</p>
            <p className="text-sm text-[#c9c9ce]">Admin Console</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="ml-auto rounded-md p-1 text-[#c9c9ce] hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2.5 pt-1">
          {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-[15px] leading-snug transition-colors ${
                  isActive
                    ? 'bg-brand font-semibold text-ink'
                    : 'text-[#e8e8ea] hover:bg-sidebar-hover'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={22} strokeWidth={isActive ? 2 : 1.6} className="shrink-0" />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mx-4 border-t border-[#2a2a2a] py-4">
          <Link
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg hover:opacity-90"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-sm font-bold text-ink">
              {CURRENT_ADMIN.initials}
            </span>
            <span className="leading-tight">
              <span className="block text-[15px]">{CURRENT_ADMIN.name}</span>
              <span className="block text-sm text-[#b5b5bb]">View profile</span>
            </span>
          </Link>
          <Link
            to="/sign-out"
            onClick={onClose}
            className="mt-4 flex items-center gap-3 rounded-lg py-1 text-[15px] text-[#e8e8ea] hover:text-white"
          >
            <LogOut size={22} strokeWidth={1.6} />
            Sign out
          </Link>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar
