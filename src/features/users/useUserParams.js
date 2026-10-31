import { useListParams } from '../../hooks/useListParams'

export function useUserParams() {
  const { params, update } = useListParams()

  const state = {
    q: params.get('q') ?? '',
    type: params.get('type') ?? 'all',
    role: params.get('role') ?? 'all',
    status: params.get('status') ?? 'all',
    joinedFrom: params.get('from') ?? '',
    joinedTo: params.get('to') ?? '',
    active: params.get('active') ?? 'any',
    sort: params.get('sort') ?? 'newest',
    page: Math.max(1, Number(params.get('page')) || 1),
  }

  return { state, update }
}
