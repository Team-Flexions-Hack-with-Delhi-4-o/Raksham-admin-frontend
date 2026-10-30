import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Dialog from '../../components/ui/Dialog'
import { useSessionState } from '../../hooks/useSessionState'
import { getAdvocate, submitDecision } from '../../services/verificationService'
import AdvocateDetailsCard from './AdvocateDetailsCard'
import AdvocateDocumentsCard from './AdvocateDocumentsCard'
import AdvocateHistoryCard from './AdvocateHistoryCard'
import DecisionDialog from './DecisionDialog'
import { DECISIONS } from './decisions'
import InternalNotes from './InternalNotes'
import SourcesChecked from './SourcesChecked'
import VerificationChecklist from './VerificationChecklist'
import VerificationDecisionPanel from './VerificationDecisionPanel'
import VerificationStatusBadge from './VerificationStatusBadge'
import { daysAgo, formatDate } from './format'
import { CHECKLIST_ITEMS } from './mockData'
import { useBackToQueue } from './useBackToQueue'

const EMPTY_DRAFT = { checklist: CHECKLIST_ITEMS.map(() => null), sources: [], notes: '' }
const stamp = () =>
  new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })

function Notice({ title, children }) {
  const back = useBackToQueue()
  return (
    <Card className="mx-auto max-w-xl p-8 text-center">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="mt-2 text-muted">{children}</p>
      <Link to={back} className="mt-5 inline-block font-semibold underline">
        Back to Verification queue
      </Link>
    </Card>
  )
}

function ReviewBody({ advocate }) {
  const [draft, setDraft] = useSessionState(`raksham.review.${advocate.id}`, EMPTY_DRAFT)
  const [extraEvents, setExtraEvents] = useState([])
  const [viewing, setViewing] = useState(null)
  const [pending, setPending] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [outcome, setOutcome] = useState(null)
  const back = useBackToQueue()

  const readOnly = Boolean(advocate.assignee) && advocate.assignee !== 'me'
  const assigneeName = advocate.assignee === 'me' ? 'Me' : (advocate.assignee?.name ?? 'Unassigned')
  const canApprove = draft.checklist.every((v) => v === 'confirmed')

  const log = (event) => setExtraEvents((e) => [...e, { at: stamp(), actor: 'Verification Reviewer', event }])
  const history = [
    { at: `${formatDate(advocate.submittedAt)}, 10:24 AM`, actor: 'Advocate (system)', event: 'Submitted' },
    {
      at: `${formatDate(advocate.submittedAt)}, 10:31 AM`,
      actor: 'System',
      event: advocate.assignee ? `Assigned to ${assigneeName === 'Me' ? 'Verification Reviewer' : assigneeName}` : 'Added to verification queue',
    },
    { at: `${formatDate(advocate.submittedAt)}, 11:03 AM`, actor: 'Verification Reviewer 2', event: 'Document opened (logged)' },
    ...extraEvents,
  ]

  const confirmDecision = async (reason) => {
    setBusy(true)
    setError('')
    try {
      const result = await submitDecision({ advocateId: advocate.id, decision: pending, reason, ...draft })
      setOutcome({ decision: pending, persisted: result.persisted })
      setPending(null)
    } catch {
      setError('Could not submit this decision. Nothing was changed. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <p className="text-muted">
        <Link to={back} className="hover:underline">
          Verification queue
        </Link>{' '}
        / <span>{advocate.id}</span>
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-[28px] font-bold tracking-tight md:text-[34px]">{advocate.name}</h1>
        <span className="rounded-lg bg-chip px-3 py-1 text-xs font-bold tracking-wide">SAMPLE</span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <VerificationStatusBadge status={advocate.status} />
        <p>
          <span className="font-semibold">Assigned to:</span> {assigneeName}
        </p>
        <p>
          <span className="font-semibold">Submitted:</span>{' '}
          <span className="text-muted">
            {formatDate(advocate.submittedAt)} ({daysAgo(advocate.submittedAt)})
          </span>
        </p>
        <p>
          <span className="font-semibold">Reference:</span> <span className="text-muted">{advocate.id}</span>
        </p>
      </div>

      {readOnly && (
        <p role="status" className="mt-5 rounded-xl border border-line bg-white px-4 py-3">
          View only: this submission is assigned to {assigneeName}. Checklist and decisions are disabled.
        </p>
      )}
      {outcome && (
        <p role="status" className="mt-5 rounded-xl border border-[#f4e28a] bg-[#fffbe6] px-4 py-3">
          <strong>Demo only:</strong> &ldquo;{DECISIONS[outcome.decision].confirm}&rdquo; was not saved to a server
          {outcome.persisted ? '' : ' and nothing about this submission has changed.'}{' '}
          <Link to={back} className="font-semibold underline">
            Back to queue
          </Link>
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="space-y-5">
          <AdvocateDetailsCard advocate={advocate} onReveal={(f) => log(`${f} revealed (logged)`)} />
          <AdvocateDocumentsCard
            documents={advocate.documents}
            submittedAt={advocate.submittedAt}
            onOpen={(d) => {
              setViewing(d)
              log(`Document opened (logged): ${d}`)
            }}
          />
          <AdvocateHistoryCard events={history} />
        </div>
        <Card className="h-fit space-y-6 p-6">
          <VerificationChecklist
            values={draft.checklist}
            disabled={readOnly}
            onChange={(i, v) => setDraft((d) => ({ ...d, checklist: d.checklist.map((x, k) => (k === i ? v : x)) }))}
          />
          <SourcesChecked values={draft.sources} disabled={readOnly} onChange={(sources) => setDraft((d) => ({ ...d, sources }))} />
          <InternalNotes value={draft.notes} disabled={readOnly} onChange={(notes) => setDraft((d) => ({ ...d, notes }))} />
          <VerificationDecisionPanel canApprove={canApprove} disabled={readOnly || Boolean(outcome)} onDecide={setPending} />
        </Card>
      </div>

      {viewing && (
        <Dialog
          title={viewing}
          onClose={() => setViewing(null)}
          footer={<Button onClick={() => setViewing(null)}>Close</Button>}
        >
          <p className="text-muted">Secure viewer (demo). No real document is attached in demo mode, and this view was logged.</p>
        </Dialog>
      )}
      {pending && (
        <DecisionDialog
          decision={pending}
          busy={busy}
          error={error}
          onCancel={() => {
            setPending(null)
            setError('')
          }}
          onConfirm={confirmDecision}
        />
      )}
    </div>
  )
}

function AdvocateReviewPage() {
  const { advocateId } = useParams()
  const advocate = getAdvocate(advocateId)

  if (!advocate) return <Notice title="Advocate not found">No submission matches &ldquo;{advocateId}&rdquo;.</Notice>
  if (advocate.ownProfile) return <Notice title="Can't review your own profile">This submission can only be reviewed by someone else.</Notice>
  return <ReviewBody key={advocate.id} advocate={advocate} />
}

export default AdvocateReviewPage
