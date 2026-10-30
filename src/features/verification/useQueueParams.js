import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

const LIST_KEYS = ['area']

/** Queue UI state lives in the URL so Back from a review restores it. */
export function useQueueParams() {
  const [params, setParams] = useSearchParams()

  const state = {
    tab: params.get('tab') ?? 'all',
    mine: params.get('mine') === '1',
    sort: params.get('sort') ?? 'oldest',
    q: params.get('q') ?? '',
    page: Math.max(1, Number(params.get('page')) || 1),
    areas: params.getAll('area'),
    jurisdiction: params.get('jurisdiction') ?? '',
  }

  // Changing anything except the page itself returns to page 1.
  const update = useCallback(
    (patch) =>
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (!('page' in patch)) next.delete('page')
          for (const [key, value] of Object.entries(patch)) {
            next.delete(key)
            const values = LIST_KEYS.includes(key) ? value : [value]
            for (const v of values) if (v && v !== false && v !== 1) next.append(key, v === true ? '1' : v)
          }
          return next
        },
        { replace: true },
      ),
    [setParams],
  )

  return { state, update }
}
