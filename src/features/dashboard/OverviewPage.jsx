import { useState } from 'react'
import { getOverviewData } from '../../services/dashboardService'
import OverviewHeader from './OverviewHeader'
import DemoNotice from './DemoNotice'
import KPIGrid from './KPIGrid'
import AnalyticsGrid from './AnalyticsGrid'
import NeedsAttention from './NeedsAttention'
import RecentActivity from './RecentActivity'

const data = getOverviewData()

function OverviewPage() {
  const [range, setRange] = useState(30)
  const periodLabel = `last ${range} days`

  return (
    <div>
      <OverviewHeader range={range} onRangeChange={setRange} />
      {data.isSample && <DemoNotice />}
      <KPIGrid kpis={data.kpis} comparison={`${range} days`} />
      <AnalyticsGrid data={data} periodLabel={periodLabel} />
      <div className="grid grid-cols-1 gap-3.5 wide:grid-cols-[1.1fr_1fr]">
        <NeedsAttention rows={data.attention} />
        <RecentActivity rows={data.activity} />
      </div>
      <footer className="mt-6 text-center text-xs text-muted">
        Raksham provides general legal information, not legal advice. Not affiliated with any government body.
      </footer>
    </div>
  )
}

export default OverviewPage
