export const NOTES_MAX = 500

export const DECISIONS = {
  approve: { title: 'Approve this advocate?', confirm: 'Approve', needsReason: false, text: 'All five checklist items are confirmed. Please confirm you want to approve this advocate.' },
  more_info: { title: 'Request more information', confirm: 'Send request', needsReason: true, text: 'Tell the advocate what is missing. A reason is required.' },
  reject: { title: 'Reject this submission?', confirm: 'Reject', needsReason: true, text: 'A rejection reason is required.' },
  escalate: { title: 'Escalate for senior review', confirm: 'Escalate', needsReason: true, text: 'Explain why this needs escalation. A reason is required.' },
}
