import { ADVOCATES, DOCUMENTS } from '../features/verification/mockData'

// No backend contract or Swagger exists for verification yet, so this module serves
// sample data. Replace the bodies with real requests (via VITE_API_BASE_URL) once the
// contract is documented; callers should not need to change.

export function listAdvocates() {
  return ADVOCATES
}

export function getAdvocate(id) {
  const base = ADVOCATES.find((a) => a.id === id)
  if (!base) return null
  const n = Number(id.slice(4))
  const last4 = (n * 17) % 10000
  return {
    ...base,
    enrollmentLast4: String(last4).padStart(4, '0'),
    contactLast4: String((n * 29) % 10000).padStart(4, '0'),
    barCouncil: 'Sample bar council',
    languages: ['English', 'हिन्दी'],
    consultationModes: ['Video', 'Phone', 'In person'],
    documents: DOCUMENTS,
  }
}

/**
 * Verification decisions cannot be persisted: there is no endpoint. This never claims
 * success against a server; `persisted: false` tells the UI to show a demo-only notice.
 */
export async function submitDecision() {
  return { persisted: false }
}
