import Segmented from './Segmented'
import { CHECKLIST_ITEMS } from './mockData'

function VerificationChecklist({ values, onChange, disabled }) {
  return (
    <section>
      <h2 className="text-xl font-semibold">Verification checklist</h2>
      <p className="mb-5 mt-2 text-muted">
        Check each item against the evidence. If you can&apos;t confirm something, escalate. Don&apos;t guess.
      </p>
      <ol className="space-y-4">
        {CHECKLIST_ITEMS.map((item, i) => (
          <li key={item} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <span className="flex min-w-0 gap-2 sm:flex-1">
              <span aria-hidden="true">{i + 1}.</span>
              <span>{item}</span>
            </span>
            <Segmented
              label={item}
              value={values[i]}
              disabled={disabled}
              onChange={(v) => onChange(i, v)}
            />
          </li>
        ))}
      </ol>
    </section>
  )
}

export default VerificationChecklist
