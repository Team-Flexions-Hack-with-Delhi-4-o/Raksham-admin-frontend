import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import ChartCard from './ChartCard'
import { TOOLTIP_STYLE } from './chartStyles'

function VerificationStatusChart({ data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <ChartCard title="Verification queue status" subtitle="Current status of items in the queue.">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="relative size-[170px] shrink-0" role="img" aria-label="Doughnut chart of verification queue status">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={54}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                paddingAngle={1}
                stroke="none"
                isAnimationActive={false}
              >
                {data.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
              <Tooltip {...TOOLTIP_STYLE} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 grid place-content-center text-center">
            <p className="text-3xl font-bold leading-none">{total}</p>
            <p className="mt-1 text-xs text-[#777]">Total</p>
          </div>
        </div>
        <ul className="min-w-[160px] flex-1 text-[13px]">
          {data.map((d) => (
            <li key={d.name} className="flex items-center gap-2 py-1.5">
              <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="flex-1">{d.name}</span>
              <span className="whitespace-nowrap">
                {d.value} ({Math.round((d.value / total) * 100)}%)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  )
}

export default VerificationStatusChart
