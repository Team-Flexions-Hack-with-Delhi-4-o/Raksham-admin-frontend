import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import Card from '../../components/ui/Card'
import { STATUS } from './resourceConfig'

function ResourcesByStatusChart({ counts, total }) {
  const data = Object.entries(STATUS).map(([key, s]) => ({ key, name: s.label, color: s.color, value: counts[key] ?? 0 }))

  return (
    <Card className="min-w-0 p-5">
      <h2 className="text-base font-semibold">Resources by status</h2>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-6">
        <div className="relative size-[190px] shrink-0" role="img" aria-label="Doughnut chart of resources by status">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={92}
                startAngle={90}
                endAngle={-270}
                paddingAngle={0}
                stroke="#fff"
                strokeWidth={2}
                isAnimationActive={false}
              >
                {data.map((d) => (
                  <Cell key={d.key} fill={d.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgb(16 16 16 / 0.14)', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 grid place-content-center text-center">
            <p className="text-2xl font-bold leading-none">{total}</p>
            <p className="mt-1 text-[13px] text-[#777]">Total</p>
          </div>
        </div>
        <ul className="min-w-[200px] text-[14px]">
          {data.map((d) => (
            <li key={d.key} className="flex items-center gap-3 py-2">
              <span className="size-3.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="flex-1 pr-6">{d.name}</span>
              <span className="w-6 text-right font-medium">{d.value}</span>
              <span className="w-12 text-right text-[#555]">({total ? Math.round((d.value / total) * 100) : 0}%)</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

export default ResourcesByStatusChart
