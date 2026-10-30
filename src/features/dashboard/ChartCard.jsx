import Card from '../../components/ui/Card'

export function Legend({ items }) {
  return (
    <ul className="flex gap-3.5 text-xs text-[#444]">
      {items.map(({ label, color }) => (
        <li key={label} className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
          {label}
        </li>
      ))}
    </ul>
  )
}

function ChartCard({ title, subtitle, legend, children }) {
  return (
    <Card className="min-w-0 p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        {legend}
      </div>
      <p className="mb-3.5 mt-1 text-[13px] text-muted">{subtitle}</p>
      {children}
    </Card>
  )
}

export default ChartCard
