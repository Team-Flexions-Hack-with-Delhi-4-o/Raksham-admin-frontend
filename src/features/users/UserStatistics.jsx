import { ArrowDown, ArrowUp, User, UsersRound } from 'lucide-react'
import Card from '../../components/ui/Card'
import { USER_DELTAS } from './mockData'

function StatCard({ icon: Icon, tint, title, value, delta }) {
  const Arrow = delta.direction === 'up' ? ArrowUp : ArrowDown
  return (
    <Card as="article" className="flex items-center gap-5 p-5">
      <span className={`grid size-[72px] shrink-0 place-items-center rounded-full ${tint}`}>
        <Icon size={32} strokeWidth={1.6} />
      </span>
      <div>
        <p className="text-[15px] text-[#444]">{title}</p>
        <p className="my-0.5 text-[34px] font-bold leading-tight">{value.toLocaleString('en-IN')}</p>
        <p className={`flex items-center gap-1 text-[14px] font-semibold ${delta.tone === 'good' ? 'text-good' : 'text-bad'}`}>
          <Arrow size={15} strokeWidth={2.4} aria-hidden="true" />
          {delta.change}%
        </p>
        <p className="text-[13px] text-muted">vs previous 30 days</p>
      </div>
    </Card>
  )
}

function UserStatistics({ total, active, restricted }) {
  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard icon={UsersRound} tint="bg-[#e3eefe] text-[#3988f5]" title="Total users" value={total} delta={USER_DELTAS.total} />
      <StatCard icon={User} tint="bg-[#dff5ec] text-[#10a875]" title="Active users" value={active} delta={USER_DELTAS.active} />
      <StatCard icon={User} tint="bg-[#fde8e8] text-[#ef4444]" title="Restricted users" value={restricted} delta={USER_DELTAS.restricted} />
    </div>
  )
}

export default UserStatistics
