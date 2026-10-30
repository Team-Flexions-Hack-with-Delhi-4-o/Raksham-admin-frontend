import {
  ACTIVITY,
  ATTENTION,
  KPIS,
  QUEUE_STATUS,
  TICKET_TREND,
  USER_GROWTH,
} from '../features/dashboard/mockData'

// No backend contract exists yet, so this returns sample data. When an endpoint is
// documented, swap the body for a request via VITE_API_BASE_URL; callers stay the same.
export function getOverviewData() {
  return {
    isSample: true,
    kpis: KPIS,
    userGrowth: USER_GROWTH,
    queueStatus: QUEUE_STATUS,
    ticketTrend: TICKET_TREND,
    attention: ATTENTION,
    activity: ACTIVITY,
  }
}
