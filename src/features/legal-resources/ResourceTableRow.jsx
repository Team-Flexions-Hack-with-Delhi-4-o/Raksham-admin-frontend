import { ExternalLink } from 'lucide-react'
import Button from '../../components/ui/Button'
import RowMenu from '../verification/RowMenu'
import { formatDate } from '../verification/format'
import { STATUS, TYPES } from './resourceConfig'
import { sourceHost } from './resourceSelectors'

const tag = 'inline-block rounded-md border border-line bg-chip px-2.5 py-1 text-[13px] leading-tight'

function ResourceTableRow({ resource: r, selected, onSelect, dropUp }) {
  const status = STATUS[r.status]
  const host = sourceHost(r.url)
  const openSource = () => window.open(r.url, '_blank', 'noopener,noreferrer')

  return (
    <tr className={`border-t border-line ${selected ? 'bg-brand-soft/40' : ''}`}>
      <td className="py-3 pl-4 pr-1">
        <input type="checkbox" aria-label={`Select ${r.title}`} checked={selected} onChange={onSelect} className="size-5 accent-brand" />
      </td>
      <td className="min-w-[200px] max-w-[250px] px-2.5 py-3 leading-snug">
        <span className="block font-semibold">{r.title}</span>
        {r.sections && <span className="block text-[13px] text-muted">{r.sections}</span>}
      </td>
      <td className="px-2.5 py-3">
        <span className={tag}>{TYPES[r.type]}</span>
      </td>
      <td className="px-2.5 py-3">
        <span className={tag}>{r.category}</span>
      </td>
      <td className="px-2.5 py-3 text-muted">{r.jurisdiction}</td>
      <td className="whitespace-nowrap px-2.5 py-3">
        <a href={r.url} target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center gap-2 text-[#1a56db] underline">
          {host}
          <ExternalLink size={16} aria-hidden="true" className="text-ink" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </td>
      <td className="whitespace-nowrap px-2.5 py-3 text-muted">{formatDate(r.lastUpdated)}</td>
      <td className="whitespace-nowrap px-2.5 py-3">
        <span className="inline-flex items-center gap-2.5">
          <span aria-hidden="true" className={`size-3 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </td>
      <td className="px-2.5 py-3">
        <Button onClick={openSource} className="w-[108px] px-3 text-[15px]" aria-label={`Open ${r.title} source`}>
          Open <ExternalLink size={16} aria-hidden="true" />
        </Button>
      </td>
      <td className="py-3 pl-0 pr-2">
        <RowMenu
          label={`More options for ${r.title}`}
          dropUp={dropUp}
          items={[
            { label: 'Open source site', onSelect: openSource },
            { label: 'Copy title', onSelect: () => navigator.clipboard?.writeText(r.title).catch(() => {}) },
          ]}
        />
      </td>
    </tr>
  )
}

export default ResourceTableRow
