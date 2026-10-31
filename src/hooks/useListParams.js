import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * List-page UI state kept in the URL so Back/reload restore it. `listKeys` are params that
 * hold several values. Changing anything except `page` returns to page 1; empty values,
 * `false` and page 1 are dropped from the URL.
 */
export function useListParams(listKeys = []) {
  const [params, setParams] = useSearchParams()

  const update = useCallback(
    (patch) =>
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (!('page' in patch)) next.delete('page')
          for (const [key, value] of Object.entries(patch)) {
            next.delete(key)
            const values = listKeys.includes(key) ? value : [value]
            for (const v of values) if (v && v !== 1) next.append(key, v === true ? '1' : v)
          }
          return next
        },
        { replace: true },
      ),
    // listKeys is a constant per caller
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setParams],
  )

  return { params, update }
}
