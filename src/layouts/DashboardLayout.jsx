import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className='min-vh-100 h-100'>
      <Navbar />
      <div className='d-flex flex-row h-100'>
        <div className='w-auto'>
          <Sidebar />
        </div>
        <main className='container pt-4'>{children}</main>
      </div>
    </div>
  )
}
