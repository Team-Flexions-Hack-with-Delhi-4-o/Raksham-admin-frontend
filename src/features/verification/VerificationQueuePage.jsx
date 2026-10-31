import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../../components/ui/Card'
import SelectMenu from '../../components/ui/SelectMenu'
import Switch from '../../components/ui/Switch'
import { listAdvocates } from '../../services/verificationService'
import FiltersMenu from './FiltersMenu'
import Pagination from '../../components/common/Pagination'
import VerificationStatusTabs from './VerificationStatusTabs'
import VerificationTable from './VerificationTable'
import { PAGE_SIZE, applyFilters, countByStatus, sortAdvocates } from './queueSelectors'
import { SORT_OPTIONS } from './statusConfig'
import { useQueueParams } from './useQueueParams'

const advocates = listAdvocates()
const areaOptions = [...new Set(advocates.flatMap((a) => a.areas))].sort()
const jurisdictionOptions = [...new Set(advocates.map((a) => a.jurisdiction))].sort()

function VerificationQueuePage() {
  const { state, update } = useQueueParams()
  const { search } = useLocation()
  const [selected, setSelected] = useState(() => new Set())

  const filtered = applyFilters(advocates, state)
  const counts = countByStatus(filtered)
  const visible = sortAdvocates(state.tab === 'all' ? filtered : filtered.filter((a) => a.status === state.tab), state.sort)

  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE))
  const page = Math.min(state.page, pageCount)
  const rows = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const toggle = (id) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (!next.delete(id)) next.add(id)
      return next
    })
  const toggleAll = () =>
    setSelected((prev) => {
      const next = new Set(prev)
      const every = rows.every((r) => next.has(r.id))
      rows.forEach((r) => (every ? next.delete(r.id) : next.add(r.id)))
      return next
    })

  return (
    <div>
      <h1 className="text-[28px] font-bold tracking-tight md:text-[34px]">Verification queue</h1>
      <p className="mt-1 text-base text-muted">Review advocate submissions against the verification checklist.</p>

      <div className="mt-6">
        <VerificationStatusTabs value={state.tab} counts={counts} onChange={(tab) => update({ tab })} />
      </div>

      <div className="my-5 flex flex-wrap items-center justify-between gap-3">
        <Switch checked={state.mine} onChange={(mine) => update({ mine })} label="Assigned to me" />
        <div className="flex flex-wrap items-center gap-3">
          <FiltersMenu
            areaOptions={areaOptions}
            jurisdictionOptions={jurisdictionOptions}
            areas={state.areas}
            jurisdiction={state.jurisdiction}
            onChange={update}
          />
          <SelectMenu ariaLabel="Sort" prefix="Sort: " options={SORT_OPTIONS} value={state.sort} onChange={(sort) => update({ sort })} />
        </div>
      </div>

      <Card className="overflow-hidden">
        <VerificationTable
          rows={rows}
          selected={selected}
          onToggle={toggle}
          onToggleAll={toggleAll}
          search={search}
          sort={state.sort}
        />
        <Pagination
          page={page}
          pageCount={pageCount}
          from={(page - 1) * PAGE_SIZE + 1}
          to={(page - 1) * PAGE_SIZE + rows.length}
          total={visible.length}
          onChange={(p) => update({ page: p })}
        />
      </Card>
    </div>
  )
}

export default VerificationQueuePage
