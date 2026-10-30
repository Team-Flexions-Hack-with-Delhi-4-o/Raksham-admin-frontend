const OPTIONS = [
  { value: 'confirmed', label: 'Confirmed', on: 'bg-brand font-semibold' },
  { value: 'mismatch', label: 'Mismatch', on: 'bg-[#fde2e2] font-semibold text-[#a31621]' },
  { value: 'unsure', label: 'Unsure', on: 'bg-[#e4e4e8] font-semibold' },
]

function Segmented({ value, onChange, disabled, label }) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex w-full shrink-0 overflow-hidden rounded-xl border border-line bg-white text-sm sm:w-auto"
    >
      {OPTIONS.map((o) => {
        const checked = value === o.value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => onChange(o.value)}
            className={`min-h-11 flex-1 px-3 py-2.5 transition-colors sm:min-w-[72px] sm:flex-none ${
              checked ? o.on : 'hover:bg-canvas'
            } disabled:cursor-not-allowed`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

export default Segmented
