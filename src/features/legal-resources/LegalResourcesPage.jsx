import { useState } from 'react'
import Pagination from '../../components/common/Pagination'
import Card from '../../components/ui/Card'
import Tabs from '../../components/ui/Tabs'
import { listResources } from '../../services/legalResourcesService'
import ResourceStatistics from './ResourceStatistics'
import ResourceTable from './ResourceTable'
import ResourceToolbar from './ResourceToolbar'
import ResourcesByStatusChart from './ResourcesByStatusChart'
import ResourcesByTypeChart from './ResourcesByTypeChart'
import { PAGE_SIZE, TABS } from './resourceConfig'
import { applyFilters, countBy, sortResources } from './resourceSelectors'
import { useResourceParams } from './useResourceParams'

const resources = listResources()
const typeCounts = countBy(resources, 'type')
const statusCounts = countBy(resources, 'status')
const categoryOptions = [...new Set(resources.map((r) => r.category))].sort()
const jurisdictionOptions = [...new Set(resources.map((r) => r.jurisdiction))].sort()

function LegalResourcesPage() {
  const { state, update } = useResourceParams()
  const [selected, setSelected] = useState(() => new Set())

  const filtered = applyFilters(resources, state)
  const tabCounts = { all: filtered.length, ...countBy(filtered, 'type') }
  const inTab = state.tab === 'all' ? filtered : filtered.filter((r) => r.type === state.tab)
  const visible = sortResources(inTab, state.sort)

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
      <h1 className="text-[28px] font-bold tracking-tight md:text-[34px]">Legal resources</h1>
      <p className="mt-1 text-base text-muted">Browse official laws, schemes and trusted online resources used in the app.</p>

      <div className="mt-5">
        <Tabs tabs={TABS} value={state.tab} counts={tabCounts} onChange={(tab) => update({ tab })} label="Resource type" />
      </div>

      <div className="mt-4">
        <ResourceStatistics total={resources.length} byStatus={statusCounts} />
      </div>
      <div className="my-4 grid grid-cols-1 gap-3.5 lg:grid-cols-2">
        <ResourcesByTypeChart counts={typeCounts} />
        <ResourcesByStatusChart counts={statusCounts} total={resources.length} />
      </div>

      <ResourceToolbar state={state} onChange={update} categoryOptions={categoryOptions} jurisdictionOptions={jurisdictionOptions} />

      <Card className="mt-4 overflow-hidden">
        <ResourceTable rows={rows} selected={selected} onToggle={toggle} onToggleAll={toggleAll} sort={state.sort} onSort={(sort) => update({ sort })} />
        <Pagination
          page={page}
          pageCount={pageCount}
          from={(page - 1) * PAGE_SIZE + 1}
          to={(page - 1) * PAGE_SIZE + rows.length}
          total={visible.length}
          onChange={(p) => update({ page: p })}
        />
      </Card>
      <p className="mt-3 text-xs text-muted">
        Sample data: titles are real publications, but dates, statuses and section numbers are placeholders. Links go to official home pages only.
      </p>
    </div>
  )
}

export default LegalResourcesPage
