// SAMPLE DATA ONLY. These are fictional records, not real advocates.

// Fixed "today" so relative times in the demo stay stable.
export const DEMO_NOW = '2026-10-13'

export const ME = { name: 'Verification Reviewer', initials: 'VR' }

const NIDHI = { name: 'Nidhi S.' }
const AMAN = { name: 'Aman R.' }

// assignee: null (unassigned) | 'me' | { name }
export const ADVOCATES = [
  { id: 'ADV-0231', name: 'Aditi Sharma', areas: ['Cybercrime', 'IT law'], jurisdiction: 'Delhi', submittedAt: '2026-10-08', status: 'submitted', assignee: null },
  { id: 'ADV-0148', name: 'Rohan Mehta', areas: ['Family law', 'Protection'], jurisdiction: 'Maharashtra', submittedAt: '2026-10-09', status: 'submitted', assignee: null },
  { id: 'ADV-0312', name: 'Simran Kaur', areas: ['Criminal law', 'Police rights'], jurisdiction: 'Punjab', submittedAt: '2026-10-10', status: 'more_info', assignee: 'me' },
  { id: 'ADV-0205', name: 'Aman Verma', areas: ['General legal help', 'Civil law'], jurisdiction: 'Uttar Pradesh', submittedAt: '2026-10-10', status: 'under_review', assignee: NIDHI },
  { id: 'ADV-0176', name: 'Neha Bansal', areas: ['Cybercrime', 'Privacy law'], jurisdiction: 'Karnataka', submittedAt: '2026-10-11', status: 'submitted', assignee: null },
  { id: 'ADV-0289', name: 'Rahul Kapoor', areas: ['Family law', 'Domestic violence'], jurisdiction: 'Rajasthan', submittedAt: '2026-10-12', status: 'under_review', assignee: AMAN },
  { id: 'ADV-0334', name: 'Pooja Iyer', areas: ['General legal help', 'Consumer law'], jurisdiction: 'Tamil Nadu', submittedAt: '2026-10-12', status: 'more_info', assignee: null },
  { id: 'ADV-0192', name: 'Vikram Singh', areas: ['Property law', 'Civil law'], jurisdiction: 'Gujarat', submittedAt: '2026-10-12', status: 'submitted', assignee: NIDHI, ownProfile: true },
  { id: 'ADV-0267', name: 'Ananya Das', areas: ['Labour law', 'Consumer law'], jurisdiction: 'West Bengal', submittedAt: '2026-10-05', status: 'reverification', assignee: null },
]

export const CHECKLIST_ITEMS = [
  'Identity matches the submitted information',
  'Enrollment or registration checked through a reliable source',
  'Practice area and jurisdiction are represented accurately',
  'Profile claims are supported and not misleading',
  'Required information is complete',
]

export const SOURCE_OPTIONS = [
  'Official bar council register (sample)',
  'Submitted documents',
  'Other official source (sample)',
]

export const DOCUMENTS = ['Identity document (sample)', 'Enrollment certificate (sample)', 'Proof of practice area (sample)']
