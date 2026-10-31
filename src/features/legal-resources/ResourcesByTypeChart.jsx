import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import Card from '../../components/ui/Card'
import { TABS } from './resourceConfig'

const TOOLTIP = { contentStyle: { borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgb(16 16 16 / 0.14)', fontSize: 12 } }

function Tick({ x, y, payload }) {
  const words = payload.value.split(' ')
  return (
    <text x={x} y={y + 16} textAnchor="middle" fontSize={13} fill="#444">
      {words.length > 1 ? words.map((w, i) => <tspan key={w} x={x} dy={i ? 16 : 0}>{w}</tspan>) : payload.value}
    </text>
  )
}

function ResourcesByTypeChart({ counts }) {
  const data = TABS.filter((t) => t.value !== 'all').map((t) => ({ key: t.value, name: t.label, value: counts[t.value] ?? 0 }))

  return (
    <Card className="min-w-0 p-5">
      <h2 className="text-base font-semibold">Resources by type</h2>
      <div className="mt-2 h-[215px]" role="img" aria-label="Bar chart of resources by type">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 22, right: 8, left: 8, bottom: 0 }} barCategoryGap="28%">
            <XAxis dataKey="name" tick={<Tick />} interval={0} height={44} tickLine={false} axisLine={{ stroke: '#d9d9de' }} />
            <Tooltip cursor={{ fill: 'rgb(0 0 0 / 0.04)' }} {...TOOLTIP} />
            <Bar dataKey="value" name="Resources" radius={[2, 2, 0, 0]} maxBarSize={110} isAnimationActive={false}>
              {data.map((d) => (
                <Cell key={d.key} fill={d.key === 'act' ? '#ffc900' : '#d4d4d9'} />
              ))}
              <LabelList dataKey="value" position="top" fontSize={13} fill="#111" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default ResourcesByTypeChart
