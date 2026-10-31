import { Search } from 'lucide-react'
import SelectMenu from '../../components/ui/SelectMenu'
import ResourceFilters from './ResourceFilters'
import { SORT_OPTIONS } from './resourceConfig'

function ResourceToolbar({ state, onChange, categoryOptions, jurisdictionOptions }) {
  return (
    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_170px_230px]">
      <label className="flex min-h-12 items-center gap-3 rounded-xl bg-white px-4 text-muted shadow-[0_1px_2px_rgb(0_0_0/0.06)] focus-within:ring-2 focus-within:ring-ink">
        <Search size={18} className="shrink-0" />
        <input
          type="search"
          value={state.q}
          onChange={(e) => onChange({ q: e.target.value })}
          aria-label="Search resources"
          placeholder="Search by title, act, section, keyword or source..."
          className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
        />
      </label>
      <ResourceFilters categoryOptions={categoryOptions} jurisdictionOptions={jurisdictionOptions} state={state} onChange={onChange} />
      <div className="[&>div]:h-full [&_button[aria-haspopup]]:min-h-12 [&_button[aria-haspopup]]:w-full [&_button[aria-haspopup]]:justify-between [&_button[aria-haspopup]]:px-5">
        <SelectMenu ariaLabel="Sort" prefix="Sort: " options={SORT_OPTIONS} value={state.sort} onChange={(sort) => onChange({ sort })} />
      </div>
    </div>
  )
}

export default ResourceToolbar
