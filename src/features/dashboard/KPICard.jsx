import { ArrowDown, ArrowUp, Briefcase, FileText, MessageSquareText, ShieldCheck, User } from 'lucide-react'
import Card from '../../components/ui/Card'
import InfoTip from '../../components/ui/InfoTip'

const ICONS = {
  user: User,
  briefcase: Briefcase,
  file: FileText,
  message: MessageSquareText,
  shield: ShieldCheck,
}

function KPICard({ kpi, comparison }) {
  const Icon = ICONS[kpi.icon]
  const Arrow = kpi.direction === 'up' ? ArrowUp : ArrowDown
  const sign = kpi.direction === 'up' ? '+' : '-'
  const color = kpi.tone === 'good' ? 'text-good' : 'text-bad'

  return (
    <Card as="article" className="flex flex-col p-4">
      <div className="flex min-h-9 items-start gap-2 text-[13px] leading-tight">
        <span className="grid size-[34px] shrink-0 place-items-center rounded-[10px] bg-brand-soft">
          <Icon size={18} strokeWidth={1.8} />
        </span>
        <span className="pt-1">{kpi.title}</span>
        <span className="ml-auto pt-1">
          <InfoTip text={kpi.info} label={`About ${kpi.title}`} />
        </span>
      </div>
      <p className="mb-1 mt-4 text-[30px] font-bold leading-none">{kpi.value}</p>
      <p className={`flex items-center gap-1 text-[13px] font-semibold ${color}`}>
        <Arrow size={14} strokeWidth={2.2} aria-hidden="true" />
        <span>
          {sign}
          {kpi.change}%
        </span>
      </p>
      <p className="mt-0.5 text-[13px] text-muted">vs previous {comparison}</p>
      <span className="mt-3 w-fit rounded-full bg-chip px-2.5 py-0.5 text-[11px] text-[#666]">Sample</span>
    </Card>
  )
}

export default KPICard
