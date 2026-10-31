import { USERS } from '../features/users/mockData'

// No backend contract or Swagger exists for user management yet. This is an in-memory,
// session-only store seeded with sample users so edits, status changes and new advocates
// show up across pages. NOTHING here is sent to a server or persisted.

let users = USERS
const listeners = new Set()

const commit = (next) => {
  users = next
  listeners.forEach((l) => l())
}

export const subscribeUsers = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const getUsersSnapshot = () => users

export const updateUser = (id, patch) => commit(users.map((u) => (u.id === id ? { ...u, ...patch } : u)))

export const removeUser = (id) => commit(users.filter((u) => u.id !== id))

export function addUser(user) {
  const next = Math.max(...users.map((u) => Number(u.id.slice(4)))) + 1
  const created = { ...user, id: `USR-${String(next).padStart(4, '0')}`, joinedAt: new Date().toISOString().slice(0, 10), lastActiveHours: 0 }
  commit([created, ...users])
  return created
}
