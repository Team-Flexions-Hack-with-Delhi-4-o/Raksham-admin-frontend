import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import ComingSoonPage from '../components/common/ComingSoonPage'
import OverviewPage from '../features/dashboard/OverviewPage'
import AdvocateReviewPage from '../features/verification/AdvocateReviewPage'
import VerificationQueuePage from '../features/verification/VerificationQueuePage'
import ReviewLayout from './ReviewLayout'

const PLACEHOLDERS = [
  ['legal-resources', 'Legal resources'],
  ['ai-feedback', 'AI feedback and content quality'],
  ['support-reports', 'Support and reports'],
  ['user-management', 'User management'],
  ['settings', 'Settings'],
  ['profile', 'Profile'],
  ['activity', 'Recent activity'],
  ['sign-out', 'Sign out'],
]

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="/overview" replace />} />
        <Route path="overview" element={<OverviewPage />} />
        <Route path="verification-queue" element={<VerificationQueuePage />} />
        {PLACEHOLDERS.map(([path, title]) => (
          <Route key={path} path={path} element={<ComingSoonPage title={title} />} />
        ))}
        <Route path="*" element={<ComingSoonPage title="Page not found" />} />
      </Route>
      <Route element={<ReviewLayout />}>
        <Route path="verification-queue/:advocateId" element={<AdvocateReviewPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
