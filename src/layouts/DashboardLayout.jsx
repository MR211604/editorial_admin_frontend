import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='d-flex flex-row'>
        <div className='flex-shrink-0'>
          <Sidebar />
        </div>
        <main className='container pt-3'>{children}</main>
      </div>
    </div>
  )
}
