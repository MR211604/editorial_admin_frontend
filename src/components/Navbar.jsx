import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {

  const { auth: { name }, logout } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-1 ">
      <div className="container-fluid">
        <img src="https://www.udb.edu.sv/editorial/admin/images/logomini.png" alt="logo editorial udb" className='navbar-brand object-fit-contain' />
        <a className="navbar-brand" href="/dashboard"> Editorial Universidad Don Bosco - Panel de Control</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-lg-0 ms-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="d-sm-none d-lg-inline bi bi-person me-1"></i>{name}
              </a>
              <ul className="dropdown-menu dropdown-menu-lg-end text-left">
                <li><button className="dropdown-item"> <i className="bi bi-gear"></i> Configuración</button></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={handleLogout}> <i className="bi bi-box-arrow-right"></i> Cerrar sesión</button></li>
              </ul>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  )
}
