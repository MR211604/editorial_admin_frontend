import Nav from 'react-bootstrap/Nav'
import CustomLink from './ui/CustomLink'

export default function Sidebar() {
  return (
    <div className="sidebar-inner">
      <Nav className="flex-column text-left lh-lg">
        <CustomLink to="/dashboard" icon="bi-house-door" data-tooltip="Inicio">
          Inicio
        </CustomLink>

        <CustomLink to="/dashboard/books" icon="bi-book" data-tooltip="Libros">
          Libros
        </CustomLink>

        <CustomLink to="/dashboard/magazines" icon="bi-journal" data-tooltip="Revistas">
          Revistas
        </CustomLink>

        <CustomLink to="/dashboard/authors" icon="bi-person" data-tooltip="Autores">
          Autores
        </CustomLink>

        <CustomLink to="/dashboard/categories" icon="bi-list-check" data-tooltip="Categorías">
          Categorías
        </CustomLink>

        <CustomLink to="/dashboard/userAccounts" icon="bi-person-circle" data-tooltip="Cuentas de usuario">
          Cuentas de usuario
        </CustomLink>

        <CustomLink to="/dashboard/rol" icon="bi-menu-app" data-tooltip="Roles">
          Roles
        </CustomLink>

        <CustomLink to="/dashboard/privileges" icon="bi-key" data-tooltip="Privilegios de usuarios">
          Privilegios de usuarios
        </CustomLink>
      </Nav>
    </div>
  )
}
