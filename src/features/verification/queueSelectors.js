export const PAGE_SIZE = 8

export function applyFilters(list, { mine, q, areas, jurisdiction }) {
  const needle = q.trim().toLowerCase()
  return list.filter((a) => {
    if (mine && a.assignee !== 'me') return false
    if (areas.length && !a.areas.some((x) => areas.includes(x))) return false
    if (jurisdiction && a.jurisdiction !== jurisdiction) return false
    if (!needle) return true
    return [a.name, a.id, a.jurisdiction, ...a.areas].some((v) => v.toLowerCase().includes(needle))
  })
}

export function countByStatus(list) {
  const counts = { all: list.length }
  for (const a of list) counts[a.status] = (counts[a.status] ?? 0) + 1
  return counts
}

export function sortAdvocates(list, sort) {
  const copy = [...list]
  if (sort === 'name') return copy.sort((a, b) => a.name.localeCompare(b.name))
  const dir = sort === 'newest' ? -1 : 1
  return copy.sort((a, b) => dir * a.submittedAt.localeCompare(b.submittedAt) || a.id.localeCompare(b.id))
}

/** Which action the queue row offers, based on status-independent assignment rules. */
export function rowAction(a) {
  if (a.ownProfile) return 'locked'
  if (a.assignee === 'me') return 'continue'
  if (a.assignee) return 'view'
  return 'start'
}
