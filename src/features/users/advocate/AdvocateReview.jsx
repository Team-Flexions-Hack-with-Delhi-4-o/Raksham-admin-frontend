import { useEffect, useMemo } from 'react'
import { Eye, File, User } from 'lucide-react'
import Button from '../../../components/ui/Button'
import { formatDate } from '../../verification/format'
import { SectionCard } from './AdvocateFormSections'

function EditButton({ onClick, label }) {
  return (
    <Button onClick={onClick} className="px-5 py-2" aria-label={`Edit ${label}`}>
      Edit
    </Button>
  )
}

function Row({ label, children }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-3 border-b border-line py-2.5 last:border-0 sm:grid-cols-[170px_1fr]">
      <dt className="text-muted">{label}</dt>
      <dd className="break-words">{children || <span className="text-muted">Not provided</span>}</dd>
    </div>
  )
}

function viewFile(file) {
  const url = URL.createObjectURL(file)
  window.open(url, '_blank', 'noopener,noreferrer')
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
}

function Photo({ file }) {
  const url = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file])
  useEffect(() => () => url && URL.revokeObjectURL(url), [url])
  return url ? (
    <img src={url} alt="Profile" className="size-36 rounded-xl object-cover" />
  ) : (
    <span className="grid size-36 place-items-center rounded-xl bg-[#ededef]" aria-label="No photo uploaded">
      <User size={56} strokeWidth={1.2} className="text-[#8c8c94]" />
    </span>
  )
}

const DOCS = [
  ['barCert', 'Bar council certificate'],
  ['govId', 'Government ID proof'],
  ['other', 'Other documents'],
]

function AdvocateReview({ form, files, onEdit }) {
  const uploadedOn = formatDate(new Date().toISOString().slice(0, 10))

  return (
    <div className="space-y-4">
      <SectionCard number="1" title="Basic details" action={<EditButton onClick={() => onEdit('section-basic')} label="basic details" />}>
        <div className="flex flex-wrap gap-6">
          <Photo file={files.photo} />
          <dl className="min-w-[260px] flex-1">
            <Row label="Full name">{form.fullName}</Row>
            <Row label="Phone number">{form.phone && `${form.countryCode} ${form.phone}`}</Row>
            <Row label="Email address">{form.email}</Row>
            <Row label="Date of birth">{form.dob && formatDate(form.dob)}</Row>
            <Row label="Gender">{form.gender}</Row>
          </dl>
        </div>
      </SectionCard>

      <SectionCard number="2" title="Professional details" action={<EditButton onClick={() => onEdit('section-professional')} label="professional details" />}>
        <dl className="grid gap-x-8 md:grid-cols-2">
          <div>
            <Row label="Bar council reg. no.">{form.regNo}</Row>
            <Row label="Enrolment year">{form.enrolYear}</Row>
            <Row label="Experience">{form.experience !== '' && `${form.experience} years`}</Row>
          </div>
          <div>
            <Row label="State bar council">{form.stateBar}</Row>
            <Row label="Primary practice area">{form.practice}</Row>
            <Row label="Current firm">{form.firm}</Row>
          </div>
        </dl>
      </SectionCard>

      <SectionCard number="3" title="Documents" action={<EditButton onClick={() => onEdit('section-documents')} label="documents" />}>
        <div className="grid gap-4 md:grid-cols-3">
          {DOCS.map(([key, label]) => {
            const file = files[key]
            return (
              <div key={key} className="rounded-xl border border-line bg-[#fafaf8] p-4">
                <p className="mb-3 flex items-center gap-3 font-medium">
                  <File size={22} strokeWidth={1.5} />
                  {label}
                </p>
                <div className="grid h-28 place-items-center rounded-lg border border-dashed border-[#c9ccd6] bg-white text-[13px] text-muted">
                  {file ? 'Preview not available in demo' : 'No file uploaded'}
                </div>
                {file && (
                  <>
                    <p className="mt-2 truncate text-[13px]">{file.name}</p>
                    <p className="text-[13px] text-muted">Added {uploadedOn}</p>
                  </>
                )}
                <Button disabled={!file} onClick={() => viewFile(file)} className="mt-3 w-full bg-white" aria-label={`View ${label}`}>
                  <Eye size={16} aria-hidden="true" /> View file
                </Button>
              </div>
            )
          })}
        </div>
      </SectionCard>
    </div>
  )
}

export default AdvocateReview
