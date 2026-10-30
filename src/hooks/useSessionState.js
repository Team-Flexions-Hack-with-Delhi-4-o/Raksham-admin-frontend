import { useEffect, useState } from 'react'

/** useState that survives reloads within the tab; falls back to plain state if storage is blocked. */
export function useSessionState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = sessionStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage unavailable: keep in-memory state only */
    }
  }, [key, value])

  return [value, setValue]
}
