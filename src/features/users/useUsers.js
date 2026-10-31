import { useSyncExternalStore } from 'react'
import { getUsersSnapshot, subscribeUsers } from '../../services/usersService'

export function useUsers() {
  return useSyncExternalStore(subscribeUsers, getUsersSnapshot)
}
