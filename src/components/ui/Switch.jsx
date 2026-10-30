function Switch({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-[30px] w-[52px] rounded-full transition-colors ${checked ? 'bg-brand' : 'bg-[#dcdce0]'}`}
      >
        <span
          className={`absolute top-[3px] size-6 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-[25px]' : 'translate-x-[3px]'}`}
        />
      </button>
      <span>{label}</span>
    </label>
  )
}

export default Switch
