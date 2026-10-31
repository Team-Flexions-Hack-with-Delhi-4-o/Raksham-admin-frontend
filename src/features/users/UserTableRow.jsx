import Avatar from '../../components/ui/Avatar'
import RowMenu from '../verification/RowMenu'
import { formatDate } from '../verification/format'
import { ROLES, STATUS } from './userConfig'
import { initial, lastActiveText } from './userSelectors'

function UserTableRow({ user: u, selected, onSelect, onAction, dropUp }) {
  const role = ROLES[u.role]
  const status = STATUS[u.status]
  const act = (type) => () => onAction(type, u)

  return (
    <tr className={`border-t border-line ${selected ? 'bg-brand-soft/40' : ''}`}>
      <td className="py-2.5 pl-4 pr-1">
        <input type="checkbox" aria-label={`Select ${u.name}`} checked={selected} onChange={onSelect} className="size-5 accent-brand" />
      </td>
      <td className="px-2.5 py-2.5">
        <span className="flex items-center gap-3.5">
          {u.role === 'citizen' ? <Avatar size={44} tone="blue" initials={initial(u.name)} /> : <Avatar size={44} />}
          <span className="whitespace-nowrap leading-tight">
            <span className="block font-semibold">{u.name}</span>
            <span className="block text-[13px] text-muted">{u.id}</span>
          </span>
        </span>
      </td>
      <td className="px-2.5 py-2.5">
        <span className={`inline-block rounded-md px-3 py-1 text-[13px] ${role.badge}`}>{role.label}</span>
      </td>
      <td className="whitespace-nowrap px-2.5 py-2.5 leading-snug">
        <span className="block">{u.phone}</span>
        <span className="block text-muted">{u.email}</span>
      </td>
      <td className="px-2.5 py-2.5">
        <span className={`inline-flex items-center gap-2 rounded-md px-3 py-1 text-[13px] ${status.badge}`}>
          <span aria-hidden="true" className={`size-2.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </td>
      <td className="whitespace-nowrap px-2.5 py-2.5 text-muted">{formatDate(u.joinedAt)}</td>
      <td className="whitespace-nowrap px-2.5 py-2.5 text-muted">{lastActiveText(u.lastActiveHours)}</td>
      <td className="py-2.5 pl-0 pr-3 text-right">
        <RowMenu
          label={`Actions for ${u.name}`}
          dropUp={dropUp}
          items={[
            { label: 'View profile', onSelect: act('profile') },
            { label: 'Edit user', onSelect: act('edit') },
            { label: 'Change status', onSelect: act('status') },
            { label: u.status === 'restricted' ? 'Restore account' : 'Restrict account', onSelect: act('restrict') },
            { label: 'View activity', onSelect: act('activity') },
            { label: 'Delete account', onSelect: act('delete') },
          ]}
        />
      </td>
    </tr>
  )
}

export default UserTableRow
