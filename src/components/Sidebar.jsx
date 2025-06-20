import CustomLink from "./ui/CustomLink";

export default function Sidebar() {

  return (
    <>
      <div className="bg-light border-end min-vh-100">
        <ul className="nav flex-column">
          <CustomLink to="/dashboard" icon={"bi-house-door"} activeIcon="bi-house-door-fill">
             Inicio
          </CustomLink>

          <CustomLink to="/dashboard/authors" icon={"bi-person"} activeIcon="bi-person-fill">
            Autores
          </CustomLink>

          <CustomLink to="/dashboard/books" icon={"bi-book"} activeIcon="bi-book-fill">
            Libros
          </CustomLink>

        </ul>
      </div>
    </>
  )
}
