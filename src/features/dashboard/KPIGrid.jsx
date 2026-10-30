import KPICard from './KPICard'

function KPIGrid({ kpis, comparison }) {
  return (
    <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 desk:grid-cols-6">
      {kpis.map((kpi) => (
        <KPICard key={kpi.id} kpi={kpi} comparison={comparison} />
      ))}
    </div>
  )
}

export default KPIGrid
