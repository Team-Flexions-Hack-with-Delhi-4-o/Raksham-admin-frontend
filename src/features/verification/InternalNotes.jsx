import { NOTES_MAX } from './decisions'

function InternalNotes({ value, onChange, disabled }) {
  return (
    <section>
      <h3 className="text-lg font-semibold">
        Internal notes <span className="text-base font-normal text-muted">(not shared with advocate)</span>
      </h3>
      <textarea
        value={value}
        maxLength={NOTES_MAX}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Internal notes"
        aria-describedby="notes-help"
        placeholder="Add notes for your records (optional)"
        rows={4}
        className="mt-3 w-full resize-y rounded-xl border border-line bg-white p-3.5 outline-none placeholder:text-muted focus:ring-2 focus:ring-ink disabled:bg-canvas"
      />
      <p id="notes-help" className="mt-1.5 flex justify-between text-[13px] text-muted">
        <span>These notes are internal and not shared.</span>
        <span aria-live="polite">
          {value.length} / {NOTES_MAX}
        </span>
      </p>
    </section>
  )
}

export default InternalNotes
