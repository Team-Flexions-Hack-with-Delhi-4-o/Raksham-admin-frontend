import { DOC_RULES } from './advocateOptions'

export function validateForm(form, files) {
  const e = {}
  if (!form.fullName.trim()) e.fullName = 'Enter the advocate’s full name.'
  if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a 10-digit phone number.'
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'Enter a valid email address.'
  if (!form.regNo.trim()) e.regNo = 'Enter the bar council registration number.'
  if (!form.stateBar) e.stateBar = 'Select a state bar council.'
  if (!form.enrolYear) e.enrolYear = 'Select the enrolment year.'
  if (form.experience !== '' && !(Number(form.experience) >= 0 && Number(form.experience) <= 70)) e.experience = 'Enter a number between 0 and 70.'
  if (!files.barCert) e.barCert = 'Upload the bar council certificate.'
  if (!files.govId) e.govId = 'Upload a government ID proof.'
  return e
}

/** Returns an error message for an unacceptable file, or '' when it is fine. */
export function checkFile(file, kind) {
  const rule = DOC_RULES[kind]
  if (!rule.types.includes(file.type)) return `Use ${rule.hint.split(' (')[0]}.`
  if (file.size > rule.maxMB * 1024 * 1024) return `File is larger than ${rule.maxMB}MB.`
  return ''
}
