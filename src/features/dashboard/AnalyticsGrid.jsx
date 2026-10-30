import UserGrowthChart from './UserGrowthChart'
import VerificationStatusChart from './VerificationStatusChart'
import TicketsReportsChart from './TicketsReportsChart'

function AnalyticsGrid({ data, periodLabel }) {
  return (
    <div className="my-4 grid grid-cols-1 gap-3.5 md:grid-cols-2 desk:grid-cols-[1.2fr_1.05fr_1.2fr]">
      <UserGrowthChart data={data.userGrowth} periodLabel={periodLabel} />
      <VerificationStatusChart data={data.queueStatus} />
      <div className="md:col-span-2 desk:col-span-1">
        <TicketsReportsChart data={data.ticketTrend} periodLabel={periodLabel} />
      </div>
    </div>
  )
}

export default AnalyticsGrid
