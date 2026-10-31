import { FileText } from 'lucide-react'
import Card from '../../components/ui/Card'
import { STATUS } from './resourceConfig'

function StatCard({ icon, title, value, note }) {
  return (
    <Card as="article" className="flex items-start gap-4 p-5">
      <span className="mt-1 grid size-12 shrink-0 place-items-center">{icon}</span>
      <div>
        <p className="text-[15px] text-[#444]">{title}</p>
        <p className="my-1 text-[34px] font-bold leading-none">{value}</p>
        <p className="text-[13px] text-muted">{note}</p>
      </div>
    </Card>
  )
}

const dot = (color) => <span aria-hidden="true" className="size-4 rounded-full" style={{ backgroundColor: color }} />

function ResourceStatistics({ total, byStatus }) {
  return (
    <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
      <StatCard
        icon={
          <span className="grid size-12 place-items-center rounded-full bg-[#f0f0f2]">
            <FileText size={22} strokeWidth={1.6} />
          </span>
        }
        title="Total resources"
        value={total}
        note="From official sources"
      />
      <StatCard icon={dot(STATUS.available.color)} title="Available" value={byStatus.available ?? 0} note="Up to date" />
      <StatCard icon={dot(STATUS.needs_update.color)} title="Needs update" value={byStatus.needs_update ?? 0} note="Check latest version" />
      <StatCard icon={dot(STATUS.unavailable.color)} title="Unavailable" value={byStatus.unavailable ?? 0} note="Currently not accessible" />
    </div>
  )
}

export default ResourceStatistics
