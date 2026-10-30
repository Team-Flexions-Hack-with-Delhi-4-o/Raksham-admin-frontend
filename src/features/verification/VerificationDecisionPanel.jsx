import Button from '../../components/ui/Button'

function VerificationDecisionPanel({ canApprove, disabled, onDecide }) {
  return (
    <section>
      <h3 className="text-xl font-semibold">Decision</h3>
      <p className="mb-4 mt-1 text-muted">Approve is only available when all checklist items are confirmed.</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Button variant="primary" disabled={!canApprove || disabled} onClick={() => onDecide('approve')} className="min-h-14">
          Approve
        </Button>
        <Button
          variant="primary"
          disabled={disabled}
          onClick={() => onDecide('more_info')}
          className="min-h-14 border border-brand leading-tight"
        >
          Request more information
        </Button>
        <Button disabled={disabled} onClick={() => onDecide('reject')} className="min-h-14">
          Reject
        </Button>
        <Button disabled={disabled} onClick={() => onDecide('escalate')} className="min-h-14">
          Escalate
        </Button>
      </div>
    </section>
  )
}

export default VerificationDecisionPanel
