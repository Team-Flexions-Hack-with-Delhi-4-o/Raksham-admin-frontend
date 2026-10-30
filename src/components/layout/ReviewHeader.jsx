import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useBackToQueue } from '../../features/verification/useBackToQueue'
import ProfileMenu from './ProfileMenu'

/** Sidebar-less header for focused full-width screens such as an advocate review. */
function ReviewHeader() {
  const back = useBackToQueue()
  return (
    <header className="flex h-[72px] items-center justify-between gap-3 border-b border-line bg-white px-4 sm:px-8">
      <Link to={back} className="flex items-center gap-3 rounded-lg font-medium hover:underline">
        <ArrowLeft size={22} />
        Verification queue
      </Link>
      <div className="flex items-center gap-3">
        <span className="hidden whitespace-nowrap rounded-full border border-brand bg-[#fff8d6] px-3 py-2 text-xs font-bold sm:inline-block">
          DEMO ENVIRONMENT
        </span>
        <ProfileMenu />
      </div>
    </header>
  )
}

export default ReviewHeader
