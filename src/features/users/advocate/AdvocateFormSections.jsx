import { useEffect, useMemo, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import Card from '../../../components/ui/Card'
import { FormField, SelectInput, TextInput } from '../../../components/ui/FormField'
import DocumentUpload from './DocumentUpload'
import { COUNTRY_CODES, DOC_RULES, ENROLMENT_YEARS, GENDERS, PRACTICE_AREAS, STATE_BAR_COUNCILS } from './advocateOptions'

export function SectionCard({ id, number, title, subtitle, action, children }) {
  return (
    <Card id={id} className="scroll-mt-4 p-6">
      <div className="mb-4 flex items-center gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#2f6fed] font-semibold text-white">{number}</span>
        <div>
          <h2 className="text-lg font-semibold leading-tight">{title}</h2>
          {subtitle && <p className="text-[13px] text-muted">{subtitle}</p>}
        </div>
        {action && <div className="ml-auto">{action}</div>}
      </div>
      {children}
    </Card>
  )
}

function PhotoUpload({ file, error, onPick, onRemove }) {
  const input = useRef(null)
  const url = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file])
  useEffect(() => () => url && URL.revokeObjectURL(url), [url])

  return (
    <div>
      <p className="mb-1.5 font-medium">Profile photo</p>
      <input
        ref={input}
        type="file"
        accept={DOC_RULES.photo.accept}
        aria-label="Upload profile photo"
        className="sr-only"
        onChange={(e) => {
          if (e.target.files[0]) onPick(e.target.files[0])
          e.target.value = ''
        }}
      />
      {file ? (
        <div className="flex items-center gap-3 rounded-lg border border-line p-2.5">
          <img src={url} alt="Profile preview" className="size-12 rounded-lg object-cover" />
          <span className="min-w-0 flex-1 truncate text-[13px]">{file.name}</span>
          <button type="button" aria-label="Remove photo" onClick={onRemove} className="rounded-full p-1 hover:bg-canvas">
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => input.current.click()}
          className="flex h-[52px] w-full items-center justify-center gap-3 rounded-lg border border-dashed border-[#c9ccd6] bg-[#fafaf8] hover:bg-canvas"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-[#e8f0ff] text-[#2f6fed]">
            <Upload size={16} />
          </span>
          <span className="text-left leading-tight">
            <span className="block text-sm">Upload photo</span>
            <span className="block text-[11px] text-muted">{DOC_RULES.photo.hint}</span>
          </span>
        </button>
      )}
      {error && (
        <p role="alert" className="mt-1 text-[13px] text-bad">
          {error}
        </p>
      )}
    </div>
  )
}

export function BasicDetails({ form, errors, set, files, fileErrors, onPickFile, onRemoveFile }) {
  return (
    <SectionCard id="section-basic" number="1" title="Basic details" subtitle="Enter the personal and contact information of the advocate.">
      <div className="grid gap-x-5 gap-y-4 md:grid-cols-2">
        <FormField label="Full name" required error={errors.fullName}>
          {(p) => <TextInput {...p} error={errors.fullName} value={form.fullName} onChange={set('fullName')} placeholder="Enter full name" autoComplete="off" />}
        </FormField>
        <PhotoUpload file={files.photo} error={fileErrors.photo} onPick={(f) => onPickFile('photo', f)} onRemove={() => onRemoveFile('photo')} />
        <FormField label="Phone number" required error={errors.phone}>
          {(p) => (
            <div className="grid grid-cols-[96px_1fr] gap-2.5">
              <SelectInput aria-label="Country code" placeholder="" options={COUNTRY_CODES} value={form.countryCode} onChange={set('countryCode')} />
              <TextInput {...p} error={errors.phone} type="tel" inputMode="numeric" value={form.phone} onChange={set('phone')} placeholder="Enter phone number" />
            </div>
          )}
        </FormField>
        <FormField label="Email address" required error={errors.email}>
          {(p) => <TextInput {...p} error={errors.email} type="email" value={form.email} onChange={set('email')} placeholder="Enter email address" />}
        </FormField>
        <FormField label="Date of birth">
          {(p) => <TextInput {...p} type="date" max={new Date().toISOString().slice(0, 10)} value={form.dob} onChange={set('dob')} />}
        </FormField>
        <FormField label="Gender">
          {(p) => <SelectInput {...p} placeholder="Select gender" options={GENDERS} value={form.gender} onChange={set('gender')} />}
        </FormField>
      </div>
    </SectionCard>
  )
}

export function ProfessionalDetails({ form, errors, set }) {
  return (
    <SectionCard id="section-professional" number="2" title="Professional details" subtitle="Enter professional and registration information.">
      <div className="grid gap-x-5 gap-y-4 md:grid-cols-2">
        <FormField label="Bar council registration number" required error={errors.regNo}>
          {(p) => <TextInput {...p} error={errors.regNo} value={form.regNo} onChange={set('regNo')} placeholder="Enter registration number" />}
        </FormField>
        <FormField label="State bar council" required error={errors.stateBar}>
          {(p) => <SelectInput {...p} error={errors.stateBar} placeholder="Select state bar council" options={STATE_BAR_COUNCILS} value={form.stateBar} onChange={set('stateBar')} />}
        </FormField>
        <FormField label="Enrolment year" required error={errors.enrolYear}>
          {(p) => <SelectInput {...p} error={errors.enrolYear} placeholder="Select year" options={ENROLMENT_YEARS} value={form.enrolYear} onChange={set('enrolYear')} />}
        </FormField>
        <FormField label="Primary practice area">
          {(p) => <SelectInput {...p} placeholder="Select practice area" options={PRACTICE_AREAS} value={form.practice} onChange={set('practice')} />}
        </FormField>
        <FormField label="Experience (years)" error={errors.experience}>
          {(p) => <TextInput {...p} error={errors.experience} type="number" min="0" max="70" value={form.experience} onChange={set('experience')} placeholder="Enter years of experience" />}
        </FormField>
        <FormField label="Current firm / organisation (optional)">
          {(p) => <TextInput {...p} value={form.firm} onChange={set('firm')} placeholder="Enter firm or organisation name" />}
        </FormField>
      </div>
    </SectionCard>
  )
}

export function DocumentsSection({ files, fileErrors, errors, onPickFile, onRemoveFile }) {
  const docs = [
    ['barCert', 'Bar council certificate', true],
    ['govId', 'Government ID proof', true],
    ['other', 'Other documents', false],
  ]
  return (
    <SectionCard id="section-documents" number="3" title="Documents" subtitle="Upload the required documents for verification.">
      <div className="grid gap-4 md:grid-cols-3">
        {docs.map(([key, label, required]) => (
          <DocumentUpload
            key={key}
            label={label}
            required={required}
            optionalNote={required ? '' : '(optional)'}
            file={files[key]}
            error={fileErrors[key] || errors[key]}
            onPick={(f) => onPickFile(key, f)}
            onRemove={() => onRemoveFile(key)}
          />
        ))}
      </div>
    </SectionCard>
  )
}
