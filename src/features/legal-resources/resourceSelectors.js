export function applyFilters(list, { q, types, categories, jurisdiction, statuses }) {
  const needle = q.trim().toLowerCase()
  return list.filter((r) => {
    if (types.length && !types.includes(r.type)) return false
    if (categories.length && !categories.includes(r.category)) return false
    if (jurisdiction && r.jurisdiction !== jurisdiction) return false
    if (statuses.length && !statuses.includes(r.status)) return false
    if (!needle) return true
    return [r.title, r.sections ?? '', r.category, sourceHost(r.url)].some((v) => v.toLowerCase().includes(needle))
  })
}

export function countBy(list, key) {
  const counts = {}
  for (const r of list) counts[r[key]] = (counts[r[key]] ?? 0) + 1
  return counts
}

export function sortResources(list, sort) {
  const copy = [...list]
  const byDate = (a, b) => a.lastUpdated.localeCompare(b.lastUpdated)
  const byTitle = (a, b) => a.title.localeCompare(b.title)
  if (sort === 'recent') return copy.sort((a, b) => byDate(b, a))
  if (sort === 'oldest') return copy.sort(byDate)
  if (sort === 'title_asc') return copy.sort(byTitle)
  if (sort === 'title_desc') return copy.sort((a, b) => byTitle(b, a))
  return copy // relevance = source order
}

export function sourceHost(url) {
  return new URL(url).hostname.replace(/^www\./, '')
}
