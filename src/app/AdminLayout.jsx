import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/layout/AdminSidebar'
import AdminTopbar from '../components/layout/AdminTopbar'

function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  return (
    <div className="flex min-h-screen">
      <AdminSidebar open={menuOpen} onClose={close} />
      <div className="min-w-0 flex-1">
        <AdminTopbar onMenuClick={() => setMenuOpen(true)} />
        <main className="px-4 pb-8 pt-2 sm:px-6 lg:px-7">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
