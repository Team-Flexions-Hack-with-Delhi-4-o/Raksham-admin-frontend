// SAMPLE DATA ONLY. Fictional people; nothing here is real account data.

export const USERS = [
  { id: 'USR-1042', name: 'Ananya Sharma', role: 'citizen', phone: '+91 98765 43210', email: 'ananya@gmail.com', status: 'active', joinedAt: '2025-08-12', lastActiveHours: 2 },
  { id: 'USR-1033', name: 'Rahul Verma', role: 'citizen', phone: '+91 98123 45678', email: 'rahul@gmail.com', status: 'active', joinedAt: '2025-08-11', lastActiveHours: 24 },
  { id: 'USR-0976', name: 'Arjun Singh', role: 'advocate', phone: '+91 98764 32109', email: 'arjun@legal.com', status: 'active', joinedAt: '2025-08-08', lastActiveHours: 120 },
  { id: 'USR-0998', name: 'Priya Mehta', role: 'citizen', phone: '+91 96543 21098', email: 'priya@gmail.com', status: 'restricted', joinedAt: '2025-08-09', lastActiveHours: 3 },
  { id: 'USR-0931', name: 'Neha Kapoor', role: 'advocate', phone: '+91 99876 54321', email: 'neha@lawmail.com', status: 'active', joinedAt: '2025-08-06', lastActiveHours: 24 },
  { id: 'USR-0904', name: 'Kunal Bansal', role: 'advocate', phone: '+91 98765 00123', email: 'kunal@advocate.com', status: 'active', joinedAt: '2025-08-05', lastActiveHours: 48 },
  { id: 'USR-0877', name: 'Simran Kaur', role: 'citizen', phone: '+91 95678 43210', email: 'simran@gmail.com', status: 'inactive', joinedAt: '2025-08-02', lastActiveHours: 240 },
  { id: 'USR-0841', name: 'Vikram Rao', role: 'citizen', phone: '+91 98111 22334', email: 'vikram@gmail.com', status: 'active', joinedAt: '2025-07-31', lastActiveHours: 4 },
]

// Period-over-period changes are sample figures, not computed from the records above.
export const USER_DELTAS = {
  total: { change: 12, direction: 'up', tone: 'good' },
  active: { change: 8, direction: 'up', tone: 'good' },
  restricted: { change: 25, direction: 'down', tone: 'bad' },
}

export const USER_GROWTH = [
  { label: '1 Oct', citizens: 60, advocates: 25 },
  { label: '7 Oct', citizens: 105, advocates: 42 },
  { label: '14 Oct', citizens: 120, advocates: 52 },
  { label: '21 Oct', citizens: 150, advocates: 67 },
  { label: '28 Oct', citizens: 170, advocates: 90 },
]
