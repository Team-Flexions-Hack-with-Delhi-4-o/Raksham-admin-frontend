import { STATUS } from './statusConfig'

function VerificationStatusBadge({ status }) {
  const s = STATUS[status]
  return (
    <span className={`inline-flex max-w-[170px] items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] leading-tight ${s.badge}`}>
      <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

export default VerificationStatusBadge
