import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className='d-flex flex-column' style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className='d-flex flex-row flex-grow-1'>
        <div className='flex-shrink-0' style={{ width: '15%' }}>
          <Sidebar />
        </div>
        <main className='container pt-4 flex-grow-1'>{children}</main>
      </div>
    </div>
  )
}
