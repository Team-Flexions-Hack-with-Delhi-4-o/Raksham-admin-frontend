import { DEMO_NOW } from './mockData'

const DAY = 86_400_000

export function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function daysAgo(iso) {
  const days = Math.round((new Date(`${DEMO_NOW}T00:00:00Z`) - new Date(`${iso}T00:00:00Z`)) / DAY)
  if (days <= 0) return 'Today'
  return `${days} ${days === 1 ? 'day' : 'days'} ago`
}
