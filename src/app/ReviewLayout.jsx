import { Outlet } from 'react-router-dom'
import ReviewHeader from '../components/layout/ReviewHeader'

function ReviewLayout() {
  return (
    <div className="min-h-screen">
      <ReviewHeader />
      <main className="mx-auto max-w-[1500px] px-4 pb-10 pt-6 sm:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default ReviewLayout
