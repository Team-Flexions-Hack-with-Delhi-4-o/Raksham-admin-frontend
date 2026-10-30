import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChartCard, { Legend } from './ChartCard'
import { AXIS_TICK, CITIZEN_COLOR, GRID_STROKE, NEUTRAL_COLOR, TOOLTIP_STYLE } from './chartStyles'
import { TICKET_TICKS } from './mockData'

function TicketsReportsChart({ data, periodLabel }) {
  const dot = (color) => ({ r: 3.5, fill: color, strokeWidth: 0 })

  return (
    <ChartCard
      title="Tickets and reports"
      subtitle={`Opened vs resolved in the ${periodLabel}.`}
      legend={
        <Legend
          items={[
            { label: 'Opened', color: CITIZEN_COLOR },
            { label: 'Resolved', color: NEUTRAL_COLOR },
          ]}
        />
      }
    >
      <div className="h-[230px]" role="img" aria-label="Line chart of opened and resolved tickets">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 18, left: -16, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke={GRID_STROKE} />
            <XAxis dataKey="label" ticks={TICKET_TICKS} interval={0} tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 40]} ticks={[0, 10, 20, 30, 40]} tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <Tooltip {...TOOLTIP_STYLE} />
            <Line type="linear" dataKey="resolved" name="Resolved" stroke={NEUTRAL_COLOR} strokeWidth={1.6} dot={dot(NEUTRAL_COLOR)} isAnimationActive={false} />
            <Line type="linear" dataKey="opened" name="Opened" stroke={CITIZEN_COLOR} strokeWidth={1.6} dot={dot(CITIZEN_COLOR)} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}

export default TicketsReportsChart
