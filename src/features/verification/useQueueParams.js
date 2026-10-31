import { useListParams } from '../../hooks/useListParams'

const LIST_KEYS = ['area']

/** Queue UI state lives in the URL so Back from a review restores it. */
export function useQueueParams() {
  const { params, update } = useListParams(LIST_KEYS)

  const state = {
    tab: params.get('tab') ?? 'all',
    mine: params.get('mine') === '1',
    sort: params.get('sort') ?? 'oldest',
    q: params.get('q') ?? '',
    page: Math.max(1, Number(params.get('page')) || 1),
    areas: params.getAll('area'),
    jurisdiction: params.get('jurisdiction') ?? '',
  }

  return { state, update }
}
