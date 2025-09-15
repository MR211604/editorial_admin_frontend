import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function DashboardLayout({ children }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      
      {/* Sidebar flotante */}
      <div 
        className={`sidebar-container ${sidebarExpanded ? 'sidebar-expanded' : ''}`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <Sidebar />
      </div>

      
      {sidebarExpanded && (
        <div 
          className="overlay" 
          onClick={() => setSidebarExpanded(false)}
        />
      )}

      {/* Contenido principal */}
      <Container fluid className="flex-grow-1 p-0">
        <Row className="h-100 g-0">
          <Col className={`content-area ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  )
}