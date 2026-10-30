import { useId } from 'react'
import { Info } from 'lucide-react'

/** Info icon that reveals a short explanation on hover or keyboard focus. */
function InfoTip({ text, label = 'More information' }) {
  const id = useId()
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label={label}
        aria-describedby={id}
        className="rounded-full text-muted transition-colors hover:text-ink"
      >
        <Info size={16} strokeWidth={1.7} />
      </button>
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute right-0 top-full z-20 mt-2 w-52 rounded-lg bg-ink px-3 py-2 text-xs font-normal leading-snug text-white opacity-0 shadow-pop transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
      >
        {text}
      </span>
    </span>
  )
}

export default InfoTip
