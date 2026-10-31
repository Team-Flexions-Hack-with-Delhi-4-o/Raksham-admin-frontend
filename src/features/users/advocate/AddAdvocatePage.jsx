import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Lock, Ban } from 'lucide-react'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Dialog from '../../../components/ui/Dialog'
import { SelectInput } from '../../../components/ui/FormField'
import { INPUT_CLASS } from '../../../components/ui/formStyles'
import { useSessionState } from '../../../hooks/useSessionState'
import { addUser } from '../../../services/usersService'
import AdvocateReview from './AdvocateReview'
import AdvocateStepper from './AdvocateStepper'
import { BasicDetails, DocumentsSection, ProfessionalDetails } from './AdvocateFormSections'
import { EMPTY_FORM } from './advocateOptions'
import { checkFile, validateForm } from './advocateValidation'

const DRAFT_KEY = 'raksham.addAdvocate'
const VERIFY_STATUSES = ['Pending verification', 'Needs more information', 'Verified']

function AddAdvocatePage() {
  const navigate = useNavigate()
  // Text fields are kept for the tab session; selected files live in memory only.
  const [form, setForm] = useSessionState(DRAFT_KEY, EMPTY_FORM)
  const [files, setFiles] = useState({})
  const [fileErrors, setFileErrors] = useState({})
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState('form')
  const [notes, setNotes] = useState('')
  const [verifyStatus, setVerifyStatus] = useState(VERIFY_STATUSES[0])
  const [confirm, setConfirm] = useState(null)
  const [created, setCreated] = useState(null)

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const onPickFile = (key, file) => {
    const problem = checkFile(file, key === 'photo' ? 'photo' : 'doc')
    setFileErrors((fe) => ({ ...fe, [key]: problem }))
    if (problem) return
    setFiles((f) => ({ ...f, [key]: file }))
    setErrors((er) => ({ ...er, [key]: undefined }))
  }
  const onRemoveFile = (key) => {
    setFiles((f) => ({ ...f, [key]: undefined }))
    setFileErrors((fe) => ({ ...fe, [key]: '' }))
  }

  const next = () => {
    const found = validateForm(form, files)
    setErrors(found)
    if (Object.keys(found).length) {
      requestAnimationFrame(() => document.querySelector('[aria-invalid="true"], [role="alert"]')?.scrollIntoView({ block: 'center', behavior: 'smooth' }))
      return
    }
    setStep('review')
    window.scrollTo({ top: 0 })
  }

  const goToSection = (target) => {
    setStep('form')
    if (target) setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  const clearDraft = () => {
    try {
      sessionStorage.removeItem(DRAFT_KEY)
    } catch {
      /* storage unavailable */
    }
  }

  const verifyAndCreate = () => {
    const user = addUser({
      name: form.fullName.trim(),
      role: 'advocate',
      phone: `${form.countryCode} ${form.phone}`,
      email: form.email.trim(),
      status: 'active',
    })
    clearDraft()
    setCreated(user)
  }

  const reject = () => {
    clearDraft()
    navigate('/user-management')
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight md:text-[34px]">Add advocate</h1>
          <p className="mt-1 text-base text-muted">
            {step === 'form' ? 'Register a new advocate account and submit for verification.' : 'Review the details submitted by the advocate and verify the information.'}
          </p>
        </div>
        <Link to="/user-management" className="inline-flex items-center gap-2.5 rounded-xl bg-white px-5 py-3 font-medium shadow-[0_1px_2px_rgb(0_0_0/0.06)] hover:bg-canvas">
          <ArrowLeft size={18} aria-hidden="true" />
          Back to users
        </Link>
      </div>

      {created && (
        <p role="status" className="mt-5 rounded-xl border border-[#f4e28a] bg-[#fffbe6] px-4 py-3">
          <strong>Demo only:</strong> {created.name} ({created.id}) was added for this session and was not saved to a server.{' '}
          <Link to="/user-management" className="font-semibold underline">
            View users
          </Link>
        </p>
      )}

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          {step === 'form' ? (
            <>
              <BasicDetails form={form} errors={errors} set={set} files={files} fileErrors={fileErrors} onPickFile={onPickFile} onRemoveFile={onRemoveFile} />
              <ProfessionalDetails form={form} errors={errors} set={set} />
              <DocumentsSection files={files} fileErrors={fileErrors} errors={errors} onPickFile={onPickFile} onRemoveFile={onRemoveFile} />
              <div className="flex justify-end gap-3 pt-1">
                <Link to="/user-management" className="inline-flex min-w-[130px] items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold shadow-[0_1px_2px_rgb(0_0_0/0.06)] hover:bg-canvas">
                  Cancel
                </Link>
                <Button variant="primary" onClick={next} className="min-w-[130px] py-3">
                  Next <ArrowRight size={18} aria-hidden="true" />
                </Button>
              </div>
            </>
          ) : (
            <AdvocateReview form={form} files={files} onEdit={goToSection} />
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
          <AdvocateStepper current={step === 'form' ? 0 : 3} onSelect={(i, target) => (i === 3 ? next() : goToSection(target))} />
          {step === 'review' && (
            <Card className="p-5">
              <h2 className="text-lg font-semibold">Verification action</h2>
              <label className="mt-4 block text-[13px] text-[#555]">
                Status
                <div className="mt-1.5 text-[15px] text-ink">
                  <SelectInput placeholder="" options={VERIFY_STATUSES} value={verifyStatus} onChange={(e) => setVerifyStatus(e.target.value)} />
                </div>
              </label>
              <label className="mt-4 block text-[13px] text-[#555]">
                <span className="flex items-center gap-1.5">
                  Internal notes (restricted) <Lock size={13} aria-hidden="true" />
                </span>
                <textarea
                  value={notes}
                  maxLength={500}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Add note (visible only to authorized reviewers)..."
                  className={`${INPUT_CLASS} mt-1.5 resize-y text-[15px]`}
                />
              </label>
              <div className="mt-4 grid grid-cols-[0.8fr_1.2fr] gap-3">
                <Button onClick={() => setConfirm('reject')} disabled={Boolean(created)} className="!border-0 !bg-[#fde8e8] !text-bad">
                  <Ban size={18} aria-hidden="true" /> Reject
                </Button>
                <Button variant="primary" onClick={() => setConfirm('verify')} disabled={Boolean(created)} className="whitespace-nowrap px-3">
                  <Check size={18} aria-hidden="true" /> Verify and create
                </Button>
              </div>
            </Card>
          )}
        </aside>
      </div>

      {confirm && (
        <Dialog
          title={confirm === 'verify' ? 'Verify and create this advocate?' : 'Reject this application?'}
          onClose={() => setConfirm(null)}
          footer={
            <>
              <Button onClick={() => setConfirm(null)}>Cancel</Button>
              <Button
                variant="primary"
                className={confirm === 'reject' ? '!bg-bad !text-white' : ''}
                onClick={() => {
                  if (confirm === 'verify') verifyAndCreate()
                  else reject()
                  setConfirm(null)
                }}
              >
                {confirm === 'verify' ? 'Verify and create' : 'Reject'}
              </Button>
            </>
          }
        >
          <p className="text-muted">
            {confirm === 'verify' ? 'An advocate account will be added to the user list.' : 'The entered details will be discarded and you will return to the user list.'}
          </p>
          <p className="mt-3 rounded-lg bg-[#fffbe6] px-3 py-2 text-[13px]">Demo environment: this is not saved to a server.</p>
        </Dialog>
      )}
    </div>
  )
}

export default AddAdvocatePage
