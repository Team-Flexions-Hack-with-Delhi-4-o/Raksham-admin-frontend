import {
  House,
  UserRoundCheck,
  FileText,
  MessageSquareText,
  MessageSquare,
  UsersRound,
  Settings,
} from 'lucide-react'

export const NAV_ITEMS = [
  { label: 'Overview', to: '/overview', icon: House },
  { label: 'Verification queue', to: '/verification-queue', icon: UserRoundCheck },
  { label: 'Legal resources', to: '/legal-resources', icon: FileText },
  { label: 'AI feedback and content quality', to: '/ai-feedback', icon: MessageSquareText },
  { label: 'Support and reports', to: '/support-reports', icon: MessageSquare },
  { label: 'User management', to: '/user-management', icon: UsersRound },
  { label: 'Settings', to: '/settings', icon: Settings },
]

export const CURRENT_ADMIN = { name: 'Verification Reviewer', initials: 'VR' }
