// SAMPLE DATA ONLY. Replace via src/services/dashboardService.js once the backend contract exists.

export const DATE_RANGES = [
  { days: 7, label: 'Last 7 days' },
  { days: 30, label: 'Last 30 days' },
  { days: 90, label: 'Last 90 days' },
]

export const NOTIFICATIONS = [
  { id: 1, title: 'Immediate safety concern report received', time: '2 hours ago', to: '/support-reports' },
  { id: 2, title: 'New advocate awaiting verification', time: '3 hours ago', to: '/verification-queue' },
  { id: 3, title: 'AI answer flagged for review', time: 'Yesterday', to: '/ai-feedback' },
]

// tone: 'good' | 'bad' is the meaning of the change, independent of its direction.
export const KPIS = [
  { id: 'citizens', title: 'Citizen accounts', icon: 'user', value: '1,248', change: 12, direction: 'up', tone: 'good', info: 'Total registered citizen accounts.' },
  { id: 'advocates', title: 'Advocate accounts', icon: 'briefcase', value: '36', change: 8, direction: 'up', tone: 'good', info: 'Total registered advocate accounts.' },
  { id: 'queue', title: 'Verification queue', icon: 'file', value: '9', change: 18, direction: 'down', tone: 'bad', info: 'Advocate verification items waiting for a decision.' },
  { id: 'tickets', title: 'Open tickets and reports', icon: 'message', value: '14', change: 27, direction: 'up', tone: 'bad', info: 'Support tickets and user reports that are still open.' },
  { id: 'resources', title: 'Resources due for review', icon: 'file', value: '7', change: 36, direction: 'down', tone: 'good', info: 'Legal resources past their scheduled review date.' },
  { id: 'flagged', title: 'Flagged AI answers', icon: 'shield', value: '5', change: 25, direction: 'up', tone: 'bad', info: 'AI answers flagged by users or reviewers for quality checks.' },
]

export const USER_GROWTH = [
  { label: '1 Oct', citizens: 82, advocates: 45 },
  { label: '7 Oct', citizens: 128, advocates: 78 },
  { label: '14 Oct', citizens: 130, advocates: 72 },
  { label: '21 Oct', citizens: 150, advocates: 88 },
  { label: '28 Oct', citizens: 125, advocates: 85 },
]

export const QUEUE_STATUS = [
  { name: 'New', value: 2, color: '#ef3b3b' },
  { name: 'Under review', value: 3, color: '#ffc900' },
  { name: 'More information required', value: 2, color: '#cfcfd4' },
  { name: 'Reverification due', value: 2, color: '#6b6b73' },
]

export const TICKET_TREND = [
  { label: '1 Oct', opened: 9, resolved: 3 },
  { label: '4 Oct', opened: 15, resolved: 3 },
  { label: '7 Oct', opened: 13, resolved: 8 },
  { label: '10 Oct', opened: 21, resolved: 12 },
  { label: '14 Oct', opened: 16, resolved: 6 },
  { label: '17 Oct', opened: 19, resolved: 9 },
  { label: '21 Oct', opened: 25, resolved: 7 },
  { label: '24 Oct', opened: 24, resolved: 12 },
  { label: '28 Oct', opened: 28, resolved: 9 },
]
export const TICKET_TICKS = ['1 Oct', '7 Oct', '14 Oct', '21 Oct', '28 Oct']

export const ATTENTION = [
  { category: 'Immediate safety concern reports', open: 1, oldest: '2 hours', tone: 'red', to: '/support-reports' },
  { category: 'Privacy or data exposure', open: 0, oldest: '-', tone: 'yellow', to: '/support-reports' },
  { category: 'Account compromise', open: 2, oldest: '1 day', tone: 'yellow', to: '/support-reports' },
  { category: 'Inappropriate or harmful AI content', open: 3, oldest: '3 days', tone: 'yellow', to: '/ai-feedback' },
  { category: 'Legal resource updates overdue', open: 7, oldest: '5 days', tone: 'yellow', to: '/legal-resources' },
]

export const ACTIVITY = [
  { time: '10:24 AM', type: 'New user', ref: 'USR-1048', status: 'Completed', tone: 'green' },
  { time: '09:18 AM', type: 'Advocate sign up', ref: 'ADV-0321', status: 'Pending review', tone: 'yellow' },
  { time: '08:45 AM', type: 'Ticket created', ref: 'TCK-0912', status: 'Open', tone: 'yellow' },
  { time: '07:32 AM', type: 'Resource updated', ref: 'RES-0056', status: 'Published', tone: 'green' },
  { time: '12 Oct, 9:14 PM', type: 'AI answer flagged', ref: 'AI-0784', status: 'Under review', tone: 'yellow' },
]
