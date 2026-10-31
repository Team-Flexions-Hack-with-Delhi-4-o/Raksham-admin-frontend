import { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import ResourceTableRow from './ResourceTableRow'

const HEAD = 'px-2.5 py-3.5 text-left text-[13px] font-semibold text-[#555]'

function SortHead({ label, active, descending, onClick }) {
  return (
    <th className={HEAD} aria-sort={active ? (descending ? 'descending' : 'ascending') : 'none'}>
      <button type="button" onClick={onClick} className="inline-flex items-center gap-1.5 font-semibold hover:text-ink">
        {label}
        {active && <ArrowDown size={14} aria-hidden="true" className={descending ? '' : 'rotate-180'} />}
      </button>
    </th>
  )
}

function ResourceTable({ rows, selected, onToggle, onToggleAll, sort, onSort }) {
  const allRef = useRef(null)
  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id))
  const some = rows.some((r) => selected.has(r.id))

  useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = some && !allSelected
  }, [some, allSelected])

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1080px] text-sm">
        <thead className="bg-[#fafaf8]">
          <tr>
            <th className="py-3.5 pl-4 pr-1">
              <input ref={allRef} type="checkbox" aria-label="Select all on this page" checked={allSelected} onChange={onToggleAll} className="size-5 accent-brand" />
            </th>
            <SortHead
              label="Title"
              active={sort === 'title_asc' || sort === 'title_desc'}
              descending={sort === 'title_desc'}
              onClick={() => onSort(sort === 'title_asc' ? 'title_desc' : 'title_asc')}
            />
            <th className={HEAD}>Type</th>
            <th className={HEAD}>Category</th>
            <th className={HEAD}>Jurisdiction</th>
            <th className={HEAD}>Source</th>
            <SortHead
              label="Last updated"
              active={sort === 'recent' || sort === 'oldest'}
              descending={sort === 'recent'}
              onClick={() => onSort(sort === 'recent' ? 'oldest' : 'recent')}
            />
            <th className={HEAD}>Status</th>
            <th className={HEAD}>Action</th>
            <th className="w-12" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <ResourceTableRow key={r.id} resource={r} selected={selected.has(r.id)} onSelect={() => onToggle(r.id)} dropUp={rows.length > 3 && i >= rows.length - 2} />
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className="px-6 py-14 text-center text-muted">No resources match these filters.</p>}
    </div>
  )
}

export default ResourceTable
