import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import Card from '../../components/ui/Card'

/** Doughnut with the total in the centre and a name / count / percent legend on the right. */
function DonutCard({ title, data, total }) {
  return (
    <Card className="min-w-0 p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-5">
        <div className="relative size-[170px] shrink-0" role="img" aria-label={`Doughnut chart: ${title}`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={56} outerRadius={85} startAngle={90} endAngle={-270} stroke="#fff" strokeWidth={1.5} isAnimationActive={false}>
                {data.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgb(16 16 16 / 0.14)', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 grid place-content-center text-center">
            <p className="text-2xl font-bold leading-none">{total.toLocaleString('en-IN')}</p>
            <p className="mt-1 text-[13px] text-[#555]">Total users</p>
          </div>
        </div>
        <ul className="min-w-[190px] text-[14px]">
          {data.map((d) => (
            <li key={d.name} className="flex items-center gap-3 py-1.5">
              <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="flex-1 pr-3">{d.name}</span>
              <span className="min-w-[36px] text-right">{d.value.toLocaleString('en-IN')}</span>
              <span className="w-10 text-right text-[#555]">{total ? Math.round((d.value / total) * 100) : 0}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

export default DonutCard
