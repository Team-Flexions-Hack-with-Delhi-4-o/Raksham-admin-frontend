import { Search } from 'lucide-react'
import SelectMenu from '../../components/ui/SelectMenu'
import { AdvancedFilters, JoinedDateFilter } from './UserFilters'
import { ROLE_OPTIONS, SORT_OPTIONS, STATUS_OPTIONS, TYPE_OPTIONS } from './userConfig'

// Make the shared SelectMenu trigger fill its grid cell so the toolbar lines up.
const FILL = '[&_button[aria-haspopup]]:min-h-11 [&_button[aria-haspopup]]:w-full [&_button[aria-haspopup]]:justify-between'

function UserToolbar({ state, onChange }) {
  const advancedCount = state.active !== 'any' ? 1 : 0
  const clearAll = () => onChange({ type: 'all', role: 'all', status: 'all', from: '', to: '', active: 'any' })

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-[minmax(240px,1.6fr)_repeat(4,minmax(0,1fr))_minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <label className="col-span-2 flex min-h-11 items-center gap-3 rounded-xl bg-white px-4 text-muted shadow-[0_1px_2px_rgb(0_0_0/0.06)] focus-within:ring-2 focus-within:ring-ink md:col-span-4 xl:col-span-1">
        <Search size={18} className="shrink-0" />
        <input
          type="search"
          value={state.q}
          onChange={(e) => onChange({ q: e.target.value })}
          aria-label="Search users"
          placeholder="Search by name, user ID, phone or email..."
          className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
        />
      </label>
      <div className={FILL}>
        <SelectMenu ariaLabel="User type" options={TYPE_OPTIONS} value={state.type} onChange={(type) => onChange({ type })} />
      </div>
      <div className={FILL}>
        <SelectMenu ariaLabel="Role" options={ROLE_OPTIONS} value={state.role} onChange={(role) => onChange({ role })} />
      </div>
      <div className={FILL}>
        <SelectMenu ariaLabel="Status" options={STATUS_OPTIONS} value={state.status} onChange={(status) => onChange({ status })} />
      </div>
      <JoinedDateFilter from={state.joinedFrom} to={state.joinedTo} onChange={onChange} />
      <AdvancedFilters active={state.active} onChange={onChange} count={advancedCount} onClearAll={clearAll} />
      <div className={FILL}>
        <SelectMenu ariaLabel="Sort" prefix="Sort: " options={SORT_OPTIONS} value={state.sort} onChange={(sort) => onChange({ sort })} />
      </div>
    </div>
  )
}

export default UserToolbar
