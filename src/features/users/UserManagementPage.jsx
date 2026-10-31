import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Pagination from '../../components/common/Pagination'
import Card from '../../components/ui/Card'
import DonutCard from './DonutCard'
import UserActionDialogs from './UserActionDialogs'
import UserGrowthChart from './UserGrowthChart'
import UserStatistics from './UserStatistics'
import UserTable from './UserTable'
import UserToolbar from './UserToolbar'
import { PAGE_SIZE, ROLES, STATUS } from './userConfig'
import { applyFilters, countBy, sortUsers } from './userSelectors'
import { useUserParams } from './useUserParams'
import { useUsers } from './useUsers'

const slices = (config, counts) =>
  Object.entries(config).map(([key, c]) => ({ name: key === 'citizen' || key === 'advocate' ? `${c.label}s` : c.label, value: counts[key] ?? 0, color: c.color }))

function UserManagementPage() {
  const users = useUsers()
  const { state, update } = useUserParams()
  const [selected, setSelected] = useState(() => new Set())
  const [action, setAction] = useState(null)

  const roleCounts = countBy(users, 'role')
  const statusCounts = countBy(users, 'status')

  const visible = sortUsers(applyFilters(users, state), state.sort)
  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE))
  const page = Math.min(state.page, pageCount)
  const rows = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const toggle = (id) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (!next.delete(id)) next.add(id)
      return next
    })
  const toggleAll = () =>
    setSelected((prev) => {
      const next = new Set(prev)
      const every = rows.every((r) => next.has(r.id))
      rows.forEach((r) => (every ? next.delete(r.id) : next.add(r.id)))
      return next
    })

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight md:text-[34px]">User management</h1>
          <p className="mt-1 text-base text-muted">Manage citizen and advocate accounts, view their status and take necessary actions.</p>
        </div>
        <Link to="/user-management/new" className="inline-flex items-center gap-2.5 rounded-xl bg-[#0f1b33] px-6 py-3.5 font-semibold text-white hover:bg-[#1b2a4a]">
          <Plus size={20} aria-hidden="true" />
          Add advocate
        </Link>
      </div>

      <div className="mt-5">
        <UserStatistics total={users.length} active={statusCounts.active ?? 0} restricted={statusCounts.restricted ?? 0} />
      </div>
      <div className="my-4 grid grid-cols-1 gap-3.5 md:grid-cols-2 desk:grid-cols-[1.15fr_1fr_1fr]">
        <div className="md:col-span-2 desk:col-span-1">
          <UserGrowthChart />
        </div>
        <DonutCard title="Users by role" data={slices(ROLES, roleCounts)} total={users.length} />
        <DonutCard title="Account status" data={slices(STATUS, statusCounts)} total={users.length} />
      </div>

      <UserToolbar state={state} onChange={update} />

      <Card className="mt-4 overflow-hidden">
        <UserTable rows={rows} selected={selected} onToggle={toggle} onToggleAll={toggleAll} onAction={(type, user) => setAction({ type, user })} />
        <Pagination
          page={page}
          pageCount={pageCount}
          from={(page - 1) * PAGE_SIZE + 1}
          to={(page - 1) * PAGE_SIZE + rows.length}
          total={visible.length}
          onChange={(p) => update({ page: p })}
        />
      </Card>
      <p className="mt-3 text-xs text-muted">Sample data: all users are fictional, and changes made here last for this session only.</p>

      <UserActionDialogs action={action} onClose={() => setAction(null)} />
    </div>
  )
}

export default UserManagementPage
