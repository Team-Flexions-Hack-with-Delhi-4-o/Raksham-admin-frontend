import { useState } from 'react'
import Button from '../../components/ui/Button'
import Dialog from '../../components/ui/Dialog'
import { FormField, SelectInput, TextInput } from '../../components/ui/FormField'
import { removeUser, updateUser } from '../../services/usersService'
import { formatDate } from '../verification/format'
import { ROLES, STATUS } from './userConfig'
import { lastActiveText } from './userSelectors'

const DEMO_NOTE = 'Demo environment: changes last for this session only and are not saved to a server.'

function Note() {
  return <p className="mt-3 rounded-lg bg-[#fffbe6] px-3 py-2 text-[13px]">{DEMO_NOTE}</p>
}

function Details({ user: u }) {
  const rows = [
    ['User ID', u.id],
    ['Role', ROLES[u.role].label],
    ['Phone', u.phone],
    ['Email', u.email],
    ['Status', STATUS[u.status].label],
    ['Joined on', formatDate(u.joinedAt)],
    ['Last active', lastActiveText(u.lastActiveHours)],
  ]
  return (
    <dl className="space-y-2">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[110px_1fr] gap-3">
          <dt className="text-muted">{k}</dt>
          <dd className="break-words">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

function EditDialog({ user, onClose }) {
  const [form, setForm] = useState({ name: user.name, email: user.email, phone: user.phone })
  const [error, setError] = useState('')
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const save = () => {
    if (!form.name.trim()) return setError('Name is required.')
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Enter a valid email address.')
    updateUser(user.id, { name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() })
    onClose()
  }

  return (
    <Dialog
      title={`Edit ${user.name}`}
      onClose={onClose}
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={save}>Save changes</Button>
        </>
      }
    >
      <div className="space-y-3">
        <FormField label="Full name" required>{(p) => <TextInput {...p} value={form.name} onChange={set('name')} />}</FormField>
        <FormField label="Email address" required>{(p) => <TextInput {...p} type="email" value={form.email} onChange={set('email')} />}</FormField>
        <FormField label="Phone">{(p) => <TextInput {...p} value={form.phone} onChange={set('phone')} />}</FormField>
      </div>
      {error && <p role="alert" className="mt-3 text-bad">{error}</p>}
      <Note />
    </Dialog>
  )
}

function StatusDialog({ user, onClose }) {
  const [status, setStatus] = useState(user.status)
  return (
    <Dialog
      title={`Change status: ${user.name}`}
      onClose={onClose}
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" disabled={status === user.status} onClick={() => { updateUser(user.id, { status }); onClose() }}>Update status</Button>
        </>
      }
    >
      <FormField label="Account status">
        {(p) => <SelectInput {...p} placeholder="Select status" options={Object.entries(STATUS).map(([value, s]) => ({ value, label: s.label }))} value={status} onChange={(e) => setStatus(e.target.value)} />}
      </FormField>
      <Note />
    </Dialog>
  )
}

function ConfirmDialog({ title, text, confirm, danger, onConfirm, onClose }) {
  return (
    <Dialog
      title={title}
      onClose={onClose}
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" className={danger ? '!bg-bad !text-white' : ''} onClick={() => { onConfirm(); onClose() }}>{confirm}</Button>
        </>
      }
    >
      <p className="text-muted">{text}</p>
      <Note />
    </Dialog>
  )
}

function UserActionDialogs({ action, onClose }) {
  if (!action) return null
  const { type, user } = action
  const close = <Button onClick={onClose}>Close</Button>

  if (type === 'edit') return <EditDialog key={user.id} user={user} onClose={onClose} />
  if (type === 'status') return <StatusDialog key={user.id} user={user} onClose={onClose} />
  if (type === 'restrict') {
    const restoring = user.status === 'restricted'
    return (
      <ConfirmDialog
        title={restoring ? `Restore ${user.name}?` : `Restrict ${user.name}?`}
        text={restoring ? 'The account will be set back to Active.' : 'A restricted account cannot use the platform until it is restored.'}
        confirm={restoring ? 'Restore account' : 'Restrict account'}
        danger={!restoring}
        onConfirm={() => updateUser(user.id, { status: restoring ? 'active' : 'restricted' })}
        onClose={onClose}
      />
    )
  }
  if (type === 'delete') {
    return (
      <ConfirmDialog
        title={`Delete ${user.name}?`}
        text="This removes the account from the list. Deletion would need proper authorisation on a real backend."
        confirm="Delete account"
        danger
        onConfirm={() => removeUser(user.id)}
        onClose={onClose}
      />
    )
  }
  if (type === 'activity') {
    return (
      <Dialog title={`Activity: ${user.name}`} onClose={onClose} footer={close}>
        <Details user={user} />
        <p className="mt-3 text-muted">A detailed activity log is not available in the demo.</p>
      </Dialog>
    )
  }
  return (
    <Dialog title={user.name} onClose={onClose} footer={close}>
      <Details user={user} />
    </Dialog>
  )
}

export default UserActionDialogs
