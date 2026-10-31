import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import ComingSoonPage from '../components/common/ComingSoonPage'
import OverviewPage from '../features/dashboard/OverviewPage'
import LegalResourcesPage from '../features/legal-resources/LegalResourcesPage'
import UserManagementPage from '../features/users/UserManagementPage'
import AddAdvocatePage from '../features/users/advocate/AddAdvocatePage'
import AdvocateReviewPage from '../features/verification/AdvocateReviewPage'
import VerificationQueuePage from '../features/verification/VerificationQueuePage'
import ReviewLayout from './ReviewLayout'

const PLACEHOLDERS = [
  ['ai-feedback', 'AI feedback and content quality'],
  ['support-reports', 'Support and reports'],
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
        <Route path="legal-resources" element={<LegalResourcesPage />} />
        <Route path="user-management" element={<UserManagementPage />} />
        <Route path="user-management/new" element={<AddAdvocatePage />} />
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
