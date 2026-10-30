import Card from '../../components/ui/Card'
import Chip from '../../components/ui/Chip'
import MaskedValue from './MaskedValue'

function Field({ label, children }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3 sm:grid-cols-[150px_1fr]">
      <dt className="text-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

function AdvocateDetailsCard({ advocate: a, onReveal }) {
  const [first, second, ...rest] = a.areas
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold">Submitted details</h2>
      <div className="mt-5 grid gap-6 md:grid-cols-2 md:gap-0 md:divide-x md:divide-line">
        <dl className="space-y-4 md:pr-6">
          <Field label="Legal name">{a.name}</Field>
          <Field label="Enrollment number">
            <MaskedValue label="Enrollment number" last4={a.enrollmentLast4} revealed={`SAMPLE/${a.enrollmentLast4}/2019`} onReveal={onReveal} />
          </Field>
          <Field label="Bar council">{a.barCouncil}</Field>
          <Field label="Jurisdiction">{a.jurisdiction}</Field>
          <Field label="Practice areas">
            <span className="flex flex-wrap items-center gap-2">
              <Chip>{first}</Chip>
              {second && <Chip>{second}</Chip>}
              {rest.length > 0 && <span className="font-medium text-[#1a56db]">+{rest.length}</span>}
            </span>
          </Field>
          <Field label="Languages">{a.languages.join(', ')}</Field>
        </dl>
        <dl className="space-y-4 md:pl-6">
          <Field label="Consultation modes">{a.consultationModes.join(', ')}</Field>
          <Field label="Contact">
            <MaskedValue label="Contact" last4={a.contactLast4} revealed="+91 00000 00000 (sample)" onReveal={onReveal} />
          </Field>
          <Field label="Fee information">Not collected in this preview.</Field>
          <Field label="Submission notes">Not provided.</Field>
        </dl>
      </div>
    </Card>
  )
}

export default AdvocateDetailsCard
