import { useState } from 'react'
import Button from '../../components/ui/Button'
import Dialog from '../../components/ui/Dialog'
import { DECISIONS, NOTES_MAX } from './decisions'

function DecisionDialog({ decision, busy, error, onCancel, onConfirm }) {
  const cfg = DECISIONS[decision]
  const [reason, setReason] = useState('')
  const missing = cfg.needsReason && !reason.trim()

  return (
    <Dialog
      title={cfg.title}
      onClose={onCancel}
      footer={
        <>
          <Button onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button variant="primary" disabled={missing || busy} onClick={() => onConfirm(reason.trim())}>
            {busy ? 'Working…' : cfg.confirm}
          </Button>
        </>
      }
    >
      <p className="text-muted">{cfg.text}</p>
      {cfg.needsReason && (
        <label className="mt-3 block">
          <span className="mb-1.5 block font-semibold">Reason</span>
          <textarea
            value={reason}
            maxLength={NOTES_MAX}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-line p-3 outline-none focus:ring-2 focus:ring-ink"
          />
        </label>
      )}
      <p className="mt-3 rounded-lg bg-[#fffbe6] px-3 py-2 text-[13px]">
        Demo environment: this decision is not saved to a server.
      </p>
      {error && (
        <p role="alert" className="mt-3 text-bad">
          {error}
        </p>
      )}
    </Dialog>
  )
}

export default DecisionDialog
