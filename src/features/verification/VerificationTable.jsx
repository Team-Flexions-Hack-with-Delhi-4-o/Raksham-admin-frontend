import { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import AdvocateTableRow from './AdvocateTableRow'

const HEAD = 'px-2.5 py-3.5 text-left text-[13px] font-semibold text-[#555]'

function VerificationTable({ rows, selected, onToggle, onToggleAll, search, sort }) {
  const allRef = useRef(null)
  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id))
  const some = rows.some((r) => selected.has(r.id))

  useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = some && !allSelected
  }, [some, allSelected])

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px] text-sm">
        <thead className="bg-[#fafaf8]">
          <tr>
            <th className="py-3.5 pl-4 pr-1">
              <input
                ref={allRef}
                type="checkbox"
                aria-label="Select all on this page"
                checked={allSelected}
                onChange={onToggleAll}
                className="size-5 accent-brand"
              />
            </th>
            <th className={HEAD}>Advocate</th>
            <th className={HEAD}>Practice areas</th>
            <th className={HEAD}>Jurisdiction</th>
            <th className={HEAD}>
              <span className="inline-flex items-center gap-1.5">
                Submitted
                {sort !== 'name' && <ArrowDown size={14} className={sort === 'newest' ? '' : 'rotate-180'} aria-hidden="true" />}
              </span>
            </th>
            <th className={HEAD}>Status</th>
            <th className={HEAD}>Assigned to</th>
            <th className={HEAD}>Action</th>
            <th className="w-14" />
          </tr>
        </thead>
        <tbody>
          {rows.map((a, i) => (
            <AdvocateTableRow
              key={a.id}
              advocate={a}
              selected={selected.has(a.id)}
              onSelect={() => onToggle(a.id)}
              search={search}
              dropUp={rows.length > 3 && i >= rows.length - 2}
            />
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className="px-6 py-14 text-center text-muted">No advocates match these filters.</p>}
    </div>
  )
}

export default VerificationTable
