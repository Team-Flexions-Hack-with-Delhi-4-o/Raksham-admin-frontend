import { useEffect, useRef } from 'react'
import UserTableRow from './UserTableRow'

const HEAD = 'px-2.5 py-3.5 text-left text-[13px] font-semibold text-[#555]'

function UserTable({ rows, selected, onToggle, onToggleAll, onAction }) {
  const allRef = useRef(null)
  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id))
  const some = rows.some((r) => selected.has(r.id))

  useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = some && !allSelected
  }, [some, allSelected])

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[960px] text-sm">
        <thead className="bg-[#fafaf8]">
          <tr>
            <th className="py-3.5 pl-4 pr-1">
              <input ref={allRef} type="checkbox" aria-label="Select all on this page" checked={allSelected} onChange={onToggleAll} className="size-5 accent-brand" />
            </th>
            <th className={HEAD}>User</th>
            <th className={HEAD}>Role</th>
            <th className={HEAD}>Phone / Email</th>
            <th className={HEAD}>Status</th>
            <th className={HEAD}>Joined on</th>
            <th className={HEAD}>Last active</th>
            <th className={`${HEAD} pr-5 text-right`}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((u, i) => (
            <UserTableRow key={u.id} user={u} selected={selected.has(u.id)} onSelect={() => onToggle(u.id)} onAction={onAction} dropUp={rows.length > 3 && i >= rows.length - 2} />
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className="px-6 py-14 text-center text-muted">No users match these filters.</p>}
    </div>
  )
}

export default UserTable
