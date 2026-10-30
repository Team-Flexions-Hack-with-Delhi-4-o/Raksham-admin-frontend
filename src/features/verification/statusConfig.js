export const STATUS = {
  submitted: { label: 'Submitted', dot: 'bg-neutral-chart', badge: 'bg-[#f0f0f2]' },
  under_review: { label: 'Under review', dot: 'bg-neutral-chart', badge: 'bg-[#f0f0f2]' },
  more_info: { label: 'More information required', dot: 'bg-brand', badge: 'bg-brand-soft' },
  reverification: { label: 'Reverification due', dot: 'bg-[#f97316]', badge: 'bg-[#ffe9d6]' },
}

export const TABS = [
  { value: 'all', label: 'All' },
  { value: 'submitted', label: STATUS.submitted.label },
  { value: 'under_review', label: STATUS.under_review.label },
  { value: 'more_info', label: STATUS.more_info.label },
  { value: 'reverification', label: STATUS.reverification.label },
]

export const SORT_OPTIONS = [
  { value: 'oldest', label: 'Oldest first' },
  { value: 'newest', label: 'Newest first' },
  { value: 'name', label: 'Name A–Z' },
]
