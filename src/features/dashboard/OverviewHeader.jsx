import DateRangeSelect from './DateRangeSelect'

function OverviewHeader({ range, onRangeChange }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight md:text-[34px]">Overview</h1>
        <p className="mt-1 text-base text-muted">Key activity, system status and tasks across Raksham.</p>
      </div>
      <DateRangeSelect value={range} onChange={onRangeChange} />
    </div>
  )
}

export default OverviewHeader
