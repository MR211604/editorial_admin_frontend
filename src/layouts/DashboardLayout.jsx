import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div style={{ height: '100%' }}>
      <Navbar />
      <div className='d-flex flex-row' style={{ height: '100%' }}>
        <div style={{ width: 'auto' }}>
          <Sidebar />
        </div>
        <main className='container pt-4'>{children}</main>
      </div>
    </div>
  )
}
