export function applyFilters(list, f) {
  const needle = f.q.trim().toLowerCase()
  return list.filter((u) => {
    if (f.type !== 'all' && u.role !== f.type) return false
    if (f.role !== 'all' && u.role !== f.role) return false
    if (f.status !== 'all' && u.status !== f.status) return false
    if (f.joinedFrom && u.joinedAt < f.joinedFrom) return false
    if (f.joinedTo && u.joinedAt > f.joinedTo) return false
    if (f.active !== 'any' && u.lastActiveHours > Number(f.active)) return false
    if (!needle) return true
    return [u.name, u.id, u.phone, u.email].some((v) => v.toLowerCase().includes(needle))
  })
}

export function sortUsers(list, sort) {
  const copy = [...list]
  if (sort === 'oldest') return copy.sort((a, b) => a.joinedAt.localeCompare(b.joinedAt))
  if (sort === 'name_asc') return copy.sort((a, b) => a.name.localeCompare(b.name))
  if (sort === 'name_desc') return copy.sort((a, b) => b.name.localeCompare(a.name))
  if (sort === 'active') return copy.sort((a, b) => a.lastActiveHours - b.lastActiveHours)
  return copy.sort((a, b) => b.joinedAt.localeCompare(a.joinedAt) || b.id.localeCompare(a.id))
}

export function countBy(list, key) {
  const counts = {}
  for (const u of list) counts[u[key]] = (counts[u[key]] ?? 0) + 1
  return counts
}

export function lastActiveText(hours) {
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  const days = Math.round(hours / 24)
  return `${days} ${days === 1 ? 'day' : 'days'} ago`
}

export const initial = (name) => name.trim().charAt(0).toUpperCase()
