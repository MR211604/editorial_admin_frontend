import { useContext } from 'react'
import { Navbar as BootstrapNavbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export default function Navbar() {

  const { auth: { name }, logout } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <BootstrapNavbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <BootstrapNavbar.Brand href="/dashboard">
          <img src="https://www.udb.edu.sv/editorial/admin/images/logomini.png" alt="logo editorial udb" className='navbar-brand object-fit-contain' />
          Editorial Universidad Don Bosco - Panel de Control
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown align={'end'} title={<><i className="bi bi-person"></i> {name}</>} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1" onClick={handleLogout}> <i className="bi bi-box-arrow-right"></i> Cerrar sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}
