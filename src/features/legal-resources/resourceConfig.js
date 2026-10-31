export const TYPES = {
  act: 'Act',
  scheme: 'Scheme',
  government: 'Government resource',
  article: 'Article',
}

export const TABS = [
  { value: 'all', label: 'All' },
  { value: 'act', label: 'Acts' },
  { value: 'scheme', label: 'Schemes' },
  { value: 'government', label: 'Government resources' },
  { value: 'article', label: 'Articles' },
]

export const STATUS = {
  available: { label: 'Available', color: '#15966d', dot: 'bg-[#15966d]' },
  needs_update: { label: 'Needs update', color: '#ffc900', dot: 'bg-brand' },
  unavailable: { label: 'Unavailable', color: '#f04438', dot: 'bg-[#f04438]' },
}

export const SORT_OPTIONS = [
  { value: 'relevant', label: 'Most relevant' },
  { value: 'recent', label: 'Recently updated' },
  { value: 'oldest', label: 'Oldest updated' },
  { value: 'title_asc', label: 'Title A–Z' },
  { value: 'title_desc', label: 'Title Z–A' },
]

export const PAGE_SIZE = 5
