import { useListParams } from '../../hooks/useListParams'

const LIST_KEYS = ['type', 'category', 'status']

export function useResourceParams() {
  const { params, update } = useListParams(LIST_KEYS)

  const state = {
    tab: params.get('tab') ?? 'all',
    q: params.get('q') ?? '',
    sort: params.get('sort') ?? 'relevant',
    page: Math.max(1, Number(params.get('page')) || 1),
    types: params.getAll('type'),
    categories: params.getAll('category'),
    statuses: params.getAll('status'),
    jurisdiction: params.get('jurisdiction') ?? '',
  }

  return { state, update }
}
