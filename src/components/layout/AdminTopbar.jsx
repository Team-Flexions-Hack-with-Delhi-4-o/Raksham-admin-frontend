import { useLocation, useSearchParams } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'
import NotificationsMenu from './NotificationsMenu'
import ProfileMenu from './ProfileMenu'

function AdminTopbar({ onMenuClick }) {
  const { pathname } = useLocation()
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const placeholder = pathname.startsWith('/verification-queue')
    ? 'Search advocates, reference ID or practice area...'
    : 'Search ticket ID, user ID, resource or keyword...'

  const setQuery = (value) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.delete('page')
        if (value) next.set('q', value)
        else next.delete('q')
        return next
      },
      { replace: true },
    )

  return (
    <header className="flex h-[72px] items-center gap-3 px-4 sm:px-6 lg:px-7">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        aria-controls="admin-sidebar"
        className="grid size-10 shrink-0 place-items-center rounded-full hover:bg-white lg:hidden"
      >
        <Menu size={22} />
      </button>

      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="flex h-10 min-w-0 max-w-[680px] flex-1 items-center gap-2.5 rounded-full bg-white px-4 text-muted shadow-[0_1px_2px_rgb(0_0_0/0.06)] focus-within:ring-2 focus-within:ring-ink"
      >
        <Search size={18} className="shrink-0" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search"
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
        />
      </form>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <span className="hidden whitespace-nowrap rounded-full border border-brand bg-[#fff8d6] px-3 py-2 text-xs font-bold md:inline-block">
          DEMO ENVIRONMENT
        </span>
        <ProfileMenu />
        <NotificationsMenu />
      </div>
    </header>
  )
}

export default AdminTopbar
