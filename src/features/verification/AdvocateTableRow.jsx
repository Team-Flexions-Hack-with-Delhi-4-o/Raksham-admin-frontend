import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import Chip from '../../components/ui/Chip'
import RowMenu from './RowMenu'
import VerificationStatusBadge from './VerificationStatusBadge'
import { ME } from './mockData'
import { daysAgo, formatDate } from './format'
import { rowAction } from './queueSelectors'

const ACTION_LABEL = { start: 'Start review', continue: 'Continue review', view: 'View only' }

function AssigneeCell({ assignee }) {
  if (!assignee) {
    return (
      <span className="flex items-center gap-2.5 text-muted">
        <Avatar size={36} />
        Unassigned
      </span>
    )
  }
  if (assignee === 'me') {
    return (
      <span className="flex items-center gap-2.5 font-semibold">
        <Avatar size={36} initials={ME.initials} />
        You
      </span>
    )
  }
  return (
    <span className="flex items-center gap-2.5 text-muted">
      <Avatar size={36} />
      {assignee.name}
    </span>
  )
}

function AdvocateTableRow({ advocate: a, selected, onSelect, search, dropUp }) {
  const navigate = useNavigate()
  const action = rowAction(a)
  const open = () => navigate(`/verification-queue/${a.id}`, { state: { from: search } })

  const copyId = () => navigator.clipboard?.writeText(a.id).catch(() => {})

  return (
    <tr className={`border-t border-line ${selected ? 'bg-brand-soft/40' : ''}`}>
      <td className="py-3 pl-4 pr-1">
        <input
          type="checkbox"
          aria-label={`Select ${a.name}`}
          checked={selected}
          onChange={onSelect}
          className="size-5 accent-brand"
        />
      </td>
      <td className="px-2.5 py-3">
        <span className="flex items-center gap-3">
          <Avatar size={44} />
          <span className="whitespace-nowrap leading-tight">
            <span className="block font-semibold">{a.name}</span>
            <span className="block text-[13px] text-muted">{a.id}</span>
          </span>
        </span>
      </td>
      <td className="px-2.5 py-3">
        <span className="flex min-w-[150px] flex-wrap gap-1.5">
          {a.areas.map((x) => (
            <Chip key={x}>{x}</Chip>
          ))}
        </span>
      </td>
      <td className="whitespace-nowrap px-2.5 py-3 text-muted">{a.jurisdiction}</td>
      <td className="whitespace-nowrap px-2.5 py-3 leading-tight">
        <span className="block">{formatDate(a.submittedAt)}</span>
        <span className="block text-[13px] text-muted">{daysAgo(a.submittedAt)}</span>
      </td>
      <td className="px-2.5 py-3">
        <VerificationStatusBadge status={a.status} />
      </td>
      <td className="whitespace-nowrap px-2.5 py-3">
        <AssigneeCell assignee={a.assignee} />
      </td>
      <td className="px-2.5 py-3">
        {action === 'locked' ? (
          <span className="flex w-[140px] items-center gap-2.5 text-[13px] leading-tight text-muted">
            <Lock size={22} strokeWidth={1.5} className="shrink-0" />
            Can&apos;t review your own profile
          </span>
        ) : (
          <Button
            variant={action === 'view' ? 'outline' : 'primary'}
            onClick={open}
            className="w-[136px] px-3 text-[15px]"
            aria-label={`${ACTION_LABEL[action]}: ${a.name}`}
          >
            {ACTION_LABEL[action]}
          </Button>
        )}
      </td>
      <td className="py-3 pl-0 pr-2">
        <RowMenu
          label={`More options for ${a.name}`}
          dropUp={dropUp}
          items={[
            { label: 'Open review', onSelect: open, disabled: action === 'locked' },
            { label: 'Copy reference ID', onSelect: copyId },
          ]}
        />
      </td>
    </tr>
  )
}

export default AdvocateTableRow
