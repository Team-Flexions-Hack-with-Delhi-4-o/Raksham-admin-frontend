import { useLocation } from 'react-router-dom'

/** Link target for returning to the queue with its filters, tab and page intact. */
export function useBackToQueue() {
  const { state } = useLocation()
  return { pathname: '/verification-queue', search: state?.from ?? '' }
}
