import CustomLink from "./ui/CustomLink";

export default function Sidebar() {

  return (
    <>
      <div className="bg-light border-end h-100">
        <ul className="nav flex-column text-left lh-lg">
          <CustomLink to="/dashboard" icon="bi-house-door">
            Inicio
          </CustomLink>

          <CustomLink to="/dashboard/books" icon="bi-book">
            Libros
          </CustomLink>

          <CustomLink to="/dashboard/magazines" icon="bi bi-journal">
            Revistas
          </CustomLink>

          <CustomLink to="/dashboard/authors" icon="bi-person">
            Autores
          </CustomLink>

          <CustomLink to="/dashboard/categories" icon="bi-list-check" >
            Categorias
          </CustomLink>

          <CustomLink to="/dashboard/userAccounts" icon="bi-person-circle" >
            Cuentas de usuario
          </CustomLink>

          <CustomLink to="/dashboard/rol" icon="bi-menu-app">
            Roles
          </CustomLink>

          <CustomLink to="/dashboard/privileges" icon="bi-key">
            Privilegios de usuarios
          </CustomLink>
        </ul>
      </div>
    </>
  )
}
