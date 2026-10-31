export const ROLES = {
  citizen: { label: 'Citizen', badge: 'bg-[#e8f1fe] text-[#2563eb]', color: '#3988f5' },
  advocate: { label: 'Advocate', badge: 'bg-[#f0e8fd] text-[#7c3aed]', color: '#9258e8' },
}

export const STATUS = {
  active: { label: 'Active', badge: 'bg-[#e3f6ee] text-[#0d8a60]', dot: 'bg-[#10a875]', color: '#10a875' },
  inactive: { label: 'Inactive', badge: 'bg-[#eeeef1] text-[#6b6b73]', dot: 'bg-[#858da0]', color: '#ffc900' },
  restricted: { label: 'Restricted', badge: 'bg-[#fde8e8] text-[#d92d20]', dot: 'bg-[#ef4444]', color: '#ef4444' },
}

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'name_asc', label: 'Name A–Z' },
  { value: 'name_desc', label: 'Name Z–A' },
  { value: 'active', label: 'Last active' },
]

export const TYPE_OPTIONS = [
  { value: 'all', label: 'All users' },
  { value: 'citizen', label: 'Citizens' },
  { value: 'advocate', label: 'Advocates' },
]
export const ROLE_OPTIONS = [
  { value: 'all', label: 'All roles' },
  { value: 'citizen', label: 'Citizen' },
  { value: 'advocate', label: 'Advocate' },
]
export const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'restricted', label: 'Restricted' },
]
export const ACTIVE_WITHIN_OPTIONS = [
  { value: 'any', label: 'Any time' },
  { value: '24', label: 'Last 24 hours' },
  { value: '168', label: 'Last 7 days' },
  { value: '720', label: 'Last 30 days' },
]

export const PAGE_SIZE = 8
