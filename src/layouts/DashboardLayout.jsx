import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className='min-vh-100 d-flex flex-column'>
      <Navbar />
      <div className='d-flex flex-row flex-grow-1'>
        <div className='w-auto col-md-2 col-lg-2 d-md-block bg-light'>
          <Sidebar />
        </div>
        <main className='container pt-4'>{children}</main>
      </div>
    </div>
  )
}
