import { useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '../../components/ui/Card'
import SelectMenu from '../../components/ui/SelectMenu'
import { ROLES } from './userConfig'
import { USER_GROWTH } from './mockData'

const RANGES = [
  { value: '7', label: 'Last 7 days' },
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' },
]
const TICK = { fontSize: 11, fill: '#777' }
const dot = (color) => ({ r: 4, fill: color, stroke: '#fff', strokeWidth: 1.5 })

function UserGrowthChart() {
  // The sample series is fixed; the selector only changes the label until real data exists.
  const [range, setRange] = useState('30')

  return (
    <Card className="min-w-0 p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">User growth</h2>
        <div className="text-[13px] [&_button[aria-haspopup]]:rounded-lg [&_button[aria-haspopup]]:border [&_button[aria-haspopup]]:border-line [&_button[aria-haspopup]]:px-3 [&_button[aria-haspopup]]:py-1.5">
          <SelectMenu ariaLabel="Growth period" options={RANGES} value={range} onChange={setRange} />
        </div>
      </div>
      <div className="mt-3 h-[200px]" role="img" aria-label="Line chart of citizen and advocate sign-ups">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={USER_GROWTH} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
            <CartesianGrid stroke="#ececef" />
            <XAxis dataKey="label" tick={TICK} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 200]} ticks={[0, 50, 100, 150, 200]} tick={TICK} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgb(16 16 16 / 0.14)', fontSize: 12 }} />
            <Area type="monotone" dataKey="citizens" name="Citizens" stroke={ROLES.citizen.color} strokeWidth={1.8} fill={ROLES.citizen.color} fillOpacity={0.1} dot={dot(ROLES.citizen.color)} isAnimationActive={false} />
            <Area type="monotone" dataKey="advocates" name="Advocates" stroke={ROLES.advocate.color} strokeWidth={1.8} fill={ROLES.advocate.color} fillOpacity={0.1} dot={dot(ROLES.advocate.color)} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-2 flex justify-center gap-6 text-[13px]">
        {['citizen', 'advocate'].map((r) => (
          <li key={r} className="flex items-center gap-2">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: ROLES[r].color }} />
            {ROLES[r].label}s
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default UserGrowthChart
