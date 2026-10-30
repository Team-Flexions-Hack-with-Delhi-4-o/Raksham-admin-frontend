const TONES = {
  red: 'bg-[#ef3b3b]',
  yellow: 'bg-brand',
  green: 'bg-good',
  grey: 'bg-neutral-chart',
}

function StatusDot({ tone = 'grey', className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-2.5 shrink-0 rounded-full ${TONES[tone]} ${className}`}
    />
  )
}

export default StatusDot
