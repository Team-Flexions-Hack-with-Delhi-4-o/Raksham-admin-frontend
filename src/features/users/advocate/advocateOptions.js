export const COUNTRY_CODES = ['+91']
export const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say']
export const STATE_BAR_COUNCILS = [
  'Bar Council of Andhra Pradesh',
  'Bar Council of Delhi',
  'Bar Council of Gujarat',
  'Bar Council of Karnataka',
  'Bar Council of Kerala',
  'Bar Council of Maharashtra & Goa',
  'Bar Council of Punjab & Haryana',
  'Bar Council of Rajasthan',
  'Bar Council of Tamil Nadu & Puducherry',
  'Bar Council of Uttar Pradesh',
  'Bar Council of West Bengal',
]
export const PRACTICE_AREAS = [
  'Civil law',
  'Corporate law',
  'Criminal law',
  'Cybercrime',
  'Consumer law',
  'Family law',
  'Labour law',
  'Property law',
  'Women & family',
]
export const ENROLMENT_YEARS = Array.from({ length: new Date().getFullYear() - 1969 }, (_, i) => String(new Date().getFullYear() - i))

export const EMPTY_FORM = {
  fullName: '',
  countryCode: '+91',
  phone: '',
  email: '',
  dob: '',
  gender: '',
  regNo: '',
  stateBar: '',
  enrolYear: '',
  practice: '',
  experience: '',
  firm: '',
}

export const DOC_RULES = {
  photo: { accept: 'image/jpeg,image/png', maxMB: 2, types: ['image/jpeg', 'image/png'], hint: 'JPG, PNG (Max 2MB)' },
  doc: { accept: 'application/pdf,image/jpeg,image/png', maxMB: 5, types: ['application/pdf', 'image/jpeg', 'image/png'], hint: 'PDF, JPG, PNG (Max 5MB)' },
}
