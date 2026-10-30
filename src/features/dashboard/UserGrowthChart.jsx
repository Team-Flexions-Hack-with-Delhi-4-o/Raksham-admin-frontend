import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChartCard, { Legend } from './ChartCard'
import { AXIS_TICK, CITIZEN_COLOR, GRID_STROKE, NEUTRAL_COLOR, TOOLTIP_STYLE } from './chartStyles'

function UserGrowthChart({ data, periodLabel }) {
  return (
    <ChartCard
      title="User growth"
      subtitle={`New citizen and advocate accounts in the ${periodLabel}.`}
      legend={
        <Legend
          items={[
            { label: 'Citizens', color: CITIZEN_COLOR },
            { label: 'Advocates', color: NEUTRAL_COLOR },
          ]}
        />
      }
    >
      <div className="h-[230px]" role="img" aria-label="Grouped bar chart of new citizen and advocate accounts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 4, left: -16, bottom: 0 }} barGap={4}>
            <CartesianGrid vertical={false} stroke={GRID_STROKE} />
            <XAxis dataKey="label" tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 200]} ticks={[0, 50, 100, 150, 200]} tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: 'rgb(0 0 0 / 0.04)' }} {...TOOLTIP_STYLE} />
            <Bar dataKey="citizens" name="Citizens" fill={CITIZEN_COLOR} radius={[6, 6, 0, 0]} maxBarSize={18} isAnimationActive={false} />
            <Bar dataKey="advocates" name="Advocates" fill={NEUTRAL_COLOR} radius={[6, 6, 0, 0]} maxBarSize={18} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}

export default UserGrowthChart
